/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./index.html"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        // Unified design tokens — matches CSS vars in index.css
        primary:      "#050816",
        secondary:    "#aaa6c3",
        tertiary:     "#151030",
        "black-100":  "#100d25",
        "black-200":  "#090325",
        "white-100":  "#f3f3f3",
        accent:       "#6366f1",
        "accent-alt": "#8b5cf6",
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
