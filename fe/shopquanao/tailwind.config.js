/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
          progress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        fall: {
          '0%': { 
            transform: 'translateY(-100px) rotate(0deg)', 
            opacity: 1 
          },
          '100%': { 
            transform: 'translateY(100vh) rotate(360deg)', 
            opacity: 0.5 
          },
        },
      },
      animation: {
        fall: 'fall 5s linear forwards',
    progressLoop: "progressLoop 2s ease-in-out infinite alternate",

      },
    },
  },
  plugins: [],
} 