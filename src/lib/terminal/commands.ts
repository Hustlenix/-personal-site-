import type { CommandContext, CommandRegistry, CommandResult, Line } from "./types";
import { THEMES } from "./types";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { contactInfo } from "@/data/site";

const fs: Record<string, { description: string; content: () => Line[] }> = {
  "README.md": {
    description: "Who built this workspace, and why.",
    content: () => [
      [{ text: "README.md — this workspace", className: "term-bold" }],
      "",
      "An interactive portfolio built as a developer workspace.",
      "Everything runs in the browser; no shell, no server — just React.",
      [
        { text: "See also: ", className: "term-dim" },
        { text: "about", className: "term-cmd" },
        { text: ", ", className: "term-dim" },
        { text: "projects", className: "term-cmd" },
      ],
    ],
  },
  "skills.txt": {
    description: "The tools in the toolbox.",
    content: () => [
      [
        { text: "skills.txt — tools I work with", className: "term-bold" },
      ],
      "",
      ...skillCategories.map(
        (cat): Line => [
          { text: `  ${cat.title.padEnd(8)}:  `, className: "term-dim" },
          { text: cat.items.join(", ") },
        ],
      ),
    ],
  },
  "contact.txt": {
    description: "Ways to reach out.",
    content: () => [
      [
        { text: "contact.txt — reach me", className: "term-bold" },
      ],
      "",
      [
        { text: "  Email:    ", className: "term-dim" },
        contactInfo.email
          ? { text: contactInfo.email, className: "term-ok" }
          : { text: "TODO: add your email address", className: "term-warn" },
      ],
      [
        { text: "  GitHub:   ", className: "term-dim" },
        { text: `https://github.com/${contactInfo.githubHandle}`, className: "term-ok" },
      ],
      [
        { text: "  Location: ", className: "term-dim" },
        contactInfo.location
          ? { text: contactInfo.location }
          : { text: "TODO: add your location", className: "term-warn" },
      ],
    ],
  },
  "socials.txt": {
    description: "Find me online.",
    content: () => [
      [
        { text: "socials.txt — find me online", className: "term-bold" },
      ],
      "",
      [
        { text: "  GitHub:   " },
        { text: contactInfo.githubHandle, href: contactInfo.github },
      ],
      [
        { text: "  TODO: LinkedIn, X, or other profiles", className: "term-dim" },
      ],
    ],
  },
  "projects/": {
    description: "Things I have built.",
    content: () => [
      [{ text: "projects/ — things I have built", className: "term-bold" }],
      "",
      ...projects.map((p): Line => [
        { text: `  ${p.name}/`, className: "term-accent" },
        { text: `  ${p.tagline} (${p.status})`, className: "term-dim" },
      ]),
      "",
      [
        { text: "Run ", className: "term-dim" },
        { text: "projects", className: "term-cmd" },
        { text: " for details, or ", className: "term-dim" },
        { text: "cat projects/aquaguardian.txt", className: "term-cmd" },
      ],
    ],
  },
};

for (const project of projects) {
  fs[`projects/${project.name}.txt`] = {
    description: project.tagline,
    content: () => [
      [
        { text: `${project.name}/ — ${project.tagline}`, className: "term-bold" },
      ],
      "",
      project.description,
      "",
      [
        { text: "  Stack: ", className: "term-dim" },
        { text: project.stack.join(", ") },
      ],
      [
        { text: "  Source: ", className: "term-dim" },
        { text: project.url, href: project.url },
      ],
    ],
  };
}

