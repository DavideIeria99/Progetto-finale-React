/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        flash: "flash 1s ease infinite both",
      },
      keyframes: {
        flash: {
          "0%": {
            boxShadow: "0 0 12px 0 white",
          },
          "100%": {
            boxShadow: "none",
          },
        },
      },
      colors: {
        primary: "var (--primary)",
        secondary: "var (--secondary)",
        accent: "var (--accent)",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss", "flowbite/plugin"],
};
