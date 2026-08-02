export type Project = {
  name: string;
  tagline: string;
  description: string;
  url: string;
  stack: string[];
  status: "live" | "in-progress";
};

export const projects: Project[] = [
  {
    name: "aquaguardian",
    tagline: "Ocean-protection concept site",
    description:
      "A static-export Next.js site for a fictional ocean-cleaning robot concept, with sourced ocean science data and a dashboard. Purely educational — no physical product exists.",
    url: "https://github.com/Hustlenix/aquaguardian",
    stack: ["Next.js", "TypeScript", "Tailwind", "GitHub Pages"],
    status: "live",
  },
  {
    name: "-personal-site-",
    tagline: "This workspace, terminal included",
    description:
      "The site you are on. A portfolio built around an interactive in-browser terminal that really works: history, autocomplete, themes, and a virtual filesystem.",
    url: "https://github.com/Hustlenix/-personal-site-",
    stack: ["Next.js", "TypeScript", "Tailwind", "React"],
    status: "in-progress",
  },
];

export function findProject(name: string): Project | undefined {
  return projects.find(
    (p) => p.name.toLowerCase() === name.trim().toLowerCase(),
  );
}
