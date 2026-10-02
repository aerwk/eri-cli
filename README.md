# N5HQ homepage

One-screen N5HQ homepage for www.n5hq.me. Static site, no dependencies, no install step.

- Serve locally: `python3 -m http.server 8741` from this directory, open http://localhost:8741/
- After editing `assets/css/**`: `node scripts/build-css.js` (or `npm run build:css`), then commit the rebuilt `assets/css/style.css`.
- Deploy: separate Vercel project, no framework, no build command (`style.css` is committed built). Config, security headers and legacy redirects are in `vercel.json`; `.vercelignore` keeps repo-only files out of the deploy.
- Fonts and Three.js are covered by THIRD_PARTY_NOTICES.md; LICENSE.md is the original author's.
