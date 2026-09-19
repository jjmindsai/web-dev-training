# Johny’s web development course — handoff for a new chat

**Student:** Johny (GitHub: [jjmindsai](https://github.com/jjmindsai))  
**Teacher:** continue from this file if the long Grok session is gone.  
**OS:** Windows 10 IoT Enterprise LTSC  

Paste this into a new Grok chat:

> I am Johny. Continue my web-dev training from COURSE.md in C:\Users\jjminds\web-dev-training (also https://github.com/jjmindsai/web-dev-training/blob/main/COURSE.md). Live site: https://jjmindsai.github.io/web-dev-training/index.html. Next unused lesson idea: HTML small, or RSS/sitemap update when a post is added. Do not reinstall tools. Edit 05-personal-site then copy to docs and git push for GitHub Pages.

---

## Important URLs

| What | URL |
|------|-----|
| Repo (public) | https://github.com/jjmindsai/web-dev-training |
| **This handoff file** | https://github.com/jjmindsai/web-dev-training/blob/main/COURSE.md |
| Live site | https://jjmindsai.github.io/web-dev-training/index.html |
| Training on disk | `C:\Users\jjminds\web-dev-training` |

To keep the **old chat** instead of a new one: `/resume` and pick this training session.

---

## Tools already installed (do not reinstall)

- VS Code, Git, GitHub signed in (account **jjmindsai**)
- Node.js 24 + npm, Python 3.13 + pip, Flask
- Chrome (Live Server + DevTools)
- Git user: `jjmindsai` / GitHub noreply email
- Repo **public**; GitHub Pages: branch **main**, folder **/docs**

**Ports**

| Port | What |
|------|------|
| 5500 | VS Code Live Server (frontend only) |
| 5000 | Flask inbox (`06-contact-backend`) |
| 5001 | Express inbox (`07-express-backend`) |

**Pages publish loop:** edit `05-personal-site` → copy files into `docs` → `git add` / commit / `git push` → wait ~1 min → **Ctrl+F5**. CSS cache: bump `styles.css?v=N`. Never edit **only** `docs` (the next copy overwrites it).

**.gitignore already excludes:** `node_modules/`, `*.db`, `messages.json`, `.env`

Class inbox password (localhost only, already in source): `johny-inbox` — not for the public internet.

---

## Folder map

| Folder | Role |
|--------|------|
| `01-html-css` | First About Me page + JS button |
| `02-nodejs` | hello.js, npm/cowsay, `server.js`, Express `app.js` |
| `03-python` | hello.py, first Flask pages |
| `04-fullstack` | Button `fetch` → Flask JSON `/api/me` |
| `05-personal-site` | **Working copy** of the public site |
| `docs` | GitHub Pages publish copy |
| `06-contact-backend` | Flask + SQLite CRUD + login (local) |
| `07-express-backend` | Same app in Express + EJS + `node:sqlite` (local) |

---

## Lessons completed (1–54)

### Setup
Install VS Code, Node, Python, Git. GitHub in VS Code. No extra languages needed on LTSC.

### Frontend core
1. HTML structure (h1 vs list)  
2. CSS in `<style>`, then `styles.css`  
3. Button + `script.js` (`getElementById`, click)  
24. Light/dark + CSS variables + `localStorage`  
25. `fetch` GitHub API (`jjmindsai` public repos)  
26. Project filter (`input`, `querySelectorAll`)  
28. Favicon SVG + meta description  
29. Skip link, `<main>`, `:focus-visible`  
31–32. Blog (`<article>`, `<time>`) + `@media print`  
33. `<details>` / `<summary>` on Training  
35. Back-to-top (`scrollY`, `scrollTo`)  
37. `<figure>` / `<figcaption>` (caption: “Training site banner.”)  
38–39. Second blog post; Home “Latest from the blog” teaser  
40. `<table>` skills on Home  
42–44. `<blockquote>`, `<pre><code>` (`&lt;` `&gt;`), `<dl>` glossary  
45. Footer year via `new Date().getFullYear()`  
46–48. `<abbr title>`, `<mark>`, `<kbd>`  
49. Copy URL (`navigator.clipboard` + `location.href`)  
50. `<dialog>` + `showModal()` (“About this site”)  
52. `prefers-reduced-motion` (CSS `scroll-behavior` + `matchMedia` on Top)  
53. `loading="lazy"` on the Home banner (`width`/`height` too; logo stays eager)  
54. Footer `<address>` around the GitHub link (contact for the page owner)  

### Backend
4–5. `node hello.js` (cwd vs path), `npm init`, `cowsay`  
6–7. `http` server then Express; routes `/` and `/about`; bind `127.0.0.1`  
8–10. Python `print` vs PowerShell `print` (PRN); Flask; fetch JSON  
15–20. Contact POST → JSON then **SQLite**; inbox HTML (Jinja); delete; edit; login session  
21. Same CRUD in **Express** (EJS), port **5001**, separate `messages.db`  

### Git / ship
11–12. Personal site; first commit; VS Code commit **Message** box (not README); Pages from `/docs`; `.nojekyll`; public repo  
13. Contact form (JS thank-you on Pages; real save only on Flask/Express)  
14. Footer + mobile `@media (max-width: 600px)`  
22–23. Push backends (no `node_modules`/`.db`); project cards  
27. Custom `404.html` (root-relative `/web-dev-training/` paths)  
30. Open Graph + `og-image.jpg` (1200×630)  
34. `robots.txt` + `sitemap.xml`  
36. JSON-LD Person + `rel="noopener noreferrer"`  
41. `rel="canonical"` (Home = `.../web-dev-training/`)  
51. `feed.xml` RSS  

**Student habits learned:** PowerShell prompt is not a command; `cd` before `node`; don’t paste Python into PS; duplicate CSS = last rule wins; contrast/inheritance; cache (**Ctrl+F5**); AdGuard scripts in View source are not in the file.

---

## Public site pages

Home, Training, Projects, Blog, Contact + 404.  
Features: theme toggle, GitHub stats, filter, skip link, table, blog teaser, copy URL, dialog, RSS link.

Home images: `favicon.svg` (logo) + `og-image.jpg` (hero).

---

## Suggested next lessons (not done)

- HTML `<small>` / fine print  
- A tiny RSS/sitemap update whenever a new blog post is added (manual static habit)

---

## Commands cheat sheet

```powershell
cd C:\Users\jjminds\web-dev-training
git status
git add .
git commit -m "Your message"
git push

cd C:\Users\jjminds\web-dev-training\06-contact-backend
python app.py
# http://127.0.0.1:5000  password johny-inbox

cd C:\Users\jjminds\web-dev-training\07-express-backend
npm install
node app.js
# http://127.0.0.1:5001
```

Live Server: open `05-personal-site\index.html` → Go Live (**5500**), not Flask.
