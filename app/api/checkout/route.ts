import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { resolveCart, subtotal } from "@/lib/cart";
import { isLocale, type Locale } from "@/lib/i18n";
import { site, siteUrl } from "@/lib/site";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

const shippingText = {
  en: { standard: "Standard delivery", free: "Free standard delivery", glove: "White-glove delivery & assembly" },
  el: { standard: "Τυπική παράδοση", free: "Δωρεάν τυπική παράδοση", glove: "Παράδοση white-glove & συναρμολόγηση" },
};

export async function POST(req: Request) {
  let body: { lang?: string; items?: unknown };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "generic" }, { status: 400 }); }
  const lang: Locale = isLocale(body.lang) ? body.lang : "el";

  const cart = resolveCart(body.items);
  if (!cart.ok) return NextResponse.json({ error: cart.error === "out_of_stock" ? "out_of_stock" : "generic", detail: cart.error }, { status: 400 });

  const stripe = getStripe();
  if (!stripe) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const origin = siteUrl().startsWith("http://localhost") ? new URL(req.url).origin : siteUrl();
  const sub = subtotal(cart.lines);
  const hasMadeToOrder = cart.lines.some((l) => l.product.stock === 0);
  const s = shippingText[lang];
  const days = (min: number, max: number): Stripe.Checkout.SessionCreateParams.ShippingOption.ShippingRateData.DeliveryEstimate =>
    hasMadeToOrder
      ? { minimum: { unit: "week", value: Math.max(...cart.lines.map((l) => l.product.leadWeeks)) }, maximum: { unit: "week", value: Math.max(...cart.lines.map((l) => l.product.leadWeeks)) + 1 } }
      : { minimum: { unit: "business_day", value: min }, maximum: { unit: "business_day", value: max } };

  const standard = sub >= site.freeShippingFrom ? 0 : site.standardShipping;
  const params: Stripe.Checkout.SessionCreateParams = {
    mode: "payment",
    locale: lang,
    line_items: cart.lines.map((l) => ({
      quantity: l.qty,
      price_data: {
        currency: site.currency,
        unit_amount: l.unit,
        tax_behavior: "inclusive",
        product_data: {
          name: l.product.name[lang],
          description: l.variant.name[lang],
          ...(origin.startsWith("https://") ? { images: [`${origin}/api/product-image/${l.product.slug}?v=${encodeURIComponent(l.variant.id)}`] } : {}),
          metadata: { product_id: l.product.id, variant_id: l.variant.id },
        },
      },
    })),
    shipping_address_collection: { allowed_countries: [...site.shippingCountries] },
    shipping_options: [
      { shipping_rate_data: { display_name: standard === 0 ? s.free : s.standard, type: "fixed_amount", fixed_amount: { amount: standard, currency: site.currency }, tax_behavior: "inclusive", delivery_estimate: days(3, 7) } },
      { shipping_rate_data: { display_name: s.glove, type: "fixed_amount", fixed_amount: { amount: site.whiteGloveShipping, currency: site.currency }, tax_behavior: "inclusive", delivery_estimate: days(5, 10) } },
    ],
    phone_number_collection: { enabled: true },
    allow_promotion_codes: true,
    billing_address_collection: "auto",
    success_url: `${origin}/${lang}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/${lang}/cart?canceled=1`,
    metadata: { lang, items: cart.lines.map((l) => `${l.product.id}:${l.variant.id}:${l.qty}`).join(",").slice(0, 500) },
    payment_intent_data: { description: `Yiasemi order (${cart.lines.reduce((n, l) => n + l.qty, 0)} items)` },
  };

  try {
    const session = await stripe.checkout.sessions.create(params);
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error", err);
    return NextResponse.json({ error: "generic" }, { status: 502 });
  }
}
