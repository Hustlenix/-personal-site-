# LALITH — Friendly Neighborhood Builder

A one-page personal portfolio built with **plain HTML, CSS, and vanilla JavaScript**.

**Live:** https://hustlenix.github.io/-personal-site-/

> The current version does **not** use Next.js, React, TypeScript, or Tailwind, and it does not include the older interactive-terminal / virtual-filesystem experiment.

## Screenshot

![Current desktop screenshot of the personal site](https://image.thum.io/get/width/1200/crop/800/noanimate/https://hustlenix.github.io/-personal-site-/)

The screenshot above is generated from the deployed homepage so it stays aligned with the current live version.

## Why I made this

I wanted one place that could show what I am building without pretending I am already an expert. A lot of portfolio templates felt too corporate for me, so I made something that feels closer to my own interests: comic-book energy, an arc-reactor/JARVIS theme, hard neo-brutalist borders, and project cards that point to things I have actually shipped.

I also wanted the site to stay understandable. Rebuilding it as vanilla HTML/CSS/JS means there is no framework hiding the basics from me, and every interaction on the page is small enough to inspect and learn from.

## What it includes

- responsive one-page portfolio
- JARVIS dark mode persisted with `localStorage`
- scroll-reveal animation with reduced-motion support
- active navigation with `aria-current`
- current project cards with source/live links where verified
- themed 404 page
- canonical/social metadata, `robots.txt`, and `sitemap.xml`
- automatic GitHub Pages deployment from `site/`

## Visual direction

The design mixes neo-brutalism with comic-book / powered-suit references:

- red `#E62429`
- deep navy `#101B33`
- gold `#F5C518`
- cream background
- hard borders and offset shadows
- halftone dots, web motifs, and a CSS arc-reactor

The **JARVIS** switch changes the site into a darker cockpit-style theme and saves the choice in the browser.

## Project structure

| Path | Purpose |
|---|---|
| `site/index.html` | Main portfolio: hero, status feed, missions, origin, systems, contact |
| `site/styles.css` | Responsive styling, theme variables, cards, motion, and accessibility states |
| `site/script.js` | Theme persistence, scroll reveal, active nav, and JARVIS status ticker |
| `site/404.html` | Themed GitHub Pages 404 |
| `site/robots.txt` | Search crawler rules |
| `site/sitemap.xml` | Sitemap for the deployed homepage |
| `.github/workflows/deploy.yml` | Publishes `site/` to GitHub Pages on pushes to `main` |

## Run locally

No npm install or build step is required.

From the repository root:

```bash
python -m http.server 8000 --directory site
```

Then open:

```text
http://localhost:8000/
```

You can also open `site/index.html` directly, although a local HTTP server is closer to the deployed environment.

## Deployment

GitHub Actions publishes the contents of `site/` to GitHub Pages whenever changes land on `main`.

Live site:

https://hustlenix.github.io/-personal-site-/

## Accessibility notes

- semantic headings and navigation
- visible keyboard focus styles
- reduced-motion support
- active section announced with `aria-current="location"`
- theme control exposed as a switch with `aria-checked`
- core page content remains readable if JavaScript is disabled

## License

MIT — see [LICENSE](LICENSE).
