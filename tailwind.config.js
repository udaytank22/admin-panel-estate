/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "login-gradient": "linear-gradient(180deg, #1E3A8A 0%, #60A5FA 100%)",
      },
    }
  },
  plugins: [],
}

