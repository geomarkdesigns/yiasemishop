"use client";
import { useEffect } from "react";
import { useStore } from "./Store";
export function ClearCart() {
  const { clear, ready } = useStore();
  useEffect(() => { if (ready) clear(); }, [ready, clear]);
  return null;
}
