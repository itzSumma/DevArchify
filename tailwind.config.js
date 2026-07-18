import type { Config } from "tailwindcss";
// ১. HeroUI প্লাগিন ইমপোর্ট করুন
const { heroui } = require("@heroui/react");

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    // ২. HeroUI-এর পাথ যোগ করুন
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "border-spin": "border-spin 4s linear infinite",
      },
      keyframes: {
        "border-spin": {
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  darkMode: "class",
  // ৩. প্লাগিন হিসেবে যোগ করুন
  plugins: [heroui()],
};

export default config;