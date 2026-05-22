/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
<<<<<<< HEAD
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
=======
        // Stitch Design System - Modern Literary Theme
        primary: "#041627",         // Library Blue - Authority and depth
        'primary-container': "#1a2b3c", // Lighter Library Blue for containers
        'on-primary': "#ffffff",    // White text on primary
        secondary: "#5e5e5b",       // Dark gray - Secondary actions
        tertiary: "#151516",        // Almost black - High contrast elements
        surface: "#fbf9f8",         // Paper - Warm, comfortable background
        'surface-variant': "#e4e2e2", // Soft paper variant
        'on-surface': "#1b1c1c",    // Soft Charcoal - Text
        'on-surface-variant': "#44474c", // Muted Charcoal
        outline: "#74777d",         // Border color
        'outline-variant': "#c4c6cd", // Light border
        stone: "#e8e4d9",           // Neutral stone - Dividers
        error: "#ba1a1a",           // Error red
        'on-error': "#ffffff",      // Text on error
        background: "#fbf9f8",      // Paper background
      },
      fontFamily: {
        sans: ["'Inter'", "sans-serif"],
        display: ["'Playfair Display'", "serif"],
      },
      borderRadius: {
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
      },
      spacing: {
        unit: "0.5rem",  // 8px base unit
      },
      boxShadow: {
        // Soft, diffused shadows for elevation
        'elevation-1': "0 2px 4px rgba(4, 22, 39, 0.08)",
        'elevation-2': "0 5px 10px rgba(4, 22, 39, 0.12)",
        'elevation-3': "0 8px 16px rgba(4, 22, 39, 0.15)",
      },
>>>>>>> 9e3f8ba (feat: replace legacy bookstore-login with new online-bookstore frontend and update backend security and service configurations.)
    },
  },
  plugins: [],
}