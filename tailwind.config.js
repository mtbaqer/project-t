module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Lilita One", "sans-serif"],
      serif: ["Lilita One", "serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
