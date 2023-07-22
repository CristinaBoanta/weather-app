/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-color': '#160b36',
        'main-color-light': '#4e3f66',
        'main-color-dark': '#0f0725'
      },
    },
  },
  plugins: [],
}

