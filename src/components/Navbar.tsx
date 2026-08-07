"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/site";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className="sticky top-0 z-50 border-b"
      style={{
        background: "color-mix(in srgb, var(--page-bg) 85%, transparent)",
        borderColor: "var(--page-line)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight"
          style={{ color: "var(--page-accent)" }}
        >
          ~/lalith
        </Link>
        <div className="flex flex-wrap items-center gap-1">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className="rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors"
                style={{
                  color: active ? "var(--page-accent)" : "var(--page-muted)",
                  background: active
                    ? "color-mix(in srgb, var(--page-accent) 12%, transparent)"
                    : "transparent",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
