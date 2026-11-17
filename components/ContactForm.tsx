"use client";
import { useState } from "react";
import { getDict, type Locale } from "@/lib/i18n";
import { Arrow, Check } from "./Icons";

export function ContactForm({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  const L = lang === "el" ? { name: "Όνομα", email: "E-mail", msg: "Μήνυμα", send: "Αποστολή", ok: "Το μήνυμά σας στάλθηκε. Θα απαντήσουμε σύντομα." } : { name: "Name", email: "E-mail", msg: "Message", send: "Send", ok: "Your message was sent. We will reply soon." };
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setState("busy");
    const body = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) }).catch(() => null);
    setState(res?.ok ? "done" : "error");
  }
  if (state === "done") return <p className="chip" role="status"><Check />{L.ok}</p>;
  return (
    <form className="form" onSubmit={submit}>
      <label>{L.name}<input className="field" name="name" required autoComplete="name" maxLength={120} /></label>
      <label>{L.email}<input className="field" name="email" type="email" required autoComplete="email" /></label>
      <label>{L.msg}<textarea className="field" name="message" required minLength={5} maxLength={4000} /></label>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: -9999 }} />
      {state === "error" && <p className="alert err" role="alert">{t.cart.errors.generic}</p>}
      <div><button className="btn btn-solid" type="submit" disabled={state === "busy"}>{L.send} <Arrow className="arrow" /></button></div>
    </form>
  );
}
