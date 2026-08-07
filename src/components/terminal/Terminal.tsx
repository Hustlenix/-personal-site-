"use client";

import { useEffect } from "react";
import { TerminalLine } from "./TerminalLine";
import { TerminalToolbar } from "./TerminalToolbar";
import { useTerminal } from "@/hooks/useTerminal";

type TerminalApi = {
  runExternal: (raw: string) => void;
};

export function Terminal({
  apiRef,
  terminalClassName,
  outputClassName = "h-[420px]",
}: {
  apiRef?: React.RefObject<TerminalApi | null>;
  terminalClassName?: string;
  outputClassName?: string;
}) {
  const t = useTerminal();
  const { inputRef, runExternal } = t;

  useEffect(() => {
    if (apiRef) {
      apiRef.current = { runExternal };
    }
  }, [apiRef, runExternal]);

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) {
      inputRef.current?.focus();
    }
  }, [inputRef]);

  return (
    <div
      className={`terminal term-glow relative overflow-hidden rounded-xl ${terminalClassName ?? ""}`}
      data-theme={t.theme}
      onClick={() => t.inputRef.current?.focus()}
    >
      <TerminalToolbar
        theme={t.theme}
        cycleTheme={t.cycleTheme}
        onClear={t.clearLines}
      />
      <div
        ref={t.scrollRef}
        onScroll={t.handleScroll}
        role="log"
        aria-label="Terminal output"
        className={`term-output overflow-y-auto px-4 py-3 text-[13px] leading-relaxed sm:text-sm ${outputClassName}`}
        style={{
          background: "var(--term-bg)",
          color: "var(--term-fg)",
          fontFamily: "var(--term-font)",
        }}
      >
        {t.banner.map((line, i) => (
          <TerminalLine key={`banner-${i}`} line={line} />
        ))}
        {t.lines.map((entry) => (
          <TerminalLine key={entry.id} line={entry.line} />
        ))}
        <div className="flex items-center gap-1 pb-2">
          <span style={{ color: "var(--term-dim)" }}>
            visitor@portfolio:~$
          </span>
          <span style={{ color: "var(--term-ok)" }}>{t.input}</span>
          <span className="term-caret" aria-hidden="true" />
        </div>
      </div>
      <input
        ref={t.inputRef}
        type="text"
        value={t.input}
        onChange={(e) => t.handleInput(e.target.value)}
        onKeyDown={t.handleKeyDown}
        aria-label="Terminal input"
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        className="absolute left-0 top-0 h-px w-px opacity-0 focus:outline-none"
      />
    </div>
  );
}
