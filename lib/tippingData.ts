export type ServiceKey = "dining" | "taxi" | "hotel" | "bar";

export type Region = "Europe" | "Asia" | "Americas" | "Oceania" | "Middle East" | "Africa";

export interface ServiceRule {
  label: string;
  shortLabel: string;
  defaultPercent: number;
  options: number[];
  guidance: string;
}

export interface CountryTippingData {
  name: string;
  iso: string;
  slug: string;
  currencyCode: string;
  currencySymbol: string;
  flag: string;
  region: Region;
  services: Record<ServiceKey, ServiceRule>;
  cultureTip: string;
  serviceChargeNote: string;
}

type ProfileKey = "noTip" | "roundUp" | "included" | "standard10" | "standard15" | "highTip" | "oceania" | "resort" | "middleEast" | "africa";
type CountryRow = [name: string, iso: string, currencyCode: string, currencySymbol: string, region: Region, profile: ProfileKey];

const profiles: Record<ProfileKey, Pick<CountryTippingData, "services" | "cultureTip" | "serviceChargeNote">> = {
  noTip: {
    services: {
      dining: { label: "Dining", shortLabel: "Restaurant", defaultPercent: 0, options: [0, 5, 10], guidance: "No tip is normally expected; sincere thanks are preferred." },
      taxi: { label: "Taxi", shortLabel: "Taxi", defaultPercent: 0, options: [0, 5, 10], guidance: "Pay the metered fare. Rounding up is optional only where accepted." },
      hotel: { label: "Hotel Bellhop & Housekeeping", shortLabel: "Hotel", defaultPercent: 0, options: [0, 5, 10], guidance: "Tips are generally unnecessary; use an envelope only if local staff accept them." },
      bar: { label: "Bars / Drinks", shortLabel: "Bar", defaultPercent: 0, options: [0, 5, 10], guidance: "No tip is normally required for drinks." },
    },
    cultureTip: "⚠️ Tipping is not a routine part of local service culture and may cause confusion. Offer it discreetly only when you know it is welcomed.",
    serviceChargeNote: "Quoted prices normally cover service; check the receipt for any venue-specific charge.",
  },
  roundUp: {
    services: {
      dining: { label: "Dining", shortLabel: "Restaurant", defaultPercent: 5, options: [0, 5, 10], guidance: "Round up or leave 5–10% for notably good table service." },
      taxi: { label: "Taxi", shortLabel: "Taxi", defaultPercent: 5, options: [0, 5, 10], guidance: "Round the fare up; 5–10% is generous for help with bags." },
      hotel: { label: "Hotel Bellhop & Housekeeping", shortLabel: "Hotel", defaultPercent: 0, options: [0, 5, 10], guidance: "Offer roughly 1–2 local currency units per bag and 1–2 per room night." },
      bar: { label: "Bars / Drinks", shortLabel: "Bar", defaultPercent: 5, options: [0, 5, 10], guidance: "Round up the tab or leave small change." },
    },
    cultureTip: "Tipping is appreciated but modest. Rounding up is often more natural than applying a large fixed percentage.",
    serviceChargeNote: "A service charge is uncommon outside tourist venues; never tip twice when it appears on the bill.",
  },
  included: {
    services: {
      dining: { label: "Dining", shortLabel: "Restaurant", defaultPercent: 5, options: [0, 5, 10], guidance: "Service is often included; leave change or up to 5–10% only for excellent service." },
      taxi: { label: "Taxi", shortLabel: "Taxi", defaultPercent: 5, options: [0, 5, 10], guidance: "Round up the metered fare; 5% is a kind gesture." },
      hotel: { label: "Hotel Bellhop & Housekeeping", shortLabel: "Hotel", defaultPercent: 0, options: [0, 5, 10], guidance: "Give €1–€2 (or equivalent) per bag and €1–€3 per room night." },
      bar: { label: "Bars / Drinks", shortLabel: "Bar", defaultPercent: 5, options: [0, 5, 10], guidance: "Leave coins or round up when table service was good." },
    },
    cultureTip: "Check for service compris, servizio, servicio, or a similar line before adding anything. Small cash tips are the norm when service is already covered.",
    serviceChargeNote: "Many restaurants include a service or cover charge. Any extra gratuity is optional.",
  },
  standard10: {
    services: {
      dining: { label: "Dining", shortLabel: "Restaurant", defaultPercent: 10, options: [5, 10, 15], guidance: "Leave around 10%; use 15% for excellent service when no charge is included." },
      taxi: { label: "Taxi", shortLabel: "Taxi", defaultPercent: 5, options: [0, 5, 10], guidance: "Round up or add 5–10%, especially for luggage help." },
      hotel: { label: "Hotel Bellhop & Housekeeping", shortLabel: "Hotel", defaultPercent: 5, options: [0, 5, 10], guidance: "Give 1–2 local notes per bag and a similar amount per room night." },
      bar: { label: "Bars / Drinks", shortLabel: "Bar", defaultPercent: 10, options: [5, 10, 15], guidance: "Round up or leave about 10% for table service." },
    },
    cultureTip: "A 10% tip is a safe starting point when service is not included. Cash is often easier for staff to receive directly.",
    serviceChargeNote: "Tourist restaurants may add 10–12.5%; subtract it before deciding on an extra tip.",
  },
  standard15: {
    services: {
      dining: { label: "Dining", shortLabel: "Restaurant", defaultPercent: 15, options: [10, 15, 20], guidance: "10–15% is customary; choose 15–20% for attentive service." },
      taxi: { label: "Taxi", shortLabel: "Taxi", defaultPercent: 10, options: [5, 10, 15], guidance: "Add 5–10% or round up for short rides." },
      hotel: { label: "Hotel Bellhop & Housekeeping", shortLabel: "Hotel", defaultPercent: 5, options: [0, 5, 10], guidance: "Tip per bag and per room night using small local notes." },
      bar: { label: "Bars / Drinks", shortLabel: "Bar", defaultPercent: 10, options: [10, 15, 20], guidance: "Leave 10–15% for a tab or a small fixed amount per drink." },
    },
    cultureTip: "Tipping is an established reward for good service. Check whether a gratuity was added for groups or tourist areas.",
    serviceChargeNote: "An automatic gratuity may be added to groups; tip only the difference if you want to give more.",
  },
  highTip: {
    services: {
      dining: { label: "Dining", shortLabel: "Restaurant", defaultPercent: 20, options: [15, 18, 20, 25], guidance: "15–20% before tax is standard; 20% is the common choice for good service." },
      taxi: { label: "Taxi", shortLabel: "Taxi", defaultPercent: 15, options: [10, 15, 20], guidance: "Tip 10–15%, more for luggage or exceptional help." },
      hotel: { label: "Hotel Bellhop & Housekeeping", shortLabel: "Hotel", defaultPercent: 10, options: [5, 10, 15], guidance: "Give $2–$5 per bag and $3–$5 per room night; leave housekeeping tips daily." },
      bar: { label: "Bars / Drinks", shortLabel: "Bar", defaultPercent: 20, options: [15, 18, 20, 25], guidance: "Tip $1–$2 per drink or 18–20% of the tab." },
    },
    cultureTip: "⚠️ Tips form a meaningful part of many service workers’ income. A 15–20% restaurant tip is customary unless gratuity is already included.",
    serviceChargeNote: "Look for gratuity or service charge, especially for large parties, room service, and resorts.",
  },
  oceania: {
    services: {
      dining: { label: "Dining", shortLabel: "Restaurant", defaultPercent: 0, options: [0, 5, 10], guidance: "Tipping is optional; leave up to 10% only for exceptional service." },
      taxi: { label: "Taxi", shortLabel: "Taxi", defaultPercent: 0, options: [0, 5, 10], guidance: "Round up if convenient; a percentage tip is not expected." },
      hotel: { label: "Hotel Bellhop & Housekeeping", shortLabel: "Hotel", defaultPercent: 0, options: [0, 5, 10], guidance: "No tip is required, though outstanding personal help may be rewarded." },
      bar: { label: "Bars / Drinks", shortLabel: "Bar", defaultPercent: 0, options: [0, 5, 10], guidance: "No tip is expected at the bar; rounding a table bill is optional." },
    },
    cultureTip: "Staff receive standard wages and tipping is optional. Keep it relaxed and reserve a tip for genuinely exceptional service.",
    serviceChargeNote: "Service charges are uncommon; card terminals may offer a tip prompt, but it is optional.",
  },
  resort: {
    services: {
      dining: { label: "Dining", shortLabel: "Restaurant", defaultPercent: 15, options: [10, 15, 20], guidance: "Leave 10–15% when service is not included; 15–20% is common in resorts." },
      taxi: { label: "Taxi", shortLabel: "Taxi", defaultPercent: 10, options: [5, 10, 15], guidance: "Tip around 10%, or agree on a fare first and round up." },
      hotel: { label: "Hotel Bellhop & Housekeeping", shortLabel: "Hotel", defaultPercent: 10, options: [5, 10, 15], guidance: "Tip $1–$3 per bag and $2–$5 per room night; check resort inclusions." },
      bar: { label: "Bars / Drinks", shortLabel: "Bar", defaultPercent: 15, options: [10, 15, 20], guidance: "Leave 10–15% or a small amount per drink." },
    },
    cultureTip: "Resorts often follow North American tipping habits, while local venues may be more relaxed. Check all-inclusive policies before tipping again.",
    serviceChargeNote: "Hotels and resorts frequently add 10–15%; ask whether staff share it before adding cash.",
  },
  middleEast: {
    services: {
      dining: { label: "Dining", shortLabel: "Restaurant", defaultPercent: 10, options: [5, 10, 15], guidance: "Leave 10% when service is not included; upscale venues may add a charge." },
      taxi: { label: "Taxi", shortLabel: "Taxi", defaultPercent: 5, options: [0, 5, 10], guidance: "Round up the fare; 5–10% is appreciated for good help." },
      hotel: { label: "Hotel Bellhop & Housekeeping", shortLabel: "Hotel", defaultPercent: 5, options: [0, 5, 10], guidance: "Offer one or two small notes per bag and per room night." },
      bar: { label: "Bars / Drinks", shortLabel: "Bar", defaultPercent: 10, options: [5, 10, 15], guidance: "Where alcohol is served, 10% is suitable if no service charge appears." },
    },
    cultureTip: "Tipping is a welcome gesture of thanks, but hospitality bills often include service. Hand cash discreetly and respect local rules around alcohol.",
    serviceChargeNote: "A service charge may not go directly to staff; small cash is appreciated when service was personal.",
  },
  africa: {
    services: {
      dining: { label: "Dining", shortLabel: "Restaurant", defaultPercent: 10, options: [5, 10, 15], guidance: "Tip 10% in restaurants when service is not already included." },
      taxi: { label: "Taxi", shortLabel: "Taxi", defaultPercent: 5, options: [0, 5, 10], guidance: "Agree on the fare first; round up or add 5–10% for good service." },
      hotel: { label: "Hotel Bellhop & Housekeeping", shortLabel: "Hotel", defaultPercent: 5, options: [0, 5, 10], guidance: "Use small local notes per bag and per night; safari lodges may use a shared box." },
      bar: { label: "Bars / Drinks", shortLabel: "Bar", defaultPercent: 10, options: [5, 10, 15], guidance: "Leave small change or around 10% for table service." },
    },
    cultureTip: "Tips are valued in tourism. Use local cash where practical and ask lodges whether gratuities are pooled among the full team.",
    serviceChargeNote: "Safari camps and hotels may suggest a daily pooled amount; check the property guide before tipping individuals.",
  },
};

