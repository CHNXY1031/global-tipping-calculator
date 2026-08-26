"use client";

import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { AlertTriangle, BedDouble, Beer, Calculator, Car, Check, ChevronDown, Database, Minus, Plus, ReceiptText, Search, Sparkles, UtensilsCrossed, Users, Wifi } from "lucide-react";
import { tippingData, type ServiceKey } from "@/lib/tippingData";
import { cn } from "@/lib/utils";

const serviceIcons: Record<ServiceKey, LucideIcon> = { dining: UtensilsCrossed, taxi: Car, hotel: BedDouble, bar: Beer };

export default function TipCalculator({ initialCountrySlug = "italy" }: { initialCountrySlug?: string }) {
  const initialCountry = tippingData.find((item) => item.slug === initialCountrySlug) ?? tippingData[0];
  const [countryIso, setCountryIso] = useState(initialCountry.iso);
  const [query, setQuery] = useState("");
  const [countryOpen, setCountryOpen] = useState(false);
  const [service, setService] = useState<ServiceKey>("dining");
  const [bill, setBill] = useState(120);
  const [tipPercent, setTipPercent] = useState(initialCountry.services.dining.defaultPercent);
  const [people, setPeople] = useState(2);
  const [serviceIncluded, setServiceIncluded] = useState(false);

  const country = tippingData.find((item) => item.iso === countryIso) ?? initialCountry;
  const rule = country.services[service];
  const filteredCountries = useMemo(() => {
    const value = query.trim().toLowerCase();
    return tippingData.filter((item) => !value || item.name.toLowerCase().includes(value) || item.iso.toLowerCase().includes(value)).slice(0, 12);
  }, [query]);
  const totals = useMemo(() => {
    const safeBill = Number.isFinite(bill) ? Math.max(0, bill) : 0;
    const chargedPercent = serviceIncluded ? 0 : tipPercent;
    const tipAmount = safeBill * chargedPercent / 100;
    const total = safeBill + tipAmount;
    return { tipAmount, total, each: total / Math.max(1, people) };
  }, [bill, people, serviceIncluded, tipPercent]);
  const money = (amount: number) => `${country.currencySymbol}${amount.toFixed(2)}`;

  const chooseCountry = (iso: string) => {
    const next = tippingData.find((item) => item.iso === iso) ?? country;
    setCountryIso(next.iso);
    setTipPercent(next.services[service].defaultPercent);
    setServiceIncluded(false);
    setCountryOpen(false);
    setQuery("");
  };

  const chooseService = (key: ServiceKey) => {
    setService(key);
    setTipPercent(country.services[key].defaultPercent);
    setServiceIncluded(false);
  };

  return (
    <section aria-label="Global tip calculator" className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-forest/10 bg-white shadow-soft lg:grid-cols-[1.08fr_.92fr]">
      <div className="p-5 sm:p-9 lg:p-11">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div><p className="text-xs font-bold uppercase tracking-[.18em] text-gold">Smart calculator</p><h2 className="mt-2 font-serif text-3xl text-forest">Plan the perfect tip</h2></div>
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-cream text-forest"><Calculator size={20} /></span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="relative text-sm font-semibold text-forest">
            <label htmlFor="country-search">Destination</label>
            <button type="button" onClick={() => setCountryOpen((open) => !open)} aria-expanded={countryOpen} aria-controls="country-listbox" className="mt-2 flex h-14 w-full items-center justify-between rounded-xl border border-forest/15 bg-cream/60 px-4 text-left outline-none transition hover:border-forest/30 focus:border-forest">
              <span className="truncate"><span className="mr-2 text-lg">{country.flag}</span>{country.name}</span><ChevronDown className={cn("shrink-0 transition", countryOpen && "rotate-180")} size={16} />
            </button>
            {countryOpen && <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-forest/10 bg-white p-2 shadow-2xl">
              <div className="flex items-center gap-2 rounded-xl bg-cream px-3"><Search size={16} className="text-forest/50" /><input id="country-search" autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search country or ISO" className="h-11 min-w-0 flex-1 bg-transparent text-sm font-normal outline-none" /></div>
              <div id="country-listbox" role="listbox" className="mt-2 max-h-64 overflow-auto">
                {filteredCountries.map((item) => <button role="option" aria-selected={item.iso === country.iso} type="button" key={item.iso} onClick={() => chooseCountry(item.iso)} className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left font-normal hover:bg-cream"><span><span className="mr-2">{item.flag}</span>{item.name}</span>{item.iso === country.iso && <Check size={15} />}</button>)}
                {!filteredCountries.length && <p className="px-3 py-5 text-center font-normal text-ink/50">No destination found</p>}
              </div>
            </div>}
          </div>

          <label className="text-sm font-semibold text-forest">Bill amount
            <span className="mt-2 flex h-14 items-center rounded-xl border border-forest/15 bg-cream/60 px-4 focus-within:border-forest"><span className="mr-2 text-ink/50">{country.currencySymbol}</span><input aria-label="Bill amount" inputMode="decimal" type="number" min="0" step="0.01" value={bill} onChange={(event) => setBill(Math.max(0, Number(event.target.value)))} className="w-full bg-transparent text-lg font-medium outline-none" /><span className="text-xs font-medium text-ink/40">{country.currencyCode}</span></span>
          </label>
        </div>

        <fieldset className="mt-7"><legend className="text-sm font-semibold text-forest">Service type</legend><div className="mt-2 grid grid-cols-4 gap-2">{(Object.keys(serviceIcons) as ServiceKey[]).map((key) => { const Icon = serviceIcons[key]; return <button type="button" key={key} onClick={() => chooseService(key)} className={cn("flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl border px-2 text-xs font-semibold transition sm:flex-row sm:text-sm", service === key ? "border-forest bg-forest text-white" : "border-forest/10 bg-cream/40 text-forest hover:bg-cream")}><Icon size={17} /><span>{country.services[key].shortLabel}</span></button>; })}</div></fieldset>

        <div className="mt-7"><div className="flex items-end justify-between gap-3"><div><p className="text-sm font-semibold text-forest">Recommended tip</p><p className="mt-1 text-xs text-ink/50">Drag for a custom amount</p></div><strong className="text-2xl text-forest">{tipPercent}%</strong></div><input aria-label="Custom tip percentage" className="mt-4 w-full" type="range" min="0" max="30" step="1" value={tipPercent} onChange={(event) => { setTipPercent(Number(event.target.value)); setServiceIncluded(false); }} /><div className="mt-3 flex gap-2">{rule.options.map((value) => <button type="button" key={value} onClick={() => { setTipPercent(value); setServiceIncluded(false); }} className={cn("flex-1 rounded-lg py-2 text-sm font-semibold transition", tipPercent === value && !serviceIncluded ? "bg-forest text-white" : "bg-cream text-forest hover:bg-sage/30")}>{value}%</button>)}</div><p className="mt-3 flex gap-2 text-xs leading-5 text-ink/55"><ReceiptText className="mt-0.5 shrink-0" size={14} />{rule.guidance}</p></div>

        <div className="mt-7 grid gap-3 sm:grid-cols-[1fr_auto]">
          <button type="button" role="checkbox" aria-checked={serviceIncluded} onClick={() => setServiceIncluded((value) => !value)} className={cn("flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition", serviceIncluded ? "border-forest bg-forest/5 text-forest" : "border-forest/10 text-forest/70")}><span className={cn("grid size-5 place-items-center rounded border", serviceIncluded ? "border-forest bg-forest text-white" : "border-forest/20")}>{serviceIncluded && <Check size={13} />}</span>Service already included</button>
          <div className="flex items-center justify-between gap-4 rounded-xl border border-forest/10 px-4 py-3"><span className="flex items-center gap-2 text-sm font-semibold text-forest"><Users size={17} /> Split</span><button type="button" aria-label="Remove one person" onClick={() => setPeople(Math.max(1, people - 1))} className="grid size-8 place-items-center rounded-full bg-cream text-forest"><Minus size={14} /></button><strong className="min-w-5 text-center">{people}</strong><button type="button" aria-label="Add one person" onClick={() => setPeople(Math.min(99, people + 1))} className="grid size-8 place-items-center rounded-full bg-forest text-white"><Plus size={14} /></button></div>
        </div>
      </div>

      <aside className="flex flex-col bg-forest p-5 text-white sm:p-9 lg:p-11">
        <div className="rounded-2xl border border-white/15 bg-white/[.07] p-5"><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[#e7c98f]"><AlertTriangle size={16} /> Cultural etiquette alert</p><p className="mt-3 text-sm leading-6 text-white/80">{country.cultureTip}</p></div>
        <div className="my-8 grid grid-cols-2 gap-4"><div><p className="text-xs uppercase tracking-wider text-white/50">Tip amount</p><p aria-live="polite" className="mt-2 font-serif text-3xl">{money(totals.tipAmount)}</p></div><div><p className="text-xs uppercase tracking-wider text-white/50">Total with tip</p><p className="mt-2 font-serif text-3xl">{money(totals.total)}</p></div></div>
        <div className="rounded-2xl bg-[#e7c98f] p-5 text-forest"><p className="flex items-center gap-2 text-sm font-bold"><Sparkles size={17} /> Each person pays</p><p className="mt-2 font-serif text-4xl">{money(totals.each)}</p><p className="mt-2 text-xs text-forest/65">Split between {people} {people === 1 ? "person" : "people"}</p></div>

        <a href="#" aria-label="Travel eSIM offer placeholder" onClick={(event) => event.preventDefault()} className="group mt-5 flex items-center gap-4 rounded-2xl border border-white/15 p-4 transition hover:bg-white/[.06]"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-[#e7c98f]"><Wifi size={20} /></span><span className="min-w-0"><span className="block text-xs text-white/50">Need travel data?</span><span className="block truncate text-sm font-semibold">Get Instant eSIM</span></span><span className="ml-auto text-[#e7c98f] transition group-hover:translate-x-1">→</span></a>
        <p className="mt-4 flex items-center gap-2 text-[11px] text-white/40"><Database size={13} /> Local guidance for {tippingData.length} destinations</p>
      </aside>
    </section>
  );
}
