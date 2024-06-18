/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    colors: {
      apple: {
        50: "#f0faeb",
        100: "#dff3d4",
        200: "#c1e8ae",
        300: "#99d87e",
        400: "#75c655",
        500: "#509e33",
        600: "#408828",
        700: "#336823",
        800: "#2c5321",
        900: "#27481f",
        950: "#11270c",
      },
      greenvogue: {
        50: "#eef9ff",
        100: "#d9f2ff",
        200: "#bce8ff",
        300: "#8edcff",
        400: "#59c5ff",
        500: "#33a9fe",
        600: "#1c8bf4",
        700: "#1573e0",
        800: "#185db5",
        900: "#19508f",
        950: "#143055",
      }
    },
  },
  plugins: [],
};
