/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'aussie-green': '#00843D',
        'gold': '#FFD700',
        // Modern dark theme colors
        'dark': '#0F0F0F',
        'dark-gray': '#1A1A1A',
        'light-gray': '#2A2A2A',
        'accent-blue': '#38BDF8',
        'accent-rose': '#F43F5E',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'satoshi': ['Satoshi', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 