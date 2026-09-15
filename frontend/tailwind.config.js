/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // <-- Yahan yeh line add karni hai
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}