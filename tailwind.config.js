/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        pokemon: {
          red: '#FF0000',
          blue: '#3B82F6',
          yellow: '#FFD700',
          green: '#10B981',
          purple: '#8B5CF6',
        }
      },
      fontFamily: {
        'pokemon': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
