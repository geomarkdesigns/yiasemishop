import type { Metadata } from "next";
import { Suspense } from "react";
import { getDict, isLocale, type Locale } from "@/lib/i18n";
import { CartPage } from "@/components/CartPage";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDict(isLocale(lang) ? lang : "el").cart.title, robots: { index: false } };
}
export default async function Cart({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = (isLocale(l) ? l : "el") as Locale;
  return (
    <div className="wrap">
      <header className="page-head"><h1>{getDict(lang).cart.title}</h1></header>
      <Suspense><CartPage lang={lang} /></Suspense>
    </div>
  );
}
