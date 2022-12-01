module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Nunito", "sans-serif"],
      serif: ["Nunito", "serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
