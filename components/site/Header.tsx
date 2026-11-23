"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

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
        <Link href="/" className="-ml-1 block p-1 text-paper" aria-label="Quenori — home">
          <Wordmark variant="simplified" className="h-7 w-auto" title="Quenori" />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm text-mist">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#products"
                className="inline-flex items-center gap-2 border border-paper/25 px-4 py-2 text-paper transition-colors hover:border-lichen hover:text-lichen"
              >
                Explore products
                <span aria-hidden>↘</span>
              </Link>
            </li>
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
        className="border-t border-line bg-ink px-5 pb-8 pt-4 md:hidden"
      >
        <ul className="flex flex-col">
          {site.nav.map((item, i) => (
            <li key={item.href} className="border-b border-line">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between py-4 font-display text-3xl"
              >
                {item.label}
                <span className="eyebrow text-stone">0{i + 1}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
