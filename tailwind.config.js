/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{vue,js,ts,jsx,tsx}',
    './components/**/*.{vue,js,ts,jsx,tsx}',
    './layouts/**/*.{vue,js,ts,jsx,tsx}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Oswald', 'sans-serif'],
      },
      colors: {
        'clearwhite': '#FFFFFF',
        'white': '#EEEEEE',
        'lightgrey': '#E0E0E0',
        'grey': '#7A7A7A',
        'black': '#1C211F',
        'red': '#E8524B',
        'lightgreen': '#C2E0D2',
        'green': '#68B68B',
        'darkgreen': '#0A755B',
      },
      body: {
        'bg': '#EEEEEE',
      },
    },
  },
  plugins: [],
}

