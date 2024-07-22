/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00796B',
          light: '#4DB6AC',
        },
        secondary: '#FF7F50',
        background: '#F8F9FA',
        text: '#2C3E50',
        accent: {
          yellow: '#FFF59D',
          lavender: '#E1BEE7',
        },
      },
    },
  },
  plugins: [],
}