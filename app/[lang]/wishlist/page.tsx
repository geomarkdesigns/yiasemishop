import type { Metadata } from "next";
import { getDict, isLocale, type Locale } from "@/lib/i18n";
import { WishlistView } from "@/components/WishlistView";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDict(isLocale(lang) ? lang : "el").wishlist.title, robots: { index: false } };
}
export default async function Wishlist({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = (isLocale(l) ? l : "el") as Locale;
  return <div className="wrap"><header className="page-head"><h1>{getDict(lang).wishlist.title}</h1></header><WishlistView lang={lang} /></div>;
}
