# Alpha Dental Clinic Website

Premium, conversion-focused website demo for **Alpha Dental Clinic** in Johar Town, Lahore, Pakistan.

Tagline: **Healthy Smile. Happier You.**

This project demonstrates how a professional clinic website can improve online presence, build patient trust, showcase services, and capture appointment enquiries.

> **Important:** Directory-reported business details (address, phone, Google rating) are marked as unverified in configuration. Confirm all facts with the clinic before public launch. Do not invent doctor names, hours, reviews, prices, or social URLs.

## Technology stack

- **Frontend:** Next.js (App Router), React, TypeScript (strict), Tailwind CSS, shadcn-style UI, Lucide, Motion
- **Forms:** React Hook Form + Zod
- **Backend:** Next.js Route Handlers, Upstash Redis rate limiting, Resend email
- **Observability:** Sentry, Pino
- **Quality:** Vitest, React Testing Library, Playwright, ESLint, Prettier
- **Deployment:** Vercel + GitHub Actions CI

## Prerequisites

- Node.js 22+
- npm 10+
- Optional: Upstash Redis, Resend, Sentry accounts for full production integrations

## Installation

```bash
npm install
cp .env.example .env.local
```

Update `.env.local` with your values. The site runs without Redis/Resend/Sentry in development, with safe fallbacks documented below.

## Local development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment configuration

| Variable                                | Scope  | Purpose                     |
| --------------------------------------- | ------ | --------------------------- |
| `NEXT_PUBLIC_SITE_URL`                  | Public | Canonical site URL          |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`           | Public | WhatsApp number without `+` |
| `NEXT_PUBLIC_GOOGLE_MAPS_URL`           | Public | Optional Maps link          |
| `NEXT_PUBLIC_GOOGLE_BUSINESS_URL`       | Public | Optional GBP link           |
| `RESEND_API_KEY`                        | Server | Resend API key              |
| `RESEND_FROM_EMAIL`                     | Server | Verified sender             |
| `CLINIC_NOTIFICATION_EMAIL`             | Server | Clinic inbox for enquiries  |
| `UPSTASH_REDIS_REST_URL`                | Server | Redis REST URL              |
| `UPSTASH_REDIS_REST_TOKEN`              | Server | Redis REST token            |
| `SENTRY_DSN` / `NEXT_PUBLIC_SENTRY_DSN` | Mixed  | Error tracking              |
| `LOG_LEVEL`                             | Server | Pino log level              |

Never expose Redis or Resend credentials through `NEXT_PUBLIC_*` variables.

Central clinic content lives in:

- `src/config/business.ts`
- `src/config/site.ts`
- `src/config/navigation.ts`
- `src/data/*`

## Development-mode fallbacks

- **Resend missing:** Appointment/contact APIs accept valid requests in non-production and return a clear development-mode message. They do **not** pretend email was delivered in production.
- **Upstash missing:** Rate limiting fails open (allows traffic) so local development keeps working. Configure Redis before production launch.
- **Sentry missing:** Monitoring helpers no-op safely.

## Scripts

```bash
npm run dev          # development server
npm run build        # production build
npm run start        # serve production build
npm run lint         # ESLint
npm run lint:fix  # Prettier check
npm run format       # Prettier write
npm run typecheck    # TypeScript
npm run test         # Vitest unit/component tests
npm run test:e2e     # Playwright (expects build + start, or running server)
npm run ci           # lint + format + types + unit tests + build
```

## Testing

```bash
npm run test
npx playwright install chromium
npm run build && npm run test:e2e
```

E2E coverage includes homepage, navigation, services, appointment validation/success, contact details, mobile nav, CTAs, and 404. The Redis 429 test is skipped unless Upstash credentials are present.

## Production build

```bash
npm run build
npm run start
```

## Vercel deployment

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Set environment variables from `.env.example`.
4. Deploy. Framework preset: Next.js.

## Upstash setup

1. Create a Redis database at [Upstash](https://upstash.com/).
2. Copy REST URL and token into `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`.
3. Appointment and contact endpoints enforce **5 requests / IP / 10 minutes**.

## Resend setup

1. Create an API key at [Resend](https://resend.com/).
2. Verify a sending domain (or use the onboarding sender for tests).
3. Set `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `CLINIC_NOTIFICATION_EMAIL`.

## Sentry setup

1. Create a Next.js project in Sentry.
2. Set `SENTRY_DSN` and `NEXT_PUBLIC_SENTRY_DSN`.
3. Optional release upload: `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT`.

Patient enquiry payloads are redacted from logs and stripped from Sentry request bodies where possible.

## Google Maps / Business Profile

- Embedded maps use the configured/reported address query.
- Set `NEXT_PUBLIC_GOOGLE_MAPS_URL` and `NEXT_PUBLIC_GOOGLE_BUSINESS_URL` only after confirming the correct listing.
- Do not publish aggregate ratings in structured data until verified.

## SEO configuration

- Per-page metadata via `src/lib/seo/metadata.ts`
- JSON-LD helpers in `src/lib/seo/json-ld.ts`
- Dynamic `sitemap.xml` and `robots.txt`
- Local SEO copy focused on Johar Town / Lahore dental terms without keyword stuffing

## Security highlights

- Zod validation on client and server
- Honeypot spam field
- Submission token de-duplication for appointments
- Request size limits
- Origin checks on appointment API
- Security headers via `src/middleware.ts`
- Structured logging with sensitive field redaction

## Project structure

```text
src/
  app/(website)/     # Marketing pages
  app/api/           # Appointment & contact APIs
  components/        # UI, layout, feature components
  config/            # Business & site configuration
  data/              # Services, dentists, gallery, testimonials
  lib/               # Validation, email, rate-limit, SEO, logging
```

## License

Private demo project for Alpha Dental Clinic presentation use.
