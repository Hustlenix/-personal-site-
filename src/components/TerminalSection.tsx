"use client";

import { useRef } from "react";
import { Terminal } from "./terminal/Terminal";

const quickCommands = ["help", "projects", "skills", "theme dracula"];

export function TerminalSection({
  terminalClassName,
  outputClassName,
}: {
  terminalClassName?: string;
  outputClassName?: string;
}) {
  const terminalRef = useRef<{
    runExternal: (raw: string) => void;
  }>(null);

  return (
    <section aria-label="Interactive terminal" className="w-full">
      <Terminal
        apiRef={terminalRef}
        terminalClassName={terminalClassName}
        outputClassName={outputClassName}
      />
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span
          className="text-xs uppercase tracking-widest"
          style={{ color: "var(--page-muted)" }}
        >
          Try:
        </span>
        {quickCommands.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => terminalRef.current?.runExternal(cmd)}
            className="rounded-full border px-3 py-1 font-mono text-xs font-medium transition-colors"
            style={{
              borderColor: "var(--page-line)",
              color: "var(--page-fg)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--page-accent)";
              e.currentTarget.style.color = "var(--page-accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--page-line)";
              e.currentTarget.style.color = "var(--page-fg)";
            }}
          >
            {cmd}
          </button>
        ))}
      </div>
    </section>
  );
}
