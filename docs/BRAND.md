# Brand Guidelines & Asset Architecture

This document defines the brand assets, usage rules, derivative generation pipeline, and implementation specifications for **Prathamesh Chiddarwar's** personal portfolio and professional identity.

---

## 1. Asset Registry & Role Mapping

All source artwork is archived untouched in `/brand-source/`. Optimized WebP and PNG derivatives are produced via `npm run brand` (`scripts/build-brand-assets.mjs`).

| Asset Role | Source File (`/brand-source/`) | Trimmed Dimensions | Derivatives Generated (`src/assets/brand/`) | Public / Export Target |
| :--- | :--- | :--- | :--- | :--- |
| **1. Full-Color Icon** | `logo-icon-color-raw.png` | 848 × 845 px (centered square) | `logo-icon-48.{webp,png}`<br>`logo-icon-96.{webp,png}`<br>`logo-icon-192.{webp,png}` | `brand-export/github-avatar-500x500.png`<br>`brand-export/linkedin-profile-400x400.png` |
| **2. Favicon Mark** | `logo-favicon-raw.png` | 538 × 536 px (centered square) | Embedded in public favicon builds | `public/favicon.ico` (16, 32, 48px)<br>`public/favicon-16x16.png`<br>`public/favicon-32x32.png`<br>`public/apple-touch-icon.png`<br>`public/android-chrome-192x192.png`<br>`public/android-chrome-512x512.png` |
| **3. Horizontal Lockup** | `logo-horizontal-color-raw.png` | 868 × 194 px (~4.47 : 1) | `logo-horizontal-240.{webp,png}`<br>`logo-horizontal-320.{webp,png}`<br>`logo-horizontal-480.{webp,png}`<br>`logo-horizontal-640.{webp,png}` | `brand-export/linkedin-banner-1584x396.png`<br>`brand-export/email-sig-400w.png` |
| **4. Stacked Lockup** | `logo-stacked-color-raw.png` | 681 × 411 px (~1.66 : 1) | `logo-stacked-240.{webp,png}`<br>`logo-stacked-400.{webp,png}`<br>`logo-stacked-640.{webp,png}` | `public/og-image.png` (1200 × 630 px) |
| **5. Mono Black Lockup** | `logo-mono-black-raw.png` | 958 × 202 px (~4.74 : 1) | `logo-mono-black-horizontal-{240,320,480,640}`<br>`logo-mono-black-icon-{48,96,192}` | `brand-export/email-sig-400w-black.png` |
| **6. Mono White Lockup** | `logo-mono-white-raw.png` | 958 × 202 px (~4.74 : 1) | `logo-mono-white-horizontal-{240,320,480,640}`<br>`logo-mono-white-icon-{48,96,192}` | Used in footer copyright row & dark watermarks |

---

## 2. Color Palette & Dual-Track Identity

The portfolio maintains strict visual parity between **Web Development** and **Cybersecurity**:

| Token | Hex | RGB | Usage |
| :--- | :--- | :--- | :--- |
| **Navy Canvas** | `#050816` | `rgb(5, 8, 22)` | Primary dark background across all routes, favicon canvas, og-image background |
| **Tertiary Navy** | `#151030` | `rgb(21, 16, 48)` | Bento cards, tile background, elevated surfaces |
| **Web Dev Accent** | `#6366f1` | `rgb(99, 102, 241)` | Indigo accent: Web development badges, primary CTA button, active nav border |
| **Cybersecurity Accent** | `#8b5cf6` | `rgb(139, 92, 246)` | Violet accent: Cybersecurity badges, research highlights, gradient endpoints |
| **Secondary Text** | `#aaa6c3` | `rgb(170, 166, 195)` | Body copy, meta descriptions, unselected nav links |
| **Pure White** | `#ffffff` | `rgb(255, 255, 255)` | Primary titles, mono-white asset fill |
| **Pure Black** | `#000000` | `rgb(0, 0, 0)` | Mono-black asset fill, print output |

---

## 3. Placement Architecture

