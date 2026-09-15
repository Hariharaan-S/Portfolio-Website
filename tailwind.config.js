/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./views/**/*.ejs",
    "./public/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "space-dark": "#0B0F19",
        "card-dark": "#131A26",
        "cyber-cyan": "#00F2FE",
        "terminal-green": "#39FF14",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};
