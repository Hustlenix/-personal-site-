"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Line, ThemeId } from "@/lib/terminal/types";
import { THEMES } from "@/lib/terminal/types";
import { runCommand, WELCOME_LINES } from "@/lib/terminal/commands";
import {
  getCompletions,
  applyCompletion,
  commonPrefix,
} from "@/lib/terminal/completion";
import { loadHistory, persistHistory, pushHistory } from "@/lib/terminal/history";
import { storageGet, storageSet } from "@/lib/terminal/storage";
import registry from "@/lib/terminal/commands";

const MAX_LINES = 500;
const STREAM_MS = 14;

export type TerminalLine = { id: number; line: Line };

type CompletionState = { candidates: string[]; prefix: string; index: number };
type StreamState = { timer: number | null; queue: Line[] };

export function useTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState<ThemeId>("default");
  const historyRef = useRef<string[]>([]);
  const historyIndexRef = useRef<number>(-1);
  const draftRef = useRef<string | null>(null);
  const completionRef = useRef<CompletionState>({
    candidates: [],
    prefix: "",
    index: -1,
  });
  const streamRef = useRef<StreamState>({ timer: null, queue: [] });
  const nextId = useRef(0);
  const autoScroll = useRef(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const reducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches,
    [],
  );

  const appendLines = useCallback((newLines: Line[]) => {
    const items = newLines.map((line) => ({ id: nextId.current++, line }));
    setLines((prev) => {
      const merged = [...prev, ...items];
      return merged.length > MAX_LINES ? merged.slice(-MAX_LINES) : merged;
    });
  }, []);

  const clearLines = useCallback(() => {
    setLines([]);
    autoScroll.current = true;
  }, []);

  const cancelStream = useCallback(() => {
    const s = streamRef.current;
    if (s.timer !== null) {
      clearTimeout(s.timer);
      s.timer = null;
    }
    s.queue = [];
  }, []);

  /** Append output with a fast per-line stream; instant for reduced motion. */
  const streamLines = useCallback(
    (newLines: Line[]) => {
      if (reducedMotion || newLines.length <= 1) {
        appendLines(newLines);
        return;
      }
      const s = streamRef.current;
      s.queue = [...newLines];
      const tick = () => {
        const next = s.queue.shift();
        if (next === undefined) {
          s.timer = null;
          return;
        }
        appendLines([next]);
        s.timer = window.setTimeout(tick, STREAM_MS);
      };
      tick();
    },
    [reducedMotion, appendLines],
  );

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
      draftRef.current = null;
      completionRef.current = { candidates: [], prefix: "", index: -1 };
      cancelStream();

      const ctx = {
        theme,
        setTheme: changeTheme,
        getHistory: () => historyRef.current,
      };
      const { command, args, result } = runCommand(trimmed, ctx);

      appendLines([
        [
          { text: "visitor@portfolio:~$ ", className: "term-dim" },
          { text: command, className: "term-ok" },
          ...(args.length
            ? [{ text: " " + args.join(" "), className: "term-ok" as const }]
            : []),
        ],
      ]);
      if (result.clear) {
        clearLines();
      } else {
        streamLines(result.lines ?? []);
      }
    },
    [theme, changeTheme, appendLines, clearLines, cancelStream, streamLines],
  );

  const runExternal = useCallback(
    (raw: string) => {
      setInput("");
      execute(raw);
      inputRef.current?.focus();
    },
    [execute],
  );

  /** Typing handler: updates input and resets history/completion navigation. */
  const handleInput = useCallback((value: string) => {
    setInput(value);
    historyIndexRef.current = -1;
    draftRef.current = null;
    completionRef.current = { candidates: [], prefix: "", index: -1 };
  }, []);

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
        cancelStream();
        setInput("");
        appendLines([[{ text: "^C", className: "term-dim" }]]);
        return;
      }
      if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        cancelStream();
        clearLines();
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        const h = historyRef.current;
        if (h.length === 0) return;
        if (historyIndexRef.current === -1) {
          draftRef.current = input;
        }
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
        setInput(
          next === -1 ? (draftRef.current ?? "") : h[h.length - 1 - next],
        );
        return;
      }
      if (e.key === "Tab") {
        e.preventDefault();
        const { candidates, prefix } = getCompletions(input, registry);
        if (candidates.length === 0) return;
        const comp = completionRef.current;
        const sameSet =
          comp.prefix === prefix &&
          comp.candidates.length === candidates.length &&
          candidates.every((c, i) => c === comp.candidates[i]);
        if (!sameSet) {
          comp.candidates = candidates;
          comp.prefix = prefix;
          comp.index = -1;
        }
        if (comp.index === -1) {
          const fill = commonPrefix(candidates);
          if (fill.length > prefix.length) {
            setInput(applyCompletion(input, fill));
            return;
          }
          comp.index = 0;
        } else {
          comp.index = (comp.index + 1) % candidates.length;
        }
        const match = candidates[comp.index];
        const isCommand = Object.prototype.hasOwnProperty.call(
          registry,
          match,
        );
        const addSpace =
          candidates.length === 1 || match === prefix || isCommand;
        setInput(applyCompletion(input, match, addSpace));
      }
    },
    [input, execute, appendLines, cancelStream, clearLines],
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

  useEffect(() => {
    const s = streamRef.current;
    return () => {
      if (s.timer !== null) clearTimeout(s.timer);
    };
  }, []);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
    autoScroll.current = distance < 40;
  }, []);

  return {
    lines,
    input,
    handleInput,
    handleKeyDown,
    scrollRef,
    handleScroll,
    runExternal,
    theme,
    cycleTheme,
    clearLines,
    banner: WELCOME_LINES,
    inputRef,
  };
}
