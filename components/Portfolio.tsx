import fs from 'fs';
import path from 'path';
import PortfolioClient, { type PortfolioItem } from '@/components/PortfolioClient';

const CATEGORY_WORDS = ['birthday', 'prom', 'christening', 'baptism', 'debut', 'graduation', 'anniversary', 'wedding'];

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatLabel(slug: string): string {
  const parts = slug.split('-');
  const last = parts[parts.length - 1].toLowerCase();
  // Two-part slug where last word is NOT a category → assume couple names
  if (parts.length === 2 && !CATEGORY_WORDS.includes(last) && parts[0].length > 2) {
    return `${capitalize(parts[0])} & ${capitalize(parts[1])}`;
  }
  return parts.map((p) => (p.toLowerCase() === 'js' ? 'JS' : capitalize(p))).join(' ');
}

function detectCategory(slug: string): string {
  const lower = slug.toLowerCase();
  if (lower.includes('birthday')) return 'Birthday';
  if (lower.includes('prom')) return 'Prom Night';
  if (lower.includes('christening') || lower.includes('baptism')) return 'Christening';
  if (lower.includes('debut')) return 'Debut';
  if (lower.includes('prenup') || lower.includes('engag')) return 'Prenuptial';
  if (lower.includes('wedding')) return 'Wedding';
  // Two-name slug → wedding / prenup by convention
  const parts = lower.split('-');
  if (parts.length === 2) return 'Wedding';
  return 'Portrait Session';
}

function getPortfolioItems(): PortfolioItem[] {
  const dir = path.join(process.cwd(), 'public/images/portfolio');
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  // Gallery subfolders
  const galleries = new Map<string, string[]>();
  entries
    .filter((e) => e.isDirectory())
    .forEach((e) => {
      const galleryDir = path.join(dir, e.name);
      const imgs = fs
        .readdirSync(galleryDir)
        .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
        .sort()
        .map((f) => `/images/portfolio/${e.name}/${f}`);
      if (imgs.length > 0) galleries.set(e.name, imgs);
    });

  // Cover images
  const items: PortfolioItem[] = entries
    .filter((e) => e.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(e.name))
    .map((e) => {
      const slug = e.name.replace(/\.(jpg|jpeg|png|webp)$/i, '');
      return {
        slug,
        label: formatLabel(slug),
        category: detectCategory(slug),
        cover: `/images/portfolio/${e.name}`,
        gallery: galleries.get(slug) ?? [],
      };
    });

  return items;
}

export default function Portfolio() {
  const items = getPortfolioItems();

  return (
    <>
      {/* Section header */}
      <section id="portfolio" className="bg-obsidian py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <div className="reveal text-[11px] tracking-mega uppercase text-gold/60">The Work</div>
            <h2 className="reveal reveal-delay-1 mt-4 display text-5xl sm:text-7xl text-warm-white">
              Portfolio
            </h2>
            <div className="reveal reveal-delay-2 mt-6 gold-rule w-20 mx-auto" />
            <p className="reveal reveal-delay-3 mt-6 serif text-lg leading-relaxed text-warm-muted">
              Every frame tells a story. Scroll through our work.
            </p>
          </div>
        </div>
      </section>

      {/* Story scroll — full width, no container constraint */}
      {items.length > 0 ? (
        <PortfolioClient items={items} />
      ) : (
        <section className="bg-obsidian py-16">
          <p className="text-center text-warm-faint serif-italic text-lg">Photos coming soon.</p>
        </section>
      )}
    </>
  );
}
