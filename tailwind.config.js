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
          DEFAULT: "12px",
          sm: "15px",
          md: "25px",
          xl: "30px",
        },
      },
    },
  },
  plugins: [],
};
export default config;
