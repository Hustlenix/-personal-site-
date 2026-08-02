import type { Metadata } from "next";
import Link from "next/link";
import { skillCategories } from "@/data/skills";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Hemanathan: what I build, the tools I use, and how this site works.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <header className="mb-10 flex flex-col gap-3">
        <p className="font-mono text-sm" style={{ color: "var(--page-accent)" }}>
          $ cat README.md
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          About
        </h1>
      </header>

      <section className="flex flex-col gap-8">
        <div className="flex max-w-2xl flex-col gap-4">
          <p className="text-lg" style={{ color: "var(--page-fg)" }}>
            I&apos;m Hemanathan, a developer working across the web, GPU
            compute, and media automation.
          </p>
          <p style={{ color: "var(--page-muted)" }}>
            The web work spans TypeScript, React, and Next.js — including
            static-export sites and interactive interfaces. On the compute
            side I work with Python, C, and GPU tooling. In media, I automate
            workflows around DaVinci Resolve and video processing.
          </p>
          <p style={{ color: "var(--page-muted)" }}>
            This site is built with Next.js and TypeScript. The centerpiece is
            a fully client-side terminal — every command runs in your browser,
            with history, autocomplete, themes, and a virtual filesystem.{" "}
            <Link
              href="/workspace"
              className="font-medium underline underline-offset-4"
              style={{ color: "var(--page-accent)" }}
            >
              Try it →
            </Link>
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className="rounded-xl border p-5"
              style={{ borderColor: "var(--page-line)" }}
            >
              <h2
                className="mb-3 text-sm font-bold uppercase tracking-wider"
                style={{ color: "var(--page-accent)" }}
              >
                {cat.title}
              </h2>
              <ul className="flex flex-col gap-1.5">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-sm"
                    style={{ color: "var(--page-muted)" }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
