import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["el", "en"];

// Sends any URL without a language prefix to /el/... or /en/...
// Choice: saved cookie → browser language (Greek → el) → English.
export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const first = pathname.split("/")[1];
  if (LOCALES.includes(first)) return NextResponse.next();
  const saved = req.cookies.get("lang")?.value;
  const accept = req.headers.get("accept-language") ?? "";
  const lang = saved && LOCALES.includes(saved) ? saved : /^el\b|[,\s]el\b/i.test(accept) ? "el" : "en";
  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: ["/((?!api|_next|fonts|favicon.ico|apple-touch-icon.png|robots.txt|sitemap.xml|.*\\..*).*)"],
};
