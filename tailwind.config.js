/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        100: "25rem",
        112: "28rem",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "synthwave", "cupcake", "dark"],
  },
};
