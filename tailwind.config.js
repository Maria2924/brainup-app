/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        ins: ["InstrumentSans_400Regular"],
        insM: ["InstrumentSans_500Medium"],
        insS: ["InstrumentSans_600SemiBold"],
        insB: ["InstrumentSans_700Bold"],
      }
    },
  },
  plugins: [],
}
