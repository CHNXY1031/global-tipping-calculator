import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { colors: { cream: "#f6f1e7", forest: "#123c32", ink: "#1d2a27", gold: "#a97938", sage: "#a9b9a4" }, boxShadow: { soft: "0 24px 80px rgba(23, 53, 44, 0.10)" } } },
  plugins: [],
};
export default config;
