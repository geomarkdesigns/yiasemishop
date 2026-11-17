// Pure cart logic shared by the browser (display) and the server (checkout).
// The server always recomputes prices from the catalogue; client prices are never trusted.
import { getProductById, getVariant, unitPrice, type Product, type Variant } from "./products.ts";
import { site } from "./site.ts";

export type CartLine = { productId: string; variantId: string; qty: number };
export type ResolvedLine = CartLine & { product: Product; variant: Variant; unit: number; total: number };

export type CartError = "empty" | "too_many_lines" | "unknown_product" | "bad_quantity" | "out_of_stock";

export function resolveCart(lines: unknown): { ok: true; lines: ResolvedLine[] } | { ok: false; error: CartError; productId?: string } {
  if (!Array.isArray(lines) || lines.length === 0) return { ok: false, error: "empty" };
  if (lines.length > 50) return { ok: false, error: "too_many_lines" };
  const merged = new Map<string, CartLine>();
  for (const raw of lines) {
    if (!raw || typeof raw !== "object") return { ok: false, error: "unknown_product" };
    const { productId, variantId, qty } = raw as Record<string, unknown>;
    if (typeof productId !== "string" || typeof variantId !== "string") return { ok: false, error: "unknown_product" };
    if (typeof qty !== "number" || !Number.isInteger(qty) || qty < 1 || qty > site.maxQty) return { ok: false, error: "bad_quantity", productId };
    const key = `${productId}::${variantId}`;
    const prev = merged.get(key);
    merged.set(key, { productId, variantId, qty: (prev?.qty ?? 0) + qty });
  }
  const out: ResolvedLine[] = [];
  for (const line of merged.values()) {
    const product = getProductById(line.productId);
    if (!product) return { ok: false, error: "unknown_product", productId: line.productId };
    const variant = product.variants.find((x) => x.id === line.variantId);
    if (!variant) return { ok: false, error: "unknown_product", productId: line.productId };
    if (line.qty > site.maxQty) return { ok: false, error: "bad_quantity", productId: product.id };
    if (product.stock > 0 && line.qty > product.stock) return { ok: false, error: "out_of_stock", productId: product.id };
    const unit = unitPrice(product, variant);
    out.push({ ...line, product, variant, unit, total: unit * line.qty });
  }
  return { ok: true, lines: out };
}

/** Lenient version for display: drops anything invalid instead of failing. */
export function resolveForDisplay(lines: CartLine[]): ResolvedLine[] {
  const out: ResolvedLine[] = [];
  for (const l of lines) {
    const product = getProductById(l.productId);
    if (!product) continue;
    const variant = getVariant(product, l.variantId);
    const qty = Math.max(1, Math.min(site.maxQty, Math.floor(l.qty) || 1));
    const unit = unitPrice(product, variant);
    out.push({ productId: product.id, variantId: variant.id, qty, product, variant, unit, total: unit * qty });
  }
  return out;
}

export const subtotal = (lines: ResolvedLine[]) => lines.reduce((s, l) => s + l.total, 0);
export const standardShippingFor = (sub: number) => (sub >= site.freeShippingFrom ? 0 : site.standardShipping);
/** VAT already included in a gross amount. */
export const vatIncluded = (gross: number) => Math.round(gross - gross / (1 + site.vatRate));
/** Longest lead time in the cart, in weeks (0 = everything ships now). */
export const cartLeadWeeks = (lines: ResolvedLine[]) => Math.max(0, ...lines.map((l) => (l.product.stock > 0 ? 0 : l.product.leadWeeks)));
