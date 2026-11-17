import { test, expect, type Page } from "@playwright/test";
import fs from "node:fs";
import Stripe from "stripe";
import { MOCK_LOG } from "../../playwright.config";

const errors = (page: Page) => {
  const list: string[] = [];
  page.on("pageerror", (e) => list.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") list.push(m.text()); });
  return list;
};
const stripeCalls = () => fs.readFileSync(MOCK_LOG, "utf8").trim().split("\n").filter(Boolean).map((l) => JSON.parse(l));

test("root redirects by browser language", async ({ browser }) => {
  const el = await browser.newContext({ locale: "el-GR" });
  const p1 = await el.newPage();
  await p1.goto("/");
  await expect(p1).toHaveURL(/\/el$/);
  await expect(p1.locator("html")).toHaveAttribute("lang", "el");
  const en = await browser.newContext({ locale: "en-US" });
  const p2 = await en.newPage();
  await p2.goto("/shop?c=dining");
  await expect(p2).toHaveURL(/\/en\/shop\?c=dining$/);
});

test("language switch keeps the page and is remembered", async ({ page }) => {
  await page.goto("/en/product/plaka-armchair");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Plaka Armchair");
  await page.getByRole("link", { name: "Διαβάστε στα Ελληνικά" }).click();
  await expect(page).toHaveURL(/\/el\/product\/plaka-armchair/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Πολυθρόνα Πλάκα");
  await page.goto("/");
  await expect(page).toHaveURL(/\/el$/);
});

test("dark mode toggles and persists across reloads", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.goto("/en");
  const html = page.locator("html");
  await expect(html).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Dark mode" }).click();
  await expect(html).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(html).toHaveAttribute("data-theme", "dark");
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(bg).toBe("rgb(22, 23, 18)");
});

test("shop filters, search and sort", async ({ page }) => {
  await page.goto("/en/shop");
  await expect(page.getByTestId("results")).toHaveText("14 pieces");
  await page.getByRole("button", { name: "Dining", exact: true }).click();
  await expect(page).toHaveURL(/c=dining/);
  await expect(page.getByTestId("results")).toHaveText("5 pieces");
  await page.getByRole("button", { name: "All", exact: true }).click();
  await page.getByRole("searchbox").fill("καρεκλα"); // Greek, no accents
  await expect(page.getByTestId("results")).toHaveText("1 piece");
  await expect(page.getByTestId("product-card")).toContainText("Sifnos Dining Chair");
  await page.getByRole("searchbox").fill("");
  await page.getByRole("combobox", { name: "Sort" }).selectOption("price-asc");
  await expect(page.getByTestId("product-card").first()).toContainText("Mnisikleous Stool");
  await page.getByText("Ready to ship").click();
  await expect(page.getByTestId("results")).toHaveText("10 pieces");
});

test("product page: finish changes price and URL, cart persists, quantities update", async ({ page }) => {
  const errs = errors(page);
  await page.goto("/en/product/kyklades-dining-table");
  await expect(page.getByTestId("price")).toContainText("€1,980");
  await page.getByRole("radio", { name: "Walnut · 200 cm" }).click();
  await expect(page.getByTestId("price")).toContainText("€2,400");
  await expect(page).toHaveURL(/v=walnut-200/);
  await page.getByTestId("add-to-cart").click();
  await expect(page.getByTestId("cart-count")).toHaveText("1");
  await expect(page.getByRole("status").getByText("Added to cart")).toBeVisible();

  await page.reload();
  await expect(page.getByTestId("cart-count")).toHaveText("1");
  await page.getByTestId("cart-button").click();
  const drawer = page.getByTestId("drawer");
  await expect(drawer).toBeVisible();
  await expect(drawer).toContainText("Walnut · 200 cm");
  await expect(drawer.getByTestId("subtotal")).toHaveText("€2,400");
  await expect(drawer).toContainText("You have free standard delivery.");
  // stock for this table is 2: plus is disabled at 2
  await drawer.getByRole("button", { name: "+1" }).click();
  await expect(drawer.getByTestId("subtotal")).toHaveText("€4,800");
  await expect(drawer.getByRole("button", { name: "+1" })).toBeDisabled();
  await page.keyboard.press("Escape");
  await expect(drawer).toBeHidden();
  expect(errs).toEqual([]);
});

test("full checkout: correct Stripe session, success page, cart cleared", async ({ page }) => {
  fs.writeFileSync(MOCK_LOG, "");
  await page.goto("/el/product/sifnos-dining-chair?v=olive");
  await page.getByRole("button", { name: "+1" }).click();
  await page.getByTestId("add-to-cart").click();
  await page.getByTestId("cart-button").click();
  await expect(page.getByTestId("drawer")).toContainText("Προσθέστε ακόμη"); // €390 < €400 free-shipping threshold
  await page.getByTestId("checkout").click();

  await expect(page).toHaveURL(/\/el\/checkout\/success\?session_id=cs_test_mock123/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Ευχαριστούμε!");
  await expect(page.getByText("buyer@example.com")).toBeVisible();
  await expect(page.getByTestId("cart-count")).toHaveCount(0);

  const create = stripeCalls().find((c) => c.method === "POST" && c.url === "/v1/checkout/sessions");
  expect(create.auth).toBe("Bearer sk_test_mock");
  const p = new URLSearchParams(create.body);
  expect(p.get("mode")).toBe("payment");
  expect(p.get("locale")).toBe("el");
  expect(p.get("line_items[0][quantity]")).toBe("2");
  expect(p.get("line_items[0][price_data][unit_amount]")).toBe("19500");
  expect(p.get("line_items[0][price_data][currency]")).toBe("eur");
  expect(p.get("line_items[0][price_data][product_data][name]")).toBe("Καρέκλα Σίφνος");
  expect(p.get("line_items[0][price_data][product_data][description]")).toBe("Λαδί");
  expect(p.get("shipping_address_collection[allowed_countries][0]")).toBe("GR");
  expect(p.get("shipping_options[0][shipping_rate_data][fixed_amount][amount]")).toBe("2900");
  expect(p.get("shipping_options[1][shipping_rate_data][fixed_amount][amount]")).toBe("7900");
  expect(p.get("allow_promotion_codes")).toBe("true");
  expect(p.get("success_url")).toBe("http://localhost:3100/el/checkout/success?session_id={CHECKOUT_SESSION_ID}");
  expect(p.get("cancel_url")).toBe("http://localhost:3100/el/cart?canceled=1");
});

test("checkout API rejects tampered carts", async ({ request }) => {
  const bad = await request.post("/api/checkout", { data: { items: [{ productId: "p-sifnos-chair", variantId: "olive", qty: 500 }] } });
  expect(bad.status()).toBe(400);
  const fake = await request.post("/api/checkout", { data: { items: [{ productId: "p-free", variantId: "x", qty: 1, price: 1 }] } });
  expect(fake.status()).toBe(400);
  const noStock = await request.post("/api/checkout", { data: { items: [{ productId: "p-kyklades-dining-table", variantId: "oak-200", qty: 3 }] } });
  expect(await noStock.json()).toMatchObject({ error: "out_of_stock" });
});

test("webhook verifies Stripe signatures", async ({ request }) => {
  const unsigned = await request.post("/api/webhooks/stripe", { data: { type: "checkout.session.completed" } });
  expect(unsigned.status()).toBe(400);
  const payload = JSON.stringify({ id: "evt_1", object: "event", type: "checkout.session.completed",
    data: { object: { id: "cs_test_mock123", object: "checkout.session", payment_status: "paid", amount_total: 41900, customer_details: { email: "buyer@example.com" } } } });
  const forged = await request.post("/api/webhooks/stripe", { data: payload, headers: { "content-type": "application/json", "stripe-signature": new Stripe("sk_x").webhooks.generateTestHeaderString({ payload, secret: "whsec_wrong" }) } });
  expect(forged.status()).toBe(400);
  fs.writeFileSync(MOCK_LOG, "");
  const ok = await request.post("/api/webhooks/stripe", { data: payload, headers: { "content-type": "application/json", "stripe-signature": new Stripe("sk_x").webhooks.generateTestHeaderString({ payload, secret: "whsec_test_mock" }) } });
  expect(ok.status()).toBe(200);
  expect(stripeCalls().some((c) => c.url.startsWith("/v1/checkout/sessions/cs_test_mock123/line_items"))).toBe(true);
});

test("wishlist saves and shows items", async ({ page }) => {
  await page.goto("/en/shop");
  await page.getByTestId("product-card").first().getByRole("button", { name: "Save to wishlist" }).click();
  await page.goto("/en/wishlist");
  await expect(page.getByTestId("product-card")).toHaveCount(1);
});

test("cart page shows cancel notice and 404 page works", async ({ page }) => {
  await page.goto("/en/cart?canceled=1");
  await expect(page.locator("#main").getByText("Your cart is empty.")).toBeVisible();
  const res = await page.goto("/en/does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.getByText("This page wandered off.")).toBeVisible();
});

test("mobile: menu opens, no horizontal scroll, add to cart @mobile", async ({ page }) => {
  await page.goto("/el");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
  await page.getByRole("button", { name: "Μενού" }).click();
  await page.locator("#site-links").getByRole("link", { name: "Κατάστημα" }).click();
  await expect(page).toHaveURL(/\/el\/shop/);
  await page.getByTestId("product-card").first().getByRole("link").click();
  await page.getByTestId("add-to-cart").click();
  await expect(page.getByTestId("cart-count")).toHaveText("1");
});
