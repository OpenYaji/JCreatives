import TeamShowcase from '@/components/ui/team-showcase';

export default function About() {
  return (
    <section id="about" className="bg-surface py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="reveal text-[11px] tracking-mega uppercase text-gold/60">
            The People
          </div>
          <h2 className="reveal reveal-delay-1 mt-4 display text-5xl sm:text-7xl text-warm-white">
            Meet J Creatives
          </h2>
          <div className="reveal reveal-delay-2 mt-6 gold-rule w-20 mx-auto" />
          <p className="reveal reveal-delay-3 mt-6 serif text-lg leading-relaxed text-warm-muted">
            More than a photographer — a collective of artists dedicated to
            capturing the emotions, details, and stories that make every moment
            unforgettable.
          </p>
        </div>

        {/* Team grid */}
        <div className="reveal reveal-delay-2">
          <TeamShowcase />
        </div>

      </div>
    </section>
  );
}
