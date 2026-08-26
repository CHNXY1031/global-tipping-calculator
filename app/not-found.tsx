import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return <main className="grid min-h-screen place-items-center bg-cream px-5 text-center text-ink"><div><span className="mx-auto grid size-16 place-items-center rounded-full bg-forest text-white"><Compass size={28} /></span><p className="mt-6 text-xs font-bold uppercase tracking-[.2em] text-gold">404 · Off the map</p><h1 className="mt-3 font-serif text-5xl text-forest">Destination not found</h1><p className="mx-auto mt-4 max-w-md text-sm leading-6 text-ink/60">This tipping guide may have moved. Return to the calculator to choose another destination.</p><Link href="/" className="mt-7 inline-flex items-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white"><ArrowLeft size={16} /> Back to calculator</Link></div></main>;
}
