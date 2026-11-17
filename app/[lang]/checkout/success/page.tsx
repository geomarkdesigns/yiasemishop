import type { Metadata } from "next";
import Link from "next/link";
import { formatPrice, getDict, isLocale, type Locale } from "@/lib/i18n";
import { getStripe } from "@/lib/stripe";
import { ClearCart } from "@/components/ClearCart";
import { Arrow } from "@/components/Icons";

export const metadata: Metadata = { robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function Success({ params, searchParams }: { params: Promise<{ lang: string }>; searchParams: Promise<{ session_id?: string }> }) {
  const { lang: l } = await params;
  const lang = (isLocale(l) ? l : "el") as Locale;
  const t = getDict(lang);
  const { session_id } = await searchParams;
  const stripe = getStripe();

  let session = null;
  if (stripe && session_id && /^cs_[A-Za-z0-9_]+$/.test(session_id)) {
    session = await stripe.checkout.sessions.retrieve(session_id, { expand: ["line_items"] }).catch(() => null);
  }
  const paid = session?.payment_status === "paid" || session?.payment_status === "no_payment_required";
  const ref = session ? session.id.slice(-8).toUpperCase() : null;

  return (
    <div className="wrap narrow success">
      {session && <ClearCart />}
      <div className="tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></div>
      <h1>{t.success.title}</h1>
      <p className="lead" style={{ marginInline: "auto" }}>{session && !paid ? t.success.pending : t.success.lead}</p>
      {session && (
        <div className="receipt">
          <p className="eyebrow">{t.success.order} #{ref}</p>
          <ul>
            {session.line_items?.data.map((i) => <li key={i.id}><span>{i.quantity} × {i.description}</span><span>{formatPrice(i.amount_total, lang)}</span></li>)}
            {session.shipping_cost && <li><span>{t.cart.shipping}</span><span>{session.shipping_cost.amount_total ? formatPrice(session.shipping_cost.amount_total, lang) : t.cart.free}</span></li>}
            <li><span>{t.success.paidWith}</span><span>{formatPrice(session.amount_total ?? 0, lang)}</span></li>
          </ul>
          {session.customer_details?.email && <p className="fine">{session.customer_details.email}</p>}
        </div>
      )}
      <p className="fine">{t.success.next}</p>
      <div className="actions" style={{ justifyContent: "center" }}><Link className="btn btn-solid" href={`/${lang}/shop`}>{t.success.back} <Arrow className="arrow" /></Link></div>
    </div>
  );
}
