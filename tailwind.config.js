/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        "pacifico" : ["Pacifico", "cursive"],
        "poppins" : ["Poppins", 'sans-serif']
      },
      minHeight : {
        'calc-100-minus-318px': 'calc(100% - 318px)',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

