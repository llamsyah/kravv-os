"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowDownToLine,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  Circle,
  Command,
  Compass,
  HeartPulse,
  House,
  Layers3,
  LoaderCircle,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import {
  request,
  type Study,
  type StudyResponse,
  type SyncResponse,
} from "../lib/api";

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Placeholder({ type }: { type: "health" | "events" }) {
  const health = type === "health";
  const Icon = health ? HeartPulse : CalendarDays;
  return (
    <section
      className="panel placeholder-panel"
      aria-labelledby={`${type}-title`}
    >
      <div className="panel-heading">
        <span className={`module-icon ${type}`}>
          <Icon size={19} />
        </span>
        <h2 id={`${type}-title`}>{health ? "Health" : "Events"}</h2>
        <span className="badge muted">Placeholder</span>
      </div>
      <div className="placeholder-art" aria-hidden="true">
        {health ? (
          <svg viewBox="0 0 300 44">
            <path d="M0 24 H76 L88 24 L96 13 L106 34 L116 5 L128 39 L139 24 H300" />
          </svg>
        ) : (
          <div className="calendar-strip">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
              <span key={index}>
                {day}
                <i />
              </span>
            ))}
          </div>
        )}
      </div>
      <h3>
        {health
          ? "Room for your wellbeing."
          : "A little space for what’s next."}
      </h3>
      <p>
        {health
          ? "Your health context will live here. No wearable is connected."
          : "Your day, brought together. No calendar is connected."}
      </p>
      <div className="placeholder-footer">
        <Circle size={7} />
        {health
          ? "Health connection comes later"
          : "Events connection comes later"}
      </div>
    </section>
  );
}

