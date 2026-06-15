/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Coastal market palette
        ocean: '#0f4c5c', // deep teal (primary)
        deep: '#0a3540', // darker teal for headers
        coral: '#e36414', // warm accent (prawn/chilli)
        amber: '#f4a259', // soft highlight
        seafoam: '#5f9ea0', // muted aqua
        sand: '#f3f7f7', // pale background
        shell: '#ffffff',
        ink: '#1f2a2e',
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
