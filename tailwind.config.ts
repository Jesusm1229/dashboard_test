import baseConfig from "./packages/ui/tailwind.config"
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  presets: [baseConfig],
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

