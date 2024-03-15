module.exports = {
    // purge: [],
    // purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    purge: ["./components/**/*.js", "./pages/**/*.js"],



    darkMode: "media", // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                green: {
                    900: "#20782Dff",
                    800: "#398744ff",
                    700: "#52965Cff",
                    600: "#6AA573ff",
                    500: "#83B48Aff",
                    400: "#9CC3A2ff",
                    300: "#B5D2B9ff",
                    200: "#CDE1D0ff",
                    100: "#E6F0E8ff",
                    50: "#FFFFFFff"
                },
            },
            screens: {
                'dark': {'raw': '(prefers-color-scheme: dark)'},
                // => @media (prefers-color-scheme: dark) { ... }
            }
        },

    },
    variants: {
        extend: {},
    },
    plugins: [],
}
