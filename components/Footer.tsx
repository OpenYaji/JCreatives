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
