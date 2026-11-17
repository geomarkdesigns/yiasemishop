import type { Metadata } from "next";
import { getDict, isLocale, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDict(isLocale(lang) ? lang : "el").pages.contactTitle, alternates: { languages: { el: "/el/contact", en: "/en/contact" } } };
}
export default async function Contact({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = (isLocale(l) ? l : "el") as Locale;
  const t = getDict(lang);
  const formOn = Boolean(process.env.RESEND_API_KEY && process.env.ORDER_FROM_EMAIL && process.env.ORDER_NOTIFY_EMAIL);
  const lead = lang === "el" ? "Ερωτήσεις για ένα κομμάτι, ύφασμα ή παράδοση; Γράψτε μας, απαντάμε μέσα σε μία εργάσιμη." : "Questions about a piece, a fabric or delivery? Write to us; we reply within one working day.";
  return (
    <div className="wrap">
      <div className="two-col page-head">
        <div>
          <p className="eyebrow">{t.nav.contact}</p><h1>{t.pages.contactTitle}</h1><p className="lead">{lead}</p>
          <ul className="contact-list">
            <li><span className="muted">E-mail · </span><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><span className="muted">{lang === "el" ? "Τηλέφωνο" : "Phone"} · </span><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></li>
          </ul>
        </div>
        <div className="reveal">{formOn ? <ContactForm lang={lang} /> : <a className="btn btn-solid" href={`mailto:${site.email}`}>{site.email}</a>}</div>
      </div>
    </div>
  );
}
