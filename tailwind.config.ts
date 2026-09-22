import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        red: {
          brand: "#FF0000",
          soft: "#ffd9d9",
          softer: "#ffe0e0",
          tint: "#ffdada",
        },
        ink: {
          DEFAULT: "#0a0a0a",
          deep: "#050505",
          pure: "#000000",
          panel: "#0d0d0d",
          card: "#111111",
          line: "#1c1c1c",
          edge: "#262626",
          field: "#333333",
        },
        mute: {
          100: "#e7e7e7",
          200: "#d8d8d8",
          300: "#c9c9c9",
          400: "#b5b5b5",
          500: "#8a8a8a",
          600: "#7a7a7a",
          700: "#6a6a6a",
        },
      },
      fontFamily: {
        display: ["var(--font-poppins)", "Helvetica", "sans-serif"],
        body: ["var(--font-barlow)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
