/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2BD17E",
        error: "#EB5757",
        background: "#093545",
        input: "#224957",
        card: "#092C39",
      },
      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        "heading-1": ["64px", { lineHeight: "80px", letterSpacing: "0px" }],
        "heading-2": ["48px", { lineHeight: "56px", letterSpacing: "0px" }],
        "heading-3": ["32px", { lineHeight: "40px", letterSpacing: "0px" }],
        "heading-4": ["24px", { lineHeight: "32px", letterSpacing: "0px" }],
        "heading-5": ["20px", { lineHeight: "24px", letterSpacing: "0px" }],
        "heading-6": ["16px", { lineHeight: "24px", letterSpacing: "0px" }],
        "body-large": ["20px", { lineHeight: "32px" }],
        "body-regular": ["16px", { lineHeight: "24px" }],
        "body-small": ["14px", { lineHeight: "24px" }],
        "body-extra-small": ["12px", { lineHeight: "24px" }],
        caption: ["14px", { lineHeight: "16px" }],
      },
      gridTemplateColumns: {
        custom: "repeat(12, minmax(0, 1fr))",
      },
      spacing: {
        gutter: "24px",
        margin: "120px",
      },
      maxWidth: {
        container: "1440px",
      },
    },
  },
  plugins: [typography],
};
