/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        backgroundColor: "var(--background-color)",
        foregroundColor: "var(--foreground-color)",
        primaryText: "var(--primary-text-color)",
        secondaryText: "var(--secondary-text-color)",
      },
    },
  },
  plugins: [],
};
