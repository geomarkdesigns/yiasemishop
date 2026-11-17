"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDict } from "@/lib/i18n";
import { Jasmine } from "@/components/Icons";

export default function NotFound() {
  const lang = usePathname()?.startsWith("/en") ? "en" : "el";
  const t = getDict(lang);
  return (
    <div className="wrap narrow empty-state" style={{ paddingTop: "var(--s8)" }}>
      <Jasmine style={{ color: "var(--olive)", width: 56, height: 56 }} />
      <h1 style={{ fontSize: "var(--t-2xl)", marginBottom: "var(--s2)" }}>{t.pages.notFound}</h1>
      <p>{t.pages.notFoundLead}</p>
      <Link className="btn btn-solid" href={`/${lang}/shop`}>{t.cart.continue}</Link>
    </div>
  );
}
