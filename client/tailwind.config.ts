import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        "gilroy": ["var(--font-gilroy)"]
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, #DDA82A 0%, #4461F2 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
