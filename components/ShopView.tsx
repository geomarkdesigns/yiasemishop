"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { categories, fromPrice, products, type Category } from "@/lib/products";
import { getDict, type Locale } from "@/lib/i18n";
import { ProductCard } from "./ProductCard";
import { Jasmine, Search } from "./Icons";

type Sort = "featured" | "price-asc" | "price-desc" | "new";
const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function ShopView({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const router = useRouter();
  const path = usePathname();
  const sp = useSearchParams();
  const cat = (sp.get("c") as Category | null) ?? null;
  const sort = (sp.get("sort") as Sort | null) ?? "featured";
  const stockOnly = sp.get("stock") === "1";
  const [q, setQ] = useState(sp.get("q") ?? "");

  function update(patch: Record<string, string | null>) {
    const next = new URLSearchParams(sp.toString());
    for (const [k, v] of Object.entries(patch)) (v ? next.set(k, v) : next.delete(k));
    const s = next.toString();
    router.replace(`${path}${s ? `?${s}` : ""}`, { scroll: false });
  }
  useEffect(() => {
    const id = setTimeout(() => { if ((sp.get("q") ?? "") !== q) update({ q: q.trim() || null }); }, 250);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const list = useMemo(() => {
    const needle = norm(q.trim());
    let out = products.filter((p) => (!cat || p.category === cat) && (!stockOnly || p.stock > 0));
    if (needle) out = out.filter((p) => norm(`${p.name.en} ${p.name.el} ${p.tagline[lang]} ${p.kind} ${p.materials[lang]}`).includes(needle));
    const by = { "price-asc": (a: typeof out[0], b: typeof out[0]) => fromPrice(a) - fromPrice(b), "price-desc": (a: typeof out[0], b: typeof out[0]) => fromPrice(b) - fromPrice(a),
      new: (a: typeof out[0], b: typeof out[0]) => Number(!!b.isNew) - Number(!!a.isNew), featured: (a: typeof out[0], b: typeof out[0]) => Number(!!b.featured) - Number(!!a.featured) }[sort] ?? (() => 0);
    return [...out].sort(by);
  }, [cat, sort, stockOnly, q, lang]);

  return (
    <>
      <div className="toolbar">
        <div className="tabs" role="group" aria-label={t.shop.title}>
          <button type="button" className="tab" aria-pressed={!cat} onClick={() => update({ c: null })}>{t.shop.all}</button>
          {categories.map((c) => <button key={c.id} type="button" className="tab" aria-pressed={cat === c.id} onClick={() => update({ c: c.id })}>{c.name[lang]}</button>)}
        </div>
        <div className="tools">
          <div className="search"><Search /><input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.shop.searchPlaceholder} aria-label={t.nav.search} /></div>
          <label className="toggle"><input type="checkbox" checked={stockOnly} onChange={(e) => update({ stock: e.target.checked ? "1" : null })} />{t.shop.inStockOnly}</label>
          <select className="select" value={sort} onChange={(e) => update({ sort: e.target.value === "featured" ? null : e.target.value })} aria-label={t.shop.sort}>
            {(Object.keys(t.shop.sorts) as Sort[]).map((k) => <option key={k} value={k}>{t.shop.sorts[k]}</option>)}
          </select>
        </div>
      </div>
      <p className="results" aria-live="polite" data-testid="results">{t.shop.results(list.length)}</p>
      {list.length ? (
        <ul className="grid" key={`${cat}-${sort}-${stockOnly}`}>{list.map((p, i) => <ProductCard key={p.id} product={p} lang={lang} delay={(i % 3) * 0.06} />)}</ul>
      ) : (
        <div className="empty-state"><Jasmine style={{ color: "var(--olive)" }} /><p>{t.shop.none}</p>
          <button className="btn btn-ghost" type="button" onClick={() => { setQ(""); router.replace(path, { scroll: false }); }}>{t.shop.clear}</button></div>
      )}
    </>
  );
}
