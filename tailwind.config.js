/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
      },
      colors: {
        'modal-background-dark': '#18181b',
        'modal-background-light': '#FBFBFB',
        'component-background-dark': '#111111',
        'component-background-light': '#F3F4F6',
        'border-color-dark': '#2a2a2e',
        'border-color-light': '#E5E7EB',
        'accent-color': '#c4c4c4',
        'unselected-text': '#746F6F',
        'shadow-element-dark': '#242424',
        'shadow-element-light': '#E5E5E5',
        'success-green': '#57FFC0',
        'loading-yellow': '#FECE51',
        'failure-red': '#DB6666',
        'tooltip-green': '#2A4239',
        'hover-green': '#42CE9A',
        'hover-red': '#B05353',
      },
      borderWidth: {
        1: '1px',
      },
      animation: {
        // Add this section
        'pulse-ring': 'pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
        'pulse-dot': 'pulse-dot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite',
      },
      keyframes: {
        // And this section
        'pulse-ring': {
          '0%': { transform: 'scale(.33)' },
          '80%, 100%': { opacity: '0' },
        },
        'pulse-dot': {
          '0%': { transform: 'scale(.8)' },
          '50%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(.8)' },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    // ...
  ],
};
