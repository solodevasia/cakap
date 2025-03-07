/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/**/*.component.{html,ts}"],
  theme: {
    extend: {
      colors: {
        caption: "rgb(104, 102, 119)",
        "card-title": "rgb(42, 42, 48)",
        icon: "rgb(104, 102, 119)",
        currency: "rgb(0, 105, 177)",
        "disable-currency": "rgb(175, 173, 197)",
      },
      padding: {
        nav: "8px 2%",
      },
      boxShadow: {
        nav: "0 2px 8px #0000000d",
        card: "0 2px 6px #0000001a",
      },
    },
  },
  plugins: [],
};
