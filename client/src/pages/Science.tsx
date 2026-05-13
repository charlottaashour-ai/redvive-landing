/*
 * REDVIVE — The Science Page
 * Design: No images. Pure typography + solid color blocks that flow seamlessly.
 * Palette flow: #0A0303 hero → #FFF9F9 intro → #1A1008 mechanism → #F5EDEB benefits → #FFF9F9 result → #F5EDEB CTA
 * Tone: Direct, evidence-based, calm — not clinical, not corporate
 *
 * Structure (revised):
 *   Hero → Intro → Mechanism (expanded, replaces wavelength section) → What It Does For You (editorial rows) → The Result → CTA
 */

import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};
const heroItem = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, type: "tween" as const } },
};

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/hero-abstract-16x9_73a0681a.png";


function useReveal() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
        { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
      );
      document.querySelectorAll(".reveal").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 40) {
          el.classList.add("visible");
        } else {
          observer.observe(el);
        }
      });
      return () => observer.disconnect();
    }, 80);
    return () => clearTimeout(timer);
  }, []);
}

const BENEFITS = [
  {
    category: "Skin",
    headline: "Clearer. Calmer. More resilient.",
    items: [
      "Stimulates collagen production",
      "Reduces surface inflammation",
      "Supports skin tone and texture",
      "A clearer, more supported glow",
    ],
  },
  {
    category: "Recovery",
    headline: "Less heaviness. More ease.",
    items: [
      "Faster muscle repair",
      "Reduced joint discomfort",
      "Improved range of motion",
      "Supports connective tissue recovery",
    ],
  },
  {
    category: "Energy & Sleep",
    headline: "A better baseline through the week.",
    items: [
      "Improved sleep quality",
      "Reduced systemic inflammation",
      "Supports cellular energy output",
      "A moment that helps your body switch gears",
    ],
  },
];

