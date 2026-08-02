export function parseInput(input: string): string[] {
  const trimmed = input.trim();
  if (!trimmed) return [];

  const args: string[] = [];
  let current = "";
  let inQuote: '"' | "'" | null = null;

  for (let i = 0; i < trimmed.length; i++) {
    const ch = trimmed[i];
    if (inQuote) {
      if (ch === inQuote) {
        inQuote = null;
      } else {
        current += ch;
      }
      continue;
    }
    if (ch === '"' || ch === "'") {
      inQuote = ch;
      continue;
    }
    if (ch === "\\") {
      const next = trimmed[i + 1];
      if (next !== undefined) {
        current += next;
        i++;
      }
      continue;
    }
    if (/\s/.test(ch)) {
      if (current) {
        args.push(current);
        current = "";
      }
      continue;
    }
    current += ch;
  }

  if (current) args.push(current);
  if (inQuote) args.push(current);

  return args;
}