### Primary Navigation Header (`Navbar.jsx`)
- **Variant:** `icon` (Full color)
- **Rendered Size:** `36 × 36 px` (desktop & mobile header), `32 × 32 px` (mobile drawer brand row)
- **Attributes:** `priority={true}`, `decorative={true}`
- **Accompanying Typography:** "Prathamesh Chiddarwar" in bold white, with dual-track badge `"DEV · SEC"` (hidden below 480px).

### Initial Lifecycle Loader (`Loader.jsx`)
- **Variant:** `icon` (Full color)
- **Rendered Size:** `96 × 96 px`
- **Session Guard:** Skips if `sessionStorage.getItem('portfolio_loaded')` is true or if `prefers-reduced-motion` is active. Hard cap ≤ 1.2s.
- **Budget:** Preloaded/critical under 5 KB WebP.

### Global Footer (`Footer.jsx`)
- **Brand Column:** `<Logo variant="horizontal" tone="color" height={56} />`
- **Bottom Copyright Row:** `<Logo variant="icon" tone="white" height={22} decorative />` beside `© {year} Prathamesh Chiddarwar`.

### 404 Error Page (`NotFoundPage.jsx`)
- **Center Hero:** `<Logo variant="stacked" tone="color" width={280} priority />` centered above the 404 gradient display.

### About Page (`AboutPage.jsx`)
- **Profile Snapshot Tile:** `<Logo variant="icon" tone="color" width={110} height={110} decorative />` centered in the author snapshot bento tile.

---

## 4. Minimum Dimensions & Clear Space

To preserve legibility of fine letterforms and the segmented gradient ring, minimum sizes are strictly enforced:

| Variant | Minimum Width | Minimum Height | Safe Margin / Clear Space |
| :--- | :--- | :--- | :--- |
| `icon` | `24 px` | `24 px` | Equal to 25% of icon height on all sides |
| `horizontal` | `160 px` | `36 px` | Equal to height of the "PC" mark on left/right, 50% above/below |
| `stacked` | `120 px` | `72 px` | Equal to 30% of mark width on all sides |

---

## 5. Implementation Component (`<Logo />`)

The application renders brand graphics exclusively through `src/components/shared/Logo.jsx`:

```jsx
import Logo from './components/shared/Logo';

// Header icon
<Logo variant="icon" tone="color" height={36} priority decorative />

// Footer horizontal brand
<Logo variant="horizontal" tone="color" height={56} />

// Centered stacked mark
<Logo variant="stacked" tone="color" width={280} />

// Mono white icon
<Logo variant="icon" tone="white" height={22} decorative />
```

### Component Properties

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'icon' \| 'horizontal' \| 'stacked'` | `'icon'` | Chooses artwork layout |
| `tone` | `'color' \| 'white' \| 'black'` | `'color'` | Chooses color treatment |
| `width` | `number` | Auto | Width in pixels (computes height automatically to prevent CLS) |
| `height` | `number` | Auto | Height in pixels (computes width automatically to prevent CLS) |
| `priority` | `boolean` | `false` | Sets `loading="eager"`, `fetchpriority="high"`, `decoding="sync"` |
| `decorative` | `boolean` | `false` | Sets `alt=""` and `aria-hidden="true"`; otherwise renders full descriptive alt |
| `href` | `string` | `undefined` | Wraps component in React Router `<Link to={href}>` |

---

## 6. Do's and Don'ts

### Do
- Always use the `<Logo />` component rather than raw `<img>` tags.
- Always provide either `width` or `height` so explicit pixel dimensions prevent Cumulative Layout Shift (CLS).
- Keep transparent padding clean using the automated `npm run brand` build pipeline.
- Use mono-white on dark badges or subtle watermarks.
- Use mono-black for print stylesheets (`@media print`).

### Don't
- **Never stretch or alter aspect ratios.**
- **Never apply CSS filters, drop shadows, or glow overlays directly onto the logo artwork.**
- **Never place the full-color horizontal logo over bright or busy backgrounds** where the light typography loses contrast.
- **Never use bitmap rasterization without srcset.** The component generates 1x, 2x, and 3x densities for Retina displays.
- **Never edit derivatives manually.** All files in `src/assets/brand/`, `public/`, and `brand-export/` are compiled deterministically from `/brand-source/`.
