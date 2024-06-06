import { nextui } from "@nextui-org/react";
import { color } from "framer-motion";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./section/**/*.{js,ts,jsx,tsx,mdx}",
    "./componets/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "blue-theme": "#070789",
        "gray-font": "#555555",
        "title-color": "#012970",
        "error-color": "#F31260",
        "navigation-item":"#899BBD",
        "navigation-subitem":"#4154F1",
        "light-black":"#323232"
      },
      backgroundColor: {
        "blue-theme": "#070789",
        "light-blue-theme": "#F1F3F6",
        "navigation-item-bg":"rgba(237, 243, 255)",
        "error-color": "#F31260",
        "light-blue-bg":"#F6F9FF",
        "gray-color":"#f4f4f5"
      },
      dropShadow: {
        "text-shadow": "0 4px 4px rgba(0, 0, 0, 0.25)",
        'navigation': '0 0 20px 0 rgba(0, 0, 0, 0.5)'
      },
      zIndex: {
        999999: "999999",
        99999: "99999",
        9999: "9999",
        999: "999",
        99: "99",
        9: "9",
        1: "1",
      },
      boxShadow: {
        'custom': '0 4px 4px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          secondary: {
            DEFAULT: "#070789",
          },
          warning:{
            DEFAULT: "#FFFFFF",
          }
        },
      },
    },
  })],
};
export default config;
