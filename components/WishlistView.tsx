"use client";
import Link from "next/link";
import { getDict, type Locale } from "@/lib/i18n";
import { products } from "@/lib/products";
import { useStore } from "./Store";
import { ProductCard } from "./ProductCard";
import { Arrow, Heart } from "./Icons";

export function WishlistView({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const { wishlist, ready } = useStore();
  if (!ready) return null;
  const list = products.filter((p) => wishlist.includes(p.id));
  if (!list.length) return (
    <div className="empty-state"><Heart /><p>{t.wishlist.empty}<br />{t.wishlist.lead}</p>
      <Link className="btn btn-solid" href={`/${lang}/shop`}>{t.cart.continue} <Arrow className="arrow" /></Link></div>
  );
  return <ul className="grid">{list.map((p, i) => <ProductCard key={p.id} product={p} lang={lang} delay={(i % 3) * 0.06} />)}</ul>;
}
