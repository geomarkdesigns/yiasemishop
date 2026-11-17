import type { Metadata } from "next";
import { Suspense } from "react";
import { getDict, isLocale, type Locale } from "@/lib/i18n";
import { ShopView } from "@/components/ShopView";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = getDict(isLocale(lang) ? lang : "el");
  return { title: t.shop.title, alternates: { languages: { el: "/el/shop", en: "/en/shop" } } };
}

export default async function Shop({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = (isLocale(l) ? l : "el") as Locale;
  const t = getDict(lang);
  return (
    <div className="wrap">
      <header className="page-head"><p className="eyebrow">{t.shop.eyebrow}</p><h1>{t.shop.title}</h1></header>
      <Suspense><ShopView lang={lang} /></Suspense>
    </div>
  );
}
