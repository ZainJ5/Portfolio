import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About, { Marquee } from "@/components/About";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Recognition from "@/components/Recognition";
import Contact, { Footer } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-bone focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to work
      </a>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <About />
        <Experience />
        <Skills />
        <Recognition />
        <Contact />
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
