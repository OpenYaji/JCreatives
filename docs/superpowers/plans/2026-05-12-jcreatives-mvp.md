# J Creatives MVP Portfolio Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready MVP photographer portfolio website for J Creatives — dark cinematic aesthetic, masonry gallery, about section, and booking inquiry form that emails via Resend.

**Architecture:** Single-page Next.js 15 App Router site. All sections (hero, portfolio, about, booking) live on one page. Portfolio images are read from `public/images/portfolio/` via `fs.readdirSync` in a Server Component. The booking form is a Client Component that POSTs to `/api/contact`, which sends email via Resend.

**Tech Stack:** Next.js 15 (App Router), Tailwind CSS 4, TypeScript, Resend, deployed on Vercel

---

## File Map

| File | Responsibility |
|------|---------------|
| `app/layout.tsx` | Fonts (Cormorant Garamond + DM Sans), metadata, html/body |
| `app/globals.css` | Theme tokens, animations, utility classes |
| `app/page.tsx` | Root page — assembles all sections |
| `app/api/contact/route.ts` | POST handler — validates fields, sends email via Resend |
| `components/RevealInit.tsx` | IntersectionObserver scroll-reveal setup (client) |
| `components/Nav.tsx` | Desktop pill nav + mobile burger drawer (client) |
| `components/Hero.tsx` | Full-screen dark hero with branding + CTAs |
| `components/Portfolio.tsx` | Reads images from filesystem, renders masonry grid (server) |
| `components/About.tsx` | Photographer bio section |
| `components/BookingForm.tsx` | Inquiry form with validation + submit (client) |
| `components/Footer.tsx` | Contact info + social links |
| `public/images/portfolio/` | Drop photos here — auto-appear in gallery |
| `.env.local` | `RESEND_API_KEY`, `CONTACT_EMAIL` |

---

## Task 1: Scaffold the project

**Files:** New project at `C:\Users\QCU\desktop\jcreatives`

- [ ] **Open a terminal in `C:\Users\QCU\desktop` and scaffold:**

```bash
npx create-next-app@latest jcreatives --typescript --tailwind --app --no-src-dir --import-alias "@/*" --no-eslint
```

When prompted, accept all defaults (App Router, no Turbopack is fine).

- [ ] **Install Resend:**

```bash
cd jcreatives
npm install resend
```

- [ ] **Create the portfolio images folder:**

```bash
mkdir -p public/images/portfolio
```

- [ ] **Copy 6 sample photos from the wedding project to demo the gallery:**

```bash
cp ../wedding/matondo/public/images/gallery1.jpg public/images/portfolio/
cp ../wedding/matondo/public/images/gallery3.jpg public/images/portfolio/
cp ../wedding/matondo/public/images/gallery5.jpg public/images/portfolio/
cp ../wedding/matondo/public/images/gallery8.jpg public/images/portfolio/
cp ../wedding/matondo/public/images/gallery12.jpg public/images/portfolio/
cp ../wedding/matondo/public/images/forehead.jpg public/images/portfolio/
```

- [ ] **Create `.env.local`:**

```bash
cat > .env.local << 'EOF'
RESEND_API_KEY=re_your_key_here
CONTACT_EMAIL=your_test_email@gmail.com
EOF
```

- [ ] **Delete the default boilerplate files:**

```bash
rm -rf app/page.tsx app/globals.css public/vercel.svg public/next.svg public/window.svg public/globe.svg public/file.svg
```

- [ ] **Init git and commit:**

```bash
git init
git add .
git commit -m "chore: scaffold jcreatives project"
```

---

## Task 2: Global styles (`app/globals.css`)

**Files:**
- Create: `app/globals.css`

- [ ] **Write the full globals.css:**

