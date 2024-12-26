const colors = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme');
const { nextui } = require('@nextui-org/react');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',  // Make sure this includes all your component files
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/contexts/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      extend: "light", // <- inherit default values from dark theme
      fontSize: {
        base: ['18px', '24px'],
      },
      fontFamily: {
        sans: ['var(--font-catamaran)', ...fontFamily.sans],
      },
    },
  },
  plugins: [nextui()],
};
