# Blueprint: The In-Browser Terminal

The flagship of this portfolio is a terminal emulator that runs entirely in
the browser. No shell, no server — React state is the kernel. This document
is the engineering blueprint: how it is split, the contracts it honors, the
edge cases it handles, and how to grow it without breaking it.

## 1. Architecture & Component Split

The system is a one-way data flow: keystrokes → state → render.

```
User input
   │  (keydown / onChange on hidden <input>)
   ▼
useTerminal (src/hooks/useTerminal.ts)          ← the "kernel"
   │  owns: lines[], input, history, theme, autocomplete, scroll policy
   ├── execute(raw)
   │     ├── runCommand(raw, ctx)                ← lib/terminal/commands.ts
   │     │     └── registry[cmd].run(args, ctx)  ← per-command handlers
   │     └── appendLines / clearLines
   ▼
Terminal (src/components/terminal/Terminal.tsx)  ← the "display"
   ├── TerminalToolbar   — title bar, theme/clear actions
   ├── TerminalLine      — renders one Line (string | Segment[])
   └── hidden <input>    — keeps native caret, IME, mobile keyboards
```

Layers, in dependency order:

| Layer | Files | Responsibility |
|---|---|---|
| Types | `lib/terminal/types.ts` | The contracts — everything else compiles against these |
| Engine (pure) | `parser.ts`, `history.ts`, `completion.ts`, `storage.ts` | String logic, no React, unit-testable in isolation |
| Commands | `commands.ts` | The registry + virtual filesystem; content lives here |
| State | `hooks/useTerminal.ts` | React glue: wires engine + input + scroll + persistence |
| View | `components/terminal/*` | Stateless rendering of state + events |

Rules that keep this healthy:

- **The view never computes.** `Terminal.tsx` renders exactly what
  `useTerminal` hands it; keyboard handling is delegated to the hook's
  `handleKeyDown`. If behavior needs changing, change the hook or the engine.
- **The engine never touches React or the DOM.** `parser.ts` etc. are pure
  functions — swap the UI (e.g. a canvas renderer) without touching logic.
- **Commands are data, not JSX.** Command output is `Line[]` (plain
  strings or segment objects), so commands render identically in any
  terminal view and can be serialized/tested.
- **One hidden `<input>`** instead of a `contentEditable` div: you get the
  native caret, autocorrect suppression, IME composition, and mobile
  keyboard for free. The visible prompt line is a styled mirror of
  `t.input`.

## 2. TypeScript Interfaces & Contracts

```ts
type SegmentClass =
  | "term-cmd" | "term-dim" | "term-accent" | "term-ok"
  | "term-warn" | "term-err" | "term-magenta" | "term-cyan"
  | "term-bold";

type Segment = {
  text: string;
  className?: SegmentClass | SegmentClass[];
  href?: string;               // renders as <a target="_blank">
};

type Line = string | Segment[];   // a string is shorthand for [{ text }]

type ThemeId = "default" | "dracula" | "gruvbox" | "matrix";

type CommandContext = {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
};

type CommandResult = { lines?: Line[]; clear?: boolean };

type Command = {
  description: string;        // shown by `help`
  usage?: string;
  run: (args: string[], ctx: CommandContext) => CommandResult;
};
```

Why these shapes:

- `Line = string | Segment[]` keeps output ergonomic (plain prose needs no
  ceremony) while still allowing rich, linkable, colored lines.
- `SegmentClass` is a closed union, not `string`. That one decision is what
  makes every misspelled class a compile error, and it is the reason the
  theme CSS classes stay in sync with what commands can emit.
- `CommandResult` carries an optional `clear` flag instead of a special
  `clear` command reaching into state — the kernel decides how to honor it.
- The contract between `runCommand` and `useTerminal` is the string
  `raw` on the way in and `CommandResult` on the way out. Nothing else
  crosses that boundary, so commands cannot reach into React state.

Theme contract: the view sets `data-theme={theme}` on the `.terminal`
container; `globals.css` maps each `data-theme` to a set of `--term-*`
CSS variables; every piece of terminal chrome (including the caret) reads
only from those variables. Adding a theme = adding one CSS block + one
entry in `THEMES`. No component logic changes.

## 3. Algorithmic & State Logic, With Edge Cases

### Parsing (`parser.ts`)
Handles quoted args (`echo "hello world"`), single quotes, and backslash
escapes (`echo a\ b`). Edge cases: consecutive whitespace collapses;
unterminated quotes append the trailing fragment as one arg (matches shell
leniency); empty/whitespace-only input returns `[]` and is a no-op at the
execution layer, never an error.

### History (`history.ts`)
Circular buffer capped at 200 entries, persisted to localStorage under
`personal-site:history` via `storage.ts`. Consecutive duplicates are
collapsed (a shell would push both; we choose sanity). `↑/↓` navigation
keeps an index pointer into the buffer and restores the in-progress draft
when you navigate back to the end — the classic "walk off the end" edge
case is handled by clamping the index at `-1` and yielding `""`.

