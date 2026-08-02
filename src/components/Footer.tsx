import { contactInfo } from "@/data/site";

export function Footer() {
  return (
    <footer
      className="mt-auto border-t"
      style={{ borderColor: "var(--page-line)" }}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm sm:flex-row sm:px-6">
        <span style={{ color: "var(--page-muted)" }}>
          Built with Next.js, React, TypeScript, and Tailwind. The terminal
          runs entirely in your browser.
        </span>
        <a
          href={contactInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm font-medium"
          style={{ color: "var(--page-accent)" }}
        >
          @{contactInfo.githubHandle}
        </a>
      </div>
    </footer>
  );
}
