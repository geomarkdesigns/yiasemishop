import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import "../fonts.css";
import "../globals.css";
import { getDict, isLocale, locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";
import { StoreProvider } from "@/components/Store";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { Toasts } from "@/components/Toasts";
import { RevealObserver } from "@/components/Reveal";

export const generateStaticParams = () => locales.map((lang) => ({ lang }));
export const dynamicParams = false;

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f6f0e6" }, { media: "(prefers-color-scheme: dark)", color: "#161712" }],
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDict(lang);
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: t.meta.title, template: `%s · ${lang === "el" ? "Γιασεμί" : "Yiasemi"}` },
    description: t.meta.description,
    icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
    openGraph: { siteName: "Yiasemi", locale: lang === "el" ? "el_GR" : "en_GB", type: "website" },
    alternates: { languages: { el: "/el", en: "/en", "x-default": "/el" } },
  };
}

// Runs before paint so the page never flashes the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(!t)t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}document.documentElement.classList.add("js")})()`;

export default async function RootLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDict(lang);
  const testMode = (process.env.STRIPE_SECRET_KEY ?? "").startsWith("sk_test_");
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preload" href="/fonts/gfs-didot-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/commissioner-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        <StoreProvider>
          <a className="skip" href="#main">{t.nav.skip}</a>
          {testMode && <p className="notice test">{t.footer.testMode}</p>}
          <Suspense fallback={<div style={{ height: "var(--header-h)" }} />}><Header lang={lang} /></Suspense>
          <main id="main" tabIndex={-1}>{children}</main>
          <Footer lang={lang} />
          <CartDrawer lang={lang} />
          <Toasts />
          <RevealObserver />
        </StoreProvider>
      </body>
    </html>
  );
}
