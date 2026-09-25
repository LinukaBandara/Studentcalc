import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0F172A",
        emerald: { DEFAULT: "#059669", dark: "#047857" },
        mint: "#D1FAE5",
        offwhite: "#F8FAFC",
        slate: "#64748B",
        borderc: "#E2E8F0",
        warning: "#B45309",
        error: "#B91C1C",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "14px",
      },
    },
  },
  plugins: [],
};

export default config;
