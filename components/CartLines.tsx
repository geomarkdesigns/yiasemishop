"use client";
import Link from "next/link";
import { useState } from "react";
import { resolveForDisplay, standardShippingFor, subtotal, vatIncluded, cartLeadWeeks } from "@/lib/cart";
import { formatPrice, getDict, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { useStore } from "./Store";
import { Art } from "./Art";
import { Stepper } from "./Stepper";

export function CartLines({ lang, onNavigate }: { lang: Locale; onNavigate?: () => void }) {
  const t = getDict(lang);
  const { lines, setQty, remove } = useStore();
  const [leaving, setLeaving] = useState<string | null>(null);
  const resolved = resolveForDisplay(lines);
  return (
    <ul className="lines" data-testid="cart-lines">
      {resolved.map((l) => {
        const key = `${l.productId}::${l.variantId}`;
        const href = `/${lang}/product/${l.product.slug}?v=${l.variant.id}`;
        const max = l.product.stock > 0 ? Math.min(site.maxQty, l.product.stock) : site.maxQty;
        return (
          <li key={key} className={`line${leaving === key ? " leaving" : ""}`}>
            <Link href={href} onClick={onNavigate} className={`frame bg-${l.product.backdrop}`} tabIndex={-1} aria-hidden="true"><Art product={l.product} variant={l.variant} /></Link>
            <div>
              <h3><Link href={href} onClick={onNavigate}>{l.product.name[lang]}</Link></h3>
              <p className="var">{l.variant.name[lang]}</p>
              <div className="row">
                <Stepper small value={l.qty} max={max} onChange={(q) => setQty(l.productId, l.variantId, q)} label={`${t.product.qty}: ${l.product.name[lang]}`} />
                <button type="button" className="remove" onClick={() => { setLeaving(key); setTimeout(() => { remove(l.productId, l.variantId); setLeaving(null); }, 280); }}>{t.cart.remove}</button>
              </div>
            </div>
            <span className="price">{formatPrice(l.total, lang)}</span>
          </li>
        );
      })}
    </ul>
  );
}

export function CartTotals({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const { lines } = useStore();
  const resolved = resolveForDisplay(lines);
  const sub = subtotal(resolved);
  const ship = standardShippingFor(sub);
  const left = site.freeShippingFrom - sub;
  const lead = cartLeadWeeks(resolved);
  return (
    <>
      <div className="progress">
        {left > 0 ? t.cart.freeLeft(formatPrice(left, lang)) : t.cart.freeOk}
        <div className="bar"><i style={{ width: `${Math.min(100, (sub / site.freeShippingFrom) * 100)}%` }} /></div>
      </div>
      <dl className="sum">
        <div><dt>{t.cart.subtotal}</dt><dd data-testid="subtotal">{formatPrice(sub, lang)}</dd></div>
        <div><dt>{t.cart.shipping}</dt><dd>{ship === 0 ? t.cart.free : formatPrice(ship, lang)}</dd></div>
        <div className="total"><dt>{t.cart.total}</dt><dd>{formatPrice(sub + ship, lang)}</dd></div>
        <div className="muted"><dt>{t.cart.vat}</dt><dd>{formatPrice(vatIncluded(sub + ship), lang)}</dd></div>
      </dl>
      {lead > 0 && <p className="fine">{t.cart.lead(lead)}</p>}
    </>
  );
}
