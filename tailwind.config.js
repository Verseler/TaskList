/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'secondary' : '#F9F9F9',
        'primary' : '#FFD747'
      },
    },
  },
  darkMode: 'media',
  plugins: [],
}

