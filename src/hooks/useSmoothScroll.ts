"use client";

import { useEffect, useCallback, useRef } from "react";
import type Lenis from "@studio-freight/lenis";

export function useSmoothScroll() {
  const lenisRef = useRef<InstanceType<typeof Lenis> | null>(null);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      const { default: LenisClass } = await import("@studio-freight/lenis");
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new LenisClass({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      lenisRef.current = lenis;

      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    };

    init();

    return () => {
      cancelled = true;
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback(
    (target: string | number | HTMLElement) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target as string, { offset: -80 });
      } else {
        // Fallback: native scrollIntoView
        if (typeof target === "string") {
          const el = document.querySelector(target);
          el?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    },
    []
  );

  return { scrollTo };
}
