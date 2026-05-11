// components/Nav.tsx
"use client";

import { useState } from "react";

const links = [
  { href: "#home",      label: "Home" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#about",     label: "About" },
  { href: "#booking",   label: "Book" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop pill nav */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 nav-pill rounded-full px-2.5 py-2 hidden md:flex items-center gap-1 text-[11px] tracking-widest-plus uppercase text-warm-muted">
        {links.slice(0, -1).map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="px-3 py-1.5 rounded-full hover:bg-warm-white/8 hover:text-warm-white transition-colors"
          >
            {label}
          </a>
        ))}
        <a
          href="#booking"
          className="ml-1 px-4 py-1.5 rounded-full bg-gold text-obsidian text-[11px] tracking-widest-plus uppercase font-medium hover:bg-gold-dim transition-colors"
        >
          Book
        </a>
      </nav>

      {/* Mobile burger */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        className="fixed top-4 right-4 z-50 md:hidden nav-pill w-10 h-10 rounded-full flex flex-col items-center justify-center gap-1.5"
      >
        <span className={`block w-5 h-px bg-warm-white transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[3px]" : ""}`} />
        <span className={`block w-5 h-px bg-warm-white transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
        <span className={`block w-5 h-px bg-warm-white transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[5px]" : ""}`} />
      </button>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-obsidian/70 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <nav className={`absolute top-0 right-0 h-full w-64 bg-surface flex flex-col pt-20 pb-10 px-8 border-l border-border transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}>
          <div className="text-[10px] tracking-mega uppercase text-warm-faint mb-6">Menu</div>
          <div className="flex flex-col gap-1">
            {links.map(({ href, label }, i) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`py-3 text-sm tracking-widest-plus uppercase border-b border-border transition-colors ${
                  i === links.length - 1
                    ? "text-gold border-none mt-4"
                    : "text-warm-muted hover:text-warm-white"
                }`}
              >
                {label}
              </a>
            ))}
          </div>
          <div className="mt-auto text-[10px] tracking-widest-plus uppercase text-warm-faint">
            J Creatives
          </div>
        </nav>
      </div>
    </>
  );
}
