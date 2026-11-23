"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { nav, profile } from "@/lib/data";
import { EASE } from "./ui";

function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: profile.timezone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="label text-mute tabular-nums" suppressHydrationWarning>
      Lahore {time || "--:--"} PKT
    </span>
  );
}

export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > 240 && y > prev);
    setSolid(y > 40);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          solid && !open ? "bg-ink/75 backdrop-blur-md border-b hairline" : "border-b border-transparent"
        }`}
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="wrap flex h-16 items-center justify-between">
          <a href="#" className="group flex items-center gap-3" aria-label="Zain Jamshaid, back to top">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-bone text-ink font-mono text-[10px] font-semibold tracking-tight transition-colors group-hover:bg-signal">
              ZJ
            </span>
            <span className="text-sm font-medium tracking-tight">{profile.name}</span>
          </a>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="link-draw text-sm text-bone-dim hover:text-bone transition-colors">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <span className="hidden xl:block">
              <Clock />
            </span>
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="hidden lg:inline-flex label rounded-full border border-line-strong px-4 py-2 text-bone transition-colors hover:bg-bone hover:text-ink"
            >
              Résumé
            </a>
            <button
              type="button"
              className="lg:hidden label flex h-11 items-center gap-2 text-bone"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-2.5 w-5">
                <span className={`absolute left-0 top-0 h-px w-5 bg-bone transition-transform duration-300 ${open ? "translate-y-[5px] rotate-45" : ""}`} />
                <span className={`absolute left-0 bottom-0 h-px w-5 bg-bone transition-transform duration-300 ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
              </span>
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-ink lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="wrap flex h-full flex-col justify-between pt-28 pb-10">
              <nav className="flex flex-col" aria-label="Mobile">
                {nav.map((n, i) => (
                  <a
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between border-b hairline py-4"
                  >
                    <motion.span
                      className="display text-5xl"
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.15 + i * 0.06, duration: 0.7, ease: EASE }}
                    >
                      {n.label}
                    </motion.span>
                    <span className="label text-mute">0{i + 1}</span>
                  </a>
                ))}
              </nav>
              <div className="flex items-end justify-between">
                <div className="flex flex-col gap-2">
                  {profile.socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-bone-dim">
                      {s.label}
                    </a>
                  ))}
                </div>
                <a href={profile.resume} target="_blank" rel="noreferrer" className="label rounded-full bg-bone px-5 py-3 text-ink">
                  Résumé
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
