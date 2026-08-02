import { THEMES } from "@/lib/terminal/types";

type Props = {
  theme: string;
  cycleTheme: () => void;
  onClear: () => void;
};

export function TerminalToolbar({ theme, cycleTheme, onClear }: Props) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-2.5"
      style={{
        background: "var(--term-titlebar)",
        borderBottom: "1px solid var(--term-line)",
      }}
    >
      <div className="flex gap-1.5" aria-hidden="true">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
      </div>
      <span
        className="flex-1 truncate text-center text-xs font-medium tracking-wide"
        style={{ color: "var(--term-title-fg)" }}
      >
        visitor@portfolio — {THEMES.indexOf(theme as (typeof THEMES)[number]) !== -1 ? theme : "default"} theme
      </span>
      <div className="flex gap-1">
        <button
          type="button"
          onClick={cycleTheme}
          title="Cycle theme"
          className="rounded px-2 py-0.5 text-xs font-medium transition-colors hover:opacity-100"
          style={{ color: "var(--term-title-fg)" }}
        >
          theme
        </button>
        <button
          type="button"
          onClick={onClear}
          title="Clear screen"
          className="rounded px-2 py-0.5 text-xs font-medium transition-colors hover:opacity-100"
          style={{ color: "var(--term-title-fg)" }}
        >
          clear
        </button>
      </div>
    </div>
  );
}
