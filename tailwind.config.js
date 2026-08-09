export default {
  darkMode: 'class',
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        ink: '#141a26',
        'ink-soft': '#1c2431',
        paper: '#f8fafc',
        saffron: '#FF9933',
        indiagreen: '#138808',
      },
      fontFamily: {
      display: ['Bricolage Grotesque', 'sans-serif'],
      sans: ['Inter', 'ui-sans-serif', 'sans-serif'],
    },
    },
  },
  plugins: [],
}
