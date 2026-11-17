import type { SVGProps } from "react";
type P = SVGProps<SVGSVGElement>;
const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, focusable: false } as const;

export const Jasmine = ({ center = "var(--bg)", ...p }: P & { center?: string }) => (
  <svg viewBox="0 0 40 40" aria-hidden="true" focusable="false" {...p}>
    <g fill="currentColor" className="petals">
      {[0, 72, 144, 216, 288].map((r) => <ellipse key={r} cx="20" cy="10.5" rx="5.2" ry="8.5" transform={`rotate(${r} 20 20)`} />)}
    </g>
    <circle cx="20" cy="20" r="3.4" fill={center} />
  </svg>
);
export const Moon = (p: P) => <svg {...base} {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>;
export const Sun = (p: P) => <svg {...base} {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>;
export const Bag = (p: P) => <svg {...base} {...p}><path d="M5 8h14l-1 12H6z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>;
export const Heart = (p: P) => <svg {...base} {...p}><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg>;
export const Burger = (p: P) => <svg {...base} {...p}><path d="M4 9h16M4 15h16" /></svg>;
export const Close = (p: P) => <svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>;
export const Arrow = (p: P) => <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
export const Check = (p: P) => <svg {...base} strokeWidth={2} {...p}><path className="check" d="M5 12.5l4.5 4.5L19 7.5" /></svg>;
export const Search = (p: P) => <svg {...base} {...p}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4-4" /></svg>;
export const Truck = (p: P) => <svg {...base} {...p}><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></svg>;
export const Shield = (p: P) => <svg {...base} {...p}><path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6z" /><path d="m9 12 2 2 4-4" /></svg>;
export const Lock = (p: P) => <svg {...base} {...p}><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>;
export const Return = (p: P) => <svg {...base} {...p}><path d="M9 14 4 9l5-5" /><path d="M4 9h10a6 6 0 0 1 0 12h-3" /></svg>;
export const Leaf = (p: P) => <svg {...base} {...p}><path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15" /><path d="M5 19c3-4 6-6 9-8" /></svg>;
export const Tool = (p: P) => <svg {...base} {...p}><path d="M14 6a4 4 0 0 0 5 5l-9 9a2 2 0 0 1-3-3z" /></svg>;
export const Quote = (p: P) => <svg viewBox="0 0 34 34" fill="currentColor" aria-hidden="true" {...p}><path d="M4 28V18c0-7 4-12 11-13v4c-4 1-6 4-6 8h6v11zm15 0V18c0-7 4-12 11-13v4c-4 1-6 4-6 8h6v11z" /></svg>;
