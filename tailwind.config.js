/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,scss}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  daisyui: {
    styled: true,
    base: true,
    utils: true,
    logs: false,

    themes: [
      {
        enterprise: {
          primary: "#2563eb",
          "primary-focus": "#1d4ed8",
          "primary-content": "#ffffff",

          secondary: "#0f172a",
          "secondary-content": "#ffffff",

          accent: "#10b981",
          "accent-content": "#ffffff",

          neutral: "#1e293b",
          "neutral-content": "#ffffff",

          "base-100": "#ffffff",
          "base-200": "#f8fafc",
          "base-300": "#e2e8f0",
          "base-content": "#0f172a",

          info: "#3b82f6",
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444",
        },
      },
      "light",
    ],
  },
};
