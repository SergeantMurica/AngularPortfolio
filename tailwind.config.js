import 'tailwindcss/typography'
import 'src/app.css'

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                main: 'var(--color-main)',
                secondary: "var(--color-secondary)",
                headingText: "var(--color-headingText)",
                bodyText: "var(--color-bodyText)",
                captionText: "var(--color-captionText)",
                activeLink: "var(--color-activeLink)",
                inactiveLink: "var(--color-inactiveLink)",
                shadow: "var(--color-shadow)",
                border: "var(--color-border)",
                container: "var(--color-container)",
                background: "var(--color-background)",
                shading: "var(--color-shading)",
                highlight: "var(--color-highlight)",
            },
        },
    },
    plugins: [],
};
