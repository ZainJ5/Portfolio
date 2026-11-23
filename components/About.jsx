"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { about, marquee } from "@/lib/data";
import { Reveal } from "./ui";

export function Marquee() {
  const row = [...marquee, ...marquee];
  return (
    <div className="border-y hairline py-5 overflow-hidden" aria-hidden="true">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row.map((m, i) => (
          <span key={i} className="flex items-center text-[clamp(1.5rem,3vw,2.5rem)] font-medium tracking-tight text-bone-dim">
            <span className={i % 3 === 1 ? "serif-i text-bone text-[1.15em]" : ""}>{m}</span>
            <span className="mx-7 inline-block h-2 w-2 rotate-45 bg-signal" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}

/** Paragraph whose words light up as you scroll through it. */
function ScrollText({ text }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className="text-[clamp(1.6rem,3.3vw,3.25rem)] font-medium leading-[1.12] tracking-[-0.03em] text-pretty">
      {reduce
        ? text
        : words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, Math.min(1, (i + 3) / words.length)]}>
              {w}
            </Word>
          ))}
    </p>
  );
}

export default function About() {
  const photo = useRef(null);
  const { scrollYProgress } = useScroll({ target: photo, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="about" className="wrap py-24 md:py-36">
      <Reveal className="flex items-center gap-4 border-t hairline pt-5">
        <span className="label text-signal">02</span>
        <span className="label text-mute">About</span>
      </Reveal>

      <div className="mt-10 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-8">
          <ScrollText text={about.statement} />

          <div className="mt-12 grid gap-6 text-bone-dim leading-relaxed sm:grid-cols-2 md:mt-16 max-w-3xl">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="md:col-span-4">
          <Reveal>
            <div ref={photo} className="relative aspect-[4/5] overflow-hidden rounded-xl bg-ink-3">
              <motion.div style={{ y }} className="absolute -inset-y-[10%] inset-x-0">
                <Image
                  src="/profile.jpg"
                  alt="Zain Jamshaid standing in a plaza with fountains behind him"
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover object-top saturate-[0.8] contrast-[1.05]"
                />
              </motion.div>
            </div>
          </Reveal>

          <dl className="mt-6">
            {about.facts.map((f, i) => (
              <Reveal key={f.k} delay={i * 0.05} y={12} className="flex items-baseline justify-between gap-6 border-b hairline py-3.5">
                <dt className="label text-mute">{f.k}</dt>
                <dd className="text-right text-[15px]">{f.v}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
