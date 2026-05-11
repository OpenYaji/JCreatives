'use client';

import { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PortfolioLightboxProps {
  images: string[];
  initialIndex: number;
  title: string;
  onClose: () => void;
}

export default function PortfolioLightbox({
  images,
  initialIndex,
  title,
  onClose,
}: PortfolioLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose, prev, next]);

  // Prevent body scroll while lightbox is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col"
      style={{ backgroundColor: 'rgba(12,12,12,0.97)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 flex-shrink-0">
        <div>
          <p className="text-[10px] tracking-mega uppercase text-gold/60 mb-0.5">Gallery</p>
          <p
            className="text-lg text-warm-white"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            {title}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[11px] tracking-widest text-warm-faint">
            {index + 1} / {images.length}
          </span>
          <button
            onClick={onClose}
            className="text-warm-muted hover:text-gold transition-colors p-2"
            aria-label="Close gallery"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Gold rule */}
      <div className="gold-rule mx-6 flex-shrink-0" />

      {/* Image area */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden px-16 py-6">
        {/* Prev */}
        <button
          onClick={prev}
          className="absolute left-4 z-10 p-3 text-warm-muted hover:text-gold transition-colors"
          aria-label="Previous image"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 12H5M11 5l-7 7 7 7" />
          </svg>
        </button>

        {/* Image */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full h-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[index]}
              alt={`${title} — ${index + 1}`}
              className="w-full h-full object-contain"
              style={{ maxHeight: '75vh' }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Next */}
        <button
          onClick={next}
          className="absolute right-4 z-10 p-3 text-warm-muted hover:text-gold transition-colors"
          aria-label="Next image"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 justify-center px-6 pb-6 flex-shrink-0 overflow-x-auto scrollbar-hide">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
              className="flex-shrink-0 relative"
              aria-label={`Go to image ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                className="w-16 h-12 object-cover transition-all duration-200"
                style={{
                  filter: i === index ? 'grayscale(0)' : 'grayscale(1) brightness(0.5)',
                  outline: i === index ? '1px solid rgba(201,169,110,0.7)' : 'none',
                  outlineOffset: '2px',
                }}
              />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