### Autocomplete (`completion.ts` + hook)
Tab completes command names. Repeated Tab **cycles** through candidates
(not the bash-style "double-tab to list" — cycling is cheaper to
discover). State lives in a ref: `{ candidates, index }`. The ref is
invalidated whenever the user types or executes (completion only applies
to the command token — args are left alone). Edge case: if the input's
prefix no longer matches the remembered candidates, completion resets to
candidate 0 instead of indexing stale data.

### Scroll policy (hook)
A `autoScroll` ref defaults to `true`. On every `lines` change, if
`autoScroll` is true the container scrolls to bottom. The `onScroll`
handler sets `autoScroll = false` the moment the user scrolls up more than
40px from the bottom — so history browsing never gets yanked back down by
new output, and the very first new line after `clear` re-enables it.

### Output cap
`MAX_LINES = 500`. When exceeded, the array is sliced to the last 500.
This is the one unbounded consumer (every command can emit lines forever),
so the cap is enforced at the single write site, not in individual
commands.

### Execution path (`useTerminal.execute`)
1. Trim; empty → return (no history entry, no echo line).
2. Push to history + persist, reset history index and completion state.
3. Build `ctx = { theme, setTheme }` — commands read current theme, never
   stale state, because `execute` is recreated on theme change.
4. `runCommand` returns `{ command, args, result }`; echo line shows the
   command, then `result.lines` or a full clear via `clearLines`.

### Keyboard contract
- `Enter` → execute; `Ctrl+C` → abort current line (`^C` echoed, input
  cleared); `Ctrl+L` → clear screen (no echo line — matches real shells);
  `↑/↓` → history; `Tab` → complete/cycle.
- `preventDefault` on every handled key so the browser never scrolls the
  page with `↑/↓` or blurs with `Tab`.

### Persistence (`storage.ts`)
Every access wrapped in `try/catch` with a silent fallback — private
browsing mode and quota errors must not crash the terminal. Keys are
namespaced `personal-site:` to avoid colliding with anything else on the
origin.

### Accessibility
- Output container is `role="log"` with `aria-live="polite"` — new output
  is announced without interrupting.
- The single hidden input carries `aria-label="Terminal input"` and
  `autoFocus`; clicking anywhere in the terminal refocuses it.
- The caret is purely decorative (`aria-hidden`); reduced-motion users get
  a static caret via the global `prefers-reduced-motion` override.
- All links open `target="_blank" rel="noopener noreferrer"`.

## 4. Typing Guidelines & Refactor Map

- **Never widen a `SegmentClass`.** If a handler needs a conditional class,
  annotate the variable as the union (`const cls: "term-ok" | "term-err" = …`)
  or use a `: Line` callback annotation — don't reach for `as const` on a
  parenthesized ternary (it's a TS error) and never type `className` as
  `string`.
- **`Segment` objects are immutable data.** If a command needs to vary
  output, build new segments; don't mutate after creation.
- **Keep commands pure of I/O.** The registry is synchronous by design. If
  a future command must be async (e.g. fetch), change `run` to return
  `CommandResult | Promise<CommandResult>` and have the hook await it —
  the view is already stateless enough to absorb the delay.
- **New command recipe:** add to `registry` with a `description` (help is
  generated from the registry via `Object.entries`), and, if it touches the
  filesystem, register a virtual file so `ls`/`cat` stay truthful.
- **Add a theme:** extend `THEMES` in `types.ts` + one `data-theme` block
  in `globals.css`. Nothing else.

### Extension A — Dynamic theme engine
Replace the four hardcoded `data-theme` blocks with a runtime-generated
token object (e.g. `{ default: { bg: "#0e1117", fg: … } }`) applied as
inline CSS variables from the hook, enabling a `theme custom` command that
accepts arbitrary hex values and persists them. The contract change is
contained to `types.ts` (`ThemeId` → `ThemeSpec`) and the view's style
application; the kernel and commands are untouched.

### Extension B — Live canvas preview
Add a `canvas` command that opens a second panel (a `CanvasView` component)
fed by a tiny render loop. The loop state lives in a ref, not in React
state, so 60fps never re-renders the terminal; the terminal only receives
textual progress lines. The `Line[]` contract makes both panels render
from the same command output — one command, two views.

### Extension C — Command-driven project explorer
Turn `projects` into a real two-pane explorer: left pane lists projects,
right pane renders `cat`-style detail, arrow keys navigate. The registry
gains an `explore` command whose output includes a structured
`explorer?: { items: ProjectExplorerItem[]; selected: number }` field on
`CommandResult`; the view renders it only when present. Old commands keep
working unchanged — the explorer is an additive contract, never a rewrite.
