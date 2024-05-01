/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,vue}",
  ],
  theme: {
    extend: {
      aria: 'current="page"',
      screens: {
        'md-custom': '934px',
      },
    },
  },
  plugins: [],
}

