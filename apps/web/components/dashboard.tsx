"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  HeartPulse,
  House,
  Layers3,
  LoaderCircle,
  RefreshCw,
  Search,
  Settings2,
  X,
} from "lucide-react";
import {
  request,
  type Study,
  type StudyResponse,
  type SyncResponse,
} from "../lib/api";

function DomainDoorway({
  label,
  href,
  onNavigate,
}: {
  label: string;
  href?: string;
  onNavigate?: () => void;
}) {
  const content = (
    <>
      {label} <ArrowRight size={13} aria-hidden="true" />
    </>
  );
  return href ? (
    <a className="domain-doorway" href={href} onClick={onNavigate}>
      {content}
    </a>
  ) : (
    <span className="domain-doorway">{content}</span>
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
  const commandsDialog = useRef<HTMLDialogElement>(null);
  const settingsDialog = useRef<HTMLDialogElement>(null);
  const inFlight = useRef(false);

  const load = useCallback(async () => {
    if (inFlight.current) return;
    inFlight.current = true;
    setLoading(true);
    setError("");
    setNotice("");
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
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 4000);
    return () => clearTimeout(timer);
  }, [notice]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (settingsDialog.current?.open) return;
        if (commandsDialog.current?.open) commandsDialog.current.close();
        else {
          setQuery("");
          commandsDialog.current?.showModal();
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
      setNotice(result.changed ? "Updated" : "Up to date");
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Could not sync Study.",
      );
      // Keep source failures distinct from backend connectivity in Settings.
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
    commandsDialog.current?.close();
    document.getElementById(id)?.focus();
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "auto", block: "center" });
  }

  function openSettings() {
    commandsDialog.current?.close();
    settingsDialog.current?.showModal();
  }

  const greeting = !clock
    ? "Hello."
    : clock.getHours() < 12
      ? "Good morning."
      : clock.getHours() < 18
        ? "Good afternoon."
        : "Good evening.";
  const busy = loading || syncing;
  const weekDays = clock
    ? Array.from({ length: 7 }, (_, index) => {
        const day = new Date(clock);
        day.setHours(12, 0, 0, 0);
        day.setDate(day.getDate() - ((day.getDay() + 6) % 7) + index);
        return day;
      })
    : [];
  const lastActivity = study ? new Date(study.last_activity) : null;
  const isKnownStudyDay = (day: Date) =>
    lastActivity !== null &&
    lastActivity.getFullYear() === day.getFullYear() &&
    lastActivity.getMonth() === day.getMonth() &&
    lastActivity.getDate() === day.getDate();
  const weekLabel =
    weekDays.length === 7
      ? `${weekDays[0].toLocaleDateString(undefined, { month: "short", day: "numeric" })} — ${weekDays[6].toLocaleDateString(undefined, { month: "short", day: "numeric" })}`
      : "Current week";
  const commands = [
    {
      name: "Home",
      action: () => goTo("overview"),
      icon: House,
      disabled: false,
    },
    {
      name: "Study",
      action: () => goTo("study"),
      icon: BookOpen,
      disabled: false,
    },
    {
      name: "Sync Study",
      action: () => {
        commandsDialog.current?.close();
        void sync();
      },
      icon: RefreshCw,
      disabled: busy,
    },
    {
      name: "Settings",
      action: openSettings,
      icon: Settings2,
      disabled: false,
    },
  ].filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="app-shell">
      <a className="skip-link" href="#overview">
        Skip to Home
      </a>
      <aside className="navigation-rail">
        <a href="#overview" className="brand-mark" aria-label="KRAVV OS Home">
          <Layers3 size={27} strokeWidth={1.5} />
        </a>
        <nav aria-label="Main navigation">
          <a
            href="#overview"
            className="rail-link selected"
            aria-label="Home"
            title="Home"
          >
            <House size={21} strokeWidth={1.6} />
            <span>Home</span>
          </a>
          <a
            href="#study"
            className="rail-link"
            aria-label="Study"
            title="Study"
          >
            <BookOpen size={21} strokeWidth={1.6} />
            <span>Study</span>
          </a>
        </nav>
        <button
          className="rail-link settings-link"
          aria-label="Open Settings"
          title="Settings"
          onClick={openSettings}
        >
          <Settings2 size={21} strokeWidth={1.6} />
          <span>Settings</span>
        </button>
      </aside>

      <div className="home-workspace">
        <div className="home-wallpaper" aria-hidden="true">
          <Image
            src="/images/blue-hour.png"
            alt=""
            fill
            sizes="(max-width: 600px) 100vw, calc(100vw - 88px)"
            preload
          />
        </div>
        <header className="topbar">
          <a href="#overview" className="wordmark" aria-label="KRAVV OS Home">
            KRAVV<span>OS</span>
          </a>
          <button
            className="command-trigger"
            aria-label="Open commands"
            title="Commands (Ctrl K)"
            onClick={() => {
              setQuery("");
              commandsDialog.current?.showModal();
            }}
          >
            <Search size={18} />
            <kbd>Ctrl K</kbd>
          </button>
        </header>
        <main id="overview" tabIndex={-1}>
          <div className="home-now">
            <section className="greeting" aria-labelledby="greeting-title">
              <p className="date-line">
                {clock?.toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                }) ?? "Today"}
              </p>
              <h1 id="greeting-title">{greeting}</h1>
            </section>
            <section
              id="study"
              className="home-highlight"
              tabIndex={-1}
              aria-labelledby="study-heading"
              aria-busy={busy}
            >
              <div className="highlight-heading">
                <h2 id="study-heading">
                  <BookOpen size={15} strokeWidth={1.6} />
                  Study
                </h2>
                <button
                  className="sync-button"
                  aria-label="Sync Study data"
                  title={syncing ? "Syncing Study" : "Sync Study"}
                  onClick={() => void sync()}
                  disabled={busy}
                >
                  <RefreshCw size={15} className={syncing ? "spin" : ""} />
                </button>
              </div>
              {study ? (
                <>
                  <div className="highlight-summary">
                    <h3>{study.course}</h3>
                    <p>{study.current_topic}</p>
                  </div>
                  <div className="highlight-progress">
                    <div
                      className="progress-track"
                      role="progressbar"
                      aria-label="Study completion"
                      aria-valuenow={study.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuetext={`${study.completed} of ${study.total} topics, ${study.progress}%`}
                    >
                      <span style={{ width: `${study.progress}%` }} />
                    </div>
                    <span data-testid="study-progress">{study.progress}%</span>
                    <span className="sr-only">
                      <span data-testid="study-completed">
                        {study.completed} / {study.total}
                      </span>{" "}
                      topics
                    </span>
                  </div>
                </>
              ) : (
                <div className="study-empty">
                  {loading ? (
                    <>
                      <LoaderCircle size={22} className="spin" />
                      <span>Loading Study…</span>
                    </>
                  ) : (
                    <>
                      <p>Study unavailable</p>
                      <button
                        className="text-button"
                        onClick={() => void load()}
                      >
                        Try again
                      </button>
                    </>
                  )}
                </div>
              )}
              <div
                className={`study-feedback ${error ? "has-error" : ""}`}
                role={error ? "alert" : "status"}
                aria-live="polite"
              >
                {error ? (
                  <>
                    <span>
                      {study
                        ? "Couldn’t sync. Try again."
                        : "Couldn’t load Study."}
                    </span>
                    <button className="text-button" onClick={openSettings}>
                      Details
                    </button>
                  </>
                ) : notice ? (
                  <>
                    <Check size={13} />
                    <span>{notice}</span>
                  </>
                ) : null}
              </div>
            </section>
          </div>
          <section className="home-week" aria-labelledby="week-heading">
            <header className="week-heading">
              <h2 id="week-heading">This week</h2>
              <p>{weekLabel}</p>
            </header>
            <div className="week-composition">
              <section
                className="week-study has-doorway"
                aria-labelledby="week-study-heading"
              >
                <div className="week-domain-heading">
                  <BookOpen size={16} strokeWidth={1.6} />
                  <h3 id="week-study-heading">Study</h3>
                </div>
                <div
                  className="study-week-days"
                  aria-label="Recorded Study activity this week"
                >
                  {weekDays.map((day) => (
                    <div className="study-week-day" key={day.toISOString()}>
                      <span className="weekday-label">
                        {day.toLocaleDateString(undefined, {
                          weekday: "short",
                        })}
                      </span>
                      <span
                        className={`study-day-mark ${isKnownStudyDay(day) ? "recorded" : ""}`}
                        role="img"
                        aria-label={`${day.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}: ${isKnownStudyDay(day) ? "recorded activity" : "activity not recorded"}`}
                      />
                    </div>
                  ))}
                </div>
                <p className="week-key">
                  <span /> Known activity · other days unrecorded
                </p>
                {study && (
                  <div className="week-study-detail">
                    <div className="week-study-detail-copy">
                      <span>Overall course progress</span>
                      <strong>
                        {study.completed}
                        <span> / {study.total}</span>
                      </strong>
                    </div>
                    <div className="week-study-detail-track" aria-hidden="true">
                      <span style={{ width: `${study.progress}%` }} />
                    </div>
                  </div>
                )}
                <DomainDoorway
                  label="Open study"
                  href="#study"
                  onNavigate={() => goTo("study")}
                />
              </section>
              <div className="week-secondary">
                <section
                  className="week-health"
                  aria-labelledby="week-health-heading"
                >
                  <div className="week-domain-heading">
                    <HeartPulse size={16} strokeWidth={1.6} />
                    <h3 id="week-health-heading">Movement</h3>
                  </div>
                  <div
                    className="movement-week"
                    role="img"
                    aria-label="Movement data unavailable for this week"
                  >
                    {weekDays.map((day) => (
                      <span key={day.toISOString()} className="movement-day">
                        <span className="movement-mark" />
                        <span className="movement-label">
                          {day.toLocaleDateString(undefined, {
                            weekday: "narrow",
                          })}
                        </span>
                      </span>
                    ))}
                  </div>
                  <p className="week-unavailable">No movement data</p>
                  <DomainDoorway label="Open movement" />
                </section>
                <section
                  className="week-context"
                  aria-labelledby="week-context-heading"
                >
                  <div className="week-domain-heading">
                    <CalendarDays size={16} strokeWidth={1.6} />
                    <h3 id="week-context-heading">Context</h3>
                  </div>
                  <div
                    className="context-week"
                    role="img"
                    aria-label="Event data unavailable for this week"
                  >
                    {weekDays.map((day) => (
                      <span key={day.toISOString()} className="context-day">
                        <span className="context-day-dot" />
                        <span>
                          {day.toLocaleDateString(undefined, {
                            weekday: "narrow",
                          })}
                        </span>
                      </span>
                    ))}
                  </div>
                  <p className="week-unavailable">No events data</p>
                  <DomainDoorway label="Open context" />
                </section>
              </div>
            </div>
          </section>
        </main>
      </div>

      <dialog
        ref={commandsDialog}
        className="workspace-dialog commands-dialog"
        aria-labelledby="commands-title"
        onClick={(event) => {
          if (event.target === commandsDialog.current)
            commandsDialog.current.close();
        }}
      >
        <div className="dialog-content">
          <div className="dialog-heading">
            <h2 id="commands-title">Commands</h2>
            <button
              className="icon-button"
              aria-label="Close commands"
              onClick={() => commandsDialog.current?.close()}
            >
              <X size={19} />
            </button>
          </div>
          <label className="command-search">
            <Search size={18} />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find an action"
              aria-label="Search commands"
            />
          </label>
          <div className="command-list">
            {commands.map((item) => (
              <button
                key={item.name}
                disabled={item.disabled}
                onClick={item.action}
              >
                <item.icon size={18} />
                {item.name}
                <ArrowRight size={15} />
              </button>
            ))}
            {commands.length === 0 && <p>No matching actions.</p>}
          </div>
        </div>
      </dialog>
      <dialog
        ref={settingsDialog}
        className="workspace-dialog settings-dialog"
        aria-labelledby="settings-title"
        onClick={(event) => {
          if (event.target === settingsDialog.current)
            settingsDialog.current.close();
        }}
      >
        <div className="dialog-content">
          <div className="dialog-heading">
            <h2 id="settings-title">Settings</h2>
            <button
              autoFocus
              className="icon-button"
              aria-label="Close Settings"
              onClick={() => settingsDialog.current?.close()}
            >
              <X size={19} />
            </button>
          </div>
          <h3 className="settings-section-title">Connections</h3>
          <dl className="settings-details">
            <div>
              <dt>Local backend</dt>
              <dd>
                {loading
                  ? "Checking…"
                  : connected
                    ? "Connected"
                    : "Unavailable"}
              </dd>
            </div>
            <div>
              <dt>Study source</dt>
              <dd>{study?.source ?? "Unavailable"}</dd>
            </div>
            <div>
              <dt>Last sync</dt>
              <dd>
                {study ? new Date(study.synced_at).toLocaleString() : "—"}
              </dd>
            </div>
            <div>
              <dt>Health</dt>
              <dd>Not connected</dd>
            </div>
            <div>
              <dt>Events</dt>
              <dd>Not connected</dd>
            </div>
            <div>
              <dt>AI</dt>
              <dd>Not connected</dd>
            </div>
          </dl>
          {error && (
            <p className="settings-error" role="alert">
              {error}
            </p>
          )}
          <div className="settings-footer">
            <span>KRAVV OS · V0.1</span>
            <button
              className="text-button"
              disabled={busy}
              onClick={() => void load()}
            >
              <RefreshCw size={14} />
              Refresh
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
