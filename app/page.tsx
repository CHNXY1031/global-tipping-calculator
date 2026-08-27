import Link from "next/link";
import { ArrowRight, BadgeCheck, Globe2, Languages, MapPin, ReceiptText, ShieldCheck, Sparkles } from "lucide-react";
import TipCalculator from "@/components/TipCalculator";
import { popularCountrySlugs, tippingData } from "@/lib/tippingData";

const popularCountries = popularCountrySlugs.map((slug) => tippingData.find((country) => country.slug === slug)).filter(Boolean);
const regions = ["Europe", "Asia", "Americas", "Oceania", "Middle East", "Africa"] as const;

export default function Home() {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Global Tipping Etiquette & Calculator",
    url: "https://global-tipping-calculator.vercel.app",
    applicationCategory: "TravelApplication",
    operatingSystem: "Any",
    description: "A free global tipping calculator and etiquette guide for travellers.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <main id="top" className="min-h-screen overflow-hidden bg-cream text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, "\\u003c") }} />
      <header className="relative z-40 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight"><span className="grid size-10 place-items-center rounded-full bg-forest text-cream"><Globe2 size={20} /></span><span>Gratuity Atlas</span></Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-8 text-sm font-medium text-forest/70 md:flex"><a href="#calculator" className="hover:text-forest">Calculator</a><a href="#destinations" className="hover:text-forest">Country guides</a><a href="#how-it-works" className="hover:text-forest">How it works</a></nav>
        <a href="#calculator" className="rounded-full border border-forest/15 px-4 py-2 text-sm font-semibold text-forest transition hover:bg-forest hover:text-white">Calculate a tip</a>
      </header>

      <section className="relative mx-auto max-w-7xl px-5 pb-20 pt-12 lg:px-8 lg:pt-20">
        <div className="pointer-events-none absolute -right-40 top-0 size-[32rem] rounded-full bg-sage/20 blur-3xl" /><div className="pointer-events-none absolute -left-56 top-64 size-[28rem] rounded-full bg-[#d8bd88]/10 blur-3xl" />
        <div className="relative mx-auto max-w-3xl text-center"><span className="eyebrow">Travel confidently · Tip respectfully</span><h1 className="mt-7 font-serif text-5xl leading-[1.02] tracking-[-0.04em] text-forest sm:text-7xl">Know what to tip,<br /><em className="font-normal text-gold">wherever you land.</em></h1><p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-ink/65 sm:text-lg">Instant calculations, service-charge clarity, and local etiquette for restaurants, taxis, hotels, and bars in {tippingData.length} destinations.</p><div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs font-semibold text-forest/60"><span className="flex items-center gap-2"><ShieldCheck size={15} /> No sign-up</span><span className="flex items-center gap-2"><Languages size={15} /> Local customs</span><span className="flex items-center gap-2"><BadgeCheck size={15} /> Free to use</span></div></div>
        <div id="calculator" className="relative mt-12 scroll-mt-6"><TipCalculator /></div>
      </section>

      <section id="destinations" className="bg-white px-5 py-20 lg:px-8"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-gold">Popular travel guides</p><h2 className="mt-3 max-w-xl font-serif text-4xl tracking-tight text-forest sm:text-5xl">Arrive knowing the local custom.</h2></div><p className="max-w-md text-sm leading-6 text-ink/55">From service compris in Paris to no-tip hospitality in Tokyo, each guide explains what locals actually do.</p></div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{popularCountries.map((country) => country && <Link key={country.iso} href={`/tipping-in-${country.slug}`} className="group flex items-center gap-4 rounded-2xl border border-forest/10 bg-cream/35 p-5 transition hover:-translate-y-0.5 hover:border-forest/25 hover:bg-cream"><span className="text-3xl" aria-hidden>{country.flag}</span><span><span className="block text-xs uppercase tracking-wider text-ink/40">Tipping in</span><span className="font-semibold text-forest">{country.name}</span></span><ArrowRight className="ml-auto text-forest/35 transition group-hover:translate-x-1 group-hover:text-forest" size={17} /></Link>)}</div>
        <div className="mt-10 flex flex-wrap gap-2">{regions.map((region) => <span key={region} className="rounded-full border border-forest/10 px-4 py-2 text-xs font-medium text-forest/65">{region} · {tippingData.filter((item) => item.region === region).length}</span>)}</div></div></section>

      <section id="how-it-works" className="px-5 py-20 lg:px-8"><div className="mx-auto max-w-7xl"><div className="mx-auto max-w-2xl text-center"><p className="text-xs font-bold uppercase tracking-[.18em] text-gold">A better travel habit</p><h2 className="mt-3 font-serif text-4xl text-forest sm:text-5xl">Three checks before you tip</h2></div><div className="mt-12 grid gap-5 md:grid-cols-3">{[
          { icon: MapPin, step: "01", title: "Choose your destination", copy: "Get the local baseline, not a one-size-fits-all percentage." },
          { icon: ReceiptText, step: "02", title: "Check the receipt", copy: "Look for included service, cover charges, or automatic gratuity before adding more." },
          { icon: Sparkles, step: "03", title: "Reward the service", copy: "Select the right scenario, adjust for the experience, and split the final amount." },
        ].map(({ icon: Icon, step, title, copy }) => <article key={step} className="rounded-[1.5rem] border border-forest/10 bg-white p-7"><div className="flex items-center justify-between"><span className="grid size-11 place-items-center rounded-2xl bg-forest text-cream"><Icon size={19} /></span><span className="font-serif text-3xl text-gold/45">{step}</span></div><h3 className="mt-7 text-lg font-semibold text-forest">{title}</h3><p className="mt-2 text-sm leading-6 text-ink/55">{copy}</p></article>)}</div></div></section>

      <footer className="bg-forest px-5 py-10 text-white lg:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center"><div><p className="flex items-center gap-2 font-semibold"><Globe2 size={18} /> Gratuity Atlas</p><p className="mt-2 text-xs text-white/45">Practical guidance, not a substitute for checking the latest local bill.</p></div><div className="flex flex-wrap gap-5 text-xs text-white/55"><a href="#top" className="hover:text-white">Back to top</a><Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link><a href="https://uptime-pulse-saas.vercel.app/?utm_source=global-tipping-calculator&amp;utm_medium=referral&amp;utm_campaign=protected_by" target="_blank" rel="noopener noreferrer" className="underline decoration-white/20 underline-offset-4 hover:text-white">Protected by UptimePulse — Free Website &amp; SSL Monitor</a></div></div></footer>
    </main>
  );
}
