/* eslint-disable @typescript-eslint/no-var-requires */
const preset = require('posy-fnb-core/dist/preset.cjs')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './core/view/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [preset],
  theme: {
    extend: {
      colors: {
        error: '#CB3A31',
        'secondary-border': '#CCC4F6',
      },
      boxShadow: {
        modal: '0px -6px 24px rgba(0, 0, 0, 0.15);',
      },
    },
  },
}
