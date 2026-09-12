# Muhammad Uzair Ajmal — Portfolio Customization & Deployment Guide

Welcome to your developer portfolio codebase! This project was built using **pure semantic HTML5, modern CSS3, and vanilla JavaScript (ES6+)** with **zero external frameworks or runtime dependencies**. It is optimized for speed, accessibility, SEO, and developer recruiter impact.

---

## 📁 Project Architecture

```
Uzair272/
├── index.html                  # Semantic single-page portfolio layout
├── README.md                   # Profile README for github.com/Uzair272
├── PORTFOLIO_GUIDE.md          # Customization & deployment instructions (this file)
├── robots.txt                  # Search engine crawl configuration
├── sitemap.xml                 # Search engine sitemap
├── css/
│   └── style.css               # Complete vanilla CSS design system & themes
├── js/
│   └── script.js               # Vanilla JavaScript (Theme, Nav, Terminal, Filtering, GitHub API)
├── assets/
│   ├── images/
│   │   ├── avatar.svg          # Fallback developer vector avatar
│   │   └── projects/           # High-resolution vector project illustrations
│   │       ├── medxanalysis.svg
│   │       ├── edusense.svg
│   │       ├── orbitstay.svg
│   │       ├── dualcity.svg
│   │       ├── studentportal.svg
│   │       ├── nexashop.svg
│   │       └── nasmreader.svg
│   └── resume/
│       └── resume_placeholder.pdf  # PDF placeholder (replace with your official CV)
└── favicon/
    └── favicon.svg             # Monogram favicon with developer brackets
```

---

## 🚀 Quick Local Testing

Because this is a pure static website, you can view it immediately without installing any packages or running Node.js:
1. Double-click [index.html](file:///c:/Development/Uzair/Uzair272/index.html) in your file explorer to open it in any browser (Chrome, Edge, Firefox, Safari).
2. Alternatively, use Python's built-in lightweight local server:
   ```bash
   python -m http.server 3000
   ```
   Then open `http://localhost:3000` in your browser.

---

## 🎨 Where to Customize Details

### 1. Personal Information & Titles
Open [index.html](file:///c:/Development/Uzair/Uzair272/index.html):
- **Hero Title & Name:** Search for `Muhammad Uzair Ajmal` and `Full Stack Developer & AI Software Engineer`.
- **Contact Email:** Search for `uzairfts272@gmail.com` and replace it if you wish to change your contact email.
- **LinkedIn & GitHub URLs:** Search for `muhammaduzairajmal` and `Uzair272`.
- **About Me Bio:** Search for `<section class="section-padding" id="about">` to update personal milestones or interests.

### 2. Live GitHub Username
Open [js/script.js](file:///c:/Development/Uzair/Uzair272/js/script.js):
- Look at line 170:
  ```javascript
  const GitHubHub = {
    USERNAME: 'Uzair272',
    ...
  ```
  Change `Uzair272` to any GitHub username. The site will automatically query the GitHub API, fetch public repositories, star counts, follower counts, and bio.

### 3. Adding or Updating Projects
Open [index.html](file:///c:/Development/Uzair/Uzair272/index.html) in the `<section id="projects">`:
- Each project is an `<article class="project-card" data-category="...">`:
  ```html
  <article class="project-card" data-category="fullstack ai">
    <div class="project-media-wrapper">
      <img src="assets/images/projects/your_image.svg" alt="Project preview" class="project-img" loading="lazy">
      <span class="project-category-badge">Category</span>
    </div>
    <div class="project-body">
      <h3 class="project-name">Project Name</h3>
      <p class="project-description">Summary of what the platform accomplishes.</p>
      ...
    </div>
  </article>
  ```
- Categories supported for filter tabs: `all`, `fullstack`, `ai`, `frontend`.

### 4. Customizing Theme Colors & Palette
Open [css/style.css](file:///c:/Development/Uzair/Uzair272/css/style.css) at the `:root` block (lines 8–46):
- `--accent`: Primary cyan accent `#00e5ff` (dark mode) / `#2563eb` (light mode).
- `--bg-primary`: Background obsidian `#080c15` (dark mode) / `#f8fafc` (light mode).
- `--card-bg`: Glassmorphic card surfaces.

### 5. Replacing the Resume PDF
- Replace `assets/resume/resume_placeholder.pdf` with your actual resume PDF (keep the same name `resume_placeholder.pdf` or update the link in `index.html` line 125 to point to your new file name).

### 6. Interactive Terminal Commands
Open [js/script.js](file:///c:/Development/Uzair/Uzair272/js/script.js) inside `TerminalWidget.commands` (lines 100–110):
```javascript
commands: {
  whoami: 'Muhammad Uzair Ajmal (Full Stack & AI Software Engineer)',
  role: 'Full Stack Developer • AI / CV Specialist • Frontend Architect',
  stack: '[TypeScript, Python, JavaScript, Next.js, Node.js, PostgreSQL, OpenCV, Docker]',
  status: '🟢 Available for select roles, freelance contracts, and research collaborations.',
  github: 'https://github.com/Uzair272',
  ...
}
```

---

## 📬 Connecting a Real Contact Form (Formspree or Backend)

By default, the contact form validates input and opens a pre-formatted email draft addressed to `uzairfts272@gmail.com`.

### To connect Formspree (Free & No Server Needed):
1. Create a free account at [https://formspree.io](https://formspree.io).
2. Create a new form and copy your endpoint URL (e.g., `https://formspree.io/f/xyzabcop`).
3. In [index.html](file:///c:/Development/Uzair/Uzair272/index.html), update the `<form>` element:
   ```html
   <form class="contact-form" id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. In [js/script.js](file:///c:/Development/Uzair/Uzair272/js/script.js), modify `handleSubmit`:
   ```javascript
   fetch('https://formspree.io/f/YOUR_FORM_ID', {
     method: 'POST',
     body: new FormData(this.form),
     headers: { 'Accept': 'application/json' }
   }).then(...)
   ```

---

## 🌐 Deploying to GitHub Pages (100% Free Static Hosting)

Since your repository is named `Uzair272`, you can host the portfolio directly at `https://uzair272.github.io/uzair272`:

1. **Commit your files and push to GitHub:**
   ```bash
   git add .
   git commit -m "feat: launch modern developer portfolio and GitHub profile README"
   git push origin main
   ```
2. **Enable GitHub Pages:**
   - Go to your repository on GitHub: `https://github.com/Uzair272/Uzair272`
   - Click **Settings** (top tabs) → Click **Pages** (left sidebar).
   - Under **Build and deployment** → **Source**, select `Deploy from a branch`.
   - Under **Branch**, select `main` and folder `/ (root)`.
   - Click **Save**.
3. Within 1–2 minutes, your website will be live at:
   `https://uzair272.github.io/uzair272/`

### Connecting a Custom Domain (e.g. `uzairajmal.dev`):
1. In repository **Settings** → **Pages** → **Custom domain**, enter your domain.
2. At your domain registrar (e.g. Namecheap, Cloudflare, GoDaddy), add the CNAME record:
   - Host: `@` or `www`
   - Value: `uzair272.github.io`
3. Check the box **Enforce HTTPS** on GitHub Pages.

---

## 📝 Checklists of Placeholders to Replace
- [ ] Replace `assets/resume/resume_placeholder.pdf` with your personal PDF resume.
- [ ] Replace `[YOUR LOCATION]` in the About section if you wish to display your specific city/country (currently defaults to "Open to Remote & Global Collaborations").
- [ ] (Optional) Add your personal profile photograph to `assets/images/` and update the avatar `src` attribute in `index.html`.
