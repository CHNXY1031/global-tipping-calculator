import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({ src: "./fonts/GeistVF.woff", variable: "--font-geist-sans", weight: "100 900", display: "swap" });
const baseUrl = "https://global-tipping-calculator.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: { default: "Global Tipping Etiquette & Calculator | Gratuity Atlas", template: "%s | Gratuity Atlas" },
  description: "Calculate the right tip and understand restaurant, taxi, hotel, and bar etiquette across 150+ countries and travel destinations.",
  applicationName: "Gratuity Atlas",
  alternates: { canonical: "/" },
  verification: { google: "google4bf79fc737f0ba77" },
  openGraph: {
    type: "website",
    url: baseUrl,
    siteName: "Gratuity Atlas",
    title: "Global Tipping Etiquette & Calculator",
    description: "Tip confidently, anywhere. Local etiquette and instant calculations for 150+ destinations.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Gratuity Atlas — Tip confidently, anywhere." }],
  },
  twitter: { card: "summary_large_image", title: "Global Tipping Etiquette & Calculator", description: "Tip confidently, anywhere.", images: ["/og.png"] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#123c32" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} antialiased`}>{children}</body></html>;
}
