"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile, stats } from "@/lib/data";
import { Arrow, EASE, Magnetic } from "./ui";

const HeroScene = dynamic(() => import("./three/HeroScene"), { ssr: false });

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* 3D: sits right of centre on desktop, behind the type on mobile */}
      <motion.div
        className="absolute inset-0 -z-10 md:left-[36%] md:-top-[6%]"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 0.9, scale: 1 }}
        transition={{ duration: 2.2, delay: 0.3, ease: EASE }}
      >
        <div className="h-full w-full max-md:opacity-45">
          <HeroScene />
        </div>
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-linear-to-t from-ink to-transparent" />

      <motion.div style={{ y: titleY, opacity: fade }} className="wrap flex flex-1 flex-col justify-center pt-24 pb-10">
        <motion.div
          className="mb-4 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-signal animate-blink" />
          </span>
          <span className="label text-bone-dim">
            {profile.role} <span className="text-mute">at</span> {profile.company}
          </span>
        </motion.div>

        <h1 className="display text-[clamp(4rem,15.5vw,15.5rem)] -ml-[0.04em]">
          <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
            <span className="hero-line flex items-start gap-[0.14em]" style={{ animationDelay: "0.15s" }}>
              Zain
              <span className="serif-i mt-[0.5em] whitespace-nowrap text-[0.3em] leading-none text-signal">(engineer)</span>
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
            <span className="hero-line block" style={{ animationDelay: "0.27s" }}>
              Jamshaid
            </span>
          </span>
        </h1>

        <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
          <motion.p
            className="md:col-span-6 lg:col-span-5 text-[clamp(1.125rem,1.6vw,1.5rem)] leading-snug text-bone-dim text-pretty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 1, ease: EASE }}
          >
            I build <span className="text-bone">full-stack products</span>, the{" "}
            <span className="text-bone">pipelines</span> that ship them, and the{" "}
            <span className="serif-i text-bone text-[1.12em]">LLM systems</span> that run inside them.
          </motion.p>

          <motion.div
            className="md:col-span-6 lg:col-span-7 flex flex-wrap items-center gap-3 md:justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1, ease: EASE }}
          >
            <Magnetic>
              <a
                href="#work"
                className="group inline-flex h-13 items-center gap-3 rounded-full bg-signal px-7 text-[15px] font-medium text-ink transition-colors hover:bg-bone"
              >
                See selected work
                <Arrow className="transition-transform duration-300 group-hover:rotate-45" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex h-13 items-center rounded-full border border-line-strong px-7 text-[15px] font-medium transition-colors hover:border-bone"
              >
                Get in touch
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      <motion.dl
        className="wrap grid grid-cols-2 border-t hairline md:grid-cols-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.2 }}
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col gap-2 py-5 md:py-6 pr-4 ${i % 2 ? "pl-4 border-l hairline" : ""} ${
              i > 0 ? "md:pl-6 md:border-l" : ""
            } ${i > 1 ? "border-t md:border-t-0 hairline" : ""}`}
          >
            <dt className="order-2 text-[13px] leading-snug text-mute max-w-[22ch]">{s.label}</dt>
            <dd className="order-1 text-2xl md:text-3xl font-medium tracking-tight tabular-nums">{s.value}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  );
}
