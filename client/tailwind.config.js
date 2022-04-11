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
        background: '#581c87',
        bgColor: '#fdf2f8',
        textPrimary: '#f3e8ff',
        textSecondary: '#d4d4d4',
        lightText: '#9ca3af'
      }
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
