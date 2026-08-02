import Link from "next/link";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";

export const metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6">
      <section className="flex min-h-[70vh] flex-col justify-center gap-10 py-16 sm:py-24">
        <div className="flex flex-col gap-5">
          <p
            className="font-mono text-sm"
            style={{ color: "var(--page-accent)" }}
          >
            $ whoami
          </p>
          <h1
            className="text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl"
            style={{ color: "var(--page-fg)" }}
          >
            Hi, I&apos;m{" "}
            <span
              className="bg-gradient-to-r from-[var(--page-accent)] to-[var(--term-cyan)] bg-clip-text text-transparent"
            >
              Hemanathan
            </span>
          </h1>
          <p className="max-w-xl text-lg" style={{ color: "var(--page-muted)" }}>
            I build software across the web, GPU compute, and media
            automation. This site is my interactive workspace — explore the
            pages, or open the terminal and just start typing.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-2">
            {skillCategories.map((cat) => (
              <span
                key={cat.title}
                className="rounded-full border px-3 py-1 text-xs font-medium"
                style={{
                  borderColor: "var(--page-line)",
                  color: "var(--page-muted)",
                }}
              >
                {cat.title}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/workspace"
              className="rounded-lg px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{
                background: "var(--page-accent)",
                color: "#0c0f14",
              }}
            >
              Open the terminal
            </Link>
            <Link
              href="/projects"
              className="rounded-lg border px-4 py-2 text-sm font-semibold transition-colors"
              style={{
                borderColor: "var(--page-line)",
                color: "var(--page-fg)",
              }}
            >
              See projects
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border px-4 py-2 text-sm font-semibold transition-colors"
              style={{
                borderColor: "var(--page-line)",
                color: "var(--page-fg)",
              }}
            >
              Contact
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-label="Featured projects"
        className="grid gap-4 border-t pt-10 pb-16 sm:grid-cols-2"
        style={{ borderColor: "var(--page-line)" }}
      >
        {projects.map((p) => (
          <Link
            key={p.name}
            href="/projects"
            className="group flex flex-col gap-2 rounded-xl border p-5 transition-colors"
            style={{ borderColor: "var(--page-line)" }}
          >
            <div className="flex items-baseline justify-between gap-2">
              <span
                className="font-mono text-lg font-bold group-hover:underline"
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
          </Link>
        ))}
      </section>
    </main>
  );
}
