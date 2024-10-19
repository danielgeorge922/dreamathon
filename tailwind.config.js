/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        pulseBlurHealthy: 'pulseBlur 1.33s ease-out infinite', // 80 BPM
        pulseBlurCHF: 'pulseBlur 0.75s ease-out infinite', // 110 BPM
      },
      keyframes: {
        pulseBlur: {
          '0%': {
            transform: 'scale(1)',
            opacity: '1',
            filter: 'blur(0px)',
          },
          '100%': {
            transform: 'scale(1.5)',
            opacity: '0',
            filter: 'blur(10px)',
          },
        },
      },
    },
  },
  plugins: [],
};