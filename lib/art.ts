// Flat, hand-drawn style product illustrations (no gradients, like the brand site).
// Returns SVG markup so the same drawing is used on the page and in the PNG sent to Stripe.
// Swap for real photography by adding `image` URLs later; the layout keeps a 4:5 frame.
import type { Backdrop, Kind } from "./products.ts";

export const backdrops: Record<Backdrop, { light: string; dark: string }> = {
  olive: { light: "#cdd2b6", dark: "#3d4630" },
  clay: { light: "#e7c8b3", dark: "#5c3b2d" },
  sea: { light: "#c3d0d6", dark: "#33475a" },
  stone: { light: "#e2d8c5", dark: "#3b3b32" },
};

function shade(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16);
  const c = (s: number) => Math.max(0, Math.min(255, Math.round(((n >> s) & 255) * (1 + amt))));
  return `#${((c(16) << 16) | (c(8) << 8) | c(0)).toString(16).padStart(6, "0")}`;
}

type Colors = { wood: string; fabric: string };

const shadow = (cx: number, rx: number) => `<ellipse cx="${cx}" cy="432" rx="${rx}" ry="10" fill="#000" opacity=".12"/>`;
const leg = (x: number, y1: number, y2: number, w: number, c: string, skew = 0) =>
  `<path d="M${x} ${y1}h${w}l${skew} ${y2 - y1}h-${w}z" fill="${c}"/>`;

