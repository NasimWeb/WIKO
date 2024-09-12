/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'custom': '320px calc(100% - 320px)',
        'blog' : '1000px calc(100% - 1000px)',
        'sidepanel' : '800px calc(100% - 800px)',
        'userPanel' : '1000px calc(100% - 1000px)'
      },
    },
  },
  plugins: [],
}

