# Dency Desai — Portfolio

Personal portfolio site. Built as a static HTML/CSS/JS site — no framework, no build step, no dependencies to install.

🔗 **Live site:** _add your deployed URL here once published_

## About

Full-stack developer profile covering backend (Node.js, Express, TypeScript) and frontend (Angular, TypeScript) work — REST APIs, authentication/RBAC, real-time systems, and the ERP/booking/media platforms built on top of them at Nexotips Infotech.

The hero section renders the profile as a mock `GET /dency-desai` API response, and each project is laid out like an endpoint doc (method + path + stack tags) to match the actual day-to-day work.

## Tech

- HTML5
- CSS3 (custom properties, no framework)
- Vanilla JavaScript (typing animation, mobile nav)
- Google Fonts: Space Grotesk, Inter, JetBrains Mono

## Structure

```
portfolio/
├── index.html          # all page content
├── style.css           # design tokens + layout
├── script.js           # hero typing effect + mobile nav
├── resume-backend.pdf   # backend-focused résumé
└── resume-frontend.pdf  # frontend-focused résumé
```

## Running locally

No build tools required. Either:

- Open `index.html` directly in a browser, or
- Serve it locally so relative paths/fonts behave the same as in production:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Then visit `http://localhost:8000`.

## Deployment

Static files only — deploy anywhere that serves HTML.

**GitHub Pages**
1. Push this repo to GitHub.
2. Settings → Pages → Source: `main` branch, `/ (root)`.
3. Site goes live at `https://<username>.github.io/<repo-name>`.

**Netlify / Vercel / Cloudflare Pages**
Drag and drop this folder onto the dashboard — live in seconds, no config needed.

## Updating content

All copy lives in `index.html`. Skills, experience, and project cards are plain markup — edit directly, no templating layer.

## Contact

- Email: desaidency8@gmail.com
- LinkedIn: [linkedin.com/in/dency-desai](https://www.linkedin.com/in/dency-desai/)
- GitHub: [@dency-nexotips](https://github.com/dency-nexotips)

## License

Personal project — feel free to reference the structure, but the content (résumé details, project descriptions) is specific to Dency Desai.
