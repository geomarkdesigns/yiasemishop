"use client";
import { useEffect, useState } from "react";
import { getDict, type Locale } from "@/lib/i18n";
import { Jasmine } from "./Icons";

export function Greeting({ lang }: { lang: Locale }) {
  const [text, setText] = useState("");
  useEffect(() => {
    const h = Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone: "Europe/Athens" }).format(new Date()));
    const g = getDict(lang).hero.greeting;
    setText(h < 12 ? g[0] : h < 18 ? g[1] : g[2]);
  }, [lang]);
  return <p className="greeting"><Jasmine center="var(--bg)" />{text}<span className="sr-only">.</span></p>;
}
