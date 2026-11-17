import { ImageResponse } from "next/og";
import { artSvg, backdrops } from "@/lib/art";
import { getProduct, getVariant } from "@/lib/products";

// PNG of a product illustration, used by Stripe Checkout and social previews.
export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return new Response("Not found", { status: 404 });
  const variant = getVariant(p, new URL(req.url).searchParams.get("v") ?? undefined);
  const svg = artSvg(p.kind, variant, backdrops[p.backdrop].light);
  const src = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
  return new ImageResponse(
    // eslint-disable-next-line @next/next/no-img-element
    <div style={{ display: "flex", width: "100%", height: "100%" }}><img src={src} width={800} height={1000} alt="" /></div>,
    { width: 800, height: 1000, headers: { "cache-control": "public, max-age=86400, immutable" } },
  );
}
