const Color = require("color");
const colors = require("tailwindcss/colors");

const alpha = (clr, val) => Color(clr).alpha(val).rgb().string();
const lighten = (clr, val) => Color(clr).lighten(val).rgb().string();
const darken = (clr, val) => Color(clr).darken(val).rgb().string();

const foo = (clr, val) => Color(clr).blacken(val).rgb().string();

const brand = {
  primary: colors.teal["700"],
  "primary-lighter": lighten(colors.teal["700"], 0.4),
  "primary-darker": darken(colors.teal["700"], 0.4),
  "primary-darkest": foo(colors.teal["700"], 0.8),
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand,
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar"), require("@tailwindcss/typography")],
};
