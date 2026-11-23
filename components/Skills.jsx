"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { skillBalls, skillGroups } from "@/lib/data";
import { Reveal, SectionHead } from "./ui";

const SkillsScene = dynamic(() => import("./three/SkillsScene"), { ssr: false });

export default function Skills() {
  const [active, setActive] = useState(null);

  return (
    <section id="skills" className="py-24 md:py-36">
      <div className="wrap">
        <SectionHead
          no="04"
          label="Skills"
          title={["The stack,", <>in <span className="serif-i text-[1.08em] text-signal">three dimensions</span></>]}
          aside="Move your cursor through them. The full list underneath matches my résumé line for line."
        />
      </div>

      <div className="wrap">
        <Reveal>
          <div className="relative rounded-2xl border hairline bg-ink-2">
            <div className="flex items-center justify-between border-b hairline px-5 py-3">
              <span className="label text-mute">Interactive / WebGL</span>
              <span className="label text-bone tabular-nums" aria-live="polite">
                {active !== null ? (
                  <>
                    <span className="text-signal">{String(active + 1).padStart(2, "0")}</span> {skillBalls[active].name}
                  </>
                ) : (
                  <span className="text-mute">Hover a sphere</span>
                )}
              </span>
            </div>
            <div className="aspect-square sm:aspect-[4/3.4] md:aspect-[8/2.7] p-2 md:p-6">
              <SkillsScene items={skillBalls} active={active} onHover={setActive} />
            </div>
            <ul className="flex flex-wrap gap-x-1 gap-y-1 border-t hairline px-3 py-3">
              {skillBalls.map((s, i) => (
                <li key={s.name}>
                  <button
                    type="button"
                    onPointerEnter={() => setActive(i)}
                    onPointerLeave={() => setActive(null)}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                    className={`label rounded-full px-3 py-2 transition-colors ${
                      active === i ? "bg-signal text-ink" : "text-bone-dim hover:text-bone"
                    }`}
                  >
                    {s.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <dl className="mt-16 md:mt-24">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.04} y={16} className="grid grid-cols-1 gap-3 border-t hairline py-6 md:grid-cols-12 md:gap-6">
              <dt className="label pt-1.5 text-mute md:col-span-3">
                <span className="mr-3 text-signal">{String(i + 1).padStart(2, "0")}</span>
                {g.title}
              </dt>
              <dd className="flex min-w-0 flex-wrap gap-y-1 md:col-span-9 text-[clamp(1.25rem,2.2vw,1.875rem)] font-medium leading-snug tracking-tight">
                {g.items.map((it, j) => (
                  <span key={it} className="flex">
                    {it}
                    {j < g.items.length - 1 && <span className="mx-2.5 text-mute/60">/</span>}
                  </span>
                ))}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
