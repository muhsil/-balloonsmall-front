# BalloonsMall - Project Details

## Overview

BalloonsMall is a premium balloon and event decoration e-commerce store based in Dubai, UAE. The frontend is built with Next.js and the backend uses WordPress + WooCommerce as a headless CMS.

---

## Tech Stack

### Frontend
- **Framework:** Next.js 16.2.1 (App Router, Turbopack)
- **Language:** TypeScript 5
- **UI:** Tailwind CSS 4
- **State Management:** Zustand 5
- **HTTP Client:** Axios
- **Date Utilities:** date-fns
- **React:** 19.2.4

### Backend (Headless CMS)
- **CMS:** WordPress + WooCommerce
- **URL:** https://cms.balloonsmall.com
- **Admin Panel:** https://cms.balloonsmall.com/wp-admin/
- **REST API Base:** https://cms.balloonsmall.com/wp-json/wc/v3

### Payment Gateway
- **Provider:** Ziina (https://ziina.com)
- **API Docs:** https://docs.ziina.com/getting-started
- **API Base URL:** https://api-v2.ziina.com/api
- **Payment Flow:** Server-side payment intent creation -> redirect to Ziina checkout -> redirect back on success/cancel
- **Test Mode:** Pass `test: true` when creating payment intents (auto-enabled in dev)
- **Currency:** Dynamically fetched from WooCommerce settings (currently AED)
- **Amount Format:** Fils (smallest currency unit, e.g. 100 AED = 10000 fils)

### Hosting
- **Frontend Hosting:** Hostinger (Business Web Hosting plan)
- **Backend Hosting:** Hostinger (same plan, WordPress)
- **Domain:** balloonsmall.com
- **CMS Domain:** cms.balloonsmall.com
- **Hosting Panel:** https://hpanel.hostinger.com

---

## URLs

| Service | URL |
|---------|-----|
| Live Site | https://balloonsmall.com |
| WP Admin | https://cms.balloonsmall.com/wp-admin/ |
| WooCommerce API | https://cms.balloonsmall.com/wp-json/wc/v3 |
| GitHub Repo | https://github.com/muhsil/-balloonsmall-front |
| Hostinger Panel | https://hpanel.hostinger.com |
| Ziina Dashboard | https://ziina.com |

---

## Environment Variables

The following environment variables are required in `.env.local` (local dev) and in the hosting environment (production):

```env
# WordPress / WooCommerce
NEXT_PUBLIC_WP_URL="https://cms.balloonsmall.com"
WC_CONSUMER_KEY="<your-woocommerce-consumer-key>"
WC_CONSUMER_SECRET="<your-woocommerce-consumer-secret>"

# Ziina Payment Gateway
ZIINA_API_KEY="<your-ziina-api-key>"
```

### How to generate WooCommerce API keys:
1. Go to https://cms.balloonsmall.com/wp-admin/
2. Navigate to **WooCommerce > Settings > Advanced > REST API**
3. Click **Add Key**
4. Set permissions to **Read/Write**
5. Click **Generate API Key**
6. Copy the Consumer Key and Consumer Secret

### How to generate Ziina API keys:
1. Go to https://ziina.com and log in
2. Navigate to **API Keys** section
3. Click **Generate New Key**
4. Copy the API key (shown only once)
5. Note: Previous keys are invalidated when a new one is generated

---

## Credentials Reference

### WordPress Admin
- **URL:** https://cms.balloonsmall.com/wp-admin/
- **Email:** muhsilv@gmail.com

### Hostinger
- **URL:** https://hpanel.hostinger.com
- **Email:** muhsilv@gmail.com
- **2FA:** Google Authenticator enabled

### Ziina
- **Dashboard:** https://ziina.com
- **Account:** Linked to business phone/email
- **Woo Key:** Used in WooCommerce Ziina plugin settings
- **Custom API Key:** Used in `ZIINA_API_KEY` env variable

---

## WooCommerce Store Settings

| Setting | Value |
|---------|-------|
| Country | AE (United Arab Emirates) |
| Currency | AED (UAE Dirham) |
| Currency Position | Left with space (e.g. "AED 89") |
| Price Decimals | 0 |
| Store City | Dubai |
| Store Address | Dubai, United Arab Emirates |

These settings are fetched dynamically by the frontend via `lib/store-settings.ts` with a 5-minute server-side cache.

---

## Contact Information

| Type | Value |
|------|-------|
| Email | hello@balloonsmall.com |
| Phone | 56 355 4303 |
| WhatsApp | +971 56 355 4303 |
| WhatsApp Link | https://wa.me/971563554303 |

---

## Project Structure

```
balloonsmall-front/
├── app/
│   ├── (storefront)/          # Main storefront pages (layout with Navbar + Footer)
│   │   ├── page.tsx           # Home page
│   │   ├── shop/page.tsx      # Shop / product listing
│   │   ├── product/[slug]/    # Product detail page
│   │   ├── about/page.tsx     # About us
│   │   ├── contact/page.tsx   # Contact page
│   │   ├── faq/page.tsx       # FAQ (accordion)
│   │   ├── terms/page.tsx     # Terms & conditions
│   │   ├── privacy/page.tsx   # Privacy policy
│   │   └── shipping/page.tsx  # Shipping & delivery info
│   ├── checkout/page.tsx      # Checkout (outside storefront layout)
│   ├── api/
│   │   ├── create-payment-intent/  # Ziina payment intent creation
│   │   ├── verify-payment/         # Payment verification callback
│   │   ├── woo-create-order/       # WooCommerce order creation
│   │   └── revalidate/             # ISR revalidation webhook
│   ├── layout.tsx             # Root layout (fonts, metadata, providers)
│   ├── globals.css            # Global styles
│   ├── robots.ts              # robots.txt generation
│   ├── sitemap.ts             # sitemap.xml generation
│   └── manifest.webmanifest/  # PWA manifest
├── components/
│   ├── cart/
│   │   └── CartDrawer.tsx     # Slide-out cart drawer
│   ├── checkout/
│   │   ├── CheckoutSteps.tsx  # Step indicator
│   │   ├── OrderSummary.tsx   # Order summary sidebar
│   │   └── EmptyCart.tsx      # Empty cart state
│   ├── providers/
│   │   └── StoreSettingsProvider.tsx  # Currency context provider
│   ├── seo/
│   │   └── JsonLd.tsx         # Structured data (Organization, LocalBusiness, Product, FAQ, Breadcrumb)
│   └── ui/                    # Reusable UI components
│       ├── ProductCard.tsx
│       ├── CartItemCard.tsx
│       ├── ProductVariationPicker.tsx
│       ├── ProductImageGallery.tsx
│       ├── StickyAddToCart.tsx
│       ├── PriceDisplay.tsx
│       ├── WhatsAppFab.tsx
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       ├── TrustBanner.tsx
│       ├── DealSection.tsx
│       ├── PromoStrip.tsx
│       ├── CategoryIconPill.tsx
│       ├── CountdownTimer.tsx
│       ├── QuantitySelector.tsx
│       ├── RatingStars.tsx
│       ├── SoldCount.tsx
│       ├── DealBadge.tsx
│       ├── ShippingBadge.tsx
│       ├── SectionHeader.tsx
│       ├── PageHeader.tsx
│       ├── StatBadge.tsx
│       ├── EmptyState.tsx
│       ├── LoadingSpinner.tsx
│       ├── SectionCard.tsx
│       ├── FormField.tsx
│       ├── PaymentMethodCard.tsx
│       ├── Toast.tsx
│       └── mobile/
│           └── MobileBottomNav.tsx
├── lib/
│   ├── woocommerce.ts         # WooCommerce API client (axios)
│   └── store-settings.ts      # Store settings fetcher with caching
├── store/
│   └── useCartStore.ts        # Zustand cart state management
├── public/                    # Static assets
├── next.config.ts
├── tsconfig.json
├── package.json
├── tailwind.config.ts (v4 - CSS-based config in globals.css)
└── postcss.config.mjs
```

---

## Key Architecture Decisions

### Dynamic Currency
- Currency is fetched from WooCommerce `/settings/general` API at build/request time
- Server components call `getStoreSettings()` directly and pass `currency` as props
- Client components use `useStoreSettings()` hook via React Context (`StoreSettingsProvider`)
- 5-minute in-memory cache to reduce API calls
- Falls back to `AED` if the API call fails

### Payment Flow (Ziina)
1. Customer fills checkout form (personal info, delivery date/time)
2. Frontend calls `/api/woo-create-order` to create WooCommerce order
3. Frontend calls `/api/create-payment-intent` to create Ziina payment intent
4. Customer is redirected to Ziina's hosted payment page
5. After payment, customer is redirected back to `/checkout?payment_intent=<id>`
6. Frontend calls `/api/verify-payment` to confirm payment status
7. Success page is shown with order details

### State Management
- Cart state managed by Zustand (`useCartStore`)
- Persisted to localStorage for cross-session cart retention
- Checkout form data saved to localStorage for payment redirect recovery

### SEO
- JSON-LD structured data: Organization, WebSite, LocalBusiness, Product, Breadcrumb, FAQPage
- Open Graph + Twitter Card meta tags
- Dynamic sitemap.xml with all products and categories
- robots.txt disallowing /api/ and /checkout
- PWA manifest for mobile web app experience
- Canonical URLs on all pages

---

## Scripts

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Deployment

### Hostinger Deployment
- The site is hosted on Hostinger Business Web Hosting
- Git deployment is configured — merging to `main` triggers auto-deploy
- Environment variables must be set in Hostinger hPanel:
  - Go to **hPanel > Advanced > Environment Variables**
  - Add all variables from the `.env.local` section above

### Important Notes
- The Hostinger plan supports up to 100 websites
- Resource limits can be reached (CPU/RAM) — a free 24-hour boost is available once per month
- If the site shows 503 errors, check resource usage in hPanel