```css
/* app/globals.css */
@import "tailwindcss";

@theme inline {
  /* Obsidian dark palette */
  --color-obsidian:    #0c0c0c;
  --color-surface:     #141414;
  --color-surface-2:   #1c1c1c;
  --color-border:      rgba(255,255,255,0.08);
  --color-border-gold: rgba(201,169,110,0.25);

  /* Text */
  --color-warm-white:  #f0ebe0;
  --color-warm-muted:  #8a8278;
  --color-warm-faint:  #4a4540;

  /* Gold accent */
  --color-gold:        #c9a96e;
  --color-gold-dim:    #9a7a50;

  /* Fonts */
  --font-display: var(--font-cormorant), serif;
  --font-sans:    var(--font-dm-sans), system-ui, sans-serif;
}

html  { scroll-behavior: smooth; }

body {
  background: #0c0c0c;
  color: #f0ebe0;
  font-family: var(--font-dm-sans), system-ui, sans-serif;
}

/* ── Font helpers ── */
.display      { font-family: var(--font-cormorant), serif; }
.serif        { font-family: var(--font-cormorant), serif; }
.serif-italic { font-family: var(--font-cormorant), serif; font-style: italic; }

/* ── Letter-spacing ── */
.tracking-widest-plus { letter-spacing: 0.35em; }
.tracking-mega        { letter-spacing: 0.55em; }

/* ── Scroll reveal ── */
.js-ready .reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity .8s ease, transform .8s cubic-bezier(.2,.7,.2,1);
}
.js-ready .reveal.in      { opacity: 1; transform: none; }
.js-ready .reveal-delay-1 { transition-delay: .1s; }
.js-ready .reveal-delay-2 { transition-delay: .2s; }
.js-ready .reveal-delay-3 { transition-delay: .3s; }
.js-ready .reveal-delay-4 { transition-delay: .4s; }

/* ── Animations ── */
@keyframes bob {
  0%, 100% { transform: translateY(0); opacity: .5; }
  50%       { transform: translateY(8px); opacity: 1; }
}
.bob { animation: bob 2.4s ease-in-out infinite; }

/* ── Masonry gallery ── */
.masonry { column-count: 1; column-gap: 12px; }
@media (min-width: 640px)  { .masonry { column-count: 2; column-gap: 16px; } }
@media (min-width: 1024px) { .masonry { column-count: 3; column-gap: 20px; } }
.masonry > * { break-inside: avoid; margin-bottom: 14px; }

/* ── Hover zoom ── */
.hover-zoom { overflow: hidden; }
.hover-zoom img {
  transition: transform 1.2s cubic-bezier(.2,.7,.2,1), filter .6s ease;
}
.hover-zoom:hover img { transform: scale(1.05); filter: brightness(1.05); }

/* ── Gold pill nav ── */
.nav-pill {
  backdrop-filter: blur(12px);
  background: rgba(20,20,20,0.85);
  border: 1px solid rgba(201,169,110,0.18);
}

/* ── Form fields ── */
.field {
  background: transparent;
  border: 0;
  border-bottom: 1px solid rgba(255,255,255,0.15);
  padding: 10px 0;
  width: 100%;
  color: #f0ebe0;
  font-family: var(--font-dm-sans), sans-serif;
  font-size: 0.95rem;
}
.field:focus       { outline: none; border-color: #c9a96e; }
.field::placeholder { color: rgba(255,255,255,0.25); }
.field option      { background: #141414; color: #f0ebe0; }

/* ── Vignette ── */
.vignette::after {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%);
}

/* ── Gold divider ── */
.gold-rule {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201,169,110,0.45), transparent);
}
```

- [ ] **Commit:**

```bash
git add app/globals.css
git commit -m "feat: add global theme and utility CSS"
```

---

## Task 3: Layout (`app/layout.tsx`)

**Files:**
- Create: `app/layout.tsx`

- [ ] **Write layout.tsx:**

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "J Creatives — Photography",
  description: "Capturing love stories, milestones, and moments that last forever.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Commit:**

```bash
git add app/layout.tsx
git commit -m "feat: configure fonts and root layout"
```

---

## Task 4: RevealInit (`components/RevealInit.tsx`)

**Files:**
- Create: `components/RevealInit.tsx`

- [ ] **Write RevealInit.tsx:**

```tsx
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
```

- [ ] **Commit:**

```bash
git add components/RevealInit.tsx
git commit -m "feat: add scroll-reveal component"
```

---

## Task 5: Nav (`components/Nav.tsx`)

**Files:**
- Create: `components/Nav.tsx`

- [ ] **Write Nav.tsx:**

```tsx
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
```

- [ ] **Commit:**

```bash
git add components/Nav.tsx
git commit -m "feat: add responsive nav with mobile burger"
```

---

## Task 6: Hero (`components/Hero.tsx`)

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Write Hero.tsx:**

