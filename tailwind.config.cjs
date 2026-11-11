/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./index.html"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        // Unified design tokens — matches CSS vars in index.css
        primary:      "#050816",
        secondary:    "#94a3b8",
        tertiary:     "#0b1030",
        "black-100":  "#100d25",
        "black-200":  "#090325",
        "white-100":  "#f3f3f3",
        accent:       "#6366f1",
        "accent-alt": "#8b5cf6",
        // CSS Variable mapped tokens for inner pages
        "bg-primary": "var(--bg-primary)",
        "bg-surface": "var(--bg-surface)",
        "bg-surface-raised": "var(--bg-surface-raised)",
        "border-subtle": "var(--border-subtle)",
        "border-focus": "var(--border-focus)",
        "color-indigo": "var(--color-indigo)",
        "color-violet": "var(--color-violet)",
        "color-orange": "var(--color-orange)",
        "text-main": "var(--text-main)",
        "text-muted": "var(--text-muted)",
        "track-web": "var(--track-web)",
        "track-sec": "var(--track-sec)",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
