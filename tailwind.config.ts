import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ["var(--font-manrope)", "sans-serif"]
      },
      colors: {
        primary: {
          50: "#eef6ff",
          100: "#d9eaff",
          200: "#b5d6ff",
          300: "#8bbcff",
          400: "#5c99ff",
          500: "#3b76f6",
          600: "#2258d9",
          700: "#1a44ae",
          800: "#1d3b8a",
          900: "#1d346f"
        }
      },
      backgroundImage: {
        "discipline-grid":
          "radial-gradient(circle at 1px 1px, rgba(59, 118, 246, 0.2) 1px, transparent 0)"
      },
      backgroundSize: {
        "discipline-grid": "40px 40px"
      },
      boxShadow: {
        glow: "0 20px 45px -20px rgba(59, 118, 246, 0.5)"
      }
    }
  },
  plugins: []
};

export default config;
