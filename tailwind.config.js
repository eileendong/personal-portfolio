/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        desktop: '#008080', // classic Win98 teal desktop
        silver: '#c0c0c0',
      },
    },
  },
  plugins: [],
}
