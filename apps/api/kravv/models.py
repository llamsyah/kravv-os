from datetime import datetime

from pydantic import BaseModel, Field, model_validator


class Study(BaseModel):
    course: str = Field(min_length=1)
    subject: str = Field(min_length=1)
    current_topic: str = Field(min_length=1)
    completed: int = Field(ge=0)
    total: int = Field(gt=0)
    progress: int = Field(ge=0, le=100)
    last_activity: datetime
    source: str = Field(min_length=1)
    external_id: str = Field(min_length=1)
    synced_at: datetime

    @model_validator(mode="after")
    def validate_completion(self):
        if self.completed > self.total:
            raise ValueError("Completed topics cannot exceed the total")
        if self.progress != int(self.completed / self.total * 100 + 0.5):
            raise ValueError("Progress must match topic completion")
        if self.last_activity.tzinfo is None or self.synced_at.tzinfo is None:
            raise ValueError("Study timestamps must include a timezone")
        return self


class StudyResponse(BaseModel):
    study: Study


class SyncResponse(StudyResponse):
    changed: bool
