"use client";
import Link from "next/link";
import { useState } from "react";
import { formatPrice, getDict, type Locale } from "@/lib/i18n";
import { swatch } from "@/lib/art";
import { fromPrice, type Product } from "@/lib/products";
import { useStore } from "./Store";
import { Art } from "./Art";
import { Check, Heart } from "./Icons";

export function ProductCard({ product: p, lang, delay = 0 }: { product: Product; lang: Locale; delay?: number }) {
  const t = getDict(lang);
  const { add, wishlist, toggleWish, toast, ready } = useStore();
  const [added, setAdded] = useState(false);
  const saved = ready && wishlist.includes(p.id);
  const hasRange = p.variants.some((v) => v.priceDelta);
  return (
    <li className="card reveal" style={{ ["--d" as string]: `${delay}s` }} data-testid="product-card">
      <div className={`frame bg-${p.backdrop}`}>
        <Link href={`/${lang}/product/${p.slug}`} tabIndex={-1} aria-hidden="true" className="frame-link"><Art product={p} variant={p.variants[0]} /></Link>
        <div className="flags">
          {p.compareAt && <span className="flag sale">{t.product.sale}</span>}
          {p.isNew && <span className="flag">{t.product.new}</span>}
        </div>
        <button type="button" className="heart" aria-pressed={saved} aria-label={t.product.save}
          onClick={() => { const now = toggleWish(p.id); toast(now ? t.toast.saved : t.toast.removed); }}><Heart /></button>
        <button type="button" className={`btn quick${added ? " done" : ""}`} data-testid="quick-add"
          onClick={() => { add({ productId: p.id, variantId: p.variants[0].id, qty: 1 }); toast(t.toast.added); setAdded(true); setTimeout(() => setAdded(false), 1600); }}>
          {added ? <><Check />{t.product.added}</> : t.product.add}
        </button>
      </div>
      <div className="meta">
        <h3><Link className="card-link" href={`/${lang}/product/${p.slug}`}>{p.name[lang]}</Link></h3>
        <span className="price">
          {hasRange && <span className="from">{t.product.from}</span>}{formatPrice(fromPrice(p), lang)}
          {p.compareAt && <s>{formatPrice(p.compareAt, lang)}</s>}
        </span>
      </div>
      <p className="tagline">{p.tagline[lang]}</p>
      <div className="swatches" aria-hidden="true">{p.variants.map((v) => <i key={v.id} style={{ background: swatch(p.kind, v)[0] }} />)}</div>
    </li>
  );
}
