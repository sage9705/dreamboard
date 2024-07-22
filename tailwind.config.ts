import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00796B',
          light: '#4DB6AC',
        },
        secondary: '#FF7F50',
        background: {
          light: '#F8F9FA',
          dark: '#2C3E50',
        },
        text: {
          light: '#2C3E50',
          dark: '#F8F9FA',
        },
        accent: {
          yellow: '#FFF59D',
          lavender: '#E1BEE7',
        },
      },
    },
  },
  plugins: [],
}

export default config