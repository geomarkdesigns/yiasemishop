"use client";
import { useState } from "react";
import { getDict, type Locale } from "@/lib/i18n";
import { Arrow, Check } from "./Icons";

export function Newsletter({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("busy");
    const email = new FormData(e.currentTarget).get("email");
    const res = await fetch("/api/newsletter", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email }) }).catch(() => null);
    setState(res?.ok ? "done" : "error");
  }
  return (
    <section className="wrap section" aria-labelledby="nl-h">
      <div className="newsletter reveal">
        <div><h2 id="nl-h">{t.home.newsletterTitle}</h2><p className="muted" style={{ marginTop: "var(--s2)" }}>{t.home.newsletterLead}</p></div>
        {state === "done" ? <p className="chip" role="status"><Check />{t.home.newsletterThanks}</p> : (
          <form onSubmit={submit}>
            <label className="sr-only" htmlFor="nl-email">{t.home.newsletterPlaceholder}</label>
            <input className="field" id="nl-email" name="email" type="email" required autoComplete="email" placeholder={t.home.newsletterPlaceholder} />
            <button className="btn btn-solid" type="submit" disabled={state === "busy"}>{t.home.newsletterCta} <Arrow className="arrow" /></button>
            {state === "error" && <p className="fine" role="alert" style={{ color: "var(--danger)" }}>{t.cart.errors.generic}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
