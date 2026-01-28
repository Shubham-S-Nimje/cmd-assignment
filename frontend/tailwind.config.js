/** @type {import('tailwindcss').Config} */
module.exports = {
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
        primary: "#c40414",
        secondary: "#FFF4C5",
        trinary: "#FBBC05",
        body: "#9DB2BF",
        gray: "#808080",
        white: "#ffffff",
        black: "#000000",
        red: "#FF0000",
        green: "#008000",
        blue: "#0000FF",
        yellow: "#FFFF00",
        golden: "#FFD700",
        orange: "#FF8600",
      },
    },
  },
  plugins: [],
};