function draw(kind: Kind, { wood, fabric }: Colors): string {
  const woodD = shade(wood, -0.22), fabD = shade(fabric, -0.12), fabL = shade(fabric, 0.06);
  switch (kind) {
    case "armchair":
      return shadow(200, 150) +
        leg(92, 360, 430, 10, woodD, -6) + leg(298, 360, 430, 10, woodD, 6) + leg(130, 360, 424, 8, wood, -2) + leg(262, 360, 424, 8, wood, 2) +
        `<rect x="104" y="150" width="192" height="200" rx="64" fill="${fabD}"/>` +
        `<rect x="116" y="164" width="168" height="160" rx="54" fill="${fabric}"/>` +
        `<rect x="84" y="250" width="50" height="120" rx="25" fill="${fabD}"/><rect x="266" y="250" width="50" height="120" rx="25" fill="${fabD}"/>` +
        `<rect x="110" y="300" width="180" height="60" rx="22" fill="${fabL}"/>` +
        `<rect x="84" y="360" width="232" height="14" rx="7" fill="${wood}"/>`;
    case "sofa":
      return shadow(200, 185) +
        leg(48, 352, 420, 9, woodD, -5) + leg(343, 352, 420, 9, woodD, 5) + leg(195, 352, 416, 9, wood) +
        `<rect x="34" y="208" width="332" height="132" rx="34" fill="${fabD}"/>` +
        `<rect x="56" y="222" width="140" height="84" rx="24" fill="${fabric}"/><rect x="204" y="222" width="140" height="84" rx="24" fill="${fabric}"/>` +
        `<rect x="24" y="262" width="52" height="98" rx="24" fill="${fabD}"/><rect x="324" y="262" width="52" height="98" rx="24" fill="${fabD}"/>` +
        `<rect x="66" y="300" width="132" height="46" rx="16" fill="${fabL}"/><rect x="202" y="300" width="132" height="46" rx="16" fill="${fabL}"/>` +
        `<rect x="30" y="344" width="340" height="12" rx="6" fill="${wood}"/>`;
    case "chair":
      return shadow(200, 92) +
        leg(138, 150, 430, 9, woodD) + leg(253, 150, 430, 9, woodD) +
        `<rect x="134" y="146" width="132" height="22" rx="6" fill="${wood}"/><rect x="140" y="196" width="120" height="10" rx="5" fill="${wood}"/>` +
        `<path d="M128 300h144l-8 26H136z" fill="${fabric}"/>` +
        `<path d="M136 304h128M138 312h124M140 320h120" stroke="${fabD}" stroke-width="2"/>` +
        `<rect x="126" y="294" width="148" height="10" rx="4" fill="${wood}"/>` +
        leg(140, 304, 430, 10, wood, -6) + leg(250, 304, 430, 10, wood, 6) +
        `<rect x="138" y="372" width="124" height="7" rx="3" fill="${woodD}"/>`;
    case "stool":
      return shadow(200, 84) +
        `<path d="M160 260l-30 170h12l30-170zM240 260l30 170h-12l-30-170z" fill="${wood}"/>` +
        `<path d="M178 262l-8 160h11l8-160zM222 262l8 160h-11l-8-160z" fill="${woodD}"/>` +
        `<rect x="146" y="352" width="108" height="8" rx="4" fill="${woodD}"/>` +
        `<ellipse cx="200" cy="254" rx="68" ry="16" fill="${woodD}"/><ellipse cx="200" cy="248" rx="68" ry="16" fill="${wood}"/>` +
        `<ellipse cx="200" cy="247" rx="46" ry="8" fill="${shade(wood, 0.08)}"/>`;
    case "bench":
      return shadow(200, 170) +
        leg(66, 330, 430, 14, woodD, -6) + leg(320, 330, 430, 14, woodD, 6) + leg(100, 330, 420, 12, wood, -3) + leg(288, 330, 420, 12, wood, 3) +
        `<rect x="74" y="384" width="252" height="8" rx="4" fill="${woodD}"/>` +
        `<rect x="40" y="312" width="320" height="24" rx="8" fill="${wood}"/><rect x="40" y="330" width="320" height="6" fill="${woodD}"/>`;
    case "dining-table":
      return shadow(200, 185) +
        leg(56, 260, 430, 16, woodD, -4) + leg(328, 260, 430, 16, woodD, 4) + leg(98, 260, 418, 12, wood) + leg(290, 260, 418, 12, wood) +
        `<rect x="44" y="264" width="312" height="26" rx="4" fill="${woodD}"/>` +
        `<rect x="22" y="240" width="356" height="26" rx="6" fill="${wood}"/>` +
        `<path d="M70 252h80M190 250h120" stroke="${woodD}" stroke-width="2" stroke-linecap="round" opacity=".5"/>` +
        `<ellipse cx="200" cy="232" rx="22" ry="8" fill="${fabric}"/><path d="M186 232c2-34 26-34 28 0" fill="${shade(fabric, -0.1)}"/>`;
    case "coffee-table":
      return shadow(200, 165) +
        `<path d="M150 322h100l12 98H138z" fill="${woodD}"/><path d="M164 322h72l8 98h-88z" fill="${wood}"/>` +
        `<ellipse cx="200" cy="320" rx="162" ry="36" fill="${woodD}"/><ellipse cx="200" cy="310" rx="162" ry="36" fill="${wood}"/>` +
        `<rect x="250" y="282" width="70" height="12" rx="3" fill="${fabD}"/><rect x="256" y="272" width="60" height="11" rx="3" fill="${fabric}"/>`;
    case "side-table":
      return shadow(200, 80) +
        `<rect x="193" y="268" width="14" height="150" rx="6" fill="${woodD}"/>` +
        `<ellipse cx="200" cy="424" rx="64" ry="12" fill="${woodD}"/><ellipse cx="200" cy="418" rx="64" ry="12" fill="${wood}"/>` +
        `<ellipse cx="200" cy="270" rx="92" ry="20" fill="${woodD}"/><ellipse cx="200" cy="262" rx="92" ry="20" fill="${wood}"/>` +
        `<path d="M222 252c-2-30 4-50 18-66" stroke="#55633e" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="240" cy="184" r="9" fill="#fcf9f3"/><path d="M212 256h22l-3-20h-16z" fill="${fabric}"/>`;
    case "shelf": {
      let s = shadow(200, 110) + `<rect x="104" y="70" width="192" height="360" rx="4" fill="${woodD}"/><rect x="116" y="70" width="168" height="360" fill="${shade(wood, 0.12)}"/>`;
      const books = [fabric, "#55633e", "#4b6574", fabD, "#d8c29f", "#9a4d2b"];
      [80, 150, 220, 290, 360].forEach((y, i) => {
        s += `<rect x="104" y="${y + 58}" width="192" height="10" fill="${wood}"/>`;
        let x = 122 + (i % 2) * 18;
        for (let b = 0; b < 4 + (i % 3); b++) {
          const h = 38 + ((b * 7 + i * 5) % 18), w = 12 + ((b + i) % 3) * 4;
          s += `<rect x="${x}" y="${y + 58 - h}" width="${w}" height="${h}" rx="1.5" fill="${books[(b + i) % books.length]}"/>`;
          x += w + 3;
        }
        if (i % 2 === 0) s += `<path d="M236 ${y + 58}a18 18 0 0 1 36 0z" fill="${fabric}"/>`;
      });
      return s;
    }
    case "sideboard":
      return shadow(200, 180) +
        leg(56, 380, 430, 10, woodD, -6) + leg(334, 380, 430, 10, woodD, 6) +
        `<rect x="36" y="232" width="328" height="152" rx="6" fill="${woodD}"/><rect x="36" y="226" width="328" height="12" rx="4" fill="${wood}"/>` +
        [52, 156, 260].map((x) => `<path d="M${x} 372V290a44 44 0 0 1 88 0v82z" fill="${fabric}"/><circle cx="${x + 44}" cy="330" r="4" fill="${woodD}"/>`).join("") +
        `<path d="M110 226c0-30 10-50 24-62M118 226c4-22 14-34 30-40" stroke="#55633e" stroke-width="3" fill="none"/><path d="M98 226h40l-4-26h-32z" fill="#fcf9f3"/>`;
    case "bed":
      return shadow(200, 185) +
        `<path d="M58 330V220a142 100 0 0 1 284 0v110z" fill="${fabD}"/><path d="M74 330V226a126 86 0 0 1 252 0v104z" fill="${fabric}"/>` +
        `<rect x="26" y="318" width="348" height="58" rx="10" fill="#fcf9f3"/>` +
        `<rect x="86" y="292" width="100" height="36" rx="16" fill="#f3ede2"/><rect x="214" y="292" width="100" height="36" rx="16" fill="#f3ede2"/>` +
        `<path d="M26 340h348v26a10 10 0 0 1-10 10H36a10 10 0 0 1-10-10z" fill="${fabL}"/>` +
        `<rect x="20" y="374" width="360" height="20" rx="4" fill="${wood}"/>` + leg(32, 394, 430, 12, woodD) + leg(356, 394, 430, 12, woodD);
    case "lamp":
      return shadow(200, 70) +
        `<circle cx="200" cy="118" r="78" fill="#fcf9f3" opacity=".35"/>` +
        `<rect x="196" y="150" width="8" height="268" rx="4" fill="${wood}"/>` +
        `<ellipse cx="200" cy="424" rx="58" ry="10" fill="${woodD}"/><ellipse cx="200" cy="420" rx="58" ry="10" fill="#3a3530"/>` +
        `<path d="M150 68h100l30 92H120z" fill="${fabric}"/>` +
        Array.from({ length: 9 }, (_, i) => `<path d="M${155 + i * 11.25} 68l${-30 + i * 7.5} 92" stroke="${fabD}" stroke-width="1.5"/>`).join("") +
        `<path d="M120 160h160" stroke="${fabD}" stroke-width="3"/>`;
    case "mirror":
      return shadow(200, 90) +
        `<path d="M118 430V150a82 82 0 0 1 164 0v280z" fill="${wood}"/>` +
        `<path d="M132 418V152a68 68 0 0 1 136 0v266z" fill="#e8eef0"/>` +
        `<path d="M150 400V170c0-22 10-40 24-48" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".7" fill="none"/>` +
        `<path d="M226 160l-40 120M246 200l-30 90" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".5"/>`;
  }
}

