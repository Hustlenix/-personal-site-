export type SkillCategory = {
  title: string;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Web",
    items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Node.js"],
  },
  {
    title: "Compute",
    items: ["Python", "C", "CUDA-Q", "cuOpt"],
  },
  {
    title: "Media",
    items: ["DaVinci Resolve scripting", "FFmpeg"],
  },
  {
    title: "Tooling",
    items: ["Git", "GitHub Actions", "static deployment"],
  },
];
