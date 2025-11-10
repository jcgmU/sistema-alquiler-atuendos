import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F6F7FB",
        primary: { DEFAULT: "#3B5BFF", foreground: "#FFFFFF" },
        card: "#FFFFFF",
        muted: "#94A3B8",
        success: "#22C55E",
        danger: "#EF4444",
      },
      borderRadius: { xl: "1rem", "2xl": "1.25rem" },
      boxShadow: { soft: "0 8px 24px rgba(15,23,42,0.06)" },
    },
  },
  plugins: [],
} satisfies Config;
