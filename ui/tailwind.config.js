/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#080a1a",
        subMain: "#F20000",
        dry: "#0B0F29",
        star: "#FFB000",
        text: "#c0c0c0",
        dryGray: "#e0d5d5",
        border: "#4b5563",
      },
      height: {
        header: "560px",
        rate: "400px",
      },
      fontSize: {
        h1: "2.6rem",
      },
      screens: {
        xs: "475px",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
