/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      brand: { DEFAULT: "#0091d0", dark: "#0178c7", light: "#47bfee", fade: "#e7f5ff" },
      secondary: "#f3f4f9",
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.slate,
      red: colors.red,
      danger: colors.red["500"],
      success: colors.emerald["500"],
    },
    fonts: {
      sans: ["Montserrat", "Helvetica", "Arial", "sans-serif"],
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
