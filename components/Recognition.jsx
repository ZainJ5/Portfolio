"use client";

import { awards, certifications, education } from "@/lib/data";
import { Arrow, Reveal, SectionHead } from "./ui";

function Row({ left, title, sub, href, linkLabel }) {
  const inner = (
    <>
      <span className="label col-span-12 text-mute tabular-nums sm:col-span-3">{left}</span>
      <span className="col-span-12 sm:col-span-9">
        <span className="flex items-baseline justify-between gap-4">
          <span className="text-xl font-medium tracking-tight">{title}</span>
          {href && <Arrow className="shrink-0 text-mute transition-all duration-300 group-hover:rotate-45 group-hover:text-signal" />}
        </span>
        <span className="mt-1 block text-[15px] text-bone-dim">{sub}</span>
        {href && <span className="sr-only">{linkLabel}</span>}
      </span>
    </>
  );
  const cls = "group grid grid-cols-12 gap-x-6 gap-y-2 border-b hairline py-5";
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

export default function Recognition() {
  return (
    <section id="recognition" className="wrap py-24 md:py-36">
      <SectionHead
        no="05"
        label="Recognition"
        title={["Hackathons,", <>credentials, <span className="serif-i text-[1.08em] text-signal">education</span></>]}
      />

      <div className="grid gap-5 md:grid-cols-2">
        {awards.map((a, i) => (
          <Reveal key={a.event} delay={i * 0.1}>
            <a
              href={a.href}
              target="_blank"
              rel="noreferrer"
              className="group relative flex h-full min-h-[22rem] flex-col justify-between overflow-hidden rounded-2xl border hairline bg-ink-2 p-7 md:p-9 transition-colors duration-500 hover:border-line-strong"
            >
              <div className="flex items-start justify-between">
                <span className="label text-mute">{a.date}</span>
                <span className="label inline-flex items-center gap-2 text-bone-dim group-hover:text-signal transition-colors">
                  {a.linkLabel} <Arrow />
                </span>
              </div>
              <span
                className="serif-i pointer-events-none absolute -right-2 top-10 text-[11rem] leading-none text-bone/[0.07] transition-colors duration-700 group-hover:text-signal/30 md:text-[14rem]"
                aria-hidden="true"
              >
                {i === 0 ? "3" : "2"}
              </span>
              <div className="relative">
                <p className="label text-signal">{a.place}</p>
                <h3 className="mt-3 text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-[1.02] tracking-[-0.035em]">{a.event}</h3>
                <p className="mt-4 max-w-[46ch] leading-relaxed text-bone-dim">
                  <span className="text-bone">{a.project}.</span> {a.body}
                </p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-2 md:gap-10">
        <div>
          <Reveal className="label border-t hairline pt-5 pb-3 text-mute">Education</Reveal>
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 0.05} y={14}>
              <Row left={e.period} title={e.degree} sub={`${e.school} · ${e.place}`} />
            </Reveal>
          ))}
        </div>
        <div>
          <Reveal className="label border-t hairline pt-5 pb-3 text-mute">Certifications</Reveal>
          {certifications.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05} y={14}>
              <Row left={c.date} title={c.title} sub={c.issuer} href={c.href} linkLabel="Verify certificate" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
