module.exports = {
  darkMode: 'class',
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
