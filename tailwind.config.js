/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{ts,tsx,scss}'],
  darkMode: ['class'],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: `Montserrat, sans-serif, serif`
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