const countryRows: CountryRow[] = [
  ["Albania", "AL", "ALL", "L", "Europe", "standard10"], ["Andorra", "AD", "EUR", "€", "Europe", "included"],
  ["Austria", "AT", "EUR", "€", "Europe", "roundUp"], ["Belarus", "BY", "BYN", "Br", "Europe", "standard10"],
  ["Belgium", "BE", "EUR", "€", "Europe", "included"], ["Bosnia and Herzegovina", "BA", "BAM", "KM", "Europe", "standard10"],
  ["Bulgaria", "BG", "BGN", "лв", "Europe", "standard10"], ["Croatia", "HR", "EUR", "€", "Europe", "standard10"],
  ["Cyprus", "CY", "EUR", "€", "Europe", "standard10"], ["Czechia", "CZ", "CZK", "Kč", "Europe", "standard10"],
  ["Denmark", "DK", "DKK", "kr", "Europe", "roundUp"], ["Estonia", "EE", "EUR", "€", "Europe", "standard10"],
  ["Finland", "FI", "EUR", "€", "Europe", "roundUp"], ["France", "FR", "EUR", "€", "Europe", "included"],
  ["Germany", "DE", "EUR", "€", "Europe", "roundUp"], ["Greece", "GR", "EUR", "€", "Europe", "standard10"],
  ["Hungary", "HU", "HUF", "Ft", "Europe", "standard10"], ["Iceland", "IS", "ISK", "kr", "Europe", "roundUp"],
  ["Ireland", "IE", "EUR", "€", "Europe", "standard10"], ["Italy", "IT", "EUR", "€", "Europe", "included"],
  ["Kosovo", "XK", "EUR", "€", "Europe", "standard10"], ["Latvia", "LV", "EUR", "€", "Europe", "standard10"],
  ["Liechtenstein", "LI", "CHF", "CHF", "Europe", "roundUp"], ["Lithuania", "LT", "EUR", "€", "Europe", "standard10"],
  ["Luxembourg", "LU", "EUR", "€", "Europe", "included"], ["Malta", "MT", "EUR", "€", "Europe", "standard10"],
  ["Moldova", "MD", "MDL", "L", "Europe", "standard10"], ["Monaco", "MC", "EUR", "€", "Europe", "included"],
  ["Montenegro", "ME", "EUR", "€", "Europe", "standard10"], ["Netherlands", "NL", "EUR", "€", "Europe", "roundUp"],
  ["North Macedonia", "MK", "MKD", "ден", "Europe", "standard10"], ["Norway", "NO", "NOK", "kr", "Europe", "roundUp"],
  ["Poland", "PL", "PLN", "zł", "Europe", "standard10"], ["Portugal", "PT", "EUR", "€", "Europe", "standard10"],
  ["Romania", "RO", "RON", "lei", "Europe", "standard10"], ["Russia", "RU", "RUB", "₽", "Europe", "standard10"],
  ["San Marino", "SM", "EUR", "€", "Europe", "included"], ["Serbia", "RS", "RSD", "din", "Europe", "standard10"],
  ["Slovakia", "SK", "EUR", "€", "Europe", "standard10"], ["Slovenia", "SI", "EUR", "€", "Europe", "roundUp"],
  ["Spain", "ES", "EUR", "€", "Europe", "included"], ["Sweden", "SE", "SEK", "kr", "Europe", "roundUp"],
  ["Switzerland", "CH", "CHF", "CHF", "Europe", "roundUp"], ["Ukraine", "UA", "UAH", "₴", "Europe", "standard10"],
  ["United Kingdom", "GB", "GBP", "£", "Europe", "standard10"], ["Vatican City", "VA", "EUR", "€", "Europe", "included"],

  ["Afghanistan", "AF", "AFN", "؋", "Asia", "standard10"], ["Armenia", "AM", "AMD", "֏", "Asia", "standard10"],
  ["Azerbaijan", "AZ", "AZN", "₼", "Asia", "standard10"], ["Bangladesh", "BD", "BDT", "৳", "Asia", "standard10"],
  ["Bhutan", "BT", "BTN", "Nu.", "Asia", "standard10"], ["Brunei", "BN", "BND", "$", "Asia", "noTip"],
  ["Cambodia", "KH", "KHR", "៛", "Asia", "standard10"], ["China", "CN", "CNY", "¥", "Asia", "noTip"],
  ["Georgia", "GE", "GEL", "₾", "Asia", "standard10"], ["Hong Kong", "HK", "HKD", "HK$", "Asia", "standard10"],
  ["India", "IN", "INR", "₹", "Asia", "standard10"], ["Indonesia", "ID", "IDR", "Rp", "Asia", "standard10"],
  ["Japan", "JP", "JPY", "¥", "Asia", "noTip"], ["Kazakhstan", "KZ", "KZT", "₸", "Asia", "standard10"],
  ["Kyrgyzstan", "KG", "KGS", "сом", "Asia", "standard10"], ["Laos", "LA", "LAK", "₭", "Asia", "standard10"],
  ["Macau", "MO", "MOP", "MOP$", "Asia", "standard10"], ["Malaysia", "MY", "MYR", "RM", "Asia", "noTip"],
  ["Maldives", "MV", "MVR", "Rf", "Asia", "resort"], ["Mongolia", "MN", "MNT", "₮", "Asia", "standard10"],
  ["Myanmar", "MM", "MMK", "K", "Asia", "standard10"], ["Nepal", "NP", "NPR", "Rs", "Asia", "standard10"],
  ["North Korea", "KP", "KPW", "₩", "Asia", "noTip"], ["Pakistan", "PK", "PKR", "Rs", "Asia", "standard10"],
  ["Philippines", "PH", "PHP", "₱", "Asia", "standard10"], ["Singapore", "SG", "SGD", "S$", "Asia", "noTip"],
  ["South Korea", "KR", "KRW", "₩", "Asia", "noTip"], ["Sri Lanka", "LK", "LKR", "Rs", "Asia", "standard10"],
  ["Taiwan", "TW", "TWD", "NT$", "Asia", "noTip"], ["Tajikistan", "TJ", "TJS", "SM", "Asia", "standard10"],
  ["Thailand", "TH", "THB", "฿", "Asia", "standard10"], ["Timor-Leste", "TL", "USD", "$", "Asia", "standard10"],
  ["Turkmenistan", "TM", "TMT", "m", "Asia", "standard10"], ["Uzbekistan", "UZ", "UZS", "soʻm", "Asia", "standard10"],
  ["Vietnam", "VN", "VND", "₫", "Asia", "standard10"],

  ["Antigua and Barbuda", "AG", "XCD", "EC$", "Americas", "resort"], ["Argentina", "AR", "ARS", "$", "Americas", "standard10"],
  ["Bahamas", "BS", "BSD", "$", "Americas", "resort"], ["Barbados", "BB", "BBD", "Bds$", "Americas", "resort"],
  ["Belize", "BZ", "BZD", "BZ$", "Americas", "resort"], ["Bolivia", "BO", "BOB", "Bs", "Americas", "standard10"],
  ["Brazil", "BR", "BRL", "R$", "Americas", "included"], ["Canada", "CA", "CAD", "C$", "Americas", "highTip"],
  ["Chile", "CL", "CLP", "$", "Americas", "standard10"], ["Colombia", "CO", "COP", "$", "Americas", "standard10"],
  ["Costa Rica", "CR", "CRC", "₡", "Americas", "included"], ["Cuba", "CU", "CUP", "$", "Americas", "standard10"],
  ["Dominica", "DM", "XCD", "EC$", "Americas", "resort"], ["Dominican Republic", "DO", "DOP", "RD$", "Americas", "resort"],
  ["Ecuador", "EC", "USD", "$", "Americas", "standard10"], ["El Salvador", "SV", "USD", "$", "Americas", "standard10"],
  ["Grenada", "GD", "XCD", "EC$", "Americas", "resort"], ["Guatemala", "GT", "GTQ", "Q", "Americas", "standard10"],
  ["Guyana", "GY", "GYD", "G$", "Americas", "standard10"], ["Haiti", "HT", "HTG", "G", "Americas", "standard10"],
  ["Honduras", "HN", "HNL", "L", "Americas", "standard10"], ["Jamaica", "JM", "JMD", "J$", "Americas", "resort"],
  ["Mexico", "MX", "MXN", "MX$", "Americas", "standard15"], ["Nicaragua", "NI", "NIO", "C$", "Americas", "standard10"],
  ["Panama", "PA", "PAB", "B/.", "Americas", "standard10"], ["Paraguay", "PY", "PYG", "₲", "Americas", "standard10"],
  ["Peru", "PE", "PEN", "S/", "Americas", "standard10"], ["Saint Kitts and Nevis", "KN", "XCD", "EC$", "Americas", "resort"],
  ["Saint Lucia", "LC", "XCD", "EC$", "Americas", "resort"], ["Saint Vincent and the Grenadines", "VC", "XCD", "EC$", "Americas", "resort"],
  ["Suriname", "SR", "SRD", "$", "Americas", "standard10"], ["Trinidad and Tobago", "TT", "TTD", "TT$", "Americas", "standard10"],
  ["United States", "US", "USD", "$", "Americas", "highTip"], ["Uruguay", "UY", "UYU", "$U", "Americas", "standard10"],
  ["Venezuela", "VE", "VES", "Bs.", "Americas", "standard10"], ["Puerto Rico", "PR", "USD", "$", "Americas", "highTip"],
  ["Bermuda", "BM", "BMD", "$", "Americas", "highTip"], ["Cayman Islands", "KY", "KYD", "CI$", "Americas", "resort"],
  ["Aruba", "AW", "AWG", "Afl.", "Americas", "resort"], ["Curaçao", "CW", "ANG", "NAf", "Americas", "resort"],
  ["Greenland", "GL", "DKK", "kr", "Americas", "roundUp"], ["U.S. Virgin Islands", "VI", "USD", "$", "Americas", "highTip"],

  ["Australia", "AU", "AUD", "A$", "Oceania", "oceania"], ["Fiji", "FJ", "FJD", "FJ$", "Oceania", "resort"],
  ["Kiribati", "KI", "AUD", "A$", "Oceania", "oceania"], ["Marshall Islands", "MH", "USD", "$", "Oceania", "oceania"],
  ["Micronesia", "FM", "USD", "$", "Oceania", "oceania"], ["Nauru", "NR", "AUD", "A$", "Oceania", "oceania"],
  ["New Zealand", "NZ", "NZD", "NZ$", "Oceania", "oceania"], ["Palau", "PW", "USD", "$", "Oceania", "resort"],
  ["Papua New Guinea", "PG", "PGK", "K", "Oceania", "oceania"], ["Samoa", "WS", "WST", "T", "Oceania", "oceania"],
  ["Solomon Islands", "SB", "SBD", "SI$", "Oceania", "oceania"], ["Tonga", "TO", "TOP", "T$", "Oceania", "oceania"],
  ["Tuvalu", "TV", "AUD", "A$", "Oceania", "oceania"], ["Vanuatu", "VU", "VUV", "VT", "Oceania", "oceania"],
  ["Cook Islands", "CK", "NZD", "NZ$", "Oceania", "oceania"], ["French Polynesia", "PF", "XPF", "F", "Oceania", "resort"],
  ["Guam", "GU", "USD", "$", "Oceania", "highTip"], ["New Caledonia", "NC", "XPF", "F", "Oceania", "oceania"],

  ["Bahrain", "BH", "BHD", "BD", "Middle East", "middleEast"], ["Iran", "IR", "IRR", "﷼", "Middle East", "standard10"],
  ["Iraq", "IQ", "IQD", "IQD", "Middle East", "middleEast"], ["Israel", "IL", "ILS", "₪", "Middle East", "standard15"],
  ["Jordan", "JO", "JOD", "JD", "Middle East", "middleEast"], ["Kuwait", "KW", "KWD", "KD", "Middle East", "middleEast"],
  ["Lebanon", "LB", "LBP", "L£", "Middle East", "middleEast"], ["Oman", "OM", "OMR", "OMR", "Middle East", "middleEast"],
  ["Palestine", "PS", "ILS", "₪", "Middle East", "middleEast"], ["Qatar", "QA", "QAR", "QR", "Middle East", "middleEast"],
  ["Saudi Arabia", "SA", "SAR", "SAR", "Middle East", "middleEast"], ["Syria", "SY", "SYP", "S£", "Middle East", "middleEast"],
  ["Turkey", "TR", "TRY", "₺", "Middle East", "standard10"], ["United Arab Emirates", "AE", "AED", "AED", "Middle East", "middleEast"],
  ["Yemen", "YE", "YER", "﷼", "Middle East", "middleEast"],

  ["Algeria", "DZ", "DZD", "DA", "Africa", "standard10"], ["Angola", "AO", "AOA", "Kz", "Africa", "africa"],
  ["Benin", "BJ", "XOF", "CFA", "Africa", "africa"], ["Botswana", "BW", "BWP", "P", "Africa", "africa"],
  ["Burkina Faso", "BF", "XOF", "CFA", "Africa", "africa"], ["Burundi", "BI", "BIF", "FBu", "Africa", "africa"],
  ["Cabo Verde", "CV", "CVE", "$", "Africa", "africa"], ["Cameroon", "CM", "XAF", "CFA", "Africa", "africa"],
  ["Central African Republic", "CF", "XAF", "CFA", "Africa", "africa"], ["Chad", "TD", "XAF", "CFA", "Africa", "africa"],
  ["Comoros", "KM", "KMF", "CF", "Africa", "africa"], ["Democratic Republic of the Congo", "CD", "CDF", "FC", "Africa", "africa"],
  ["Republic of the Congo", "CG", "XAF", "CFA", "Africa", "africa"], ["Côte d'Ivoire", "CI", "XOF", "CFA", "Africa", "africa"],
  ["Djibouti", "DJ", "DJF", "Fdj", "Africa", "africa"], ["Egypt", "EG", "EGP", "E£", "Africa", "middleEast"],
  ["Equatorial Guinea", "GQ", "XAF", "CFA", "Africa", "africa"], ["Eritrea", "ER", "ERN", "Nfk", "Africa", "africa"],
  ["Eswatini", "SZ", "SZL", "L", "Africa", "africa"], ["Ethiopia", "ET", "ETB", "Br", "Africa", "africa"],
  ["Gabon", "GA", "XAF", "CFA", "Africa", "africa"], ["Gambia", "GM", "GMD", "D", "Africa", "africa"],
  ["Ghana", "GH", "GHS", "GH₵", "Africa", "africa"], ["Guinea", "GN", "GNF", "FG", "Africa", "africa"],
  ["Guinea-Bissau", "GW", "XOF", "CFA", "Africa", "africa"], ["Kenya", "KE", "KES", "KSh", "Africa", "africa"],
  ["Lesotho", "LS", "LSL", "L", "Africa", "africa"], ["Liberia", "LR", "LRD", "L$", "Africa", "africa"],
  ["Libya", "LY", "LYD", "LD", "Africa", "standard10"], ["Madagascar", "MG", "MGA", "Ar", "Africa", "africa"],
  ["Malawi", "MW", "MWK", "MK", "Africa", "africa"], ["Mali", "ML", "XOF", "CFA", "Africa", "africa"],
  ["Mauritania", "MR", "MRU", "UM", "Africa", "africa"], ["Mauritius", "MU", "MUR", "Rs", "Africa", "resort"],
  ["Morocco", "MA", "MAD", "DH", "Africa", "standard10"], ["Mozambique", "MZ", "MZN", "MT", "Africa", "africa"],
  ["Namibia", "NA", "NAD", "N$", "Africa", "africa"], ["Niger", "NE", "XOF", "CFA", "Africa", "africa"],
  ["Nigeria", "NG", "NGN", "₦", "Africa", "africa"], ["Rwanda", "RW", "RWF", "FRw", "Africa", "africa"],
  ["São Tomé and Príncipe", "ST", "STN", "Db", "Africa", "africa"], ["Senegal", "SN", "XOF", "CFA", "Africa", "africa"],
  ["Seychelles", "SC", "SCR", "Rs", "Africa", "resort"], ["Sierra Leone", "SL", "SLE", "Le", "Africa", "africa"],
  ["Somalia", "SO", "SOS", "Sh", "Africa", "africa"], ["South Africa", "ZA", "ZAR", "R", "Africa", "standard10"],
  ["South Sudan", "SS", "SSP", "SS£", "Africa", "africa"], ["Sudan", "SD", "SDG", "SDG", "Africa", "africa"],
  ["Tanzania", "TZ", "TZS", "TSh", "Africa", "africa"], ["Togo", "TG", "XOF", "CFA", "Africa", "africa"],
  ["Tunisia", "TN", "TND", "DT", "Africa", "standard10"], ["Uganda", "UG", "UGX", "USh", "Africa", "africa"],
  ["Zambia", "ZM", "ZMW", "ZK", "Africa", "africa"], ["Zimbabwe", "ZW", "USD", "$", "Africa", "africa"],
];

