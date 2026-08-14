/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0F172A",
          deepNavy: "#0A0F1D",
          blue: "#1E3A8A",
          orange: "#F97316",
          cyan: "#06B6D4",
          slate: "#64748B",
          light: "#F8FAFC"
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}