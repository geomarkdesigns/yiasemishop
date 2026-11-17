"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getDict, type Locale } from "@/lib/i18n";
import { useStore } from "./Store";
import { CartLines, CartTotals } from "./CartLines";
import { useCheckout } from "./useCheckout";
import { Arrow, Jasmine, Lock } from "./Icons";

export function CartPage({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const { count, ready } = useStore();
  const canceled = useSearchParams().get("canceled") === "1";
  const { checkout, busy, error } = useCheckout(lang);
  if (!ready) return <div style={{ minHeight: "40vh" }} />;
  if (count === 0) return (
    <div className="empty-state"><Jasmine style={{ color: "var(--olive)" }} /><p>{t.cart.empty}<br />{t.cart.emptyLead}</p>
      <Link className="btn btn-solid" href={`/${lang}/shop`}>{t.cart.continue} <Arrow className="arrow" /></Link></div>
  );
  return (
    <>
      {canceled && <p className="alert" role="status">{t.cart.canceled}</p>}
      <div className="cart-page">
        <CartLines lang={lang} />
        <aside className="summary-card">
          <h2>{t.cart.subtotal}</h2>
          {error && <p className="alert err" role="alert">{t.cart.errors[error] ?? t.cart.errors.generic}</p>}
          <CartTotals lang={lang} />
          <button className="btn btn-solid btn-block" type="button" onClick={checkout} disabled={busy} style={{ marginTop: "var(--s4)" }} data-testid="checkout-page">
            {busy ? <><span className="spinner" />{t.cart.processing}</> : <><Lock />{t.cart.checkout}</>}
          </button>
          <p className="fine">{t.cart.note}</p>
          <div className="pay-logos" aria-label="Payment methods"><span>VISA</span><span>Mastercard</span><span>AMEX</span><span>Apple Pay</span><span>Google Pay</span></div>
          <p className="fine" style={{ textAlign: "center" }}><Link href={`/${lang}/shop`}>{t.cart.continue}</Link></p>
        </aside>
      </div>
    </>
  );
}
