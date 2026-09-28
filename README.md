# LALITH — Personal Site

#### A neo-brutalist personal portfolio with JARVIS mode, project cards, and no framework.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=111111) ![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)

[Key Features](#key-features) • [How It Works](#how-it-works) • [Run Locally](#run-locally) • [Why I Made It](#why-i-made-it) • [Credits](#credits) • [License](#license)

[Live Website](https://hustlenix.github.io/-personal-site-/) • [Source](https://github.com/Hustlenix/-personal-site-)

<img width="922" height="852" alt="Screenshot of the personal site" src="https://github.com/user-attachments/assets/9423c95a-a007-4cf2-bc2c-56d1ffb1cd57" />

> **⚡ Current version:** this site is plain HTML, CSS and vanilla JavaScript. I had an older terminal-style version with more complicated ideas, but I removed it and rebuilt the site around a simpler portfolio.

![Desktop preview](site/assets/site-screenshot.svg)

## Key Features

- **JARVIS mode** — switches the whole site into a darker cockpit-style theme
- **Theme memory** — the selected theme is saved with `localStorage`
- **Project cards** — links to projects I have actually built and shipped
- **Status feed** — small typewriter-style JARVIS status animation
- **Active navigation** — the nav updates as you move through the page
- **Scroll reveals** — sections animate in when they enter the screen
- **Reduced-motion support** — animations back off when the browser requests it
- **Responsive layout** — built to work across desktop and smaller screens
- **Custom 404 page** — keeps the same visual style if you hit a missing page
- **GitHub Pages deployment** — the `site/` folder is deployed automatically from `main`

## How It Works

The whole website lives inside the `site/` folder. There is no React app, package manager, build step or framework hiding behind it.

### Theme system

The light theme and JARVIS theme are mostly controlled through CSS variables.

When the JARVIS button is pressed, JavaScript adds:

```html
data-theme="jarvis"
```

to the page and saves the choice in `localStorage`, so the theme is still there when the site is opened again.

### Navigation and animations

The site uses `IntersectionObserver` for two things:

- revealing sections while scrolling
- marking the current navigation link with `aria-current="location"`

The status panel also has a small vanilla-JS typewriter loop for values like:

```text
SUITING UP
BUILDING STUFF
SHIPPING
```

### Project cards

The Missions section currently shows projects such as:

- [Level Up](https://github.com/Hustlenix/LevelUp)
- [StanceLoop](https://github.com/Hustlenix/stance-loop)
- [Infinite Colour Craft](https://github.com/Hustlenix/Infinite-Colour-Craft)
- [Super-Micro Heroes](https://github.com/Hustlenix/Iron-Mario)
- [AquaGuardian](https://github.com/Hustlenix/aquaguardian)
- this personal site

Each card is written manually, so I can keep the description and links under my control instead of pulling random data into the page.

## Project Structure

```text
-personal-site-/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── site/
│   ├── assets/
│   │   └── site-screenshot.svg
│   ├── 404.html
│   ├── index.html
│   ├── robots.txt
│   ├── script.js
│   ├── sitemap.xml
│   └── styles.css
├── LICENSE
└── README.md
```

## Run Locally

You do not need to install npm packages.

Clone the repo:

```bash
git clone https://github.com/Hustlenix/-personal-site-.git
cd -personal-site-
```

Then either open `site/index.html` directly, or run:

```bash
python -m http.server 8000 --directory site
```

and open:

```text
http://localhost:8000/
```

## Why I Made It

I wanted a place for my projects that did not look like another copied portfolio template.

I like the Spider-Man / Iron Man / JARVIS kind of visual style, so I started mixing that with neo-brutalist cards, hard borders, strong colors and the arc-reactor idea. The main point of the site is still simple though: show what I am building, keep the links in one place, and make the page feel like something I would actually make.

I also wanted this version to stay understandable. Since it is just HTML, CSS and JavaScript, I can open any file and know exactly where something is coming from.

## Credits

This project uses or is inspired by:

- [GitHub Pages](https://pages.github.com/) for hosting
- [GitHub Actions](https://github.com/features/actions) for deployment
- [Google Fonts](https://fonts.google.com/) — Anton, IBM Plex Sans and JetBrains Mono
- Spider-Man / Iron Man / JARVIS-inspired colors and interface ideas

## You may also like...

- [Level Up](https://github.com/Hustlenix/LevelUp) — self-improvement app with a persistent companion
- [StanceLoop](https://github.com/Hustlenix/stance-loop) — browser-based pose tracking and training feedback
- [Infinite Colour Craft](https://github.com/Hustlenix/Infinite-Colour-Craft) — colour mixing, painting and local doodle recognition
- [Iron-Mario / Super-Micro Heroes](https://github.com/Hustlenix/Iron-Mario) — fast microgames made in Godot
- [AquaGuardian](https://github.com/Hustlenix/aquaguardian) — ocean-cleaning robot concept site

## License

MIT — see [LICENSE](LICENSE).

---

> [Live Site](https://hustlenix.github.io/-personal-site-/) · GitHub [@Hustlenix](https://github.com/Hustlenix)
