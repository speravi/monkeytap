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
        serika_dark: {
          text: "#D1D0C5",
          background: "#323437",
          elementBg: "#2C2E31",
          active: "#D1B71C",
          inactive: "#636669",
        },
        theme_2: {
          text: "#D1D0C5",
          background: "#333333",
          elementBg: "#2c3e50",
          active: "#1abc9c",
          inactive: "#7f8c8d",
        },
      },
    },
  },
  plugins: [],
};
