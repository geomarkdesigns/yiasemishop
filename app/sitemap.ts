import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const paths = ["", "/shop", "/about", "/delivery", "/contact", "/privacy", "/terms", ...products.map((p) => `/product/${p.slug}`)];
  return paths.map((p) => ({ url: `${base}/el${p}`, alternates: { languages: { el: `${base}/el${p}`, en: `${base}/en${p}` } } }));
}
