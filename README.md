# COSMIC — Portfolio of Ankit Bajpeyee

**Live:** https://cosmic-2318.github.io

Personal portfolio of Ankit "Cosmic" Bajpeyee, a final-year B.Tech CSE (AI & ML) student who builds data pipelines, machine learning models and quant research systems end to end.

The site builds itself in front of the visitor: after you click **Open Visit**, 18 cursor "agents" draw wireframes, type the text and assemble every section while the page scrolls on its own in time with the soundtrack. It's fully built in 50 seconds, then you can scroll and read.

## Features

- **Self-building page:** cursor agents, design-tool rulers and size labels, a progress dock with Pause / Skip / Replay
- **Auto tour:** one steady scroll from top to bottom, timed to the music, then back to the top
- **Selected work:** filterable project cards (Quant · ML · Data) with generated visuals
- **From Raw to Real:** a drag slider comparing raw market ticks with the model's view (illustration)
- **Journey:** an expandable timeline of internships and education
- **Booking:** a meeting request form that prepares a message for email, WhatsApp or copy
- **Accessible:** keyboard friendly, honours "reduce motion", and an "Enter without animation" option

## Built with

Plain HTML, CSS and JavaScript. No frameworks, no build step.
Fonts: Anton, Inter, Caveat, JetBrains Mono (Google Fonts).

## Run locally

```bash
git clone https://github.com/COSMIC-2318/COSMIC-2318.github.io.git
cd COSMIC-2318.github.io
python -m http.server 8000
```

Then open http://localhost:8000

## Edit the content

All text lives at the top of `script.js`:

| Block | What it controls |
|---|---|
| `CONFIG` | Email, WhatsApp, Instagram, LinkedIn, GitHub, Fiverr |
| `BUILD` | Number of agents, build length (`seconds`), auto tour, return to top |
| `PROJECTS` | Work cards |
| `NUMBERS` | Measured results |
| `TIMELINE` / `WINS` | Journey section |

## Honest numbers

Every metric on the site is labelled for what it is (backtest, held-out test split, and so on). None of them are live trading returns.

## Contact

- GitHub: [COSMIC-2318](https://github.com/COSMIC-2318)
- Or use **Book a meeting** on the site

---

Design inspired by a portfolio reel; all code and content are original to this site.
