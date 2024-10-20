const config = {
  content: ["./index.html", "./pages/**/*.{jsx,js}", "./src/**/*.{js,jsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      xl: "1280px",
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "40px",
          sm: "40px",
          md: "25px",
          xl: "30px",
        },
      },
      colors: {
        main: "#508C9B",
        accent: "#201E43",
        secondAccent: "#134B70",
      },
    },
  },
  plugins: [],
};
export default config;
