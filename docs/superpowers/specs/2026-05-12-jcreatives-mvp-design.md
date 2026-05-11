# J Creatives MVP Portfolio Website — Design Spec
**Date:** 2026-05-12
**Author:** John Rey
**Purpose:** MVP photographer portfolio website to propose to J Creatives as a paid project

---

## Overview

A production-ready MVP photography portfolio website built with Next.js + Tailwind CSS and deployed on Vercel. The site serves as a live demo/proposal for J Creatives. It showcases their work, tells their story, and lets potential clients send booking inquiries directly to their inbox — no database required.

---

## Pages & Sections

### 1. Home (Hero)
- Full-screen hero section with J Creatives branding and a short tagline
- Dark cinematic background (full-bleed photo or gradient)
- CTA button: "View Portfolio" and "Book a Session"
- Smooth scroll to sections below

### 2. Portfolio
- Masonry photo grid (CSS columns, same pattern as the wedding site)
- Photos loaded from `public/images/portfolio/`
- Randomized order on each page load
- Hover zoom effect on each photo
- Scroll-reveal animations

### 3. About
- Short photographer bio/intro
- Placeholder text to be replaced with J Creatives' real content
- Optional: a portrait photo of the photographer

### 4. Booking / Contact
- Inquiry form fields:
  - Full Name
  - Email Address
  - Event Type (dropdown: Wedding, Prenup, Birthday, Corporate, Other)
  - Event Date (date picker)
  - Message / Additional Details
- Client-side validation (required fields)
- Submitted via POST to `/api/contact`
- On success: show a thank-you message inline
- On error: show a friendly error message

---

## Architecture

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4
- **Fonts:** Elegant serif display font (e.g., Cormorant Garamond or Playfair Display) + clean sans-serif body
- **Animations:** Scroll-reveal via IntersectionObserver (same RevealInit pattern as wedding site)

### API Route
- **`/api/contact`** — POST handler
  - Validates required fields server-side
  - Sends email to J Creatives via Resend
  - Returns `{ success: true }` or `{ error: "..." }`

### Email (Resend)
- Free tier: 3,000 emails/month
- Requires a Resend API key (stored in `.env.local`)
- Email template: plain structured summary of the inquiry

### Deployment
- **Platform:** Vercel (free tier)
- **Environment variables:** `RESEND_API_KEY`, `CONTACT_EMAIL` (J Creatives' inbox)
- Custom domain optional (can be added later)

---

## Design Direction

- **Theme:** Dark, cinematic — black/charcoal base with warm white and subtle gold accents
- **Typography:** Large serif display for headings, clean sans-serif for body
- **Imagery:** Full-bleed, large — let the photography do the talking
- **Nav:** Fixed pill nav on desktop, burger drawer on mobile
- **Footer:** Contact info, social media links (Instagram, Facebook)

---

## File Structure

```
jcreatives/
├── app/
│   ├── layout.tsx          # fonts, metadata
│   ├── page.tsx            # home (hero + portfolio + about + booking)
│   ├── globals.css         # theme, animations
│   └── api/
│       └── contact/
│           └── route.ts    # booking form handler (Resend)
├── components/
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── Portfolio.tsx
│   ├── About.tsx
│   ├── BookingForm.tsx
│   ├── Footer.tsx
│   └── RevealInit.tsx
├── public/
│   └── images/
│       └── portfolio/      # drop photos here
├── .env.local              # RESEND_API_KEY, CONTACT_EMAIL
└── package.json
```

---

## Out of Scope (MVP)

These can be offered as paid upgrades after J Creatives says yes:

- CMS / admin panel for uploading photos without code
- Client gallery (password-protected delivery)
- Blog / journal section
- Online payments / deposits
- SEO optimization beyond basics

---

## Success Criteria

- Site is live on Vercel with a shareable URL
- Portfolio gallery displays photos correctly on mobile and desktop
- Booking form sends an email to a test inbox
- Looks polished enough to serve as a compelling proposal demo
