/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#0066CC",
          50: "#E6F2FF",
          100: "#CCE5FF",
          200: "#99CBFF",
          300: "#66B0FF",
          400: "#3396FF",
          500: "#0066CC",
          600: "#0052A3",
          700: "#003D7A",
          800: "#002952",
          900: "#001429",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#4A90E2",
          50: "#EBF4FC",
          100: "#D6E9F9",
          200: "#ADD3F3",
          300: "#85BCED",
          400: "#5CA6E7",
          500: "#4A90E2",
          600: "#2E7AD3",
          700: "#2461A8",
          800: "#1A477C",
          900: "#0F2E51",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "#00C4B4",
          50: "#E6FBF9",
          100: "#CCF7F3",
          200: "#99EFE7",
          300: "#66E7DB",
          400: "#33DFCF",
          500: "#00C4B4",
          600: "#009D90",
          700: "#00766C",
          800: "#004E48",
          900: "#002724",
          foreground: "hsl(var(--accent-foreground))",
        },
        healing: {
          blue: "#0066CC",
          lightBlue: "#E6F2FF",
          teal: "#00C4B4",
          green: "#10B981",
          warmGray: "#F3F4F6",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "Open Sans", "system-ui", "sans-serif"],
        heading: ["Poppins", "Inter", "system-ui", "sans-serif"],
        body: ["Open Sans", "Roboto", "system-ui", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-in-up": {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "slide-in-down": {
          from: { transform: "translateY(-20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "scale-in": {
          from: { transform: "scale(0.95)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in-up": "slide-in-up 0.4s ease-out",
        "slide-in-down": "slide-in-down 0.4s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
