export type SegmentClass =
  | "term-cmd"
  | "term-dim"
  | "term-accent"
  | "term-ok"
  | "term-warn"
  | "term-err"
  | "term-magenta"
  | "term-cyan"
  | "term-bold";

export type Segment = {
  text: string;
  className?: SegmentClass | SegmentClass[];
  href?: string;
};

export type Line = string | Segment[];

export type ThemeId = "default" | "dracula" | "gruvbox" | "matrix";

export const THEMES: ThemeId[] = ["default", "dracula", "gruvbox", "matrix"];

export type CommandContext = {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
};

export type CommandResult = {
  lines?: Line[];
  clear?: boolean;
};

export type Command = {
  description: string;
  usage?: string;
  run: (args: string[], ctx: CommandContext) => CommandResult;
};

export type CommandRegistry = Record<string, Command>;
