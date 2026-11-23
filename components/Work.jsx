"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { archive, featured } from "@/lib/data";
import { Arrow, Chip, EASE, Reveal, SectionHead } from "./ui";
import { AgentsVisual, BrowserVisual, ChatVisual, PipelineVisual, Tilt } from "./visuals/Visuals";

function Visual({ p }) {
  if (p.visual === "browser") return <BrowserVisual image={p.image} url={p.url} alt={`${p.client} website`} />;
  if (p.visual === "pipeline") return <PipelineVisual />;
  if (p.visual === "agents") return <AgentsVisual />;
  return <ChatVisual />;
}

function Card({ p, i, total, progress }) {
  // Each card shrinks slightly as the ones after it stack on top.
  const target = 1 - (total - 1 - i) * 0.035;
  const scale = useTransform(progress, [i / total, 1], [1, target]);

  return (
    <div
      className="lg:[@media(min-height:760px)]:sticky"
      style={{ top: `max(5.5rem, calc(50vh - 20.5rem + ${i * 14}px))` }}
    >
      <motion.article
        style={{ scale }}
        className="origin-top grid overflow-hidden rounded-2xl border border-line-strong bg-ink-2 lg:h-[41rem] lg:grid-cols-2"
      >
        <div className="flex flex-col p-6 sm:p-9 lg:p-11">
          <div className="flex items-center justify-between">
            <span className="label text-signal">{p.index} / 0{total}</span>
            <span className="label flex items-center gap-2 text-bone-dim">
              <i className={`h-1.5 w-1.5 rounded-full ${p.status.startsWith("Live") ? "bg-signal animate-blink" : "bg-mute"}`} />
              {p.status}
            </span>
          </div>

          <p className="label mt-8 text-mute">{p.client}</p>
          <h3 className="mt-3 text-[clamp(1.75rem,3vw,2.75rem)] font-medium leading-[1.02] tracking-[-0.035em] text-balance">
            {p.title}
          </h3>
          <p className="mt-5 max-w-[52ch] leading-relaxed text-bone-dim">{p.summary}</p>

          <ul className="mt-6 space-y-2.5 text-[15px] text-bone-dim">
            {p.points.map((pt) => (
              <li key={pt} className="flex gap-3">
                <span className="mt-[0.6em] h-px w-4 shrink-0 bg-signal" />
                {pt}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-8">
            <div className="flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
            {p.links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-6">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 text-[15px] font-medium"
                  >
                    <span className="link-draw">{l.label}</span>
                    <Arrow className="text-signal transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="relative border-t hairline bg-ink-3 lg:border-l lg:border-t-0">
          <div className="absolute right-6 top-6 z-10 text-right">
            <p className="text-3xl font-medium tracking-tight">{p.metric.value}</p>
            <p className="label mt-1 text-mute">{p.metric.label}</p>
          </div>
          <Tilt className="h-[22rem] px-6 pb-6 pt-24 sm:h-[26rem] sm:px-10 sm:pb-10 lg:h-full">
            <Visual p={p} />
          </Tilt>
        </div>
      </motion.article>
    </div>
  );
}

function Archive() {
  const [active, setActive] = useState(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.5 });
  const img = active !== null ? archive[active].image : null;

  return (
    <div
      className="relative mt-24 md:mt-36"
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerLeave={() => setActive(null)}
    >
      <Reveal className="mb-6 flex items-end justify-between">
        <h3 className="text-2xl md:text-3xl font-medium tracking-tight">
          More <span className="serif-i text-[1.15em]">projects</span>
        </h3>
        <span className="label text-mute">{String(archive.length).padStart(2, "0")} entries</span>
      </Reveal>

      <ul className="border-t hairline">
        {archive.map((a, i) => (
          <Reveal as="li" key={a.title} delay={Math.min(i * 0.04, 0.2)} y={16}>
            <a
              href={a.href}
              target="_blank"
              rel="noreferrer"
              onPointerEnter={(e) => e.pointerType !== "touch" && setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className={`group grid grid-cols-12 items-baseline gap-x-6 gap-y-2 border-b hairline py-6 transition-opacity duration-300 ${
                active !== null && active !== i ? "opacity-40" : ""
              }`}
            >
              <span className="label col-span-12 text-mute md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <span className="col-span-11 text-xl md:text-2xl font-medium tracking-tight md:col-span-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-2">
                {a.title}
              </span>
              <Arrow className="col-span-1 justify-self-end text-mute md:order-last transition-all duration-300 group-hover:text-signal group-hover:rotate-45" />
              <span className="col-span-12 text-[15px] leading-relaxed text-bone-dim md:col-span-4">{a.description}</span>
              <span className="label col-span-12 text-mute md:col-span-2">
                {a.kind}
                <span className="mt-1.5 block normal-case tracking-normal text-mute/80">{a.stack.join(" · ")}</span>
              </span>
            </a>
          </Reveal>
        ))}
      </ul>

      {/* Cursor-following preview (pointer devices only) */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
        style={{ x: sx, y: sy }}
        aria-hidden="true"
      >
        <AnimatePresence>
          {img && (
            <motion.div
              key={img}
              className="relative h-44 w-72 -translate-y-1/2 translate-x-8 overflow-hidden rounded-lg border border-line-strong bg-ink-3"
              initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <Image src={img} alt="" fill sizes="288px" className="object-cover object-top" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function Work() {
  const list = useRef(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start start", "end end"] });

  return (
    <section id="work" className="wrap py-24 md:py-36">
      <SectionHead
        no="01"
        label="Selected work"
        title={["Built, shipped,", <>and <span className="serif-i text-[1.08em] text-signal">actually used</span></>]}
        aside="Four projects that show how I work: a product in production, a research build, a deployment pipeline and an AI feature."
      />

      <div ref={list} className="flex flex-col gap-8 lg:gap-[12vh]">
        {featured.map((p, i) => (
          <Card key={p.id} p={p} i={i} total={featured.length} progress={scrollYProgress} />
        ))}
      </div>

      <Archive />
    </section>
  );
}
