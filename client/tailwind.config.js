/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primaryDark: "#22d3ee",
                primary: "#06b6d4",
                light: {
                    text: "#000000",
                    a: "#f1f5f9",
                    b: "#e2e8f0",
                    c: "#cbd5e1",
                },

                dark: {
                    text: "#ffffff",
                    a: "#475569",
                    b: "#334155",
                    c: "#1e293b",
                },
            },
            boxShadow: {
                primary: "0 20px 60px -10px #d21e32",
            },
            keyframes: {
                "fade-in": {
                    "0%": { opacity: 0 },
                    "100%": { opacity: 1 },
                },
            },
            animation: {
                "fade-in": "fade-in ease-in-out 300ms",
            },

            fontFamily: {
                "nunito-bold": ["Nunito-Bold", "system-ui"],
            },
        },
    },
    plugins: [],
};
