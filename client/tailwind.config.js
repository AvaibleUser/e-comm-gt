module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        pastel: {
          primary: "#818cf8",
          secondary: "#14b8a6",
          accent: "#ed9cdf",
          neutral: "#151A23",
          "base-100": "#1f2937",
          info: "#38bdf8",
          success: "#22c55e",
          warning: "#eab308",
          error: "#fb7185",
        },
      },
    ],
  },
};
