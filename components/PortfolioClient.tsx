'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import FlowArt, { FlowSection } from '@/components/ui/story-scroll';
import PortfolioLightbox from '@/components/ui/portfolio-lightbox';

export interface PortfolioItem {
  slug: string;
  label: string;
  category: string;
  cover: string;
  gallery: string[];
}

const BG_CYCLE = ['#0c0c0c', '#141414', '#1c1c1c'];

export default function PortfolioClient({ items }: { items: PortfolioItem[] }) {
  const [lightbox, setLightbox] = useState<{
    images: string[];
    index: number;
    title: string;
  } | null>(null);

  const openGallery = (item: PortfolioItem) => {
    if (item.gallery.length === 0) return;
    setLightbox({ images: item.gallery, index: 0, title: item.label });
  };

  return (
    <>
      <FlowArt aria-label="J Creatives Portfolio">
        {items.map((item, i) => (
          <FlowSection
            key={item.slug}
            aria-label={item.label}
            style={{
              backgroundColor: BG_CYCLE[i % BG_CYCLE.length],
              color: '#f0ebe0',
            }}
          >
            {/* Top label */}
            <p className="text-[10px] tracking-mega uppercase text-[rgba(201,169,110,0.6)]">
              {String(i + 1).padStart(2, '0')} — {item.category}
            </p>

            {/* Gold rule */}
            <div className="gold-rule" />

            {/* Display title */}
            <h2
              className="text-[clamp(3rem,9vw,9rem)] leading-[0.88] tracking-tight"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              {item.label.includes('&') ? (
                <>
                  {item.label.split(' & ')[0]}
                  <br />
                  <span className="text-[#c9a96e]">&amp;</span>{' '}
                  {item.label.split(' & ')[1]}
                </>
              ) : (
                item.label
              )}
            </h2>

            {/* Cover image — grows to fill remaining height */}
            <div
              className="relative grow h-0 min-h-0 cursor-pointer group overflow-hidden"
              onClick={() => openGallery(item)}
              role={item.gallery.length > 0 ? 'button' : undefined}
              tabIndex={item.gallery.length > 0 ? 0 : undefined}
              onKeyDown={(e) => e.key === 'Enter' && openGallery(item)}
              aria-label={item.gallery.length > 0 ? `Open ${item.label} gallery` : undefined}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.cover}
                alt={item.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />

              {/* Gold frame border */}
              <div className="absolute inset-0 ring-1 ring-inset ring-[rgba(201,169,110,0.15)]" />

              {/* Gallery hover overlay */}
              {item.gallery.length > 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors duration-500">
                  <div className="flex flex-col items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-2 group-hover:translate-y-0">
                    <div className="w-12 h-12 rounded-full border border-[#c9a96e] flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="1.5">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        <line x1="8" y1="9" x2="16" y2="9" />
                        <line x1="8" y1="13" x2="14" y2="13" />
                      </svg>
                    </div>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]">
                      View Gallery
                    </span>
                    <span className="text-[10px] tracking-widest text-[rgba(240,235,224,0.5)]">
                      {item.gallery.length} photos
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Gold rule */}
            <div className="gold-rule" />

            {/* Bottom row */}
            <div className="flex items-center justify-between">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[rgba(201,169,110,0.5)]">
                Philippines
              </p>
              {item.gallery.length > 0 ? (
                <button
                  onClick={() => openGallery(item)}
                  className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] hover:text-[#9a7a50] transition-colors"
                >
                  View Gallery
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <span className="text-[10px] tracking-[0.3em] uppercase text-[rgba(240,235,224,0.2)]">
                  Single Shoot
                </span>
              )}
            </div>
          </FlowSection>
        ))}
      </FlowArt>

      <AnimatePresence>
        {lightbox && (
          <PortfolioLightbox
            key="lightbox"
            images={lightbox.images}
            initialIndex={lightbox.index}
            title={lightbox.title}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
