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
        'primary': '#1B5E20',
        'accent': '#F9A825',
        'bg': '#FAFAFA',
        'text': '#212121',
        'success': '#2E7D32',
        'danger': '#C62828',
        // Legacy colors for gradual migration
        'primary-red': '#D7263D',
        'charcoal-black': '#1E1E24',
        'neutral-gray': '#F5F5F5',
        'accent-blue': '#0177FB',
        'text-main': '#111111',
        'text-white': '#fff',
      },
      fontFamily: {
        'heading': ['Outfit', 'Space Grotesk', 'sans-serif'],
        'body': ['Inter', 'DM Sans', 'sans-serif'],
        'outfit': ['Outfit', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'dm-sans': ['DM Sans', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} 