/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{svelte,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        interactive: "var(--color-interactive)",
        danger: "var(--color-danger)",
        warnign: "var(--color-warning)",
        succes: "var(--color-success)",
        info: "var(--color-info)",
        textColor: "var(--color-text)",
        subtext1: "var(--color-subtext1)",
        subtext0: "var(--color-subtext0)",
        overlay2: "var(--color-overlay2)",
        overlay1: "var(--color-overlay1)",
        surface2: "var(--color-surface2)",
        surface1: "var(--color-surface1)",
        surface0: "var(--color-surface0)",
        bgBase: "var(--color-base)",
      },
    },
  },
  plugins: [],
};
