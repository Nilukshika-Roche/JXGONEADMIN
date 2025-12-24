/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(249, 115, 22, 0.08), 0 2px 10px -2px rgba(0, 0, 0, 0.04)',
        'premium': '0 20px 25px -5px rgba(249, 115, 22, 0.1), 0 10px 10px -5px rgba(249, 115, 22, 0.04)',
        'dark-soft': '0 4px 20px -2px rgba(0, 0, 0, 0.4), 0 2px 10px -2px rgba(0, 0, 0, 0.2)',
      },
      backgroundImage: {
        'orange-gradient': 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
      }
    },
  },
  plugins: [],
}
