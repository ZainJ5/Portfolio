"use client";

import { community, experience } from "@/lib/data";
import { Chip, Reveal, SectionHead } from "./ui";

export default function Experience() {
  return (
    <section id="experience" className="wrap py-24 md:py-36">
      <SectionHead
        no="03"
        label="Experience"
        title={["Where I have", <><span className="serif-i text-[1.08em] text-signal">worked</span> and led</>]}
      />

      <ol>
        {experience.map((e, i) => (
          <Reveal as="li" key={e.role + e.period} delay={i * 0.06} className="group grid gap-x-6 gap-y-3 border-t hairline py-8 md:grid-cols-12 md:py-10">
            <div className="md:col-span-3">
              <p className="label text-mute tabular-nums">{e.period}</p>
              {e.current && (
                <p className="label mt-3 inline-flex items-center gap-2 rounded-full border border-signal/50 px-2.5 py-1 text-signal">
                  <i className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" /> Current
                </p>
              )}
            </div>
            <div className="md:col-span-5">
              <h3 className="text-2xl md:text-[2rem] font-medium leading-tight tracking-[-0.03em]">{e.role}</h3>
              <p className="mt-1.5 text-lg text-bone-dim">
                <span className="serif-i text-[1.15em] text-bone">{e.org}</span> · {e.place}
              </p>
            </div>
            <div className="md:col-span-4">
              <p className="leading-relaxed text-bone-dim">{e.body}</p>
              {e.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {e.tags.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </ol>

      <div className="mt-16 border-t hairline pt-5 md:mt-24">
        <Reveal className="label text-mute">Leadership & teams</Reveal>
        <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border hairline bg-line sm:grid-cols-2 lg:grid-cols-3">
          {community.map((c, i) => (
            <Reveal as="li" key={c.org + c.role} delay={Math.min(i * 0.05, 0.25)} y={16} className="flex flex-col bg-ink p-6 md:p-7 transition-colors duration-500 hover:bg-ink-2">
              <p className="label text-mute tabular-nums">{c.period}</p>
              <h3 className="mt-6 text-xl font-medium tracking-tight">{c.role}</h3>
              <p className="serif-i text-xl text-signal-soft">{c.org}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-bone-dim">{c.body}</p>
            </Reveal>
          ))}
          <li className="hidden bg-ink p-7 lg:flex lg:items-end" aria-hidden="true">
            <span className="display text-6xl text-ink-3">2024—26</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
