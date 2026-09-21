import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#1A56DB",
          blueHover: "#1243B0",
          light: "#E8F0FE",
          dark: "#0f172a",
          surface: "#1e293b",
        },
      },
    },
  },
  plugins: [],
};
export default config;
