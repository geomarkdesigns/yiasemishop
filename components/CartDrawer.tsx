"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { getDict, type Locale } from "@/lib/i18n";
import { useStore } from "./Store";
import { CartLines, CartTotals } from "./CartLines";
import { useCheckout } from "./useCheckout";
import { Arrow, Close, Jasmine, Lock } from "./Icons";

export function CartDrawer({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const { drawerOpen, closeDrawer, count, ready } = useStore();
  const { checkout, busy, error } = useCheckout(lang);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (drawerOpen) ref.current?.querySelector<HTMLElement>("button")?.focus(); }, [drawerOpen]);
  return (
    <>
      <div className={`scrim${drawerOpen ? " open" : ""}`} onClick={closeDrawer} aria-hidden="true" />
      <div ref={ref} className={`drawer${drawerOpen ? " open" : ""}`} role="dialog" aria-modal="true" aria-label={t.cart.title} aria-hidden={!drawerOpen} data-testid="drawer">
        <div className="drawer-head">
          <h2>{t.cart.title}</h2>
          <button className="pill-btn" type="button" onClick={closeDrawer} aria-label={t.nav.close}><Close /></button>
        </div>
        {ready && count === 0 ? (
          <div className="drawer-body empty-state">
            <Jasmine style={{ color: "var(--olive)" }} />
            <p>{t.cart.empty}<br />{t.cart.emptyLead}</p>
            <Link className="btn btn-solid" href={`/${lang}/shop`} onClick={closeDrawer}>{t.cart.continue} <Arrow className="arrow" /></Link>
          </div>
        ) : (
          <>
            <div className="drawer-body"><CartLines lang={lang} onNavigate={closeDrawer} /></div>
            <div className="drawer-foot">
              {error && <p className="alert err" role="alert">{t.cart.errors[error] ?? t.cart.errors.generic}</p>}
              <CartTotals lang={lang} />
              <div className="actions" style={{ marginTop: "var(--s3)" }}>
                <button className="btn btn-solid btn-block" type="button" onClick={checkout} disabled={busy} data-testid="checkout">
                  {busy ? <><span className="spinner" />{t.cart.processing}</> : <><Lock />{t.cart.checkout}</>}
                </button>
                <Link className="btn btn-ghost btn-block" href={`/${lang}/cart`} onClick={closeDrawer}>{t.cart.viewCart}</Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
