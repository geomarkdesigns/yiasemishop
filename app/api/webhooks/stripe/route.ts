import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { esc, sendEmail } from "@/lib/email";

export const runtime = "nodejs";

// Stripe → this endpoint after payment. Configure in Stripe Dashboard → Developers → Webhooks:
// URL https://YOUR-DOMAIN/api/webhooks/stripe, events: checkout.session.completed,
// checkout.session.async_payment_succeeded, checkout.session.async_payment_failed.
export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const sig = req.headers.get("stripe-signature");
  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig ?? "", secret);
  } catch {
    return NextResponse.json({ error: "bad_signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.payment_status !== "paid") break; // async methods finish later
      await notifyShop(stripe, session);
      break;
    }
    case "checkout.session.async_payment_failed":
      console.warn("Payment failed for session", (event.data.object as Stripe.Checkout.Session).id);
      break;
  }
  return NextResponse.json({ received: true });
}

async function notifyShop(stripe: Stripe, session: Stripe.Checkout.Session) {
  const items = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });
  const money = (c: number | null) => `€${((c ?? 0) / 100).toFixed(2)}`;
  const ship = session.collected_information?.shipping_details;
  const addr = ship?.address;
  console.log(`[order] ${session.id} paid ${money(session.amount_total)} by ${session.customer_details?.email}`);
  const to = process.env.ORDER_NOTIFY_EMAIL;
  if (!to) return;
  const rows = items.data.map((i) => `<tr><td>${i.quantity} × ${esc(i.description ?? "")}</td><td align="right">${money(i.amount_total)}</td></tr>`).join("");
  await sendEmail({
    to,
    replyTo: session.customer_details?.email ?? undefined,
    subject: `Νέα παραγγελία ${money(session.amount_total)} · ${session.customer_details?.name ?? ""}`,
    html: `<h2>New paid order</h2>
<p><b>${esc(session.customer_details?.name ?? "")}</b> · ${esc(session.customer_details?.email ?? "")} · ${esc(session.customer_details?.phone ?? "")}</p>
<p>${esc(ship?.name ?? "")}<br>${esc([addr?.line1, addr?.line2, addr?.postal_code, addr?.city, addr?.state, addr?.country].filter(Boolean).join(", "))}</p>
<table cellpadding="6">${rows}<tr><td>Delivery</td><td align="right">${money(session.shipping_cost?.amount_total ?? 0)}</td></tr><tr><td><b>Total</b></td><td align="right"><b>${money(session.amount_total)}</b></td></tr></table>
<p><a href="https://dashboard.stripe.com/payments/${typeof session.payment_intent === "string" ? session.payment_intent : ""}">Open in Stripe</a></p>`,
  });
}
