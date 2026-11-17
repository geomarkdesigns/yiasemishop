import { NextResponse } from "next/server";
import { esc, sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const name = String(b.name ?? "").trim().slice(0, 120), email = String(b.email ?? "").trim().slice(0, 200), message = String(b.message ?? "").trim().slice(0, 4000);
  if (b.company) return NextResponse.json({ ok: true }); // honeypot: bots fill hidden fields
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 5) return NextResponse.json({ error: "invalid" }, { status: 400 });
  const to = process.env.ORDER_NOTIFY_EMAIL;
  if (!to) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  const ok = await sendEmail({ to, replyTo: email, subject: `Μήνυμα από ${name}`, html: `<p><b>${esc(name)}</b> &lt;${esc(email)}&gt;</p><p style="white-space:pre-wrap">${esc(message)}</p>` });
  return ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "generic" }, { status: 502 });
}
