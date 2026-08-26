import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://global-tipping-calculator.vercel.app/sitemap.xml",
    host: "https://global-tipping-calculator.vercel.app",
  };
}
