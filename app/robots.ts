import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/el/checkout", "/en/checkout", "/el/cart", "/en/cart"] }], sitemap: `${siteUrl()}/sitemap.xml` };
}
