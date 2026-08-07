import type { CommandRegistry } from "./types";

export type Completion = {
  candidates: string[];
  prefix: string;
};

/**
 * Candidates for the last token of `input`.
 * - First token: command names from the registry.
 * - Later tokens: the command's `complete(token)` hook, when provided.
 * Quoted input is left alone (token surgery would mangle it).
 */
export function getCompletions(
  input: string,
  registry: CommandRegistry,
): Completion {
  const trimmed = input.trim();
  const tokens = trimmed.split(/\s+/).filter(Boolean);
  const lastToken = tokens.at(-1) ?? "";
  if (!lastToken || /["']/.test(trimmed)) {
    return { candidates: [], prefix: lastToken };
  }
  if (tokens.length === 1) {
    const candidates = Object.keys(registry).filter((name) =>
      name.startsWith(lastToken.toLowerCase()),
    );
    return { candidates, prefix: lastToken };
  }
  const cmd = registry[tokens[0].toLowerCase()];
  if (cmd?.complete) {
    const candidates = cmd.complete(lastToken);
    return { candidates, prefix: lastToken };
  }
  return { candidates: [], prefix: lastToken };
}

/** Longest string every candidate starts with. */
export function commonPrefix(strings: string[]): string {
  if (strings.length === 0) return "";
  let prefix = strings[0];
  for (const s of strings.slice(1)) {
    while (!s.startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (!prefix) return "";
    }
  }
  return prefix;
}

/**
 * Replace the last token of `input` with `match`.
 * `addSpace` appends a trailing space — the caller decides (unique match,
 * complete command name, or the token was already a full word).
 */
export function applyCompletion(
  input: string,
  match: string,
  addSpace = false,
): string {
  const tokens = input.trim().split(/\s+/);
  if (tokens.length === 0) return match + (addSpace ? " " : "");
  tokens[tokens.length - 1] = match;
  return tokens.join(" ") + (addSpace ? " " : "");
}
