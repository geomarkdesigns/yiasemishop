import type { Metadata } from "next";
import { getDict, isLocale, type Locale } from "@/lib/i18n";
import { InfoPage } from "@/components/InfoPage";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDict(isLocale(lang) ? lang : "el").pages.shippingTitle, alternates: { languages: { el: "/el/delivery", en: "/en/delivery" } } };
}
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = (isLocale(l) ? l : "el") as Locale;
  return <InfoPage page="delivery" lang={lang} title={getDict(lang).pages.shippingTitle} />;
}
