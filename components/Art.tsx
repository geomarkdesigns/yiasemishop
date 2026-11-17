import { artSvg } from "@/lib/art";
import type { Product, Variant } from "@/lib/products";

/** Product illustration on its coloured backdrop (backdrop is a CSS var so it follows the theme). */
export function Art({ product, variant, dims, labels, className = "", swapKey }: {
  product: Product; variant: Variant; dims?: boolean; labels?: { w: string; h: string }; className?: string; swapKey?: string;
}) {
  const svg = artSvg(product.kind, variant, undefined, dims ? { dims: product.dims, labels } : {});
  return <div key={swapKey} className={`art ${swapKey ? "art-swap" : ""} ${className}`} dangerouslySetInnerHTML={{ __html: svg }} />;
}
