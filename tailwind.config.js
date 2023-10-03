const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/features/**/*.{js,ts,jsx,tsx}",
  ],
  // https://tailwindcss.com/docs/theme#customizing-the-default-theme
  theme: {
    extend: {
      // Add configs here to extend default theme
      colors: {
        'highlight': "var(--highlight-color)",
        'primary': "var(--primary-color)",
        'secondary': "var(--secondary-color)",
        'tertiary': "var(--tertiary-color)",
        'muted-secondary': "var(--muted-secondary-color)",
        'long-text': "var(--long-text-color)",
        'white': "var(--white-color)",
        'primary-card': "var(--primary-card-color)", // #2c1819 // #1c1010ad
        'primary-border': "var(--primary-border-color)", // #2c1819 // #1c1010ad
        'primary-btn': "#f76f3d",
        // #ff8c7b
        // #ff6f5a
      },
      fontFamily: {
        'main': ["source-serif-pro", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
      },
      animation: {
        'scale-up': 'scale_up 1s linear infinite',
        'scale-up-sm': 'scale_up_sm 1s linear infinite',
        'scale-down': 'scale_down 1s linear infinite',
        'scale-down-lg': 'scale_down_lg 1s linear infinite',
      },
      keyframes: {
        scale_up_sm: {
          '0%, 100%': { transform: 'scale(1.03) ' },
        },
        scale_up: {
          '0%, 100%': { transform: 'scale(1.05) ' },
        },
        scale_down: {
          '0%, 100%': { transform: 'scale(0.98) ' },
        },
        scale_down_lg: {
          '0%, 100%': { transform: 'scale(0.98) ' },
        },
      }
    },
    // Add utils here if you want to override default theme
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('ch', '& > *')
    })
  ],
}
