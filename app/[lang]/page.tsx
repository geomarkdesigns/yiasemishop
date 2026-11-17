import Link from "next/link";
import { categories, products, type Category } from "@/lib/products";
import { getDict, isLocale, type Locale } from "@/lib/i18n";
import { Art } from "@/components/Art";
import { ProductCard } from "@/components/ProductCard";
import { Greeting } from "@/components/Greeting";
import { Newsletter } from "@/components/Newsletter";
import { Arrow, Check, Jasmine, Leaf, Quote, Tool, Truck } from "@/components/Icons";

const roomHero: Record<Category, string> = { living: "lycabettus-sofa", dining: "sifnos-dining-chair", bedroom: "paros-bed", decor: "tinos-floor-lamp" };

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = (isLocale(l) ? l : "el") as Locale;
  const t = getDict(lang);
  const hero = products.find((p) => p.slug === "plaka-armchair")!;
  const featured = products.filter((p) => p.featured);
  const newsletter = Boolean(process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID);
  const strip = [...t.strip, ...t.strip];
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <Greeting lang={lang} />
            <h1>{t.hero.title} <span className="soft">{t.hero.titleSoft}</span></h1>
            <p className="lead">{t.hero.lead}</p>
            <div className="actions">
              <Link className="btn btn-solid" href={`/${lang}/shop`}>{t.hero.shop} <Arrow className="arrow" /></Link>
              <Link className="btn btn-ghost" href={`/${lang}/about`}>{t.hero.story}</Link>
            </div>
            <ul className="facts">{t.hero.chips.map((c) => <li key={c} className="chip"><Check />{c}</li>)}</ul>
          </div>
          <div className="hero-photo">
            <Link href={`/${lang}/product/${hero.slug}`} className={`frame arch bg-${hero.backdrop}`} style={{ display: "block" }} aria-label={hero.name[lang]}>
              <Art product={hero} variant={hero.variants[1]} />
              <span className="hero-tag"><b>{hero.name[lang]}</b></span>
            </Link>
            <div className="badge" aria-hidden="true"><span className="badge-bloom"><Jasmine className="badge-spin" /></span></div>
          </div>
        </div>
        <div className="strip-wrap" aria-hidden="true"><ul className="strip">{strip.map((s, i) => <li key={i} className={i >= t.strip.length ? "dup" : undefined}>{s}</li>)}</ul></div>
      </section>

      <section className="wrap section" aria-labelledby="rooms-h">
        <div className="sec-head"><div><p className="eyebrow reveal">{t.home.catsEyebrow}</p><h2 id="rooms-h" className="reveal">{t.home.catsTitle}</h2></div>
          <Link className="btn btn-ghost reveal" href={`/${lang}/shop`}>{t.home.viewAll} <Arrow className="arrow" /></Link></div>
        <ul className="rooms">
          {categories.map((c, i) => {
            const p = products.find((x) => x.slug === roomHero[c.id])!;
            const n = products.filter((x) => x.category === c.id).length;
            return (
              <li key={c.id} className="reveal" style={{ ["--d" as string]: `${i * 0.06}s` }}>
                <Link className="room" href={`/${lang}/shop?c=${c.id}`}>
                  <div className={`frame arch bg-${p.backdrop}`}><Art product={p} variant={p.variants[0]} /></div>
                  <span className="n">{t.shop.results(n)}</span>
                  <h3>{c.name[lang]}</h3><p>{c.blurb[lang]}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="wrap section" aria-labelledby="feat-h">
        <div className="sec-head"><div><p className="eyebrow reveal">{t.home.featEyebrow}</p><h2 id="feat-h" className="reveal">{t.home.featTitle}</h2></div></div>
        <ul className="grid">{featured.map((p, i) => <ProductCard key={p.id} product={p} lang={lang} delay={(i % 3) * 0.06} />)}</ul>
      </section>

      <section className="wrap section" aria-labelledby="why-h">
        <div className="sec-head"><div><p className="eyebrow reveal">{t.home.whyEyebrow}</p><h2 id="why-h" className="reveal">{t.home.whyTitle}</h2></div></div>
        <ul className="features">
          {t.home.why.map((w, i) => (
            <li key={w.t} className="feature reveal" style={{ ["--d" as string]: `${i * 0.08}s` }}>
              <span className="feature-ic">{[<Leaf key="a" />, <Tool key="b" />, <Truck key="c" />][i]}</span>
              <h3>{w.t}</h3><p>{w.d}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap section" aria-labelledby="steps-h">
        <div className="sec-head"><div><p className="eyebrow reveal">{t.home.stepsEyebrow}</p><h2 id="steps-h" className="reveal">{t.home.stepsTitle}</h2></div></div>
        <ol className="steps">
          {t.home.steps.map((s, i) => (
            <li key={s.t} className="step reveal" style={{ ["--d" as string]: `${i * 0.08}s` }}>
              <span className="time">0{i + 1}</span><h3>{s.t}</h3><p>{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <figure className="wrap quote reveal">
        <Quote className="mark" />
        <blockquote><p>{t.home.quote}</p></blockquote>
        <figcaption>{t.home.quoteBy}</figcaption>
      </figure>

      {newsletter && <Newsletter lang={lang} />}
    </>
  );
}
