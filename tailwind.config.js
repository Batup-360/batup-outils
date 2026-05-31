/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f5ff',
          400: '#7076F1',
          500: '#5859e0',
          600: '#5368EE',
          700: '#4748c7',
          dark: '#151515',
        },
      },
    },
  },
  plugins: [],
};
