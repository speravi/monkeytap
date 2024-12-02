/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ["Roboto Mono", "monospace"],
      },
      colors: {
        text: "var(--color-text)",
        background: "var(--color-background)",
        elementBg: "var(--color-elementBg)",
        active: "var(--color-active)",
        inactive: "var(--color-inactive)",
      },
    },
  },
  plugins: [],
};
