import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveCart, subtotal, standardShippingFor, vatIncluded, resolveForDisplay, cartLeadWeeks } from "../../lib/cart.ts";
import { products } from "../../lib/products.ts";

const chair = products.find((p) => p.slug === "sifnos-dining-chair")!;
const table = products.find((p) => p.slug === "kyklades-dining-table")!;

test("rejects empty and malformed carts", () => {
  assert.deepEqual(resolveCart([]), { ok: false, error: "empty" });
  assert.equal(resolveCart("x" as unknown).ok, false);
  assert.equal(resolveCart([{ productId: "nope", variantId: "x", qty: 1 }]).ok, false);
  assert.equal(resolveCart([{ productId: chair.id, variantId: "bogus", qty: 1 }]).ok, false);
});

test("rejects bad quantities, including client-tampered ones", () => {
  for (const qty of [0, -1, 1.5, 11, "2", NaN]) {
    const r = resolveCart([{ productId: chair.id, variantId: "natural", qty }]);
    assert.equal(r.ok, false, `qty ${String(qty)}`);
  }
});

test("prices come from the catalogue, not the client", () => {
  const r = resolveCart([{ productId: table.id, variantId: "walnut-200", qty: 1, price: 1 }]);
  assert.ok(r.ok);
  if (r.ok) assert.equal(r.lines[0].unit, table.price + 42000);
});

test("merges duplicate lines and enforces stock", () => {
  const r = resolveCart([{ productId: chair.id, variantId: "natural", qty: 4 }, { productId: chair.id, variantId: "natural", qty: 3 }]);
  assert.ok(r.ok);
  if (r.ok) { assert.equal(r.lines.length, 1); assert.equal(r.lines[0].qty, 7); }
  const over = resolveCart([{ productId: table.id, variantId: "oak-200", qty: 3 }]); // stock 2
  assert.deepEqual(over, { ok: false, error: "out_of_stock", productId: table.id });
});

test("shipping threshold, VAT and lead time", () => {
  assert.equal(standardShippingFor(39999), 2900);
  assert.equal(standardShippingFor(40000), 0);
  assert.equal(vatIncluded(12400), 2400);
  const lines = resolveForDisplay([{ productId: chair.id, variantId: "natural", qty: 2 }, { productId: "p-lycabettus-sofa", variantId: "sea", qty: 1 }]);
  assert.equal(subtotal(lines), 2 * 19500 + 249000);
  assert.equal(cartLeadWeeks(lines), 5);
});

test("catalogue integrity", () => {
  const ids = new Set(), slugs = new Set();
  for (const p of products) {
    assert.ok(!ids.has(p.id) && !slugs.has(p.slug), `duplicate ${p.id}`);
    ids.add(p.id); slugs.add(p.slug);
    assert.ok(p.variants.length > 0 && p.price > 0);
    assert.equal(new Set(p.variants.map((x) => x.id)).size, p.variants.length);
    for (const k of ["name", "tagline", "description", "materials", "care"] as const) assert.ok(p[k].en && p[k].el, `${p.id}.${k}`);
  }
});
