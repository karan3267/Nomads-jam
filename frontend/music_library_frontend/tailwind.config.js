/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height:{
        "1/10": "10%",
        "1/8":"12.5%%",
        "7/8":"87.5%",
        "9/10":"90%"
      },
      backgroundColor:{
        "not-black":"#121212",
      }
    },
  },
  plugins: [],
}

