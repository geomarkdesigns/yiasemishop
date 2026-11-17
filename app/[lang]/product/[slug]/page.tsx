import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { categories, fromPrice, getProduct, products } from "@/lib/products";
import { getDict, isLocale, locales, type Locale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";
import { ProductView } from "@/components/ProductView";
import { ProductCard } from "@/components/ProductCard";

export const generateStaticParams = () => locales.flatMap((lang) => products.map((p) => ({ lang, slug: p.slug })));
export const dynamicParams = false;

type Params = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = getProduct(slug);
  if (!p || !isLocale(lang)) return {};
  const img = `/api/product-image/${p.slug}`;
  return {
    title: p.name[lang], description: p.tagline[lang],
    alternates: { languages: { el: `/el/product/${slug}`, en: `/en/product/${slug}` } },
    openGraph: { title: p.name[lang], description: p.tagline[lang], images: [{ url: img, width: 800, height: 1000 }] },
  };
}

export default async function ProductPage({ params }: Params) {
  const { lang: l, slug } = await params;
  const p = getProduct(slug);
  if (!p || !isLocale(l)) notFound();
  const lang = l as Locale;
  const t = getDict(lang);
  const cat = categories.find((c) => c.id === p.category)!;
  const related = products.filter((x) => x.id !== p.id && x.category === p.category).concat(products.filter((x) => x.category !== p.category && x.featured)).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Product", name: p.name[lang], description: p.description[lang],
    image: `${siteUrl()}/api/product-image/${p.slug}`, sku: p.id, brand: { "@type": "Brand", name: "Yiasemi" },
    width: { "@type": "QuantitativeValue", value: p.dims.w, unitCode: "CMT" }, height: { "@type": "QuantitativeValue", value: p.dims.h, unitCode: "CMT" },
    offers: { "@type": "AggregateOffer", priceCurrency: "EUR", lowPrice: (fromPrice(p) / 100).toFixed(2), offerCount: p.variants.length,
      availability: p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/PreOrder", url: `${siteUrl()}/${lang}/product/${p.slug}` },
  };
  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href={`/${lang}/shop`}>{t.shop.title}</Link><span aria-hidden="true">/</span>
        <Link href={`/${lang}/shop?c=${cat.id}`}>{cat.name[lang]}</Link><span aria-hidden="true">/</span>
        <span aria-current="page">{p.name[lang]}</span>
      </nav>
      <Suspense><ProductView product={p} lang={lang} /></Suspense>
      <section className="section" aria-labelledby="rel-h">
        <div className="sec-head"><h2 id="rel-h" className="reveal">{t.product.related}</h2></div>
        <ul className="grid">{related.map((x, i) => <ProductCard key={x.id} product={x} lang={lang} delay={i * 0.06} />)}</ul>
      </section>
    </div>
  );
}
