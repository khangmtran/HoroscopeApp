/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // NOTE: Add custom colors, fonts, etc. here.
      colors: {
        primary: "#1E40AF",
        secondary: "#FBBF24",
      },
    },
  },
  plugins: [],
}