module.exports = {
  purge: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: {
        "limit-visual-content": "1200px",
        "limit-text-content": "800px",
      },
      fontFamily: {
        sans: ["an-regular", "sans-serif"],
      },
      fontSize: {
        caption: ["0.75rem"],
        base: [
          "1rem",
          {
            lineHeight: "1.6rem",
          },
        ],
        "heading-1": ["2.25rem"],
        "heading-2": ["1.5rem"],
        subheading: [
          "1.25rem",
          {
            lineHeight: "1.875rem",
          },
        ],
      },
      colors: {
        brand: {
          purple: "#46237A",
          blue: "#05386B",
          green: {
            "high-lvl": "#379683",
            "medium-lvl": "#5CDB95",
            "low-lvl": "#AEEBC1",
          },
          sand: "#EDF5E1",
        },
        gray: {
          "max-lvl": "#000000",
          "high-lvl": "#374151",
          "medium-lvl": "#374151",
          "low-lvl": "#D1D5DB",
          "subtle-lvl": "#F3F4F6",
          "min-lvl": "#FFFFFF",
        },
        transparency: {
          "medium-lvl": "rgba(0, 0, 0, 0.66)",
          "low-lvl": "rgba(0, 0, 0, 0.33)",
        },
        typo: {
          "high-lvl": "#332A2A",
          "medium-lvl": "#645454",
          "low-lvl": "#B6A0A0",
          "min-lvl": "#ECDBDB"
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        typing: 'typing 1.8s infinite ease-in-out',
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: 0 },
          "50%": { opacity: 1 },
        },
        typing: {
          '0%': { transform: 'translateY(0px)', backgroundColor: '#6CAD96' },
          '28%': { transform: 'translateY(-7px)', backgroundColor: '#9ECAB9' },
          '44%': { transform: 'translateY(0px)', backgroundColor: '#B5D9CB' },
        },
      },
    },
  },
}
