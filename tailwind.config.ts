import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        white: "#FFFFFF",
        black: "#0A0A0A",
        surface: {
          DEFAULT: "#F5F5F5",
          hover: "#EFEFEF",
        },
        border: {
          DEFAULT: "#E5E5E5",
          strong: "#D0D0D0",
        },
        muted: {
          DEFAULT: "#6B6B6B",
          light: "#9B9B9B",
        },
        // Semantic aliases
        background: "#FFFFFF",
        foreground: "#0A0A0A",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        sm: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgb(10 10 10 / 0.06), 0 1px 2px -1px rgb(10 10 10 / 0.06)",
        card: "0 4px 16px -2px rgb(10 10 10 / 0.08), 0 2px 6px -2px rgb(10 10 10 / 0.05)",
        elevated: "0 12px 32px -4px rgb(10 10 10 / 0.1), 0 4px 12px -4px rgb(10 10 10 / 0.07)",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
    },
  },
  plugins: [],
};

export default config;