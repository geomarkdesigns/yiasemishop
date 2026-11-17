import { NextResponse } from "next/server";

// Adds an e-mail to a Resend audience (RESEND_API_KEY + RESEND_AUDIENCE_ID).
export async function POST(req: Request) {
  const { email } = await req.json().catch(() => ({}));
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) return NextResponse.json({ error: "invalid" }, { status: 400 });
  const key = process.env.RESEND_API_KEY, audience = process.env.RESEND_AUDIENCE_ID;
  if (!key || !audience) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  const res = await fetch(`https://api.resend.com/audiences/${audience}/contacts`, {
    method: "POST", headers: { authorization: `Bearer ${key}`, "content-type": "application/json" }, body: JSON.stringify({ email, unsubscribed: false }),
  });
  return res.ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "generic" }, { status: 502 });
}