export function artSvg(kind: Kind, colors: Colors, bg?: string, opts: { dims?: { w: number; d: number; h: number }; labels?: { w: string; h: string } } = {}): string {
  const back = bg ? `<rect width="400" height="500" fill="${bg}"/>` : "";
  let dims = "";
  if (opts.dims) {
    const c = "currentColor";
    const t = (x: number, y: number, s: string, rot = 0) =>
      `<text x="${x}" y="${y}" fill="${c}" font-family="Commissioner, system-ui, sans-serif" font-size="14" letter-spacing="1" text-anchor="middle"${rot ? ` transform="rotate(${rot} ${x} ${y})"` : ""}>${s}</text>`;
    dims = `<g opacity=".85" style="color:var(--ink)"><path d="M24 462H376M24 456v12M376 456v12" stroke="${c}" stroke-width="1.2"/>${t(200, 486, `${opts.labels?.w ?? "W"} ${opts.dims.w} cm`)}` +
      `<path d="M386 60V430M380 60h12M380 430h12" stroke="${c}" stroke-width="1.2"/>${t(374, 245, `${opts.labels?.h ?? "H"} ${opts.dims.h} cm`, -90)}</g>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" role="img">${back}<g${opts.dims ? ' opacity=".55"' : ""}>${draw(kind, colors)}</g>${dims}</svg>`;
}

/** Colours shown on finish swatches: [main, secondary?]. */
export function swatch(kind: Kind, c: Colors): [string, string?] {
  if (kind === "armchair" || kind === "sofa" || kind === "bed" || kind === "lamp" || kind === "sideboard") return [c.fabric, c.wood];
  if (kind === "chair") return [c.wood, c.fabric];
  return [c.wood];
}
