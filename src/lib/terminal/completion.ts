import type { CommandRegistry } from "./types";

export type Completion = {
  candidates: string[];
  prefix: string;
};

export function getCompletions(
  input: string,
  registry: CommandRegistry,
): Completion {
  const lastToken = input.split(/\s+/).filter(Boolean).at(-1) ?? "";
  const candidates = Object.keys(registry).filter((name) =>
    name.startsWith(lastToken),
  );
  return { candidates, prefix: lastToken };
}

export function applyCompletion(input: string, match: string): string {
  const tokens = input.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return match;
  tokens[tokens.length - 1] = match;
  return tokens.join(" ");
}
