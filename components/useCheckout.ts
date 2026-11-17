"use client";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { useStore } from "./Store";

export function useCheckout(lang: Locale) {
  const { lines } = useStore();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function checkout() {
    setBusy(true); setError(null);
    try {
      const res = await fetch("/api/checkout", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ lang, items: lines }) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && typeof data.url === "string") { window.location.assign(data.url); return; }
      setError(typeof data.error === "string" ? data.error : "generic");
    } catch { setError("generic"); }
    setBusy(false);
  }
  return { checkout, busy, error };
}