export default function Dashboard() {
  const [study, setStudy] = useState<Study | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [clock, setClock] = useState<Date | null>(null);
  const [query, setQuery] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const inFlight = useRef(false);

  const load = useCallback(async () => {
    if (inFlight.current) return;
    inFlight.current = true;
    setLoading(true);
    setError("");
    try {
      const result = await request<StudyResponse>("/api/study");
      setStudy(result.study);
      setConnected(true);
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Could not load Study.",
      );
      setConnected(false);
    } finally {
      setLoading(false);
      inFlight.current = false;
    }
  }, []);

  useEffect(() => {
    void load();
    setClock(new Date());
    const timer = setInterval(() => setClock(new Date()), 60000);
    return () => clearInterval(timer);
  }, [load]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialog.current?.open) dialog.current.close();
        else {
          setQuery("");
          dialog.current?.showModal();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function sync() {
    if (inFlight.current) return;
    inFlight.current = true;
    setSyncing(true);
    setNotice("");
    setError("");
    try {
      const result = await request<SyncResponse>("/api/study/sync", "POST");
      setStudy(result.study);
      setConnected(true);
      setNotice(
        result.changed
          ? `Progress updated. ${result.study.completed} of ${result.study.total} topics complete.`
          : "You’re up to date. No new Study changes.",
      );
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Could not sync Study.",
      );
      // A sync-source failure is distinct from loss of backend connectivity.
      try {
        await request("/api/status");
        setConnected(true);
      } catch {
        setConnected(false);
      }
    } finally {
      setSyncing(false);
      inFlight.current = false;
    }
  }

  function goTo(id: string) {
    dialog.current?.close();
    document.getElementById(id)?.focus();
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "auto", block: "center" });
  }

  const greeting = !clock
    ? "Welcome to your space"
    : clock.getHours() < 12
      ? "A fresh start, at your pace."
      : clock.getHours() < 18
        ? "Make room for what matters."
        : "A little clarity for your evening.";
  const busy = loading || syncing;
  const commands = [
    {
      name: "Go to overview",
      action: () => goTo("overview"),
      icon: House,
      disabled: false,
    },
    {
      name: "Go to Study",
      action: () => goTo("study"),
      icon: BookOpen,
      disabled: false,
    },
    {
      name: "Sync Study data",
      action: () => {
        dialog.current?.close();
        void sync();
      },
      icon: RefreshCw,
      disabled: busy,
    },
    {
      name: "Refresh connection",
      action: () => {
        dialog.current?.close();
        void load();
      },
      icon: ArrowDownToLine,
      disabled: busy,
    },
  ].filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="app-shell">
      <a className="skip-link" href="#overview">
        Skip to your dashboard
      </a>
      <aside className="sidebar">
        <a href="#overview" className="brand" aria-label="KRAVV OS home">
          <span className="brand-mark">
            <Layers3 size={24} strokeWidth={1.6} />
          </span>
          <span>
            KRAVV<span className="brand-os"> OS</span>
          </span>
        </a>
        <div className="space-label">
          <span className="small-dot" /> PERSONAL SPACE
        </div>
        <nav aria-label="Main navigation">
          <a href="#overview" className="nav-link active">
            <House size={19} />
            Overview
            <span className="nav-indicator" />
          </a>
          <a href="#study" className="nav-link">
            <BookOpen size={19} />
            Study
            <ChevronRight size={14} className="nav-chevron" />
          </a>
        </nav>
        <div className="sidebar-note">
          <div className="orbit-small" aria-hidden="true" />
          <p>
            A little more connected.
            <br />A little more you.
          </p>
          <span>ONE DAY AT A TIME</span>
        </div>
        <div className="sidebar-bottom">
          <ShieldCheck size={17} />
          <div>
            Local by design<span>Your space. On your device.</span>
          </div>
        </div>
        <div className="version">
          KRAVVIENT <span>V0.1 / PREVIEW</span>
        </div>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <div className="breadcrumb">
            Your space <ChevronRight size={13} />
            <span>Overview</span>
          </div>
          <button
            aria-label="Open commands"
            className="command-trigger"
            onClick={() => {
              setQuery("");
              dialog.current?.showModal();
            }}
          >
            <Search size={15} />
            <span>Find your next action</span>
            <kbd>Ctrl K</kbd>
          </button>
          <span className="local-badge">
            <span className="small-dot" />
            Local workspace
          </span>
        </header>
        <main id="overview" tabIndex={-1}>
          <div className="welcome">
            <div>
              <div className="eyebrow">YOUR DAY, IN PERSPECTIVE</div>
              <h1>{greeting}</h1>
              <p>A quiet place to bring your day together.</p>
            </div>
            <div className="date-context">
              <span>
                {clock?.toLocaleDateString(undefined, { weekday: "long" }) ??
                  "Today"}
              </span>
              <strong>
                {clock?.toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }) ?? "Your local time"}
              </strong>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="main-column">
              <div className="section-label">
                <span>IN YOUR ORBIT</span>
                <span className="section-detail">A few things that matter</span>
              </div>
              <section
                id="study"
                tabIndex={-1}
                className="panel study-panel"
                aria-labelledby="study-title"
                aria-busy={busy}
              >
                <div className="panel-heading">
                  <span className="module-icon study">
                    <BookOpen size={20} />
                  </span>
                  <h2 id="study-title">Study</h2>
                  <span className="badge blue">Mock source</span>
                  <span className="study-number">01</span>
                </div>
                {study ? (
                  <>
                    <div className="study-content">
                      <div className="study-copy">
                        <div className="eyebrow">
                          KEEP YOUR CURIOSITY MOVING
                        </div>
                        <h3>{study.course}</h3>
                        <p>Small steps. A clearer understanding.</p>
                        <div className="topic-label">CURRENT TOPIC</div>
                        <div className="topic">
                          <span className="small-dot" />
                          {study.current_topic}
                        </div>
                      </div>
                      <div className="progress-orbit">
                        <svg viewBox="0 0 160 160" aria-hidden="true">
                          <circle
                            className="ring-outer"
                            cx="80"
                            cy="80"
                            r="76"
                          />
                          <circle
                            className="ring-track"
                            cx="80"
                            cy="80"
                            r="65"
                          />
                          <circle
                            className="ring-value"
                            cx="80"
                            cy="80"
                            r="65"
                            pathLength="100"
                            strokeDasharray={`${study.progress} 100`}
                          />
                        </svg>
                        <div className="orbit-value">
                          <strong data-testid="study-progress">
                            {study.progress}
                            <span>%</span>
                          </strong>
                          <span>of your course</span>
                        </div>
                      </div>
                    </div>
                    <div className="completion-row">
                      <span>
                        <strong data-testid="study-completed">
                          {study.completed} / {study.total}
                        </strong>{" "}
                        topics complete
                      </span>
                      <span>
                        {study.total - study.completed} still to explore
                      </span>
                    </div>
                    <div
                      className="progress-track"
                      role="progressbar"
                      aria-label="Study completion"
                      aria-valuenow={study.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <span style={{ width: `${study.progress}%` }} />
                    </div>
                    <div className="study-footer">
                      <div className="sync-caption">
                        <span className="small-dot" />
                        <span>
                          Saved locally{" "}
                          <span className="caption-divider">/</span> synced{" "}
                          {formatTime(study.synced_at)}
                        </span>
                      </div>
                      <button
                        className="primary-button"
                        onClick={() => void sync()}
                        disabled={busy}
                      >
                        <RefreshCw
                          size={15}
                          className={syncing ? "spin" : ""}
                        />
                        {syncing ? "Syncing…" : "Sync Study data"}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="study-empty">
                    {loading ? (
                      <>
                        <LoaderCircle size={27} className="spin" />
                        <h3>Bringing your Study into view…</h3>
                      </>
                    ) : (
                      <>
                        <BookOpen size={30} />
                        <h3>Your Study space is ready.</h3>
                        <p>Reconnect to load your saved progress.</p>
                        <button
                          className="primary-button"
                          onClick={() => void load()}
                        >
                          Try connection again
                        </button>
                      </>
                    )}
                  </div>
                )}
                <div
                  className={`feedback ${error ? "is-error" : ""}`}
                  aria-live="polite"
                  role={error ? "alert" : "status"}
                >
                  {error ||
                    notice ||
                    "Demo data · Sync brings the latest mock Study progress into your space."}
                  {error && study && (
                    <button
                      className="text-button"
                      disabled={busy}
                      onClick={() => void load()}
                    >
                      Retry connection
                    </button>
                  )}
                </div>
              </section>
              <div className="secondary-grid">
                <Placeholder type="health" />
                <Placeholder type="events" />
              </div>
              <section className="focus-panel" aria-labelledby="focus-title">
                <span className="focus-icon">
                  <Compass size={23} />
                </span>
                <div>
                  <div className="eyebrow" id="focus-title">
                    TODAY’S FOCUS{" "}
                    <span className="sample-label">· FROM MOCK STUDY</span>
                  </div>
                  <h3>
                    {study
                      ? `A little time for ${study.subject.toLowerCase()}.`
                      : "One small step is enough."}
                  </h3>
                  <p>
                    {study
                      ? `Pick up where you left off: ${study.current_topic.toLowerCase()}.`
                      : "Your current Study topic will appear here."}
                  </p>
                </div>
                <button
                  aria-label="View your Study focus"
                  className="icon-button"
                  onClick={() => goTo("study")}
                >
                  <ArrowRight size={20} />
                </button>
              </section>
            </div>
            <aside className="context-column" aria-label="Personal context">
              <div className="section-label">
                <span>A LITTLE PERSPECTIVE</span>
                <Sparkles size={13} />
              </div>
              <section className="panel insight-panel">
                <div className="panel-heading">
                  <h2>KRAVV intelligence</h2>
                  <span className="badge muted">Placeholder</span>
                </div>
                <div className="ai-orbit" aria-hidden="true">
                  <div />
                  <Sparkles size={26} strokeWidth={1.2} />
                </div>
                <div className="eyebrow">SPACE FOR UNDERSTANDING</div>
                <h3>
                  First, the picture.
                  <br />
                  Then, the perspective.
                </h3>
                <p>
                  As your world comes together, this space will help you reflect
                  on it.
                </p>
                <div className="ai-offline">
                  <span className="small-dot" />
                  AI is not connected
                </div>
                <div className="insight-note">
                  No generated insights yet.
                  <br />
                  For now, start with your Study.
                </div>
              </section>
              <section
                className="connection-panel"
                aria-labelledby="connection-title"
              >
                <div className="section-label">
                  <h2 id="connection-title">YOUR CONNECTIONS</h2>
                  <span
                    className={`connection-dot ${connected ? "online" : ""}`}
                  />
                </div>
                <div className="connection-row">
                  <span>
                    <BookOpen size={16} />
                    Study source
                  </span>
                  <span className="connection-value">Mock</span>
                </div>
                <div className="connection-row">
                  <span>
                    <Layers3 size={16} />
                    Local backend
                  </span>
                  <span
                    className={
                      connected ? "connected-text" : "connection-value"
                    }
                  >
                    {loading
                      ? "Checking…"
                      : connected
                        ? "Connected"
                        : "Unavailable"}
                  </span>
                </div>
                <div className="storage-note">
                  <ShieldCheck size={14} />
                  <span>
                    {study
                      ? "Your Study progress is stored on this device."
                      : "Your data stays in your local workspace."}
                  </span>
                </div>
              </section>
              <div className="quiet-note">
                <span>MAKE SPACE.</span>
                <p>Progress doesn’t have to be loud.</p>
                <div />
              </div>
            </aside>
          </div>
          <footer className="page-footer">
            <span>
              <span className="small-dot" /> A personal operating space
            </span>
            <span>Built around your day.</span>
          </footer>
        </main>
      </div>

      <dialog
        ref={dialog}
        className="command-dialog"
        aria-labelledby="command-title"
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current.close();
        }}
      >
        <div className="command-dialog-body">
          <div className="dialog-title">
            <h2 id="command-title">
              <Command size={18} />
              Your next action
            </h2>
            <button
              className="icon-button"
              aria-label="Close commands"
              onClick={() => dialog.current?.close()}
            >
              <X size={18} />
            </button>
          </div>
          <label className="command-search">
            <Search size={18} />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find an action…"
              aria-label="Search available actions"
            />
          </label>
          <div className="command-list">
            {commands.map((item) => (
              <button
                disabled={item.disabled}
                key={item.name}
                onClick={item.action}
              >
                <item.icon size={18} />
                {item.name}
                <ArrowRight size={15} />
              </button>
            ))}
            {commands.length === 0 && (
              <p>No matching actions. Try “Study” or “refresh”.</p>
            )}
          </div>
          <div className="command-hint">
            <Check size={13} />
            Only actions available in your local workspace.
          </div>
        </div>
      </dialog>
    </div>
  );
}
