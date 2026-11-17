"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getDict, type Locale } from "@/lib/i18n";
import { useStore } from "./Store";
import { Bag, Burger, Close, Heart, Jasmine, Moon, Sun } from "./Icons";

export function Header({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const path = usePathname();
  const query = useSearchParams();
  const { count, wishlist, openDrawer, ready, bump } = useStore();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [path]);

  const other: Locale = lang === "el" ? "en" : "el";
  const qs = query.toString();
  const otherHref = path.replace(/^\/(en|el)(?=\/|$)/, `/${other}`) + (qs ? `?${qs}` : "");

  function toggleTheme(e: React.MouseEvent) {
    const next = dark ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch {}
      setDark(!dark);
    };
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    if (!doc.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) return apply();
    const x = e.clientX, y = e.clientY;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    doc.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 520, easing: "cubic-bezier(.2,.8,.2,1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  }

  const links = [
    { href: `/${lang}`, label: t.nav.home, exact: true },
    { href: `/${lang}/shop`, label: t.nav.shop },
    { href: `/${lang}/about`, label: t.nav.about },
    { href: `/${lang}/delivery`, label: t.nav.journal },
    { href: `/${lang}/contact`, label: t.nav.contact },
  ];
  const isCurrent = (href: string, exact?: boolean) => (exact ? path === href : path.startsWith(href));

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <nav className="wrap nav" aria-label="Main">
        <Link href={`/${lang}`} className="logo" aria-label="Yiasemi"><Jasmine /><span>{lang === "el" ? "Γιασεμί" : "Yiasemi"}</span></Link>
        <ul className={`links${open ? " open" : ""}`} id="site-links">
          {links.map((l) => <li key={l.href}><Link href={l.href} aria-current={isCurrent(l.href, l.exact) ? "page" : undefined}>{l.label}</Link></li>)}
        </ul>
        <div className="controls">
          <Link className="pill-btn" href={otherHref} hrefLang={other} lang={other} aria-label={t.a11y.switchLang}
            onClick={() => { document.cookie = `lang=${other};path=/;max-age=31536000;samesite=lax`; }}>{other === "el" ? "ΕΛ" : "EN"}</Link>
          <button className="pill-btn" type="button" onClick={toggleTheme} aria-pressed={dark} aria-label={dark ? t.a11y.light : t.a11y.dark}>
            <Moon className="icon-moon" /><Sun className="icon-sun" />
          </button>
          <Link className="pill-btn hide-sm" href={`/${lang}/wishlist`} aria-label={t.a11y.wishlist}>
            <Heart />{ready && wishlist.length > 0 && <span className="count">{wishlist.length}</span>}
          </Link>
          <button className="pill-btn" type="button" onClick={openDrawer} aria-label={`${t.a11y.cart}${ready ? `, ${count} ${t.a11y.items}` : ""}`} data-testid="cart-button">
            <Bag />{ready && count > 0 && <span key={bump} className={`count${bump ? " bump" : ""}`} data-testid="cart-count">{count}</span>}
          </button>
          <button className="pill-btn menu-toggle" type="button" aria-controls="site-links" aria-expanded={open} aria-label={open ? t.nav.close : t.nav.menu} onClick={() => setOpen(!open)}>
            {open ? <Close /> : <Burger />}
          </button>
        </div>
      </nav>
    </header>
  );
}
