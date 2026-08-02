"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Line, ThemeId } from "@/lib/terminal/types";
import { THEMES } from "@/lib/terminal/types";
import { runCommand } from "@/lib/terminal/commands";
import { getCompletions, applyCompletion } from "@/lib/terminal/completion";
import { loadHistory, persistHistory, pushHistory } from "@/lib/terminal/history";
import { storageGet, storageSet } from "@/lib/terminal/storage";
import registry from "@/lib/terminal/commands";

const MAX_LINES = 500;

export type TerminalLine = { id: number; line: Line };

export function useTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState<ThemeId>("default");
  const historyRef = useRef<string[]>([]);
  const historyIndexRef = useRef<number>(-1);
  const completionRef = useRef<{ candidates: string[]; index: number }>({
    candidates: [],
    index: -1,
  });
  const nextId = useRef(0);
  const autoScroll = useRef(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const appendLines = useCallback((newLines: Line[]) => {
    setLines((prev) => {
      const merged = [
        ...prev,
        ...newLines.map((line) => ({ id: nextId.current++, line })),
      ];
      return merged.length > MAX_LINES ? merged.slice(-MAX_LINES) : merged;
    });
    autoScroll.current = true;
  }, []);

  const clearLines = useCallback(() => {
    setLines([]);
    autoScroll.current = true;
  }, []);

  const changeTheme = useCallback((next: ThemeId) => {
    setTheme(next);
    storageSet("theme", next);
  }, []);

  const cycleTheme = useCallback(() => {
    const idx = THEMES.indexOf(theme);
    changeTheme(THEMES[(idx + 1) % THEMES.length]);
  }, [theme, changeTheme]);

  const execute = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;
      historyRef.current = pushHistory(historyRef.current, trimmed);
      persistHistory(historyRef.current);
      historyIndexRef.current = -1;
      completionRef.current = { candidates: [], index: -1 };

      const ctx = { theme, setTheme: changeTheme };
      const { command, args, result } = runCommand(trimmed, ctx);

      appendLines([
        [
          { text: "visitor@portfolio:~$ ", className: "term-dim" },
          { text: command, className: "term-ok" },
          ...(args.length ? [{ text: " " + args.join(" "), className: "term-ok" as const }] : []),
        ],
      ]);
      if (result.clear) {
        clearLines();
      } else {
        appendLines(result.lines ?? []);
      }
    },
    [theme, changeTheme, appendLines, clearLines],
  );

  const runExternal = useCallback(
    (raw: string) => {
      setInput("");
      execute(raw);
      inputRef.current?.focus();
    },
    [execute],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        execute(input);
        setInput("");
        return;
      }
      if (e.key === "c" && e.ctrlKey) {
        e.preventDefault();
        setInput("");
        appendLines([
          [
            { text: "^C", className: "term-dim" },
          ],
        ]);
        return;
      }
      if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        clearLines();
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        const h = historyRef.current;
        if (h.length === 0) return;
        const next = historyIndexRef.current + 1;
        if (next >= h.length) return;
        historyIndexRef.current = next;
        setInput(h[h.length - 1 - next]);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const h = historyRef.current;
        if (historyIndexRef.current <= -1) return;
        const next = historyIndexRef.current - 1;
        historyIndexRef.current = next;
        setInput(next === -1 ? "" : h[h.length - 1 - next]);
        return;
      }
      if (e.key === "Tab") {
        e.preventDefault();
        const { candidates, prefix } = getCompletions(input, registry);
        if (candidates.length === 0) return;
        const comp = completionRef.current;
        if (comp.index === -1 || prefix !== comp.candidates[comp.index]?.slice(0, prefix.length)) {
          comp.candidates = candidates;
          comp.index = 0;
        } else {
          comp.index = (comp.index + 1) % candidates.length;
        }
        setInput(applyCompletion(input, candidates[comp.index]));
      }
    },
    [input, execute, appendLines, clearLines],
  );

  useEffect(() => {
    historyRef.current = loadHistory();
    setTheme(storageGet<ThemeId>("theme", "default"));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (autoScroll.current) {
      el.scrollTop = el.scrollHeight;
    }
  }, [lines]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
    autoScroll.current = distance < 40;
  }, []);

  const banner = useMemo<Line[]>(
    () => [
      [
        { text: "Hemanathan", className: ["term-bold", "term-magenta"] },
        { text: " — interactive workspace", className: "term-dim" },
      ],
      [
        { text: "Type ", className: "term-dim" },
        { text: "help", className: "term-cmd" },
        { text: " to list commands. Tab to autocomplete, ", className: "term-dim" },
        { text: "↑/↓", className: "term-warn" },
        { text: " for history.", className: "term-dim" },
      ],
      "",
    ],
    [],
  );

  return {
    lines,
    input,
    setInput,
    handleKeyDown,
    scrollRef,
    handleScroll,
    runExternal,
    theme,
    cycleTheme,
    clearLines,
    banner,
    inputRef,
  };
}
