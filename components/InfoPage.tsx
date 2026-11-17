import { pages } from "@/lib/pages";
import type { Locale } from "@/lib/i18n";

export function InfoPage({ page, lang, title, eyebrow }: { page: keyof typeof pages; lang: Locale; title: string; eyebrow?: string }) {
  const p = pages[page][lang];
  return (
    <div className="wrap">
      <header className="page-head narrow">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h1>{title}</h1><p className="lead">{p.lead}</p></header>
      <div className="meander" aria-hidden="true" style={{ maxWidth: 760 }} />
      <article className="prose">
        {p.sections.map(([h, ...ps]) => <section key={h} className="reveal"><h2>{h}</h2>{ps.map((x) => <p key={x}>{x}</p>)}</section>)}
      </article>
    </div>
  );
}
