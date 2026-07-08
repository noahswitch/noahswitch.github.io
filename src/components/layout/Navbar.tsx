"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { navItems, links, profile } from "@/data/content";
import { Magnetic } from "@/components/ui/Magnetic";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Budapest",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <span className="hidden lg:inline-flex items-center gap-2 font-mono text-xs text-mist-2">
      <span className="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden />
      Budapest · {time}
    </span>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reducedMotion = useReducedMotion();
  const lenis = useLenis(({ scroll }) => {
    setScrolled(scroll > 40);
  });

  function goTo(href: string) {
    setOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target as HTMLElement, { offset: -84 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
    window.history.pushState(null, "", href);
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "glass" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="wrap flex h-[72px] items-center justify-between">
        <a
          href="#hero"
          onClick={(event) => {
            event.preventDefault();
            goTo("#hero");
          }}
          className="font-display text-lg font-medium tracking-tight text-paper"
          aria-label="Back to top"
        >
          N<span className="text-signal">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => {
                event.preventDefault();
                goTo(item.href);
              }}
              className="group relative font-mono text-[0.8rem] uppercase tracking-wider text-mist transition-colors hover:text-paper"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-signal transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LiveClock />
          <div className="hidden sm:flex items-center gap-1.5">
            <Magnetic>
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full text-mist transition-colors hover:text-paper"
              >
                <Github size={17} />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full text-mist transition-colors hover:text-paper"
              >
                <Linkedin size={17} />
              </a>
            </Magnetic>
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full text-paper md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reducedMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="glass md:hidden"
          >
            <nav className="wrap flex flex-col gap-1 py-4" aria-label="Mobile">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault();
                    goTo(item.href);
                  }}
                  className="rounded-lg px-2 py-3 font-mono text-sm uppercase tracking-wider text-mist hover:bg-white/5 hover:text-paper"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <span className="sr-only">{profile.name} — {profile.role}</span>
    </header>
  );
}
