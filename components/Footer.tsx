import Link from "next/link";
import { categories } from "@/lib/products";
import { getDict, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Jasmine } from "./Icons";

export function Footer({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="meander" aria-hidden="true" />
        <div className="foot-grid">
          <div>
            <Link href={`/${lang}`} className="logo"><Jasmine style={{ width: 24, height: 24, color: "var(--olive)" }} /><span>{lang === "el" ? "Γιασεμί" : "Yiasemi"}</span></Link>
            <p className="muted foot-note">{t.footer.note}</p>
          </div>
          <div>
            <p className="foot-h">{t.footer.shop}</p>
            <ul>
              <li><Link href={`/${lang}/shop`}>{t.shop.all}</Link></li>
              {categories.map((c) => <li key={c.id}><Link href={`/${lang}/shop?c=${c.id}`}>{c.name[lang]}</Link></li>)}
            </ul>
          </div>
          <div>
            <p className="foot-h">{t.footer.help}</p>
            <ul>
              <li><Link href={`/${lang}/delivery`}>{t.pages.shippingTitle}</Link></li>
              <li><Link href={`/${lang}/about`}>{t.nav.about}</Link></li>
              <li><Link href={`/${lang}/wishlist`}>{t.wishlist.title}</Link></li>
              <li><Link href={`/${lang}/terms`}>{t.pages.termsTitle}</Link></li>
            </ul>
          </div>
          <div>
            <p className="foot-h">{t.footer.contact}</p>
            <ul>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></li>
              <li><Link href={`/${lang}/contact`}>{t.nav.contact}</Link></li>
            </ul>
          </div>
        </div>
        <p className="wordmark" aria-hidden="true">{lang === "el" ? "Γιασεμί" : "Yiasemi"}</p>
        <div className="foot-base">
          <span>© {new Date().getFullYear()} Yiasemi. {t.footer.rights} · {t.footer.payments}</span>
          <span className="foot-links"><Link href={`/${lang}/privacy`}>{t.footer.privacy}</Link><Link href={`/${lang}/terms`}>{t.footer.terms}</Link></span>
        </div>
      </div>
    </footer>
  );
}
