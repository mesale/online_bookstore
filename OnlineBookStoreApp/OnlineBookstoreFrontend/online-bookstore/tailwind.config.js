/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E63946",       // red accent (from the "See The Book" buttons)
        surface: "#F8F9FA",       // light gray background
        card: "#FFFFFF",
        textMain: "#1A1A2E",
        textMuted: "#6B7280",
        highlight: "#FFF3E0",     // warm yellow highlight (from featured card)
      },
      fontFamily: {
        sans: ["'DM Sans'", "sans-serif"],
        display: ["'Playfair Display'", "serif"],
      },
    },
  },
  plugins: [],
}