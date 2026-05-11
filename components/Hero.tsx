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
