/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,css}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'rgb(224 224 224 / <alpha-value>)',
        background: 'rgb(5 5 5 / <alpha-value>)',
        foreground: 'rgb(224 224 224 / <alpha-value>)',
        muted: 'rgb(160 160 160 / <alpha-value>)',
        'muted-foreground': 'rgb(120 120 120 / <alpha-value>)',
        primary: {
          DEFAULT: 'rgb(210 125 89 / <alpha-value>)',
          foreground: 'rgb(255 255 255 / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgb(160 210 235 / <alpha-value>)',
          foreground: 'rgb(5 5 5 / <alpha-value>)',
        },
        accent: 'rgb(160 210 235 / <alpha-value>)',
        popover: 'rgb(10 10 10 / <alpha-value>)',
        card: 'rgb(15 15 15 / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
