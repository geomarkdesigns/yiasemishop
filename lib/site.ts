// Shop-wide settings. Edit these values to match the business.
export const site = {
  name: "Yiasemi",
  nameEl: "Γιασεμί",
  email: "hello@yiasemi.gr",          // TODO: replace with the real address
  phone: "+30 210 000 0000",          // TODO: replace with the real number
  currency: "eur" as const,
  /** Countries Stripe Checkout accepts as shipping destinations. */
  shippingCountries: ["GR", "CY"] as const,
  /** Order subtotal (cents) from which standard delivery is free. */
  freeShippingFrom: 40000,
  /** Standard delivery price (cents) below the threshold. */
  standardShipping: 2900,
  /** White-glove delivery: carried in, assembled, packaging taken away. */
  whiteGloveShipping: 7900,
  /** Max quantity of a single line in the cart. */
  maxQty: 10,
  returnDays: 30,
  vatRate: 0.24,
};

export function siteUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "");
  return (env || "http://localhost:3000").replace(/\/$/, "");
}
