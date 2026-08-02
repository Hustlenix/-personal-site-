import { storageGet, storageSet } from "./storage";

const HISTORY_KEY = "history";
const HISTORY_MAX = 200;

export function loadHistory(): string[] {
  const stored = storageGet<string[]>(HISTORY_KEY, []);
  return Array.isArray(stored) ? stored.filter((s) => typeof s === "string") : [];
}

export function pushHistory(history: string[], entry: string): string[] {
  const trimmed = entry.trim();
  if (!trimmed) return history;
  const next =
    history[history.length - 1] === trimmed
      ? history
      : [...history, trimmed];
  if (next.length > HISTORY_MAX) {
    return next.slice(next.length - HISTORY_MAX);
  }
  return next;
}

export function persistHistory(history: string[]): void {
  storageSet(HISTORY_KEY, history);
}
