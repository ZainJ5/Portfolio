"use client";

import { useState } from "react";
import { profile } from "@/lib/data";
import { Arrow, Magnetic, MaskLines, Reveal } from "./ui";

function Field({ label, name, type = "text", textarea, value, onChange }) {
  const cls =
    "peer w-full border-b border-line-strong bg-transparent pb-3 pt-7 text-lg text-bone outline-none transition-colors placeholder:text-transparent focus:border-signal";
  return (
    <label className="relative block">
      {textarea ? (
        <textarea name={name} required rows={3} value={value} onChange={onChange} placeholder={label} className={`${cls} resize-none`} />
      ) : (
        <input name={name} type={type} required value={value} onChange={onChange} placeholder={label} autoComplete={name} className={cls} />
      )}
      <span className="label pointer-events-none absolute left-0 top-1 text-mute transition-colors peer-focus:text-signal">{label}</span>
    </label>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [copied, setCopied] = useState(false);

  const set = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: `${form.name} <${form.email}>`,
          subject: "Portfolio enquiry",
          text: form.message,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <section id="contact" className="wrap pt-24 pb-16 md:pt-36">
      <Reveal className="flex items-center gap-4 border-t hairline pt-5">
        <span className="label text-signal">06</span>
        <span className="label text-mute">Contact</span>
      </Reveal>

      <h2 className="display mt-10 text-[clamp(3rem,11.5vw,11.5rem)]">
        <MaskLines lines={["Let's build", <>something <span className="serif-i text-signal">good</span>.</>]} />
      </h2>

      <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <Reveal>
            <p className="max-w-sm text-lg leading-relaxed text-bone-dim">
              Have a role, a project or a question about something I built? Email is the fastest way to reach me.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic strength={0.2}>
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex h-13 items-center gap-3 rounded-full bg-bone px-6 text-[15px] font-medium text-ink transition-colors hover:bg-signal"
                >
                  {profile.email}
                  <Arrow className="transition-transform duration-300 group-hover:rotate-45" />
                </a>
              </Magnetic>
              <button
                type="button"
                onClick={copy}
                className="label h-13 rounded-full border border-line-strong px-5 text-bone transition-colors hover:border-bone"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </Reveal>

          <ul className="mt-12 border-t hairline">
            {profile.socials.map((s, i) => (
              <Reveal as="li" key={s.label} delay={i * 0.05} y={12}>
                <a href={s.href} target="_blank" rel="noreferrer" className="group flex items-baseline justify-between border-b hairline py-4">
                  <span className="text-lg font-medium tracking-tight">{s.label}</span>
                  <span className="flex items-center gap-3 text-[15px] text-mute transition-colors group-hover:text-bone">
                    {s.handle} <Arrow className="transition-transform duration-300 group-hover:rotate-45 group-hover:text-signal" />
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
          <form onSubmit={submit} className="space-y-7 rounded-2xl border hairline bg-ink-2 p-6 sm:p-9">
            <p className="label text-mute">Or send a message</p>
            <Field label="Your name" name="name" value={form.name} onChange={set} />
            <Field label="Email" name="email" type="email" value={form.email} onChange={set} />
            <Field label="Message" name="message" textarea value={form.message} onChange={set} />
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex h-13 items-center gap-3 rounded-full bg-signal px-7 text-[15px] font-medium text-ink transition-colors hover:bg-bone disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send message"}
                <Arrow className="transition-transform duration-300 group-hover:rotate-45" />
              </button>
              <p className="text-[15px]" role="status" aria-live="polite">
                {status === "sent" && <span className="text-bone">Message sent. I will reply soon.</span>}
                {status === "error" && (
                  <span className="text-signal-soft">
                    Could not send. Please email me directly instead.
                  </span>
                )}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="overflow-hidden border-t hairline">
      <div className="wrap flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="label text-mute">© {new Date().getFullYear()} {profile.name}</p>
        <p className="label text-mute">Next.js · React Three Fiber · Motion · Lenis</p>
        <a href="#" className="label text-bone inline-flex items-center gap-2 link-draw w-fit">
          Back to top ↑
        </a>
      </div>
      <p
        className="display select-none whitespace-nowrap text-center text-[14.2vw] leading-[0.8] text-ink-3 translate-y-[16%]"
        aria-hidden="true"
      >
        Zain Jamshaid
      </p>
    </footer>
  );
}