const cultureOverrides: Record<string, string> = {
  JP: "⚠️ In Japan, leaving a tip is not customary and can be considered awkward or offensive. Exceptional hospitality is already part of the service.",
  US: "⚠️ In the United States, 15–20% is expected at full-service restaurants because tips form a major part of staff income. Check for automatic gratuity first.",
  FR: "In France, service compris means service is included by law. Leave coins or round up only when you genuinely want to thank the staff.",
  IT: "In Italy, check for coperto (cover charge) and servizio incluso. Neither requires another large tip; a few euros for warm service is enough.",
  MX: "In Mexico, 10–15% is customary at restaurants. Never write a total before confirming the card terminal amount, and check for propina incluida.",
  GB: "In the UK, restaurants often add an optional 12.5% service charge. You may ask to remove it, and no extra tip is needed when it remains.",
  ES: "In Spain, tipping is modest and optional. Round up at casual venues or leave 5–10% for excellent restaurant service.",
  TH: "In Thailand, street-food stalls do not expect tips; in tourist restaurants, round up or leave about 10% if no service charge appears.",
  CN: "⚠️ In mainland China, tipping is traditionally uncommon and can be refused. It is more accepted for private guides and international hotels.",
  KR: "⚠️ In South Korea, tipping is not customary. Premium hotels may add service automatically, so do not leave cash on the table.",
  SG: "Singapore bills commonly add 10% service charge plus tax. Extra tipping is neither required nor generally expected.",
  AU: "In Australia, wages include service and tipping is optional. Up to 10% is a generous reward for exceptional restaurant service.",
  NZ: "In New Zealand, tipping is not expected. Round up only when service was unusually helpful.",
  BR: "In Brazil, a 10% serviço charge is commonly added and is technically optional. No extra tip is expected when it is included.",
  CR: "Costa Rica commonly includes a 10% service charge plus tax. Extra cash is optional for standout service.",
  AE: "In the UAE, many venues add service, municipality, and tourism fees. These are not always staff tips, so small cash is appreciated but optional.",
  EG: "In Egypt, baksheesh is woven into tourism. Carry small local notes and tip modestly for direct personal help.",
  ZA: "In South Africa, 10–15% at restaurants is customary when service is not included. Safari lodges may provide a pooled gratuity guide.",
  IN: "In India, upscale restaurants often add a service charge. It is distinct from government tax and can be questioned; 5–10% cash is enough when absent.",
};

const slugify = (name: string) => name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const flagFromIso = (iso: string) => iso.length === 2 ? String.fromCodePoint(...iso.toUpperCase().split("").map((char) => 127397 + char.charCodeAt(0))) : "🌍";

export const tippingData: CountryTippingData[] = countryRows.map(([name, iso, currencyCode, currencySymbol, region, profile]) => ({
  name,
  iso,
  currencyCode,
  currencySymbol,
  region,
  slug: slugify(name),
  flag: flagFromIso(iso),
  services: profiles[profile].services,
  cultureTip: cultureOverrides[iso] ?? profiles[profile].cultureTip,
  serviceChargeNote: profiles[profile].serviceChargeNote,
}));

export const countryBySlug = new Map(tippingData.map((country) => [country.slug, country]));

export const popularCountrySlugs = ["japan", "italy", "france", "mexico", "united-kingdom", "spain", "thailand", "united-states", "australia", "singapore", "greece", "united-arab-emirates"];
