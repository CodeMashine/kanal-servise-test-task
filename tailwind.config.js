/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'orange': 'rgb(228,176,98)',
        'blue-water' : 'rgb(39,86,156)'
      } ,
      spacing: {
        '9/20': '48%',
      }
    },
  },
  plugins: [],
}
