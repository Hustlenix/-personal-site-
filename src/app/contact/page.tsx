import type { Metadata } from "next";
import Link from "next/link";
import { contactInfo } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Ways to reach Hemanathan: GitHub, email, and the interactive terminal.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <header className="mb-10 flex flex-col gap-3">
        <p className="font-mono text-sm" style={{ color: "var(--page-accent)" }}>
          $ cat contact.txt
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Contact
        </h1>
      </header>

      <div className="grid max-w-3xl gap-4">
        <a
          href={contactInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col gap-1 rounded-xl border p-5 transition-colors"
          style={{ borderColor: "var(--page-line)" }}
        >
          <span
            className="text-sm font-bold uppercase tracking-wider"
            style={{ color: "var(--page-accent)" }}
          >
            GitHub
          </span>
          <span className="font-mono text-lg" style={{ color: "var(--page-fg)" }}>
            {contactInfo.githubHandle}
          </span>
          <span style={{ color: "var(--page-muted)" }}>
            Code, experiments, and this site&apos;s source.
          </span>
        </a>

        {contactInfo.email && (
          <a
            href={`mailto:${contactInfo.email}`}
            className="flex flex-col gap-1 rounded-xl border p-5"
            style={{ borderColor: "var(--page-line)" }}
          >
            <span
              className="text-sm font-bold uppercase tracking-wider"
              style={{ color: "var(--page-accent)" }}
            >
              Email
            </span>
            <span className="font-mono text-lg" style={{ color: "var(--page-fg)" }}>
              {contactInfo.email}
            </span>
          </a>
        )}

        <div
          className="flex flex-col gap-1 rounded-xl border border-dashed p-5"
          style={{ borderColor: "var(--page-line)" }}
        >
          <span
            className="text-sm font-bold uppercase tracking-wider"
            style={{ color: "var(--term-warn)" }}
          >
            More ways
          </span>
          <span style={{ color: "var(--page-muted)" }}>
            Email and location coming soon — or reach me through the{" "}
            <Link
              href="/workspace"
              className="font-medium underline underline-offset-4"
              style={{ color: "var(--page-accent)" }}
            >
              terminal
            </Link>
            .
          </span>
        </div>
      </div>
    </main>
  );
}