const registry: CommandRegistry = {
  help: {
    description: "List available commands",
    run: () => ({
      lines: [
        [
          { text: "Available commands", className: "term-bold" },
        ],
        "",
        ...Object.entries(registry).map(([name, cmd]): Line => [
          { text: `  ${name.padEnd(10)}`, className: "term-cmd" },
          { text: cmd.description },
        ]),
        "",
        [
          { text: "Tip: ", className: "term-dim" },
          { text: "Tab", className: "term-warn" },
          { text: " to autocomplete, ", className: "term-dim" },
          { text: "↑/↓", className: "term-warn" },
          { text: " for history, ", className: "term-dim" },
          { text: "Ctrl+L", className: "term-warn" },
          { text: " to clear.", className: "term-dim" },
        ],
      ],
    }),
  },
  about: {
    description: "About this workspace",
    run: () => ({
      lines: [
        [
          { text: "Hemanathan", className: "term-bold" },
          { text: " — developer", className: "term-dim" },
        ],
        "",
        "I build software across the web, GPU compute, and media automation.",
        "This site is my interactive workspace: a portfolio you can actually",
        "type in. Every command runs in your browser — no shell involved.",
        "",
        [
          { text: "TODO: ", className: "term-warn" },
          { text: "replace this paragraph with your real intro.", className: "term-dim" },
        ],
      ],
    }),
  },
  skills: {
    description: "Tools and technologies I use",
    run: () => ({
      lines: skillCategories.map(
        (cat): Line => [
          { text: cat.title.padEnd(9), className: "term-bold" },
          { text: "  " + cat.items.join(" · ") },
        ],
      ),
    }),
  },
  projects: {
    description: "Things I have built",
    run: (args) => {
      const want = args[0];
      if (want) {
        const project = projects.find(
          (p) => p.name.toLowerCase() === want.replace(/\/+$/, "").toLowerCase(),
        );
        if (!project) {
          return {
            lines: [
              [
                { text: `projects: no such project "${want}"`, className: "term-err" },
              ],
            ],
          };
        }
        return { lines: fs[`projects/${project.name}.txt`].content() };
      }
      return {
        lines: [
          [
            { text: "Things I have built", className: "term-bold" },
          ],
          "",
          ...projects.map((p): Line => [
            { text: `  ${p.name}/`, className: "term-accent" },
            { text: `  ${p.tagline} (${p.status})`, className: "term-dim" },
          ]),
          "",
          [
            { text: "Run ", className: "term-dim" },
            { text: "projects <name>", className: "term-cmd" },
            { text: " for details.", className: "term-dim" },
          ],
        ],
      };
    },
  },
  contact: {
    description: "Ways to reach me",
    run: () => ({
      lines: [
        [
          { text: "Email:    ", className: "term-dim" },
          contactInfo.email
            ? { text: contactInfo.email, className: "term-ok" }
            : { text: "TODO: add your email address", className: "term-warn" },
        ],
        [
          { text: "GitHub:   ", className: "term-dim" },
          { text: contactInfo.githubHandle, href: contactInfo.github },
        ],
        [
          { text: "Location: ", className: "term-dim" },
          contactInfo.location
            ? { text: contactInfo.location }
            : { text: "TODO: add your location", className: "term-warn" },
        ],
      ],
    }),
  },
  socials: {
    description: "Find me online",
    run: () => ({
      lines: [
        [
          { text: "GitHub:   " },
          { text: contactInfo.githubHandle, href: contactInfo.github },
        ],
        [
          { text: "TODO: LinkedIn, X, or other profiles", className: "term-dim" },
        ],
      ],
    }),
  },
  echo: {
    description: "Print text back",
    usage: "echo <text>",
    run: (args) => ({ lines: [args.join(" ") || ""] }),
  },
  whoami: {
    description: "Who is behind the keyboard",
    run: () => ({
      lines: [
        [
          { text: "hustlenix", className: "term-ok" },
          { text: " — Hemanathan, the developer who built this workspace.", className: "term-dim" },
        ],
      ],
    }),
  },
  clear: {
    description: "Clear the screen",
    run: () => ({ clear: true }),
  },
  theme: {
    description: "Switch color theme",
    usage: "theme [default|dracula|gruvbox|matrix]",
    run: (args, ctx) => {
      if (args.length === 0) {
        return {
          lines: [
            [
              { text: `Current theme: ${ctx.theme}`, className: "term-ok" },
            ],
            [
              { text: "Try: ", className: "term-dim" },
              ...THEMES.map((t) => {
                const cls: "term-warn" | "term-cmd" =
                  t === ctx.theme ? "term-warn" : "term-cmd";
                return {
                  text: t === ctx.theme ? ` ${t}*` : ` ${t}`,
                  className: cls,
                };
              }),
            ],
          ],
        };
      }
      const name = args[0].toLowerCase();
      if (THEMES.includes(name as (typeof THEMES)[number])) {
        ctx.setTheme(name as (typeof THEMES)[number]);
        return {
          lines: [
            [
              { text: `Theme set to ${name}`, className: "term-ok" },
            ],
          ],
        };
      }
      return {
        lines: [
          [
            { text: `theme: unknown theme "${args[0]}"`, className: "term-err" },
            { text: ` (${THEMES.join("|")})`, className: "term-dim" },
          ],
        ],
      };
    },
  },
  ls: {
    description: "List the virtual filesystem",
    usage: "ls [projects/]",
    run: (args) => {
      const target = args[0]?.replace(/\/+$/, "");
      if (target && target !== "projects") {
        return {
          lines: [
            [
              { text: `ls: no such directory "${args[0]}"`, className: "term-err" },
            ],
          ],
        };
      }
      if (target === "projects") {
        return {
          lines: [
            ...projects.map((p): Line => [
              { text: `  ${p.name}.txt`, className: "term-accent" },
            ]),
            "",
            [
              { text: "Use ", className: "term-dim" },
              { text: "cat projects/<name>.txt", className: "term-cmd" },
              { text: " to read one.", className: "term-dim" },
            ],
          ],
        };
      }
      return {
        lines: [
          ...Object.keys(fs).map((name): Line => {
            const cls: "term-accent" | "term-ok" = name.endsWith("/")
              ? "term-accent"
              : "term-ok";
            return [
              { text: `  ${name}`, className: cls },
              { text: `   ${fs[name].description}`, className: "term-dim" },
            ];
          }),
          "",
          [
            { text: "Try ", className: "term-dim" },
            { text: "cat README.md", className: "term-cmd" },
            { text: " to get oriented.", className: "term-dim" },
          ],
        ],
      };
    },
  },
  cat: {
    description: "Read a virtual file",
    usage: "cat <file>",
    run: (args) => {
      const name = args[0]?.replace(/\/+$/, "");
      if (!name) {
        return {
          lines: [
            [{ text: "cat: missing file operand", className: "term-err" }],
            [{ text: "Usage: cat <file>", className: "term-dim" }],
          ],
        };
      }
      const file = fs[name] ?? fs[`projects/${name}.txt`];
      if (!file) {
        return {
          lines: [
            [{ text: `cat: ${name}: no such file`, className: "term-err" }],
            [
              { text: "Try ", className: "term-dim" },
              { text: "ls", className: "term-cmd" },
              { text: " to see what exists.", className: "term-dim" },
            ],
          ],
        };
      }
      return { lines: file.content() };
    },
  },
  date: {
    description: "Current date and time",
    run: () => {
      const now = new Date();
      return {
        lines: [
          now.toLocaleString("en-US", { dateStyle: "full", timeStyle: "medium" }),
          `UTC: ${now.toUTCString()}`,
        ],
      };
    },
  },
  exit: {
    description: "Try to leave",
    run: () => ({
      lines: [
        [
          { text: "There is no exit — this terminal is the point.", className: "term-warn" },
        ],
        [
          { text: "Try ", className: "term-dim" },
          { text: "help", className: "term-cmd" },
          { text: " instead. Or maybe a real project to hire me for?", className: "term-dim" },
        ],
      ],
    }),
  },
};

export function runCommand(
  raw: string,
  ctx: CommandContext,
): { result: CommandResult; command: string; args: string[] } {
  const parts = raw.trim().split(/\s+/);
  const command = parts[0]?.toLowerCase() ?? "";
  const args = parts.slice(1);
  const cmd = registry[command];
  if (!cmd) {
    return {
      command,
      args,
      result: {
        lines: [
          [
            { text: `command not found: ${command}`, className: "term-err" },
          ],
          [
            { text: "Type ", className: "term-dim" },
            { text: "help", className: "term-cmd" },
            { text: " for available commands.", className: "term-dim" },
          ],
        ],
      },
    };
  }
  return { command, args, result: cmd.run(args, ctx) };
}

export default registry;
