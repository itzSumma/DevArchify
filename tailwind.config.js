// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // নিশ্চিত করুন আপনার সব ফোল্ডার এখানে আছে
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
  plugins: [],
};
export default config;