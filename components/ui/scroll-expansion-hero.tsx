'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  TouchEvent as ReactTouchEvent,
  WheelEvent as ReactWheelEvent,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

export default function ScrollExpandMedia({
  mediaType = 'image',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0009;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);
        if (newProgress >= 1) { setMediaFullyExpanded(true); setShowContent(true); }
        else if (newProgress < 0.75) setShowContent(false);
      }
    };

    const handleTouchStart = (e: TouchEvent) => setTouchStartY(e.touches[0].clientY);

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const newProgress = Math.min(Math.max(scrollProgress + deltaY * scrollFactor, 0), 1);
        setScrollProgress(newProgress);
        if (newProgress >= 1) { setMediaFullyExpanded(true); setShowContent(true); }
        else if (newProgress < 0.75) setShowContent(false);
        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = () => setTouchStartY(0);
    const handleScroll = () => { if (!mediaFullyExpanded) window.scrollTo(0, 0); };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const mediaWidth  = 300 + scrollProgress * (isMobile ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobile ? 200 : 400);
  const textShift   = scrollProgress * (isMobile ? 180 : 150);

  const firstWord   = title?.split(' ')[0] ?? '';
  const restOfTitle = title?.split(' ').slice(1).join(' ') ?? '';

  return (
    <div ref={sectionRef} className="overflow-x-hidden">
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">

          {/* Background image fades out as media expands */}
          <motion.div
            className="absolute inset-0 z-0 h-full"
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <Image
              src={bgImageSrc}
              alt="Background"
              width={1920}
              height={1080}
              className="w-screen h-screen object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
            {/* Vignette */}
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)'
            }} />
          </motion.div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">

              {/* Expanding media card */}
              <div
                className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: `0 0 ${40 + scrollProgress * 60}px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(201,169,110,${0.15 + scrollProgress * 0.1})`,
                }}
              >
                <div className="relative w-full h-full pointer-events-none">
                  <Image
                    src={mediaSrc}
                    alt={title ?? 'J Creatives'}
                    fill
                    className="object-cover"
                    sizes="95vw"
                  />
                  {/* Cinematic overlay fades with scroll */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ opacity: 0.55 - scrollProgress * 0.4 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      background: 'linear-gradient(to bottom, rgba(12,12,12,0.3) 0%, rgba(12,12,12,0.6) 100%)'
                    }}
                  />
                  {/* Gold shimmer border that intensifies as it expands */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{ opacity: scrollProgress * 0.6 }}
                    style={{
                      boxShadow: 'inset 0 0 60px rgba(201,169,110,0.15)'
                    }}
                  />
                </div>

                {/* Sub-labels that slide apart */}
                <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center z-10">
                  {date && (
                    <p
                      className="text-[10px] tracking-[0.55em] uppercase text-[#c9a96e]/80 transition-none"
                      style={{ transform: `translateX(-${textShift}vw)` }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className="text-[10px] tracking-[0.35em] uppercase text-[#f0ebe0]/50 mt-1 transition-none"
                      style={{ transform: `translateX(${textShift}vw)` }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              {/* Title words that slide apart */}
              <div
                className={`flex flex-col items-center justify-center text-center gap-2 w-full relative z-10 ${
                  textBlend ? 'mix-blend-difference' : ''
                }`}
              >
                <h1
                  className="font-serif text-[clamp(3.5rem,13vw,9rem)] leading-[0.88] text-[#f0ebe0] transition-none"
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    transform: `translateX(-${textShift}vw)`,
                    textShadow: '0 2px 40px rgba(0,0,0,0.5)',
                  }}
                >
                  {firstWord}
                </h1>
                <h1
                  className="font-serif text-[clamp(3.5rem,13vw,9rem)] leading-[0.88] text-[#f0ebe0] transition-none"
                  style={{
                    fontFamily: 'var(--font-cormorant), serif',
                    transform: `translateX(${textShift}vw)`,
                    textShadow: '0 2px 40px rgba(0,0,0,0.5)',
                  }}
                >
                  {restOfTitle}
                </h1>

                {/* Scroll hint — fades out early */}
                <motion.div
                  className="mt-10 flex flex-col items-center gap-3"
                  animate={{ opacity: Math.max(0, 1 - scrollProgress * 4) }}
                >
                  <span className="text-[10px] tracking-[0.55em] uppercase text-[#c9a96e]/60">
                    Scroll to Explore
                  </span>
                  <svg
                    className="animate-bounce"
                    width="14" height="22" viewBox="0 0 14 22" fill="none"
                    style={{ animationDuration: '2.4s' }}
                  >
                    <path d="M7 1V19" stroke="#c9a96e" strokeWidth="1" strokeOpacity="0.5" strokeLinecap="round"/>
                    <path d="M1 14L7 21L13 14" stroke="#c9a96e" strokeWidth="1" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              </div>
            </div>

            {/* Content revealed after full expansion */}
            <motion.div
              className="w-full"
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {children}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
