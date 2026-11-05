/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          light: '#9BCD80',
          DEFAULT: '#75A06A',
          dark: '#274D1C',
        },
        charcoal: {
          light: '#272826',
          DEFAULT: '#1F1F1F',
          dark: '#161618',
        },
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
        'marquee-reverse': 'marquee-reverse 35s linear infinite',
        'marquee-vertical-down': 'marquee-vertical-down 20s linear infinite',
        'marquee-vertical-up': 'marquee-vertical-up 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'marquee-vertical-down': {
          '0%': { transform: 'translateY(-50%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        'marquee-vertical-up': {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
