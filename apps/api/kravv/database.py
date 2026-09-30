import sqlite3
from contextlib import closing
from pathlib import Path

from kravv.models import Study


class StudyStore:
    def __init__(self, path: Path):
        self.path = path

    def initialize(self):
        self.path.parent.mkdir(parents=True, exist_ok=True)
        with closing(sqlite3.connect(self.path)) as connection, connection:
            connection.execute("""
                CREATE TABLE IF NOT EXISTS study (
                    source TEXT NOT NULL,
                    external_id TEXT NOT NULL,
                    record TEXT NOT NULL,
                    PRIMARY KEY (source, external_id)
                )
            """)

    def read(self) -> Study | None:
        with closing(sqlite3.connect(self.path)) as connection:
            row = connection.execute(
                "SELECT record FROM study ORDER BY source, external_id LIMIT 1"
            ).fetchone()
        return Study.model_validate_json(row[0]) if row else None

    def save(self, study: Study):
        with closing(sqlite3.connect(self.path)) as connection, connection:
            connection.execute(
                """INSERT INTO study (source, external_id, record) VALUES (?, ?, ?)
                ON CONFLICT(source, external_id) DO UPDATE SET record = excluded.record""",
                (study.source, study.external_id, study.model_dump_json()),
            )
