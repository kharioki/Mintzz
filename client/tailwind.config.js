module.exports = {
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff1493',
        secondary: '#333333',
      }
    },
  },
  variants: {},
  plugins: [],
}
