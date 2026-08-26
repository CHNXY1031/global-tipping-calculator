import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BedDouble, Beer, Car, CheckCircle2, CircleDollarSign, Globe2, ReceiptText, UtensilsCrossed } from "lucide-react";
import TipCalculator from "@/components/TipCalculator";
import { countryBySlug, tippingData, type ServiceKey } from "@/lib/tippingData";

const baseUrl = "https://global-tipping-calculator.vercel.app";
const serviceIcons = { dining: UtensilsCrossed, taxi: Car, hotel: BedDouble, bar: Beer };

export const dynamicParams = false;

export function generateStaticParams() {
  return tippingData.map((country) => ({ country: `tipping-in-${country.slug}` }));
}

export function generateMetadata({ params }: { params: { country: string } }): Metadata {
  const country = countryBySlug.get(params.country.replace(/^tipping-in-/, ""));
  if (!country) return {};
  const title = `Tipping in ${country.name} 2026: Complete Etiquette & Calculator`;
  const description = `How much should you tip in ${country.name}? See 2026 restaurant, taxi, hotel, and bar etiquette, service-charge advice, and use our free ${country.currencyCode} tip calculator.`;
  const path = `/tipping-in-${country.slug}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "article", url: `${baseUrl}${path}`, title, description, images: [] },
    twitter: { card: "summary", title, description, images: [] },
  };
}

export default function CountryGuidePage({ params }: { params: { country: string } }) {
  const country = countryBySlug.get(params.country.replace(/^tipping-in-/, ""));
  if (!country) notFound();

  const faqs = [
    { question: `Is tipping customary in ${country.name}?`, answer: country.cultureTip.replace("⚠️ ", "") },
    { question: `How much should I tip at restaurants in ${country.name}?`, answer: country.services.dining.guidance },
    { question: `Should I tip taxis and hotel staff in ${country.name}?`, answer: `${country.services.taxi.guidance} For hotels: ${country.services.hotel.guidance}` },
    { question: `Is service charge included in ${country.name}?`, answer: country.serviceChargeNote },
  ];
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };
  const webApplicationSchema = { "@context": "https://schema.org", "@type": "WebApplication", name: `${country.name} Tip Calculator`, url: `${baseUrl}/tipping-in-${country.slug}`, applicationCategory: "TravelApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  const related = tippingData.filter((item) => item.region === country.region && item.iso !== country.iso).slice(0, 4);

  return (
    <main className="min-h-screen bg-cream text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema).replace(/</g, "\\u003c") }} />
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 lg:px-8"><Link href="/" className="flex items-center gap-3 font-semibold tracking-tight"><span className="grid size-10 place-items-center rounded-full bg-forest text-cream"><Globe2 size={20} /></span><span>Gratuity Atlas</span></Link><Link href="/" className="flex items-center gap-2 text-sm font-semibold text-forest/65 hover:text-forest"><ArrowLeft size={16} /> All destinations</Link></header>

      <section className="relative overflow-hidden border-y border-forest/10 px-5 py-16 lg:px-8"><div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-sage/20 blur-3xl" /><div className="relative mx-auto max-w-4xl text-center"><span className="text-6xl" aria-hidden>{country.flag}</span><p className="mt-5 text-xs font-bold uppercase tracking-[.2em] text-gold">2026 local etiquette guide</p><h1 className="mt-4 font-serif text-5xl leading-tight tracking-[-.035em] text-forest sm:text-6xl">Tipping in {country.name}</h1><p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-ink/60">What to leave at restaurants, in taxis, at hotels, and over drinks — with a calculator set to {country.currencyCode}.</p><div className="mt-7 flex flex-wrap justify-center gap-3 text-xs font-semibold text-forest/60"><span className="rounded-full border border-forest/10 bg-white/60 px-4 py-2">{country.region}</span><span className="rounded-full border border-forest/10 bg-white/60 px-4 py-2">Currency · {country.currencyCode}</span><span className="rounded-full border border-forest/10 bg-white/60 px-4 py-2">ISO · {country.iso}</span></div></div></section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="rounded-2xl border border-gold/20 bg-[#f0dfb9]/45 p-5 sm:flex sm:items-start sm:gap-4 sm:p-6"><CircleDollarSign className="mb-3 shrink-0 text-gold sm:mb-0" /><div><h2 className="font-semibold text-forest">The short answer</h2><p className="mt-1 text-sm leading-6 text-ink/65">{country.cultureTip}</p></div></div><div className="mt-8"><TipCalculator initialCountrySlug={country.slug} /></div></section>

      <section className="bg-white px-5 py-20 lg:px-8"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[.18em] text-gold">Scenario-by-scenario</p><h2 className="mt-3 font-serif text-4xl text-forest">How much to tip in {country.name}</h2><div className="mt-9 grid gap-4 md:grid-cols-2">{(Object.keys(country.services) as ServiceKey[]).map((key) => { const rule = country.services[key]; const Icon = serviceIcons[key]; return <article key={key} className="rounded-2xl border border-forest/10 bg-cream/30 p-6"><div className="flex items-start justify-between"><span className="grid size-11 place-items-center rounded-xl bg-forest text-white"><Icon size={19} /></span><strong className="font-serif text-3xl text-gold">{rule.defaultPercent}%</strong></div><h3 className="mt-5 text-lg font-semibold text-forest">{rule.label}</h3><p className="mt-2 text-sm leading-6 text-ink/60">{rule.guidance}</p><p className="mt-4 flex items-center gap-2 text-xs font-medium text-forest/55"><CheckCircle2 size={14} /> Typical range: {rule.options.join("% · ")}%</p></article>; })}</div><div className="mt-6 flex items-start gap-3 rounded-2xl border border-forest/10 p-5"><ReceiptText className="mt-0.5 shrink-0 text-gold" size={19} /><div><h3 className="font-semibold text-forest">Always read the bill</h3><p className="mt-1 text-sm leading-6 text-ink/60">{country.serviceChargeNote}</p></div></div></div></section>

      <section className="mx-auto max-w-4xl px-5 py-20 lg:px-8"><p className="text-center text-xs font-bold uppercase tracking-[.18em] text-gold">Traveller questions</p><h2 className="mt-3 text-center font-serif text-4xl text-forest">{country.name} tipping FAQ</h2><div className="mt-9 space-y-3">{faqs.map((faq, index) => <details key={faq.question} open={index === 0} className="group rounded-2xl border border-forest/10 bg-white p-5"><summary className="cursor-pointer list-none pr-8 font-semibold text-forest marker:hidden">{faq.question}</summary><p className="mt-3 border-t border-forest/10 pt-3 text-sm leading-6 text-ink/60">{faq.answer}</p></details>)}</div></section>

      <section className="bg-forest px-5 py-16 text-white lg:px-8"><div className="mx-auto max-w-7xl"><h2 className="font-serif text-3xl">More {country.region} tipping guides</h2><div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{related.map((item) => <Link key={item.iso} href={`/tipping-in-${item.slug}`} className="group flex items-center gap-3 rounded-xl border border-white/15 p-4 transition hover:bg-white/[.06]"><span className="text-2xl">{item.flag}</span><span className="text-sm font-semibold">{item.name}</span><ArrowRight className="ml-auto text-white/45 transition group-hover:translate-x-1" size={16} /></Link>)}</div></div></section>
    </main>
  );
}
