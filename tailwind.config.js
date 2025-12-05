/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Scan all React files inside the src folder
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom fonts will be loaded via Google Fonts link in index.html
      fontFamily: {
        // Inter is the default font
        sans: ['Inter', 'ui-sans-serif', 'system-ui'], 
      },
    },
  },
  plugins: [],
};
