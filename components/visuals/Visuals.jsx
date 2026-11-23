"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/** Wraps artwork in a pointer-driven 3D tilt. */
export function Tilt({ children, className = "", max = 7 }) {
  const ref = useRef(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 140, damping: 18 });
  const sy = useSpring(py, { stiffness: 140, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective: 1200 }}
      onPointerMove={(e) => {
        if (e.pointerType === "touch") return;
        const r = ref.current.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      <motion.div style={{ rotateX, rotateY }} className="preserve-3d h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

function Frame({ title, children, className = "" }) {
  return (
    <div className={`flex h-full w-full flex-col overflow-hidden rounded-xl border border-line-strong bg-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] ${className}`}>
      <div className="flex h-9 shrink-0 items-center gap-3 border-b hairline px-4">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="h-2 w-2 rounded-full bg-line-strong" />
          <i className="h-2 w-2 rounded-full bg-line-strong" />
          <i className="h-2 w-2 rounded-full bg-line-strong" />
        </span>
        <span className="label text-mute normal-case tracking-normal truncate">{title}</span>
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  );
}

export function BrowserVisual({ image, url, alt }) {
  return (
    <Frame title={url}>
      <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-top" />
    </Frame>
  );
}

/* ——— CI/CD pipeline diagram ——— */
const STAGES = ["build", "test", "lint", "push → ECR"];
const ENVS = ["dev", "testing", "staging"];

export function PipelineVisual() {
  return (
    <Frame title=".github/workflows/pipeline.yml">
      <div className="flex h-full flex-col justify-center gap-6 p-5 sm:p-8 font-mono text-[12px] sm:text-[13px]">
        <div className="flex items-center gap-3 text-bone-dim">
          <span className="text-signal">$</span> git push origin main
          <span className="ml-1 inline-block h-4 w-[7px] bg-bone animate-blink" aria-hidden="true" />
        </div>

        <ol className="grid grid-cols-4 gap-2">
          {STAGES.map((s, i) => (
            <motion.li
              key={s}
              className="relative rounded-md border hairline px-2.5 py-3"
              initial={{ opacity: 0.25 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ delay: 0.3 + i * 0.35, duration: 0.4 }}
            >
              <span className="block text-mute text-[10px]">0{i + 1}</span>
              <span className="mt-1 block text-bone whitespace-nowrap">{s}</span>
              <motion.span
                className="absolute right-2 top-2 text-signal"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-20% 0px" }}
                transition={{ delay: 0.55 + i * 0.35, type: "spring", stiffness: 400, damping: 15 }}
              >
                ✓
              </motion.span>
            </motion.li>
          ))}
        </ol>

        <svg viewBox="0 0 300 44" className="h-11 w-full text-line-strong" preserveAspectRatio="none" aria-hidden="true">
          {[50, 150, 250].map((x) => (
            <path
              key={x}
              d={`M150 0 C150 26 ${x} 16 ${x} 44`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 4"
              vectorEffect="non-scaling-stroke"
              className="animate-dash"
            />
          ))}
        </svg>

        <ul className="grid grid-cols-3 gap-2">
          {ENVS.map((e, i) => (
            <motion.li
              key={e}
              className="rounded-md border hairline bg-ink-2 px-3 py-3"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ delay: 1.9 + i * 0.15, duration: 0.5 }}
            >
              <span className="flex items-center gap-2 text-bone">
                <i className="h-1.5 w-1.5 rounded-full bg-signal" /> {e}
              </span>
              <span className="mt-1 block text-[10px] text-mute">EC2 · compose up</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </Frame>
  );
}

/* ——— Multi-agent graph ——— */
export function AgentsVisual() {
  const agents = [
    { x: 150, y: 46 },
    { x: 150, y: 110 },
    { x: 150, y: 174 },
  ];
  return (
    <Frame title="assessment run · replayable">
      <svg viewBox="0 0 300 220" className="h-full w-full font-mono" role="img" aria-label="Diagram: public GitHub activity flows through several LLM agents into frozen evidence and an assessment">
        <g fill="none" stroke="rgb(236 230 218 / 0.28)" strokeWidth="1" strokeDasharray="3 4" className="animate-dash">
          {agents.map((a) => (
            <path key={`i${a.y}`} d={`M62 110 C100 110 100 ${a.y} 132 ${a.y}`} />
          ))}
          {agents.map((a) => (
            <path key={`o${a.y}`} d={`M168 ${a.y} C200 ${a.y} 200 110 232 110`} />
          ))}
        </g>

        <g>
          <rect x="8" y="92" width="54" height="36" rx="5" fill="#131110" stroke="rgb(236 230 218 / 0.24)" />
          <text x="35" y="107" textAnchor="middle" fontSize="7" fill="#8f887d">public</text>
          <text x="35" y="118" textAnchor="middle" fontSize="8" fill="#ece6da">GitHub</text>
        </g>

        {agents.map((a, i) => (
          <g key={a.y}>
            <motion.circle
              cx={a.x}
              cy={a.y}
              r="18"
              fill="#0c0b0a"
              stroke="#ff5a1f"
              strokeWidth="1"
              animate={{ r: [18, 20, 18] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
            />
            <text x={a.x} y={a.y - 1} textAnchor="middle" fontSize="6.5" fill="#8f887d">agent</text>
            <text x={a.x} y={a.y + 8} textAnchor="middle" fontSize="8" fill="#ece6da">0{i + 1}</text>
          </g>
        ))}

        <g>
          <rect x="232" y="84" width="60" height="52" rx="5" fill="#ff5a1f" />
          <text x="262" y="104" textAnchor="middle" fontSize="7" fill="#0c0b0a">frozen</text>
          <text x="262" y="115" textAnchor="middle" fontSize="8" fontWeight="600" fill="#0c0b0a">evidence</text>
          <text x="262" y="127" textAnchor="middle" fontSize="6.5" fill="#0c0b0a">→ assessment</text>
        </g>
      </svg>
    </Frame>
  );
}

/* ——— Chat with inline assistant ——— */
function Bubble({ who, children, ai, right, delay }) {
  return (
    <motion.div
      className={`flex flex-col gap-1 ${right ? "items-end" : "items-start"}`}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className={`label ${ai ? "text-signal" : "text-mute"}`}>{who}</span>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] sm:text-sm leading-snug ${
          ai
            ? "border border-signal/60 bg-signal/10 text-bone rounded-tl-sm"
            : right
            ? "bg-bone text-ink rounded-tr-sm"
            : "bg-ink-3 text-bone rounded-tl-sm"
        }`}
      >
        {children}
      </div>
    </motion.div>
  );
}

export function ChatVisual() {
  return (
    <Frame title="# project-team">
      <div className="flex h-full flex-col justify-center gap-4 p-5 sm:p-8">
        <Bubble who="Sara" delay={0.2}>
          Uploaded the spec. Can someone check section 3?
          <span className="mt-2 flex w-fit items-center gap-2 rounded-md border hairline px-2 py-1 font-mono text-[11px] text-bone-dim">
            ▤ spec-v2.pdf
          </span>
        </Bubble>
        <Bubble who="You" right delay={0.7}>
          <span className="font-semibold underline decoration-2 underline-offset-2">@AI</span> what does section 3 change?
        </Bubble>
        <Bubble who="AI · in thread" ai delay={1.3}>
          Section 3 moves auth to the gateway and drops the session table. Two endpoints need updating.
        </Bubble>
        <motion.div
          className="label mx-auto mt-1 rounded-full border hairline px-3 py-1.5 text-mute"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.9 }}
        >
          14 unread · summarise
        </motion.div>
      </div>
    </Frame>
  );
}
