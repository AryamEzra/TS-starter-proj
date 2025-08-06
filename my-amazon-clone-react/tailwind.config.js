/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    colors: {
      amazon: {
        DEFAULT: '#131921',
        light: '#232F3E',
      },
    },
  },
};
export const plugins = [
  require('@tailwindcss/forms'),
  require('@tailwindcss/line-clamp'),
];
