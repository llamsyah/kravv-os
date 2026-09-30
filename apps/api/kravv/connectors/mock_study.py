import json
from datetime import datetime, timezone
from pathlib import Path

from pydantic import BaseModel, ConfigDict, Field

from kravv.models import Study


class MockCourse(BaseModel):
    model_config = ConfigDict(strict=True)

    id: str
    name: str
    subject: str
    topic: str
    done: int = Field(ge=0)
    lessons: int = Field(gt=0)
    updated: str


def read_study(path: Path) -> Study:
    """Translate the mock's source-specific shape at the connector boundary."""
    raw = MockCourse.model_validate(json.loads(path.read_text(encoding="utf-8")))
    return Study(
        course=raw.name,
        subject=raw.subject,
        current_topic=raw.topic,
        completed=raw.done,
        total=raw.lessons,
        progress=int(raw.done / raw.lessons * 100 + 0.5),
        last_activity=raw.updated,
        source="mock",
        external_id=raw.id,
        synced_at=datetime.now(timezone.utc),
    )
