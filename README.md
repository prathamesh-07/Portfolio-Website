# Prathamesh Chiddarwar — Personal Portfolio

Portfolio website for Prathamesh Chiddarwar — Computer Science student specializing in Cyber Security and Forensics at MIT World Peace University, Pune, and Full-Stack Developer.

**Live URL:** https://prathamesh-07.github.io/

---

## Architecture & Disciplines

The portfolio is structured around two equal technical disciplines:
1. **Web Development Track:** Full-stack systems, React/Next.js/Node/Express, CMS backends with JWT authentication, component design systems, and AWS/Vercel/Firebase cloud infrastructure.
2. **Cybersecurity Track:** Penetration testing, vulnerability assessments (Wireshark, Nmap, Nessus, Burp Suite, Metasploit), ISO 27001 compliance, CTF competitions (HackMIT 5th Rank), and published IEEE Xplore research into real-time AI deepfake audio detection.

---

## Route Map (Exactly 4 Core Pages)

| Route | View | Description |
|---|---|---|
| `/` | **Home** | **Frozen homepage** with original 3D canvases (Computers, Earth, Balls, Stars), tilt cards, and updated factual resume data. |
| `/about` | **About** | 12-column Bento Grid: Bio, Equal Tracks split, DelPat & IEEE timeline, Education, and Skills grouped by track. |
| `/projects` | **Projects** | Filterable Bento Grid (`?track=all\|web\|cybersecurity`), featured IEEE Xplore paper tile, project cards, and accessible in-place modal case studies. |
| `/contact` | **Contact** | 12-column Bento Grid: EmailJS contact form (with honeypot & validation), direct links, verified Pune location, and copy email button. |
| `/404` | **404** | Minimal branded fallback with instant navigation back to verified routes. |

*Note: Legacy routes (`/experience`, `/skills`, `/research`, `/projects/:id`) automatically redirect to `/about` and `/projects`.*

---

## Setup & Local Development

### 1. Prerequisites
- Node.js v18+ (tested on Node v22)
- npm or pnpm

### 2. Environment Variables
Create a `.env` file at the root of the project (copy from `.env.example`):

```bash
cp .env.example .env
```

Set your EmailJS credentials:
```env
VITE_APP_EMAILJS_SERVICE_ID=your_service_id
VITE_APP_EMAILJS_TEMPLATE_ID=your_template_id
VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

### 3. Install & Run

```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### 4. Deploying to GitHub Pages

```bash
npm run deploy
```
*The build automatically emits `public/404.html` to guarantee clean client-side routing on GitHub Pages.*

---

## Content Management (Single Source of Truth)

All textual data and project metadata live in two synchronized locations:
- `src/constants/index.js` (powers the frozen homepage components)
- `src/constants/data.js` (powers the inner pages and metadata)

To edit or add project links:
1. Open `src/constants/index.js` or `src/constants/data.js`.
2. Update the `projects` or `experiences` arrays.
3. Save and run `npm run build`.

---

## Verification & Deliverables Summary

- **EmailJS Verification:** Handled via `@emailjs/browser` preserving exact service, template, and public key environment variable contracts. Includes client-side validation, invisible honeypot field, and in-form status alerts (no intrusive alerts).
- **Session Loader:** Displayed strictly on the first visit of a session via `sessionStorage`, respects `prefers-reduced-motion`, branded with "PC" monogram and progress indicator, hard cap ≤ 1.2s.
- **Two-Track Equal Weighting:** Both Web Development (`#6366f1`) and Cybersecurity (`#8b5cf6`) receive equal visual prominence, badge markers, and equal representation across all pages.
- **Responsive Layout:** Verified across 375px (mobile), 768px (tablet), 1024px (laptop), and 1440px+ (desktop).
