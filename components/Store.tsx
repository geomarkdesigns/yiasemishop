"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { CartLine } from "@/lib/cart";
import { site } from "@/lib/site";

type Toast = { id: number; text: string; out?: boolean };
type Store = {
  ready: boolean;
  lines: CartLine[];
  count: number;
  add: (line: CartLine) => void;
  setQty: (productId: string, variantId: string, qty: number) => void;
  remove: (productId: string, variantId: string) => void;
  clear: () => void;
  wishlist: string[];
  toggleWish: (productId: string) => boolean;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toasts: Toast[];
  toast: (text: string) => void;
  bump: number;
};

const Ctx = createContext<Store | null>(null);
const CART_KEY = "yiasemi-cart-v1";
const WISH_KEY = "yiasemi-wish-v1";

function read<T>(key: string, fallback: T): T {
  try { const raw = localStorage.getItem(key); return raw ? (JSON.parse(raw) as T) : fallback; } catch { return fallback; }
}
function write(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* private mode: keep in memory */ }
}
const sanitize = (x: unknown): CartLine[] =>
  Array.isArray(x) ? x.filter((l) => l && typeof l.productId === "string" && typeof l.variantId === "string" && Number.isInteger(l.qty) && l.qty > 0).slice(0, 50) : [];

export function StoreProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [lines, setLines] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [bump, setBump] = useState(0);
  const tid = useRef(0);

  useEffect(() => {
    setLines(sanitize(read(CART_KEY, [])));
    setWishlist(read<string[]>(WISH_KEY, []).filter((x) => typeof x === "string"));
    setReady(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key === CART_KEY) setLines(sanitize(read(CART_KEY, [])));
      if (e.key === WISH_KEY) setWishlist(read<string[]>(WISH_KEY, []));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const commit = useCallback((fn: (prev: CartLine[]) => CartLine[]) => {
    setLines((prev) => { const next = fn(prev); write(CART_KEY, next); return next; });
  }, []);

  const add = useCallback((line: CartLine) => {
    commit((prev) => {
      const i = prev.findIndex((l) => l.productId === line.productId && l.variantId === line.variantId);
      if (i === -1) return [...prev, { ...line, qty: Math.min(site.maxQty, line.qty) }];
      const next = [...prev];
      next[i] = { ...next[i], qty: Math.min(site.maxQty, next[i].qty + line.qty) };
      return next;
    });
    setBump((b) => b + 1);
  }, [commit]);

  const setQty = useCallback((productId: string, variantId: string, qty: number) =>
    commit((prev) => prev.map((l) => (l.productId === productId && l.variantId === variantId ? { ...l, qty: Math.max(1, Math.min(site.maxQty, qty)) } : l))), [commit]);
  const remove = useCallback((productId: string, variantId: string) =>
    commit((prev) => prev.filter((l) => !(l.productId === productId && l.variantId === variantId))), [commit]);
  const clear = useCallback(() => commit(() => []), [commit]);

  const toggleWish = useCallback((productId: string) => {
    let added = false;
    setWishlist((prev) => {
      added = !prev.includes(productId);
      const next = added ? [...prev, productId] : prev.filter((x) => x !== productId);
      write(WISH_KEY, next);
      return next;
    });
    return !wishlist.includes(productId);
  }, [wishlist]);

  const toast = useCallback((text: string) => {
    const id = ++tid.current;
    setToasts((t) => [...t.slice(-2), { id, text }]);
    setTimeout(() => setToasts((t) => t.map((x) => (x.id === id ? { ...x, out: true } : x))), 2200);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2500);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("locked", drawerOpen);
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  const value = useMemo<Store>(() => ({
    ready, lines, count: lines.reduce((s, l) => s + l.qty, 0), add, setQty, remove, clear,
    wishlist, toggleWish, drawerOpen, openDrawer: () => setDrawerOpen(true), closeDrawer: () => setDrawerOpen(false), toasts, toast, bump,
  }), [ready, lines, add, setQty, remove, clear, wishlist, toggleWish, drawerOpen, toasts, toast, bump]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore outside StoreProvider");
  return s;
}
