/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5',
          dark: '#4338CA',
        },
        secondary: {
          DEFAULT: '#7C3AED',
          dark: '#6D28D9',
        },
        accent: {
          DEFAULT: '#EC4899',
          dark: '#DB2777',
        },
        dark: {
          DEFAULT: '#1F2937',
          light: '#374151',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 