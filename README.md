# Hemanathan — Personal Site

An interactive developer workspace and portfolio. Built with Next.js 15,
React 19, TypeScript, and Tailwind CSS 4.

## What's inside

- **Five pages**: home, projects, about, contact, and a dedicated workspace
  page with a fully client-side terminal.
- **A real in-browser terminal** (`/workspace`) with command history,
  Tab autocomplete, four color themes, and a virtual filesystem
  (`ls`, `cat`, `help`, `theme`, …). No shell, no server — pure React state.
- **Engineering blueprint** in [`docs/blueprint-terminal.md`](docs/blueprint-terminal.md):
  architecture, contracts, edge cases, and three planned extensions.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # server build
```

## Deploy (GitHub Pages)

The repo ships a workflow (`.github/workflows/deploy.yml`) that builds with
`STATIC_EXPORT=true` (static export with `/‑personal‑site‑` basePath) and
deploys to GitHub Pages on every push to `main`.

To activate:

1. Repo → Settings → Pages → Source: **GitHub Actions**.
2. Push to `main`; the workflow builds and publishes `out/`.

The site lives at `https://hustlenix.github.io/-personal-site-/`.

> Local `npm run build` produces a server build; the static export only
> happens in CI (or locally via `STATIC_EXPORT=true npm run build`).
