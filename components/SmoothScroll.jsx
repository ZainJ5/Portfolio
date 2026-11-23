"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

/** Lenis smooth scrolling + smooth in-page anchor navigation. */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 1 });
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });

    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      const target = id === "#" ? 0 : document.querySelector(id);
      if (target === null) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: 0, duration: 1.4 });
      history.replaceState(null, "", id);
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
