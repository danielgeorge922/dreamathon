/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Existing animations
      animation: {
        pulseBlurHealthy: 'pulseBlur 1.33s ease-out infinite', // 80 BPM
        pulseBlurCHF: 'pulseBlur 0.75s ease-out infinite', // 110 BPM
        scroll: 'scroll 45s linear infinite', // Scrolling effect for the carousel
      },
      keyframes: {
        // Existing pulse blur animation
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
        // New scrolling keyframe for the carousel
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
};