```tsx
// components/Hero.tsx
export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden vignette"
    >
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-obsidian via-surface to-surface-2" />

      {/* Subtle gold grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(201,169,110,1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(201,169,110,1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Corner marks */}
      <div className="absolute top-8 left-8 text-[10px] tracking-widest-plus uppercase text-warm-faint">
        <div className="reveal in">Est. 2020</div>
      </div>
      <div className="absolute top-8 right-8 text-[10px] tracking-widest-plus uppercase text-warm-faint text-right">
        <div className="reveal in reveal-delay-1">Photography</div>
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <div className="reveal in text-[10px] sm:text-xs tracking-mega uppercase text-gold/70 mb-8">
          Visual Storyteller
        </div>

        <h1 className="reveal in reveal-delay-1 display text-[clamp(4rem,14vw,10rem)] leading-[0.88] text-warm-white">
          J Creatives
        </h1>

        <div className="reveal in reveal-delay-2 mt-8 gold-rule w-32 mx-auto" />

        <p className="reveal in reveal-delay-3 mt-8 serif-italic text-lg sm:text-2xl text-warm-muted max-w-md leading-relaxed">
          Capturing love stories, milestones, and moments that last forever.
        </p>

        <div className="reveal in reveal-delay-4 mt-12 flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#portfolio"
            className="px-8 py-3.5 border border-gold/50 text-gold text-[11px] tracking-widest-plus uppercase hover:bg-gold hover:text-obsidian transition-all duration-300"
          >
            View Portfolio
          </a>
          <a
            href="#booking"
            className="px-8 py-3.5 bg-gold text-obsidian text-[11px] tracking-widest-plus uppercase font-medium hover:bg-gold-dim transition-all duration-300"
          >
            Book a Session
          </a>
        </div>
      </div>

      {/* Scroll arrow */}
      <a
        href="#portfolio"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-warm-faint hover:text-warm-muted transition-colors"
      >
        <span className="text-[10px] tracking-widest-plus uppercase">Scroll</span>
        <svg className="bob" width="16" height="26" viewBox="0 0 16 26" fill="none">
          <path d="M8 1V23" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <path d="M1 16L8 24L15 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
```

- [ ] **Commit:**

```bash
git add components/Hero.tsx
git commit -m "feat: add cinematic hero section"
```

---

## Task 7: Portfolio (`components/Portfolio.tsx`)

**Files:**
- Create: `components/Portfolio.tsx`

- [ ] **Write Portfolio.tsx (Server Component — reads filesystem):**

