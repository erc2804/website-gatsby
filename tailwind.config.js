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
        "heading-1": ["1.5rem"],
        subheading: [
          "1.25rem",
          {
            lineHeight: "1.875rem",
          },
        ],
      },
      colors: {
        brand: {
          blue: "#05386B",
          green: {
            "high-lvl": "#379683",
            "medium-lvl": "#5CDB95",
            "low-lvl": "#8EE4AF",
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
        typo: {
          "high-lvl": "#332A2A",
          "medium-lvl": "#645454",
          "low-lvl": "#B6A0A0",
        },
      },
    },
  },
};
