/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#333f50',
        'dark-deep': '#2a3340',
        gold: '#c4a006',
      },
    },
  },
  plugins: [],
}
