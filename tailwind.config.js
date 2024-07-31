/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          0: '#0d1823',
          0.5: '#0f1f2e',
          1: '#1b2937',
          1.5: '#212a32',
          2: '#424d5b',
          3: '#697280',
          6: '#2d2d42',
          9: '#0d161e',
        }, 
        lite: {
          1: '#f2f3f5',
          1.5: '#d9d9d9',
          2: '#d0d5db',
          2.5: '#e5e7eb',
          3: '#45474a',
        }
      },
      screens: {
        'xs': '500px',
        'sm': '640px',
        'md': '768px',
        'lg-md': '830px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      }
    },
  },
  plugins: [],
}

