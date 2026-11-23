"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1];

/** Fade + rise when scrolled into view. */
export function Reveal({ children, delay = 0, y = 28, className = "", as = "div" }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/** Each line slides up from behind a mask. Pass an array of strings/nodes. */
export function MaskLines({ lines, className = "", lineClassName = "", delay = 0, stagger = 0.09, inView = true }) {
  const reduce = useReducedMotion();
  const line = {
    hidden: { y: reduce ? "0%" : "110%" },
    show: (i) => ({ y: "0%", transition: { duration: 1.1, delay: delay + i * stagger, ease: EASE } }),
  };
  // The wrapper drives the animation: a fully clipped line can never report itself as in view.
  const trigger = inView
    ? { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } }
    : { animate: "show" };
  return (
    <motion.span className={`block ${className}`} initial="hidden" {...trigger}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span className={`block will-change-transform ${lineClassName}`} variants={line} custom={i}>
            {l}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Element is pulled toward the cursor while hovered. */
export function Magnetic({ children, strength = 0.3, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e) => {
    if (e.pointerType === "touch") return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.span>
  );
}

/** Numbered section header: "02 / Work ————". */
export function SectionHead({ no, label, title, aside }) {
  return (
    <header className="mb-14 md:mb-20">
      <Reveal className="flex items-center gap-4 border-t hairline pt-5">
        <span className="label text-signal">{no}</span>
        <span className="label text-mute">{label}</span>
      </Reveal>
      <div className="mt-8 grid gap-6 md:grid-cols-12 md:items-end">
        <h2 className="display text-[clamp(2.5rem,7vw,6rem)] md:col-span-8">
          <MaskLines lines={title} />
        </h2>
        {aside && (
          <Reveal delay={0.15} className="md:col-span-4 text-bone-dim leading-relaxed max-w-sm md:justify-self-end">
            {aside}
          </Reveal>
        )}
      </div>
    </header>
  );
}

export function Arrow({ className = "" }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={`h-[0.8em] w-[0.8em] ${className}`} fill="none">
      <path d="M3 13 13 3M5 3h8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

export function Chip({ children }) {
  return (
    <span className="label rounded-full border hairline px-3 py-1.5 text-bone-dim">{children}</span>
  );
}
