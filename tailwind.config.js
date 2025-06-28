/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue1: '#32ACFC',
        blue2: '#0F4C75',
        darkblue: '#073757',
        darkblue2: '#031623',
        darkblue3: '#02111a',
        teal: '#20c997',
        black1: '#1B262C',
        black2: '#0F1D26',
      },
      animation: {
        slide: 'slide 0.1s linear',
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(-100%)' },
          // '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
