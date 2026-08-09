# LALITH — Friendly Neighborhood Builder

Personal site. One page, plain HTML + CSS + vanilla JS. No frameworks, no
build step, no dependencies — just `site/`.

Neo-brutalism × Spider-Man × Iron Man. The suits' colors (Spidey red
`#E62429`, deep navy `#101B33`, Iron gold `#F5C518`) on cream, with hard
borders, hard shadows, halftone dots, a web motif, and a CSS arc reactor.
Flip the **JARVIS** switch in the nav to drop the whole page into dark
cockpit mode — the choice is saved to `localStorage`.

## What's inside

| Path | Purpose |
|---|---|
| `site/index.html` | The entire site: hero, JARVIS status feed, missions, origin story, suit systems, signal |
| `site/styles.css` | All styling. Two theme token blocks (`:root` light, `[data-theme="jarvis"]` dark) — no other color rules |
| `site/script.js` | ~130 lines vanilla JS: theme toggle, scroll reveal, active-nav, JARVIS ticker |
| `site/404.html` | Themed 404, served automatically by GitHub Pages |
| `.github/workflows/deploy.yml` | Pushes `site/` to GitHub Pages on every commit to `main` |

## Run locally

Double-click `site/index.html`, or serve it:

```bash
python -m http.server
# open http://localhost:8000
```

## Deploy

The workflow publishes the `site/` folder to GitHub Pages on every push to
`main`. Live at:

https://hustlenix.github.io/-personal-site-/

## License

MIT — see [LICENSE](LICENSE).