export default function Science() {
  useReveal();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFF9F9" }}>
      {/* ── PAGE LOAD FADE: dark → transparent ── */}
      <motion.div
        className="fixed inset-0 z-[9999] pointer-events-none"
        style={{ backgroundColor: "#0A0303" }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.68, ease: "easeOut", delay: 0.1 }}
      />
      <Navbar />

      {/* ── PAGE HERO — dark video ── */}
      <section
        className="relative min-h-[70vh] flex flex-col justify-end overflow-hidden"
        style={{ backgroundColor: "#0A0303" }}
      >
        <img
          src={HERO_IMG}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.85, willChange: "transform", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(10,3,3,0.62) 0%, rgba(10,3,3,0.28) 40%, rgba(10,3,3,0.88) 100%)",
          }}
        />
        <motion.div
          className="relative z-10 container pb-20 pt-32"
          variants={heroContainer}
          initial="hidden"
          animate="show"
        >
          <div className="max-w-2xl">
            <motion.span
              variants={heroItem}
              className="text-[0.65rem] font-semibold tracking-[0.22em] uppercase mb-6 block"
              style={{ color: "rgba(213,62,15,0.85)", fontFamily: "'DM Sans', sans-serif" }}
            >
              The Science
            </motion.span>
            <motion.div variants={heroItem}>
              <h1
                className="text-5xl md:text-7xl font-bold text-white leading-[0.95]"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}
              >
                light is
              </h1>
            </motion.div>
            <motion.div variants={heroItem}>
              <h1
                className="text-5xl md:text-7xl font-bold text-white leading-[0.95]"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}
              >
                <em style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontStyle: "normal" }}>
                  the medicine.
                </em>
              </h1>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Feathered: dark → rose-white */}
      <div style={{ height: "220px", background: "linear-gradient(to bottom, #0A0303 0%, #3D1A14 20%, #8B5E56 50%, #D4B8B4 75%, #FFF9F9 100%)" }} />

      {/* ── INTRO — rose-white ── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#FFF9F9" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto reveal">
            <p
              className="text-2xl md:text-3xl leading-relaxed font-light"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#1A1008", letterSpacing: "-0.01em" }}
            >
              Redvive uses clinically calibrated 660nm and 850nm light — the wavelengths most commonly associated with skin support and deeper tissue recovery. The science is serious. The experience is simple.
            </p>
          </div>
        </div>
      </section>

      {/* Feathered: rose-white → near-black */}
      <div style={{ height: "220px", background: "linear-gradient(to bottom, #FFF9F9 0%, #D4B8B4 20%, #8B5E56 50%, #3D1A14 80%, #1A1008 100%)" }} />

      {/* ── THE MECHANISM — near-black (expanded) ── */}
      <section className="py-24 md:py-36" style={{ backgroundColor: "#1A1008" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">

            {/* Label + headline */}
            <div className="reveal mb-14">
              <span className="section-label block mb-6" style={{ color: "#D53E0F" }}>The Mechanism</span>
              <h2
                className="text-3xl md:text-5xl font-bold leading-[1.1] mb-6 text-white"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em" }}
              >
                Your mitochondria<br />
                <em style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontStyle: "normal", color: "#D53E0F" }}>
                  do the work.
                </em>
              </h2>
              <span className="brand-rule mb-8" style={{ backgroundColor: "#D53E0F" }} />
            </div>

            {/* Two-column explanation */}
            <div className="reveal grid md:grid-cols-2 gap-12 mb-16">
              <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Photobiomodulation is the mechanism behind red light therapy. When specific wavelengths of light reach your cells, they trigger a reaction in the mitochondria — increasing energy output, reducing oxidative stress, and activating natural repair pathways.
              </p>
              <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                This is not heat therapy. It is not UV. It is a precise, non-invasive signal that tells your cells to do what they were designed to do — just more efficiently. Backed by thousands of peer-reviewed studies.
              </p>
            </div>

            {/* Wavelength callouts — inline, not a separate section */}
            <div
              className="reveal grid md:grid-cols-2 gap-px"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "3rem" }}
            >
              <div className="pr-0 md:pr-12 pb-10 md:pb-0">
                <p
                  className="text-3xl font-bold mb-2"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#D53E0F", letterSpacing: "-0.03em" }}
                >
                  660nm
                </p>
                <p
                  className="text-[0.6rem] font-semibold tracking-[0.18em] uppercase mb-4"
                  style={{ color: "rgba(255,249,249,0.3)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  Red Light — Surface
                </p>
                <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Targets the skin directly. Stimulates collagen, calms inflammation, and supports a clearer, more even tone — where most people notice results first.
                </p>
              </div>
              <div
                className="pt-10 md:pt-0 md:pl-12"
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
              >
                <p
                  className="text-3xl font-bold mb-2"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#D53E0F", letterSpacing: "-0.03em" }}
                >
                  850nm
                </p>
                <p
                  className="text-[0.6rem] font-semibold tracking-[0.18em] uppercase mb-4"
                  style={{ color: "rgba(255,249,249,0.3)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  Near-Infrared — Depth
                </p>
                <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Reaches deeper tissue — muscles, joints, connective tissue. Activates mitochondria, accelerates recovery, and supports better sleep and a calmer baseline.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Feathered: near-black → blush */}
      <div style={{ height: "220px", background: "linear-gradient(to bottom, #1A1008 0%, #3D1A14 20%, #8B5E56 50%, #C9A89E 75%, #F5EDEB 100%)" }} />

      {/* ── WHAT IT DOES FOR YOU — blush, editorial rows ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#F5EDEB" }}>
        <div className="container">
          <div className="max-w-4xl mx-auto">

            {/* Section header */}
            <div className="reveal mb-16">
              <span className="section-label block mb-4">What It Does For You</span>
              <h2
                className="text-3xl md:text-5xl font-bold text-[#1A1008] leading-[1.05]"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em" }}
              >
                Ten minutes.<br />
                <em style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontStyle: "normal", color: "#D53E0F" }}>
                  Three systems.
                </em>
              </h2>
            </div>

            {/* Editorial benefit rows */}
            <div className="flex flex-col">
              {BENEFITS.map((group, i) => (
                <div
                  key={i}
                  className="reveal"
                  style={{
                    borderTop: "1px solid rgba(26,16,8,0.12)",
                    paddingTop: "3rem",
                    paddingBottom: "3rem",
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-16 items-start">

                    {/* Left: category + headline */}
                    <div>
                      <p
                        className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase mb-3"
                        style={{ color: "#D53E0F", fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {group.category}
                      </p>
                      <p
                        className="text-lg font-bold leading-snug text-[#1A1008]"
                        style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.02em" }}
                      >
                        {group.headline}
                      </p>
                    </div>

                    {/* Right: benefit list as flowing prose-style items */}
                    <div className="grid sm:grid-cols-2 gap-x-10 gap-y-3">
                      {group.items.map((item, j) => (
                        <div key={j} className="flex items-start gap-3">
                          <span
                            className="flex-shrink-0 mt-1"
                            style={{
                              width: "4px",
                              height: "4px",
                              borderRadius: "50%",
                              backgroundColor: "#D53E0F",
                              marginTop: "7px",
                            }}
                          />
                          <span
                            className="text-sm leading-relaxed"
                            style={{ color: "#7A5A54", fontFamily: "'DM Sans', sans-serif" }}
                          >
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              ))}
              {/* Closing rule */}
              <div style={{ borderTop: "1px solid rgba(26,16,8,0.12)" }} />
            </div>

          </div>
        </div>
      </section>

      {/* Feathered: blush → rose-white */}
      <div style={{ height: "160px", background: "linear-gradient(to bottom, #F5EDEB 0%, #EDE3DF 30%, #E8DCDA 60%, #FFF9F9 100%)" }} />

      {/* ── THE RESULT — rose-white, flows into CTA ── */}
      <section className="py-24 md:py-32" style={{ background: "linear-gradient(to bottom, #FFF9F9 0%, #FFF9F9 60%, #F5EDEB 100%)" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto reveal">
            <span className="section-label block mb-6">The Result</span>
            <h2
              className="text-3xl md:text-5xl font-bold leading-[1.1] mb-6 text-[#1A1008]"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em" }}
            >
              Visible from<br />
              <em style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontStyle: "normal" }}>
                session one.
              </em>
            </h2>
            <span className="brand-rule mb-8" />
            <div className="grid md:grid-cols-2 gap-12">
              <p className="text-[#7A5A54] text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Most people notice a difference in skin tone and how their body feels after the first few sessions. Within 2–4 weeks of consistent use, the deeper effects — better sleep, faster recovery, a calmer baseline — become part of how your week feels.
              </p>
              <p className="text-[#7A5A54] text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Backed by thousands of peer-reviewed studies. Simple to use. Precise where it matters. The science is serious — the experience is just 10 minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 md:py-32" style={{ background: "linear-gradient(to bottom, #F5EDEB 0%, #EDE3DF 35%, #E4D8D4 65%, #DDD0CC 100%)" }}>
        <div className="container">
          <div className="reveal max-w-xl mx-auto text-center">
            <h2
              className="text-3xl md:text-5xl font-bold leading-[1.1] mb-8 text-[#1A1008]"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em" }}
            >
              Ready to feel it<br />
              <em style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontStyle: "normal" }}>
                for yourself?
              </em>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#waitlist">
                <button className="btn-primary">Join the Waitlist</button>
              </a>
              <Link href="/experience">
                <button className="btn-ghost">See the Experience →</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
