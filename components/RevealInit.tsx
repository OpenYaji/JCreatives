// components/RevealInit.tsx
"use client";

import { useEffect } from "react";

export default function RevealInit() {
  useEffect(() => {
    const vh = window.innerHeight;
    document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < vh * 0.88) el.classList.add("in");
    });

    document.documentElement.classList.add("js-ready");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
          } else {
            e.target.classList.remove("in");
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
