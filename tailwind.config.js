/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', 'sans-serif']
      },
      colors: {
        'modal-background': '#000000',
        'component-background': '#111111',
        'border-color': '#2a2a2e',
        'accent-color': '#c4c4c4',
        'unselected-text': '#746F6F',
        'shadow-element': '#242424',
        'success-green': '#57FFC0',
        'loading-yellow': '#FECE51',
        'failure-red': '#DB6666',
        'tooltip-green': '#2A4239',
        'hover-green': '#42CE9A',
        'hover-red': '#B05353'
      },
      borderWidth: {
        1: '1px'
      }
    }
  },
  plugins: [
		require("tailwindcss-animate"),
		// ...
	],
}
