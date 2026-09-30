import json
import sqlite3

import pytest
from fastapi.testclient import TestClient

from kravv.connectors.mock_study import read_study
from kravv.main import ROOT, create_app


@pytest.fixture
def setup(tmp_path):
    source = tmp_path / "study.json"
    source.write_text((ROOT / "fixtures/study.json").read_text(), encoding="utf-8")
    return tmp_path / "test.sqlite3", source


def test_normalization():
    study = read_study(ROOT / "fixtures/initial-study.json")
    assert study.progress == 42
    assert study.completed == 5
    assert study.source == "mock"
    assert study.external_id == "tka-math"
    assert study.synced_at.tzinfo is not None
    assert "done" not in study.model_dump()


def test_sync_contract_idempotency_and_restart(setup):
    db, source = setup
    with TestClient(create_app(db, source)) as client:
        assert client.get("/api/status").json()["status"] == "ready"
        assert client.get("/api/study").json()["study"]["progress"] == 42
        response = client.post("/api/study/sync")
        assert response.status_code == 200
        result = response.json()
        assert result["changed"] is True
        assert result["study"]["progress"] == 50
        assert result["study"]["completed"] == 6
        assert client.post("/api/study/sync").json()["changed"] is False
    with TestClient(create_app(db, source)) as restarted:
        assert restarted.get("/api/study").json()["study"]["completed"] == 6
    with sqlite3.connect(db) as connection:
        assert connection.execute("SELECT COUNT(*) FROM study").fetchone()[0] == 1


@pytest.mark.parametrize("contents", ["{bad json", '{"done": 99}', None])
def test_failed_source_preserves_saved_data(setup, contents):
    db, source = setup
    with TestClient(create_app(db, source)) as client:
        before = client.get("/api/study").json()
        if contents is None:
            source.unlink()
        else:
            source.write_text(contents, encoding="utf-8")
        assert client.post("/api/study/sync").status_code == 502
        assert client.get("/api/study").json() == before


@pytest.mark.parametrize("changes", [{"done": 13}, {"lessons": 0}, {"done": -1}, {"done": 5.5}, {"updated": "no-date"}])
def test_invalid_progress_rejected(setup, changes):
    db, source = setup
    with TestClient(create_app(db, source)) as client:
        payload = json.loads(source.read_text())
        payload.update(changes)
        source.write_text(json.dumps(payload), encoding="utf-8")
        assert client.post("/api/study/sync").status_code == 502
        assert client.get("/api/study").json()["study"]["completed"] == 5


def test_changed_fixture_flows_through_api(setup):
    db, source = setup
    with TestClient(create_app(db, source)) as client:
        client.post("/api/study/sync")
        payload = json.loads(source.read_text())
        payload["done"] = 7
        source.write_text(json.dumps(payload), encoding="utf-8")
        result = client.post("/api/study/sync").json()
        assert result["changed"] is True
        assert result["study"]["progress"] == 58


def test_identity_change_does_not_add_another_course(setup):
    db, source = setup
    with TestClient(create_app(db, source)) as client:
        payload = json.loads(source.read_text())
        payload["id"] = "another-course"
        source.write_text(json.dumps(payload), encoding="utf-8")
        assert client.post("/api/study/sync").status_code == 409
        assert client.get("/api/study").json()["study"]["external_id"] == "tka-math"
