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
