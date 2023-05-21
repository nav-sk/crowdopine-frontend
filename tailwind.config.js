module.exports = {
    content: ["./src/**/*.{html,js,jsx}", "./public/*.html"],
    theme: {
        extend: {
            colors: {

                "Wood": "#CFA190",
                "Sandal": "#FFEECF",
                "Pink": "#D36582",
                "DBlue": "#253C78",
                "Blue": "#2B59C3"
            },
            fontFamily: {
                "barlow": "Barlow"
            }
        },

    },
    plugins: [require('@tailwindcss/line-clamp')],
}
