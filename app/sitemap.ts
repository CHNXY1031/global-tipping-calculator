import type { MetadataRoute } from "next";
import { tippingData } from "@/lib/tippingData";

const baseUrl = "https://global-tipping-calculator.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, lastModified: new Date("2026-08-26"), changeFrequency: "weekly", priority: 1 },
    ...tippingData.map((country) => ({ url: `${baseUrl}/tipping-in-${country.slug}`, lastModified: new Date("2026-08-26"), changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
