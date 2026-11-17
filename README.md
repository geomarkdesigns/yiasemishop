# Yiasemi · Γιασεμί — e-shop

Furniture shop in the Yiasemi design language (same palette, GFS Didot + Commissioner, jasmine mark, meander, arch frames).
Next.js 16 + Stripe Checkout. Greek & English, light & dark mode.

## What's in it
- **Shop**: room filters, accent-insensitive search (Greek/English), sort, "ready to ship" toggle, all synced to the URL.
- **Product pages**: finishes that recolour the product and change price, dimension drawing, stock / made-to-order lead time, buy now, JSON-LD for Google.
- **Cart**: slide-in drawer + cart page, saved in the browser, synced across tabs, free-delivery progress bar, VAT shown.
- **Checkout (Stripe)**: prices recalculated on the server (client prices are never trusted), stock checked, Greek or English Stripe page,
  cards / Apple Pay / Google Pay / Link (whatever you enable in Stripe), promo codes, phone + address collection, standard / free / white-glove delivery.
- **After payment**: order confirmation page with the real order summary, cart cleared, signed webhook that (optionally) e-mails the shop each paid order.
- Wishlist, contact form, newsletter (both via Resend, optional), sitemap, robots, security headers, 404 page.
- Motion: scroll reveals, hero entrance, jasmine bloom, circular theme-switch reveal, marquee, drawer/toast/add-to-cart micro-animations. All respect "reduce motion".

## Run locally
```bash
npm install
cp .env.example .env.local   # add your Stripe test key
npm run dev                  # http://localhost:3000
```

## Go live on Vercel
1. Import this repo in Vercel.
2. Add environment variables (Project → Settings → Environment Variables):
   - `STRIPE_SECRET_KEY` — from https://dashboard.stripe.com/apikeys (start with `sk_test_…`; the site shows a test-mode banner).
   - `NEXT_PUBLIC_SITE_URL` — e.g. `https://shop.yiasemi.gr`
3. Stripe Dashboard → Developers → Webhooks → Add endpoint `https://YOUR-DOMAIN/api/webhooks/stripe`
   with events `checkout.session.completed`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed`.
   Put its signing secret in `STRIPE_WEBHOOK_SECRET`.
4. Stripe → Settings → Emails: turn on "Successful payments" so customers get receipts.
5. Optional e-mail (Resend): `RESEND_API_KEY`, `ORDER_FROM_EMAIL`, `ORDER_NOTIFY_EMAIL` (order alerts + contact form), `RESEND_AUDIENCE_ID` (newsletter).
   Without these, the contact page shows your e-mail address and the newsletter block is hidden.
6. Switch to `sk_live_…` when ready.

## Editing the shop
- Products, prices, finishes, stock: `lib/products.ts` (prices in cents, VAT included).
- Shop settings (e-mail, phone, delivery prices, free-delivery threshold, countries): `lib/site.ts`.
- All interface text, both languages: `lib/i18n.ts`. Long pages (about, delivery, privacy, terms): `lib/pages.ts`.
- **Before launch** fill in the company details marked `[ ]` in `lib/pages.ts` (privacy & terms) and have them checked.

Product images are flat illustrations generated in code (`lib/art.ts`), matching the brand's flat-colour style. Replace with photography when available.

## Tests
```bash
npm test          # unit: cart/pricing/stock rules, catalogue integrity
npm run build && npm run e2e   # browser tests incl. full checkout against a local Stripe mock + signed webhook
```
