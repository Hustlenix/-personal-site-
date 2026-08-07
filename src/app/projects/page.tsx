import type { Metadata } from "next";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Lalith: an ocean-protection concept site and this interactive portfolio workspace.",
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <header className="mb-10 flex flex-col gap-3">
        <p className="font-mono text-sm" style={{ color: "var(--page-accent)" }}>
          $ ls projects/
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Projects
        </h1>
        <p className="max-w-2xl" style={{ color: "var(--page-muted)" }}>
          Things I have built. Everything is honest: no invented metrics, no
          fictional teams — source code is linked on each card.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <article
            key={p.name}
            className="flex flex-col gap-3 rounded-xl border p-6"
            style={{ borderColor: "var(--page-line)" }}
          >
            <div className="flex items-baseline justify-between gap-2">
              <h2
                className="font-mono text-xl font-bold"
                style={{ color: "var(--page-accent)" }}
              >
                {p.name}
              </h2>
              <span
                className="flex items-center gap-1.5 text-xs uppercase tracking-wider"
                style={{ color: "var(--page-muted)" }}
              >
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{
                    background:
                      p.status === "live" ? "var(--page-accent)" : "var(--term-warn)",
                  }}
                />
                {p.status}
              </span>
            </div>
            <p className="text-sm font-semibold" style={{ color: "var(--page-fg)" }}>
              {p.tagline}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--page-muted)" }}>
              {p.description}
            </p>
            <div className="mt-auto flex flex-wrap gap-2 pt-2">
              {p.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border px-2.5 py-0.5 font-mono text-xs"
                  style={{
                    borderColor: "var(--page-line)",
                    color: "var(--page-muted)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-sm font-semibold underline underline-offset-4"
              style={{ color: "var(--page-accent)" }}
            >
              View source →
            </a>
          </article>
        ))}
      </div>
    </main>
  );
}
