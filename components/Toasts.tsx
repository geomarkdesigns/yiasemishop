"use client";
import { useStore } from "./Store";
import { Check } from "./Icons";

export function Toasts() {
  const { toasts } = useStore();
  return (
    <div className="toasts" role="status" aria-live="polite">
      {toasts.map((t) => <div key={t.id} className={`toast${t.out ? " out" : ""}`}><Check />{t.text}</div>)}
    </div>
  );
}
