/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A962',
          dark: '#A68B3F',
          light: '#E8D5A3',
          muted: 'rgba(201, 169, 98, 0.15)',
        },
        luxury: {
          black: '#0C0C0C',
          gray: '#1C1C1E',
          charcoal: '#2A2A2E',
          beige: '#F5F3EF',
          cream: '#FAF8F5',
        },
        soft: {
          gray: '#F7F6F4',
          beige: '#FAF9F7',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4BC7A 0%, #C9A962 50%, #A68B3F 100%)',
        'hero-gradient': 'linear-gradient(180deg, rgba(12,12,12,0.55) 0%, rgba(12,12,12,0.25) 45%, rgba(12,12,12,0.75) 100%)',
        'nav-gradient': 'linear-gradient(180deg, rgba(12,12,12,0.4) 0%, transparent 100%)',
      },
      boxShadow: {
        'luxury': '0 4px 24px -4px rgba(0, 0, 0, 0.08)',
        'luxury-lg': '0 12px 40px -8px rgba(0, 0, 0, 0.12)',
        'gold-glow': '0 4px 20px rgba(201, 169, 98, 0.25)',
        'card': '0 2px 12px rgba(0, 0, 0, 0.04), 0 8px 32px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(201, 169, 98, 0.08)',
      },
      borderRadius: {
        'luxury': '2px',
        'card': '4px',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out both',
        'fade-in-up': 'fade-in-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.97)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
