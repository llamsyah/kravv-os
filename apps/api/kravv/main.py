import logging
import os
import sqlite3
from contextlib import asynccontextmanager
from pathlib import Path
from threading import Lock

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse

from kravv.connectors.mock_study import read_study
from kravv.database import StudyStore
from kravv.models import StudyResponse, SyncResponse

ROOT = Path(__file__).resolve().parents[1]
logger = logging.getLogger("uvicorn.error")


def create_app(db_path: Path | None = None, source_path: Path | None = None):
    store = StudyStore(db_path or Path(os.environ.get("KRAVV_DB_PATH", ROOT / "data/kravv.sqlite3")))
    source = source_path or Path(os.environ.get("KRAVV_STUDY_SOURCE", ROOT / "fixtures/study.json"))
    sync_lock = Lock()

    @asynccontextmanager
    async def lifespan(app: FastAPI):
        store.initialize()
        # Seed only an empty database. Restarts must never replace persisted progress.
        if store.read() is None:
            store.save(read_study(ROOT / "fixtures/initial-study.json"))
        yield

    app = FastAPI(title="KRAVV OS", version="0.1.0", lifespan=lifespan)

    @app.exception_handler(sqlite3.Error)
    async def database_error(request: Request, error: sqlite3.Error):
        logger.error("database_unavailable: %s", type(error).__name__)
        return JSONResponse(status_code=503, content={"detail": "Local storage is unavailable. Try again."})

    @app.get("/api/status")
    def status():
        return {"status": "ready", "storage": "sqlite", "mode": "local"}

    @app.get("/api/study", response_model=StudyResponse)
    def get_study():
        study = store.read()
        if study is None:
            raise HTTPException(404, "No Study data yet. Sync to load it.")
        return StudyResponse(study=study)

    @app.post("/api/study/sync", response_model=SyncResponse)
    def sync_study():
        with sync_lock:
            logger.info("study_sync_started source=mock")
            try:
                incoming = read_study(source)
            except (OSError, ValueError):
                logger.warning("study_sync_failed source=mock")
                raise HTTPException(502, "Study source unavailable or invalid. Your saved progress is unchanged.") from None
            previous = store.read()
            # This milestone has one course. Reject accidental source identity changes.
            if previous and (previous.source, previous.external_id) != (incoming.source, incoming.external_id):
                raise HTTPException(409, "The mock course identity changed. Keep the same course ID for this demo.")
            changed = previous is None or previous.model_dump(exclude={"synced_at"}) != incoming.model_dump(exclude={"synced_at"})
            store.save(incoming)
            logger.info("study_sync_succeeded changed=%s", changed)
            return SyncResponse(study=incoming, changed=changed)

    return app


app = create_app()
