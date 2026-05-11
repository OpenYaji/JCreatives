"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/curtain-theme-toggle";

const links = [
  { href: "#home",      label: "Home" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#about",     label: "About" },
  { href: "#booking",   label: "Book" },
];

const COLLAPSE_AFTER_PX   = 150;
const EXPAND_SCROLL_BACK  = 80;

/* ── Framer variants ── */
const pillVariants = {
  expanded: {
    width: "auto",
    transition: { type: "spring" as const, damping: 20, stiffness: 300, staggerChildren: 0.06, delayChildren: 0.15 },
  },
  collapsed: {
    width: "3rem",
    transition: { type: "spring" as const, damping: 20, stiffness: 300, when: "afterChildren" as const, staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const logoVariants = {
  expanded:  { opacity: 1, x: 0,   scale: 1,    transition: { type: "spring" as const, damping: 15 } },
  collapsed: { opacity: 0, x: -16, scale: 0.85, transition: { duration: 0.2 } },
};

const itemVariants = {
  expanded:  { opacity: 1, x: 0,   scale: 1,    transition: { type: "spring" as const, damping: 15 } },
  collapsed: { opacity: 0, x: -12, scale: 0.95, transition: { duration: 0.18 } },
};

const menuIconVariants = {
  expanded:  { opacity: 0, scale: 0.7, transition: { duration: 0.15 } },
  collapsed: { opacity: 1, scale: 1,   transition: { type: "spring" as const, damping: 15, stiffness: 300, delay: 0.12 } },
};

export default function Nav() {
  const [isExpanded, setExpanded] = React.useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [theme, setTheme] = React.useState<"light" | "dark">("dark");

  React.useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const handleMobileThemeToggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const { scrollY } = useScroll();
  const lastScrollY = React.useRef(0);
  const collapseAt  = React.useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = lastScrollY.current;
    if (isExpanded && latest > prev && latest > COLLAPSE_AFTER_PX) {
      setExpanded(false);
      collapseAt.current = latest;
    } else if (!isExpanded && latest < prev && collapseAt.current - latest > EXPAND_SCROLL_BACK) {
      setExpanded(true);
    }
    lastScrollY.current = latest;
  });

  const handleCollapsedClick = (e: React.MouseEvent) => {
    if (!isExpanded) { e.preventDefault(); setExpanded(true); }
  };

  const navigateTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = href.replace('#', '');
    window.dispatchEvent(new CustomEvent('jcreatives:navigate', { detail: { target } }));
  };

  return (
    <>
      {/* ── Desktop animated pill ── */}
      <motion.div
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:block"
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring" as const, damping: 22, stiffness: 260, delay: 0.15 }}
      >
        <motion.nav
          animate={isExpanded ? "expanded" : "collapsed"}
          variants={pillVariants}
          whileHover={!isExpanded ? { scale: 1.08 } : {}}
          whileTap={!isExpanded  ? { scale: 0.94 } : {}}
          onClick={handleCollapsedClick}
          className={cn(
            "relative flex items-center overflow-hidden h-11 rounded-full backdrop-blur-[14px]",
            "transition-[background-color,border-color,box-shadow] duration-400",
            theme === "dark"
              ? "border border-[rgba(201,169,110,0.18)] bg-[rgba(20,20,20,0.88)] shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
              : "border border-[rgba(154,112,48,0.22)] bg-[rgba(245,240,232,0.92)] shadow-[0_4px_24px_rgba(0,0,0,0.12)]",
            !isExpanded && "cursor-pointer justify-center w-12",
          )}
        >
          {/* Logo */}
          <motion.div
            variants={logoVariants}
            className="flex-shrink-0 flex items-center pl-3 pr-1"
          >
            <Image
              src="/images/ICON.png"
              alt="J Creatives"
              width={68}
              height={22}
              className="object-contain"
              style={{
                filter: theme === "dark" ? "invert(1) grayscale(1) brightness(2)" : "none",
                mixBlendMode: theme === "light" ? "multiply" : "normal",
                transition: "filter 0.4s ease",
              }}
            />
          </motion.div>

          {/* Nav links */}
          <motion.div
            className={cn(
              "flex items-center gap-0.5 pr-2",
              !isExpanded && "pointer-events-none",
            )}
          >
            {links.slice(0, -1).map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                variants={itemVariants}
                onClick={(e) => navigateTo(e, link.href)}
                className="px-3 py-1.5 text-[10px] tracking-widest-plus uppercase text-warm-muted hover:text-warm-white rounded-full hover:bg-warm-white/5 transition-colors whitespace-nowrap"
              >
                {link.label}
              </motion.a>
            ))}

            {/* Book CTA */}
            <motion.a
              href="#booking"
              variants={itemVariants}
              onClick={(e) => navigateTo(e, '#booking')}
              className="ml-1 px-4 py-1.5 rounded-full bg-gold text-obsidian text-[10px] tracking-widest-plus uppercase font-medium hover:bg-gold-dim transition-colors whitespace-nowrap"
            >
              Book
            </motion.a>

            {/* Theme toggle */}
            <motion.div variants={itemVariants} className="flex items-center mr-2 ml-1">
              <ThemeToggle
                variant="icon"
                defaultTheme="dark"
                buttonSize={30}
                duration={600}
                onThemeChange={(t) => setTheme(t)}
              />
            </motion.div>
          </motion.div>

          {/* Collapsed menu icon */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div variants={menuIconVariants} animate={isExpanded ? "expanded" : "collapsed"}>
              <Menu className="h-4 w-4 text-gold" />
            </motion.div>
          </div>
        </motion.nav>
      </motion.div>

      {/* ── Mobile burger ── */}
      <button
        onClick={() => setMobileOpen((o) => !o)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        className={cn(
          "fixed top-4 right-4 z-50 md:hidden w-10 h-10 rounded-full flex flex-col items-center justify-center gap-1.5 backdrop-blur-[14px]",
          "transition-[background-color,border-color] duration-400",
          theme === "dark"
            ? "border border-[rgba(201,169,110,0.18)] bg-[rgba(20,20,20,0.88)]"
            : "border border-[rgba(154,112,48,0.22)] bg-[rgba(245,240,232,0.92)]",
        )}
      >
        <span className={`block w-4 h-px bg-warm-white transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
        <span className={`block w-4 h-px bg-warm-white transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
        <span className={`block w-4 h-px bg-warm-white transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[5px]" : ""}`} />
      </button>

      {/* ── Mobile drawer ── */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"}`}
        />
        <nav className={`absolute top-0 right-0 h-full w-64 bg-surface flex flex-col pt-20 pb-10 px-8 border-l border-border transition-transform duration-300 ease-in-out ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="text-[10px] tracking-mega uppercase text-warm-faint mb-6">Menu</div>
          <div className="flex flex-col gap-1">
            {links.map(({ href, label }, i) => (
              <a
                key={href}
                href={href}
                onClick={(e) => { setMobileOpen(false); navigateTo(e, href); }}
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
          <div className="mt-auto flex flex-col gap-4">
            <button
              onClick={handleMobileThemeToggle}
              className="flex items-center gap-2 text-[10px] tracking-widest-plus uppercase text-warm-muted hover:text-warm-white transition-colors"
            >
              {theme === "dark" ? <Sun size={12} /> : <Moon size={12} />}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
            <Image
              src="/images/ICON.png"
              alt="J Creatives"
              width={80}
              height={26}
              className="object-contain opacity-50"
              style={{ mixBlendMode: theme === "light" ? "multiply" : "normal" }}
            />
          </div>
        </nav>
      </div>
    </>
  );
}
