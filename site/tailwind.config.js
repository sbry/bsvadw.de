module.exports = {
    // purge: [],
    // purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    purge: ["./components/**/*.js", "./pages/**/*.js"],
    darkMode: "media", // or 'media' or 'class'
    theme: {
        extend: {
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
