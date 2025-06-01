import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#7BD4F7",
        "faded-black": "#1F1F1F",
        "faded-red": "#FF9090",
        "soft-gray": "#D9D9D9",
        "soft-black": "#131313",
        "faint-gray": "#BDBDBD",
        "faint-black": "#393939",
        "light-gray": "#7A7A7A",
        "dim-gray": "#212121",
      },
    },
  },
  plugins: [],
} satisfies Config;
