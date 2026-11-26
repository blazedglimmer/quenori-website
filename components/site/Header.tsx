"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { site } from "@/lib/site";

/**
 * On the home page the hero already shows the wordmark, so the header mark
 * stays hidden until the hero mark has scrolled out of view. Only one
 * wordmark is ever on screen.
 */
function useHeroMarkVisible() {
  const isHome = usePathname() === "/";
  // Updated only by the observer; it reports the current state as soon as it starts.
  const [intersecting, setIntersecting] = useState(true);

  useEffect(() => {
    const el = isHome ? document.getElementById("hero-wordmark") : null;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), {
      rootMargin: "-64px 0px 0px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [isHome]);

  return isHome && intersecting;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const heroMarkVisible = useHeroMarkVisible();
  const showMark = open || !heroMarkVisible;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-ink">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className={`-ml-1 block p-1 text-paper transition-opacity duration-500 motion-reduce:transition-none ${
            showMark ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-label="Quenori — home"
          aria-hidden={!showMark}
          tabIndex={showMark ? undefined : -1}
        >
          <Wordmark variant="simplified" className="h-7 w-auto" title="Quenori" />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-9 text-sm text-mist">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="eyebrow -mr-2 p-2 text-paper md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <nav
        id={menuId}
        aria-label="Primary"
        hidden={!open}
        className="border-t border-line bg-ink px-5 pt-4 pb-8 md:hidden"
      >
        <ul className="flex flex-col">
          {site.nav.map((item) => (
            <li key={item.href} className="border-b border-line">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-4 font-display text-3xl"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