```tsx
// components/Portfolio.tsx
import fs from "fs";
import path from "path";
import Image from "next/image";

function getImages(): string[] {
  const dir = path.join(process.cwd(), "public/images/portfolio");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) =>
    /\.(jpg|jpeg|png|webp|JPG|JPEG|PNG|WEBP)$/.test(f)
  );
  // Fisher-Yates shuffle — randomizes order on each server render
  for (let i = files.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [files[i], files[j]] = [files[j], files[i]];
  }
  return files.map((f) => `/images/portfolio/${f}`);
}

const delays = ["", " reveal-delay-1", " reveal-delay-2", " reveal-delay-3", " reveal-delay-4"];

export default function Portfolio() {
  const images = getImages();

  return (
    <section id="portfolio" className="bg-obsidian py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="reveal text-[11px] tracking-mega uppercase text-gold/60">The Work</div>
          <h2 className="reveal reveal-delay-1 mt-4 display text-5xl sm:text-7xl text-warm-white">
            Portfolio
          </h2>
          <div className="reveal reveal-delay-2 mt-6 gold-rule w-20 mx-auto" />
        </div>

        {images.length === 0 ? (
          <p className="text-center text-warm-faint serif-italic text-lg">
            Photos coming soon.
          </p>
        ) : (
          <div className="masonry">
            {images.map((src, i) => (
              <figure
                key={src}
                className={`reveal${delays[i % delays.length]} hover-zoom`}
              >
                <Image
                  src={src}
                  alt={`J Creatives — photo ${i + 1}`}
                  width={800}
                  height={533}
                  className="w-full h-auto"
                />
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Add `export const dynamic = 'force-dynamic'` to `app/page.tsx`** (added in Task 11 — note this so the shuffle re-runs per request in production).

- [ ] **Commit:**

```bash
git add components/Portfolio.tsx
git commit -m "feat: add masonry portfolio gallery with shuffle"
```

---

## Task 8: About (`components/About.tsx`)

**Files:**
- Create: `components/About.tsx`

- [ ] **Write About.tsx:**

```tsx
// components/About.tsx
export default function About() {
  return (
    <section id="about" className="bg-surface py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <div className="reveal text-[11px] tracking-mega uppercase text-gold/60 mb-4">
              The Photographer
            </div>
            <h2 className="reveal reveal-delay-1 display text-5xl sm:text-6xl text-warm-white leading-tight">
              About<br />J Creatives
            </h2>
            <div className="reveal reveal-delay-2 mt-6 gold-rule w-16" />
            <p className="reveal reveal-delay-3 mt-8 serif text-lg leading-relaxed text-warm-muted">
              J Creatives is a photography studio dedicated to capturing the
              emotions, details, and stories that make every moment unique.
              Specializing in weddings, prenuptial shoots, and special
              occasions, each frame is crafted with intention and care.
            </p>
            <p className="reveal reveal-delay-4 mt-5 serif text-lg leading-relaxed text-warm-muted">
              Based in the Philippines, available nationwide.
            </p>
            <a
              href="#booking"
              className="reveal reveal-delay-4 mt-10 inline-flex items-center gap-3 text-[11px] tracking-widest-plus uppercase text-gold hover:text-gold-dim transition-colors"
            >
              Book a session
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14" /><path d="M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Decorative frame (replace with actual photo later) */}
          <div className="reveal reveal-delay-2 relative">
            <div className="absolute -inset-3 border border-gold/20" />
            <div className="aspect-[3/4] bg-surface-2 flex items-center justify-center">
              <span className="serif-italic text-warm-faint text-lg">
                Photographer photo
              </span>
            </div>
            {/* Gold corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gold/50 -translate-x-4 -translate-y-4" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gold/50 translate-x-4 translate-y-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Commit:**

```bash
git add components/About.tsx
git commit -m "feat: add about section"
```

---

## Task 9: BookingForm (`components/BookingForm.tsx`)

**Files:**
- Create: `components/BookingForm.tsx`

- [ ] **Write BookingForm.tsx:**

```tsx
// components/BookingForm.tsx
"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const EVENT_TYPES = ["Wedding", "Prenup", "Birthday", "Corporate", "Other"];

export default function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = {
      name:      (form.elements.namedItem("name")      as HTMLInputElement).value,
      email:     (form.elements.namedItem("email")     as HTMLInputElement).value,
      eventType: (form.elements.namedItem("eventType") as HTMLSelectElement).value,
      eventDate: (form.elements.namedItem("eventDate") as HTMLInputElement).value,
      message:   (form.elements.namedItem("message")   as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="booking" className="bg-obsidian py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="reveal text-[11px] tracking-mega uppercase text-gold/60">Get in Touch</div>
          <h2 className="reveal reveal-delay-1 mt-4 display text-5xl sm:text-7xl text-warm-white">
            Book a Session
          </h2>
          <div className="reveal reveal-delay-2 mt-6 gold-rule w-20 mx-auto" />
          <p className="reveal reveal-delay-3 mt-6 serif-italic text-lg text-warm-muted">
            Tell us about your vision and we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        {status === "success" ? (
          <div className="reveal in text-center py-16 border border-gold/20">
            <div className="display text-4xl text-gold mb-4">Thank You</div>
            <p className="serif-italic text-warm-muted text-lg">
              Your inquiry has been sent. We&apos;ll be in touch soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="reveal grid sm:grid-cols-2 gap-x-10 gap-y-8">
            <label className="block">
              <span className="text-[10px] tracking-widest-plus uppercase text-warm-faint">Full Name *</span>
              <input
                name="name"
                type="text"
                required
                className="field mt-2"
                placeholder="Juan dela Cruz"
              />
            </label>

            <label className="block">
              <span className="text-[10px] tracking-widest-plus uppercase text-warm-faint">Email Address *</span>
              <input
                name="email"
                type="email"
                required
                className="field mt-2"
                placeholder="juan@email.com"
              />
            </label>

            <label className="block">
              <span className="text-[10px] tracking-widest-plus uppercase text-warm-faint">Event Type *</span>
              <select name="eventType" required className="field mt-2">
                <option value="">Select type…</option>
                {EVENT_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-[10px] tracking-widest-plus uppercase text-warm-faint">Event Date *</span>
              <input
                name="eventDate"
                type="date"
                required
                className="field mt-2"
                style={{ colorScheme: "dark" }}
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="text-[10px] tracking-widest-plus uppercase text-warm-faint">Message</span>
              <textarea
                name="message"
                rows={4}
                className="field mt-2 resize-none"
                placeholder="Tell us about your event, location, and any special requests…"
              />
            </label>

            {status === "error" && (
              <p className="sm:col-span-2 text-sm text-red-400">{error}</p>
            )}

            <div className="sm:col-span-2 flex justify-end pt-2">
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-8 py-3.5 bg-gold text-obsidian text-[11px] tracking-widest-plus uppercase font-medium hover:bg-gold-dim transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Sending…" : "Send Inquiry"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Commit:**

```bash
git add components/BookingForm.tsx
git commit -m "feat: add booking inquiry form"
```

---

## Task 10: API route (`app/api/contact/route.ts`)

**Files:**
- Create: `app/api/contact/route.ts`

- [ ] **Write route.ts:**

```ts
// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, eventType, eventDate, message } = await req.json();

  if (!name || !email || !eventType || !eventDate) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "J Creatives Inquiry <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `New Booking Inquiry — ${eventType} · ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #333;">
          <h2 style="border-bottom: 2px solid #c9a96e; padding-bottom: 8px; color: #c9a96e;">
            New Booking Inquiry
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr><td style="padding: 8px 0; font-weight: 600; width: 120px;">Name</td><td>${name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600;">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600;">Event Type</td><td>${eventType}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600;">Event Date</td><td>${eventDate}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Message</td><td>${message || "—"}</td></tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
  }
}
```

- [ ] **Commit:**

```bash
git add app/api/contact/route.ts
git commit -m "feat: add contact API route with Resend"
```

---

## Task 11: Footer (`components/Footer.tsx`)

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Write Footer.tsx:**

```tsx
// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border py-16">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="display text-3xl text-warm-white mb-3">J Creatives</div>
        <p className="serif-italic text-warm-muted mb-8">Photography · Philippines</p>

        <div className="gold-rule w-24 mx-auto mb-8" />

        <div className="flex items-center justify-center gap-8 text-[11px] tracking-widest-plus uppercase text-warm-faint">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
            Facebook
          </a>
          <span className="text-warm-faint/30">·</span>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
            Instagram
          </a>
          <span className="text-warm-faint/30">·</span>
          <a href="#booking" className="hover:text-gold transition-colors">
            Book Now
          </a>
        </div>

        <p className="mt-10 text-[10px] tracking-widest-plus uppercase text-warm-faint/40">
          © {new Date().getFullYear()} J Creatives. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Commit:**

```bash
git add components/Footer.tsx
git commit -m "feat: add footer"
```

---

## Task 12: Wire everything (`app/page.tsx`)

**Files:**
- Create: `app/page.tsx`

- [ ] **Write page.tsx:**

```tsx
// app/page.tsx
export const dynamic = "force-dynamic";

import RevealInit from "@/components/RevealInit";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <RevealInit />
      <Nav />
      <Hero />
      <Portfolio />
      <About />
      <BookingForm />
      <Footer />
    </>
  );
}
```

- [ ] **Run the dev server and verify all sections render:**

```bash
npm run dev
```

Open `http://localhost:3000`. Confirm:
- Hero shows with J Creatives branding and two CTA buttons
- Portfolio shows photo grid (6 sample photos)
- About section renders
- Booking form renders all fields
- Footer renders

- [ ] **Commit:**

```bash
git add app/page.tsx
git commit -m "feat: wire all sections into main page"
```

---

## Task 13: Test the booking form

**Files:** None

- [ ] **Get a free Resend API key:**
  1. Go to resend.com → Sign up (free)
  2. Create an API key
  3. Update `.env.local`:
     ```
     RESEND_API_KEY=re_your_actual_key
     CONTACT_EMAIL=your_email@gmail.com
     ```

- [ ] **Restart the dev server:**

```bash
npm run dev
```

- [ ] **Fill in and submit the booking form at `http://localhost:3000/#booking`.**

Expected: success message appears, email arrives at `CONTACT_EMAIL`.

- [ ] **If email fails**, check the terminal for error output from the API route. Common fix: Resend requires a verified sender domain for the `from` field in production. For testing, `onboarding@resend.dev` works on the free tier.

---

## Task 14: Deploy to Vercel

**Files:** None

- [ ] **Push to GitHub:**

```bash
git remote add origin https://github.com/YOUR_USERNAME/jcreatives.git
git push -u origin main
```

- [ ] **Import on Vercel:**
  1. Go to vercel.com → New Project → Import the `jcreatives` repo
  2. Add environment variables:
     - `RESEND_API_KEY` = your Resend key
     - `CONTACT_EMAIL` = J Creatives' email (or your test email for now)
  3. Deploy

- [ ] **Open the live URL and verify:**
  - Portfolio loads and shows photos
  - Booking form submits and sends email
  - Mobile nav works (burger drawer)

- [ ] **Share the URL** — this is your proposal link to send to J Creatives.

---

## Self-Review Checklist

- [x] Hero — Task 6
- [x] Portfolio masonry + shuffle — Task 7
- [x] About section — Task 8
- [x] Booking form (all 5 fields, validation, success/error states) — Task 9
- [x] `/api/contact` with Resend + server-side validation — Task 10
- [x] Footer with social links — Task 11
- [x] Nav desktop + mobile — Task 5
- [x] Scroll-reveal animations — Tasks 4, 2
- [x] Dark cinematic theme tokens — Task 2
- [x] `force-dynamic` for gallery shuffle in production — Task 12
- [x] Deploy steps — Task 14
