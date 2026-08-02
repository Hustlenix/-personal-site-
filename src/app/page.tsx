import type { Metadata } from "next";
import { TerminalSection } from "@/components/TerminalSection";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Hemanathan — Developer",
};

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-16 px-4 py-12 sm:px-6 sm:py-16">
      <header className="flex flex-col gap-4">
        <p
          className="text-sm font-semibold uppercase tracking-widest"
          style={{ color: "var(--page-accent)" }}
        >
          Hemanathan
        </p>
        <h1
          className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl"
          style={{ color: "var(--page-fg)" }}
        >
          I build software across the web, GPU compute, and media automation.
        </h1>
        <p className="max-w-2xl text-lg" style={{ color: "var(--page-muted)" }}>
          This site is my interactive workspace. Everything below is a real
          terminal — type{" "}
          <code
            className="rounded px-1 py-0.5 text-sm"
            style={{ background: "var(--page-line)", color: "var(--page-accent)" }}
          >
            help
          </code>{" "}
          to explore, or click a quick command.
        </p>
      </header>

      <TerminalSection />

      <section aria-label="Projects" className="flex flex-col gap-4">
        <h2
          className="text-xl font-bold"
          style={{ color: "var(--page-fg)" }}
        >
          Projects
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-2 rounded-xl border p-5 transition-colors"
              style={{ borderColor: "var(--page-line)" }}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span
                  className="text-lg font-bold group-hover:underline"
                  style={{ color: "var(--page-accent)" }}
                >
                  {p.name}
                </span>
                <span
                  className="text-xs uppercase tracking-wider"
                  style={{ color: "var(--page-muted)" }}
                >
                  {p.status}
                </span>
              </div>
              <span className="text-sm font-medium" style={{ color: "var(--page-fg)" }}>
                {p.tagline}
              </span>
              <span className="text-sm" style={{ color: "var(--page-muted)" }}>
                {p.description}
              </span>
              <span
                className="mt-1 text-xs"
                style={{ color: "var(--page-muted)" }}
              >
                {p.stack.join(" · ")}
              </span>
            </a>
          ))}
        </div>
      </section>

      <footer
        className="flex flex-col gap-2 border-t pt-6 text-sm"
        style={{ borderColor: "var(--page-line)", color: "var(--page-muted)" }}
      >
        <span>
          Built with Next.js, React, TypeScript, and Tailwind. The terminal
          runs entirely in your browser.
        </span>
        <span>
          <a
            href="https://github.com/Hustlenix"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--page-accent)" }}
          >
            GitHub
          </a>
          {" · "}
          <a
            href="https://github.com/Hustlenix/-personal-site-"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--page-accent)" }}
          >
            Source
          </a>
        </span>
      </footer>
    </main>
  );
}
