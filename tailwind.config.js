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
        'background': '#0F0F0F',
        'accent': '#FFD700',
        'green-highlight': '#006400',
        'text': '#FFFFFF',
        'text-secondary': '#B0B0B0',
        'dark': '#0F0F0F',
        'dark-gray': '#1A1A1A',
        'light-gray': '#2A2A2A',
        'accent-blue': '#38BDF8',
        'accent-rose': '#F43F5E',
      },
      fontFamily: {
        'heading': ['Montserrat', 'Oswald', 'sans-serif'],
        'body': ['Inter', 'Lato', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'oswald': ['Oswald', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'satoshi': ['Satoshi', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 