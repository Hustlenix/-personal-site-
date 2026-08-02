import type { Line, Segment } from "@/lib/terminal/types";

export function TerminalLine({ line }: { line: Line }) {
  const segments: Segment[] =
    typeof line === "string" ? [{ text: line }] : line;
  if (segments.length === 0) return <div className="min-h-[1.5em]" />;
  return (
    <div className="min-h-[1.5em] break-words whitespace-pre-wrap">
      {segments.map((seg, i) => {
        const className = Array.isArray(seg.className)
          ? seg.className.join(" ")
          : (seg.className ?? "");
        if (seg.href) {
          return (
            <a
              key={i}
              href={seg.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {seg.text}
            </a>
          );
        }
        return (
          <span key={i} className={className}>
            {seg.text}
          </span>
        );
      })}
    </div>
  );
}
