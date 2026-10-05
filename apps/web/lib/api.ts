export type Study = {
  course: string;
  subject: string;
  current_topic: string;
  completed: number;
  total: number;
  progress: number;
  last_activity: string;
  source: string;
  external_id: string;
  synced_at: string;
};

export type StudyResponse = { study: Study };
export type SyncResponse = StudyResponse & { changed: boolean };

export async function request<T>(path: string, method = "GET"): Promise<T> {
  let response: Response;
  try {
    response = await fetch(path, {
      method,
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
  } catch {
    throw new Error(
      "Cannot reach ALLVERRA ROOM. Check that the local backend is running, then try again.",
    );
  }
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(
      typeof body?.detail === "string"
        ? body.detail
        : "ALLVERRA ROOM is unavailable. Your saved progress is safe; try again.",
    );
  }
  return response.json() as Promise<T>;
}
