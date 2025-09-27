// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        slideDown: 'slideDown 0.7s ease-out',
        fadeUp: 'fadeUp 1s ease-out 0.5s forwards', // starts after box finishes
      },
    },
    fontFamily: {
      dancing: ['"Dancing Script"', 'cursive'],
    },
  },
  plugins: [],
};
