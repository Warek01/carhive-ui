import type { Config } from 'tailwindcss'

export default {
  content: ['src/**/*.{ts,tsx,scss}'],
  darkMode: ['class'],
  blocklist: ['node_modules/'],
  important: false,
  plugins: [],
  theme: {
    extend: {},
  },
} as Config
