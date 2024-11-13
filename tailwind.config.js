// eslint-disable-next-line no-undef
const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

const customVariants = plugin(({ addVariant, e }) => {
  addVariant("custom-theme", ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      const element = e(`custom-theme${separator}${className}`);
      return `.custom-theme .${element}`;
    });
  });
});

// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      amber: colors.amber,
      red: colors.red,
    },
    fontSize: {
      xs: [
        "0.75rem",
        {
          lineHeight: "1rem",
        },
      ],
      sm: [
        "0.875rem",
        {
          lineHeight: "1.25rem",
        },
      ],
      base: [
        "1rem",
        {
          lineHeight: "1.5rem",
        },
      ],
      lg: [
        "1.125rem",
        {
          lineHeight: "1.75rem",
        },
      ],
      xl: [
        "1.25rem",
        {
          lineHeight: "1.75rem",
        },
      ],
      "2xl": [
        "1.5rem",
        {
          lineHeight: "2rem",
        },
      ],
      "3xl": [
        "1.875rem",
        {
          lineHeight: "2.25rem",
        },
      ],
      "4xl": [
        "2.25rem",
        {
          lineHeight: "2.5rem",
        },
      ],
      "5xl": [
        "3rem",
        {
          lineHeight: "3rem",
        },
      ],
      "6xl": [
        "3.75rem",
        {
          lineHeight: "3.75rem",
        },
      ],
      "7xl": [
        "4.5rem",
        {
          lineHeight: "4.5rem",
        },
      ],
      "8xl": [
        "6rem",
        {
          lineHeight: "6rem",
        },
      ],
      "9xl": [
        "6rem",
        {
          lineHeight: "8rem",
        },
      ],
    },
    extend: {
      colors: {
        primary: "#2563EB",
        secondary: "#4B5563",
        error: "#DC2626",
        danger: "#CF202F",
        warning: "#D97706",
        success: "#059669",
        "gray-50": "#F9FAFB",
        "gray-100": "#F3F4F6",
        "gray-200": "#E5E7EB",
        "gray-300": "#D1D5DB",
        "gray-400": "#9CA3AF",
        "gray-500": "#6B7280",
        "gray-600": "#4B5563",
        "gray-700": "#374151",
        "gray-800": "#1F2937",
        "gray-900": "#111827",

        "red-50": "#FEF2F2",
        "red-100": "#FEE2E2",
        "red-200": "#FECACA",
        "red-300": "#FCA5A5",
        "red-400": "#F87171",
        "red-500": "#EF4444",
        "red-600": "#DC2626",
        "red-700": "#B91C1C",
        "red-800": "#991B1B",
        "red-900": "#7F1D1D",

        "orange-50": "#FFF7ED",
        "orange-100": "#FFEDD5",
        "orange-200": "#FED7AA",
        "orange-300": "#FDBA74",
        "orange-400": "#FB923C",
        "orange-500": "#F97316",
        "orange-600": "#EA580C",
        "orange-700": "#C2410C",
        "orange-800": "#9A3412",
        "orange-900": "#7C2D12",

        "yellow-50": "#FFFBEB",
        "yellow-100": "#FEF3C7",
        "yellow-200": "#FDE68A",
        "yellow-300": "#FCD34D",
        "yellow-400": "#FBBF24",
        "yellow-500": "#F59E0B",
        "yellow-600": "#D97706",
        "yellow-700": "#B45309",
        "yellow-800": "#92400E",
        "yellow-900": "#78350F",

        "green-50": "#ECFDF5",
        "green-100": "#D1FAE5",
        "green-200": "#A7F3D0",
        "green-300": "#6EE7B7",
        "green-400": "#34D399",
        "green-500": "#10B981",
        "green-600": "#059669",
        "green-700": "#047857",
        "green-800": "#065F46",
        "green-900": "#064E3B",

        "teal-50": "#F0FDFA",
        "teal-100": "#CCFBF1",
        "teal-200": "#99F6E4",
        "teal-300": "#5EEAD4",
        "teal-400": "#2DD4BF",
        "teal-500": "#14B8A6",
        "teal-600": "#0D9488",
        "teal-700": "#0F766E",
        "teal-800": "#115E59",
        "teal-900": "#134E4A",

        "cyan-50": "#ECFEFF",
        "cyan-100": "#CFFAFE",
        "cyan-200": "#A5F3FC",
        "cyan-300": "#67E8F9",
        "cyan-400": "#22D3EE",
        "cyan-500": "#06B6D4",
        "cyan-600": "#0891B2",
        "cyan-700": "#0E7490",
        "cyan-800": "#155E75",
        "cyan-900": "#164E63",

        "light-blue-50": "#F0F9FF",
        "light-blue-100": "#E0F2FE",
        "light-blue-200": "#BAE6FD",
        "light-blue-300": "#7DD3FC",
        "light-blue-400": "#38BDF8",
        "light-blue-500": "#0EA5E9",
        "light-blue-600": "#0284C7",
        "light-blue-700": "#0369A1",
        "light-blue-800": "#075985",
        "light-blue-900": "#0C4A6E",

        "blue-50": "#EFF6FF",
        "blue-100": "#DBEAFE",
        "blue-200": "#BFDBFE",
        "blue-300": "#93C5FD",
        "blue-400": "#60A5FA",
        "blue-500": "#3B82F6",
        "blue-600": "#2563EB",
        "blue-700": "#1D4ED8",
        "blue-800": "#1E40AF",
        "blue-900": "#1E3A8A",

        "indigo-50": "#EEF2FF",
        "indigo-100": "#E0E7FF",
        "indigo-200": "#C7D2FE",
        "indigo-300": "#A5B4FC",
        "indigo-400": "#818CF8",
        "indigo-500": "#6366F1",
        "indigo-600": "#4F46E5",
        "indigo-700": "#4338CA",
        "indigo-800": "#3730A3",
        "indigo-900": "#312E81",

        "purple-50": "#F5F3FF",
        "purple-100": "#EDE9FE",
        "purple-200": "#DDD6FE",
        "purple-300": "#C4B5FD",
        "purple-400": "#A78BFA",
        "purple-500": "#8B5CF6",
        "purple-600": "#7C3AED",
        "purple-700": "#6D28D9",
        "purple-800": "#5B21B6",
        "purple-900": "#4C1D95",

        "pink-50": "#FDF2F8",
        "pink-100": "#FCE7F3",
        "pink-200": "#FBCFE8",
        "pink-300": "#F9A8D4",
        "pink-400": "#F472B6",
        "pink-500": "#EC4899",
        "pink-600": "#DB2777",
        "pink-700": "#BE185D",
        "pink-800": "#9D174D",
        "pink-900": "#831843",

        "rose-50": "#FFF1F2",
        "rose-100": "#FFE4E6",
        "rose-200": "#FECDD3",
        "rose-300": "#FDA4AF",
        "rose-400": "#FB7185",
        "rose-500": "#F43F5E",
        "rose-600": "#E11D48",
        "rose-700": "#BE123C",
        "rose-800": "#9F1239",
        "rose-900": "#881337",
      },
      boxShadow: {
        "": "0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)",
        sm: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
        lg: "0px 0px 0px 1px rgba(0, 0, 0, 0.05), 0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)",
      },
    },
  },
  plugins: [customVariants],
};
