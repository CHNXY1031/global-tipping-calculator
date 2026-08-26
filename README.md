# Gratuity Atlas — Global Tipping Etiquette & Calculator

A fast, responsive travel tool covering tipping customs in 150+ destinations. It combines a country and service-aware calculator with statically generated travel guides for restaurants, taxis, hotels, and bars.

## Stack

- Next.js 14 App Router and TypeScript
- Tailwind CSS
- Lucide React icons
- `clsx` and `tailwind-merge`

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm test
npm run lint
npm run build
```

## SEO routes

- `/` — calculator and popular destination directory
- `/tipping-in-[country]` — statically generated country etiquette guides
- `/sitemap.xml` — all public routes
- `/robots.txt` — crawler rules and sitemap discovery

Production origin: `https://global-tipping-calculator.vercel.app`
