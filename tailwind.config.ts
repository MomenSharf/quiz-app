import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";

const config = withUt({
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
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
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: "hsl(var(--success))",
        // Base Colors
        "green-dark": "hsl(var(--green-dark))",
        red: "hsl(var(--red))",
        orange: "hsl(var(--orange))",
        amber: "hsl(var(--amber))",
        "light-green": "hsl(var(--light-green))",
        blue: "hsl(var(--blue))",
        "blue-dark": "hsl(var(--blue-dark))",
        "blue-extra-dark": "hsl(var(--blue-extra-dark))",
        teal: "hsl(var(--teal))",
        "pink-dark": "hsl(var(--pink-dark))",
        pink: "hsl(var(--pink))",
        "purple-dark": "hsl(var(--purple-dark))",
        yellow: "hsl(var(--yellow))",
        "deep-orange": "hsl(var(--deep-orange))",
        navy: "hsl(var(--navy))",
        indigo: "hsl(var(--indigo))",

        // Gray Colors
        "gray-light": "hsl(var(--gray-light))",
        "gray-medium": "hsl(var(--gray-medium))",
        "gray-dark": "hsl(var(--gray-dark))",
        "gray-extra-dark": "hsl(var(--gray-extra-dark))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}) satisfies Config;

export default config;
