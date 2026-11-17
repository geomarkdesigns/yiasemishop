"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { swatch } from "@/lib/art";
import { formatPrice, getDict, type Locale } from "@/lib/i18n";
import { getVariant, unitPrice, type Product } from "@/lib/products";
import { site } from "@/lib/site";
import { useStore } from "./Store";
import { Art } from "./Art";
import { Stepper } from "./Stepper";
import { Check, Heart, Lock, Return, Shield, Truck } from "./Icons";

export function ProductView({ product: p, lang }: { product: Product; lang: Locale }) {
  const t = getDict(lang);
  const sp = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const [variant, setVariant] = useState(() => getVariant(p, sp.get("v") ?? undefined));
  const [view, setView] = useState<"art" | "dims">("art");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { add, toast, wishlist, toggleWish, ready, openDrawer } = useStore();
  const max = p.stock > 0 ? Math.min(site.maxQty, p.stock) : site.maxQty;
  const price = unitPrice(p, variant);
  const saved = ready && wishlist.includes(p.id);
  const labels = { w: t.product.width, h: t.product.height };

  function choose(id: string) {
    setVariant(getVariant(p, id));
    router.replace(`${path}?v=${id}`, { scroll: false });
  }
  function addToCart() {
    add({ productId: p.id, variantId: variant.id, qty });
    toast(t.toast.added);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }
  async function buyNow() {
    setBusy(true); setError(null);
    try {
      const res = await fetch("/api/checkout", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ lang, items: [{ productId: p.id, variantId: variant.id, qty }] }) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) { window.location.assign(data.url); return; }
      setError(data.error ?? "generic");
    } catch { setError("generic"); }
    setBusy(false);
  }

  return (
    <div className="pdp">
      <div className="gallery">
        <div className={`frame arch bg-${p.backdrop}`} data-testid="gallery">
          <Art product={p} variant={variant} dims={view === "dims"} labels={labels} swapKey={`${variant.id}-${view}`} />
          <div className="flags">
            {p.compareAt && <span className="flag sale">{t.product.sale}</span>}
            {p.isNew && <span className="flag">{t.product.new}</span>}
          </div>
        </div>
        <div className="thumbs" role="group" aria-label={t.product.view}>
          {(["art", "dims"] as const).map((v) => (
            <button key={v} type="button" className={`thumb bg-${p.backdrop}`} aria-pressed={view === v} aria-label={v === "art" ? p.name[lang] : t.product.drawing} onClick={() => setView(v)}>
              <Art product={p} variant={variant} dims={v === "dims"} labels={labels} />
            </button>
          ))}
        </div>
      </div>

      <div className="buy">
        <h1>{p.name[lang]}</h1>
        <p className="tagline">{p.tagline[lang]}</p>
        <p className="price" data-testid="price">{formatPrice(price, lang)}{p.compareAt && !variant.priceDelta && <s>{formatPrice(p.compareAt, lang)}</s>}<span className="vat">{t.product.vat}</span></p>

        <div className="opt">
          <p className="opt-label" id="finish-label">{t.product.finish}: <b>{variant.name[lang]}</b></p>
          <div className="finishes" role="radiogroup" aria-labelledby="finish-label">
            {p.variants.map((v) => {
              const [a, b] = swatch(p.kind, v);
              return (
                <button key={v.id} type="button" role="radio" aria-checked={v.id === variant.id} className="finish" title={v.name[lang]} aria-label={v.name[lang]} onClick={() => choose(v.id)}>
                  <span><i style={{ background: a }} />{b && <i style={{ background: b }} />}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={`stock${p.stock > 0 ? "" : " mto"}`}><i />{p.stock > 0 ? t.product.inStock(p.stock) : t.product.madeToOrder(p.leadWeeks)}</div>

        <div className="buy-row">
          <Stepper value={qty} max={max} onChange={setQty} label={t.product.qty} />
          <button type="button" className={`btn btn-solid${added ? " done" : ""}`} onClick={addToCart} data-testid="add-to-cart">
            {added ? <><Check />{t.product.added}</> : t.product.add}
          </button>
          <button type="button" className="pill-btn heart-inline" aria-pressed={saved} aria-label={t.product.save} style={{ height: 48, width: 48 }}
            onClick={() => { const now = toggleWish(p.id); toast(now ? t.toast.saved : t.toast.removed); }}>
            <Heart style={saved ? { fill: "var(--clay)", color: "var(--clay)" } : undefined} />
          </button>
        </div>
        <div className="buy-row" style={{ marginTop: "var(--s2)" }}>
          <button type="button" className="btn btn-ghost" onClick={buyNow} disabled={busy}>{busy ? <><span className="spinner" />{t.cart.processing}</> : <><Lock />{t.product.buyNow}</>}</button>
          {added && <button type="button" className="btn btn-ghost" onClick={openDrawer}>{t.cart.viewCart}</button>}
        </div>
        {error && <p className="alert err" role="alert" style={{ marginTop: "var(--s3)" }}>{t.cart.errors[error] ?? t.cart.errors.generic}</p>}

        <ul className="assure">
          <li><Truck />{t.product.freeDelivery(formatPrice(site.freeShippingFrom, lang))}</li>
          <li><Return />{t.product.returns(site.returnDays)}</li>
          <li><Shield />{t.product.guarantee}</li>
          <li><Lock />{t.product.secure}</li>
        </ul>

        <div className="acc">
          <details open><summary>{t.product.details}</summary><div className="acc-body"><p>{p.description[lang]}</p></div></details>
          <details><summary>{t.product.dimensions}</summary><div className="acc-body">
            <dl className="dims">
              <div><dt>{t.product.width}</dt><dd>{p.dims.w} cm</dd></div>
              <div><dt>{t.product.depth}</dt><dd>{p.dims.d} cm</dd></div>
              <div><dt>{t.product.height}</dt><dd>{p.dims.h} cm</dd></div>
              <div><dt>{t.product.weight}</dt><dd>{p.weightKg} kg</dd></div>
            </dl></div></details>
          <details><summary>{t.product.materials}</summary><div className="acc-body"><p>{p.materials[lang]}</p></div></details>
          <details><summary>{t.product.care}</summary><div className="acc-body"><p>{p.care[lang]}</p></div></details>
          <details><summary>{t.product.delivery}</summary><div className="acc-body"><p>{t.product.deliveryText}</p></div></details>
        </div>
      </div>
    </div>
  );
}
