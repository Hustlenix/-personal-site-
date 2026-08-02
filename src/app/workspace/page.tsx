import type { Metadata } from "next";
import { TerminalSection } from "@/components/TerminalSection";

export const metadata: Metadata = {
  title: "Workspace",
  description:
    "The interactive terminal: explore the portfolio by typing. Runs entirely in your browser.",
};

export default function WorkspacePage() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6">
      <header className="flex flex-col gap-2">
        <p className="font-mono text-sm" style={{ color: "var(--page-accent)" }}>
          $ ./workspace
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Workspace
        </h1>
        <p style={{ color: "var(--page-muted)" }}>
          A real terminal, rendered in your browser. Type{" "}
          <code
            className="rounded px-1.5 py-0.5 font-mono text-sm"
            style={{ background: "var(--page-line)", color: "var(--page-accent)" }}
          >
            help
          </code>{" "}
          to list commands — Tab autocompletes, ↑/↓ walks history, and{" "}
          <code
            className="rounded px-1.5 py-0.5 font-mono text-sm"
            style={{ background: "var(--page-line)", color: "var(--page-accent)" }}
          >
            theme
          </code>{" "}
          changes the colors.
        </p>
      </header>

      <TerminalSection
        terminalClassName="min-h-[60vh]"
        outputClassName="h-[calc(100vh-20rem)] min-h-[24rem]"
      />
    </main>
  );
}
