import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        clay: {
          bg: "#F5EDE3",
          card: "#E8DDD0",
          primary: "#C67B5C",
          secondary: "#8FAE8B",
          dark: "#3D3229",
          muted: "#7A6E62",
          shadow: "#C8BFB0",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        clay: "20px",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "float-reverse": "float-reverse 7s ease-in-out infinite",
        "clay-bounce": "clay-bounce 1.2s ease-in-out infinite",
        "bounce-slow": "bounce 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-20px) rotate(3deg)" },
          "66%": { transform: "translateY(-10px) rotate(-2deg)" },
        },
        "float-reverse": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(15px) rotate(-3deg)" },
          "66%": { transform: "translateY(8px) rotate(2deg)" },
        },
        "clay-bounce": {
          "0%, 100%": {
            transform: "translateY(0) scaleX(1) scaleY(1)",
            animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
          },
          "30%": {
            transform: "translateY(-40px) scaleX(0.95) scaleY(1.05)",
            animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
          },
          "50%": {
            transform: "translateY(0) scaleX(1.08) scaleY(0.92)",
          },
          "65%": {
            transform: "translateY(-15px) scaleX(0.98) scaleY(1.02)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
