/*
 * REDVIVE — The Experience Page
 * Design: Abstract blur hero, step-by-step session flow
 * Palette flow: #0A0303 hero → #FFF9F9 intro → #F5EDEB steps → #1A1008 technology → #F5EDEB who it's for → #FFF9F9 CTA
 * Tone: Direct, calm — educates on red light therapy while describing the experience
 * Every section earns its place: mechanism + sensory feeling, not just logistics
 * No hyphens in copy.
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
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Experience() {
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

      {/* ── PAGE HERO ── */}
      <section
        className="relative min-h-screen flex flex-col justify-end overflow-hidden"
        style={{ backgroundColor: "#0A0303" }}
      >
        <img
          src={HERO_IMG}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.85 }}
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
              The Experience
            </motion.span>
            <motion.div variants={heroItem}>
              <h1
                className="text-5xl md:text-7xl font-bold text-white leading-[0.95]"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}
              >
                Ten minutes. Private.
              </h1>
            </motion.div>
            <motion.div variants={heroItem}>
              <h1
                className="text-5xl md:text-7xl leading-[0.95] mt-2"
                style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontStyle: "italic", letterSpacing: "-0.01em", color: "rgba(255,255,255,0.75)" }}
              >
                No noise.
              </h1>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Feathered: dark → rose-white */}
      <div style={{ height: "220px", background: "linear-gradient(to bottom, #0A0303 0%, #3D1A14 20%, #8B5E56 50%, #D4B8B4 75%, #FFF9F9 100%)" }} />

      {/* ── INTRO — what red light therapy actually does ── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#FFF9F9" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto reveal text-center">
            <p
              className="text-2xl md:text-3xl leading-relaxed font-light text-[#1A1008]"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.01em" }}
            >
              Red light therapy works by delivering specific wavelengths of light — 660nm and 850nm — directly into your cells. Your mitochondria absorb the light and produce more energy. That energy is used for repair: muscle recovery, skin renewal, reduced inflammation, better sleep. The session is 10 minutes. The effects build over weeks. The room just makes it possible.
            </p>
          </div>
        </div>
      </section>

      {/* Feathered: rose-white → blush */}
      <div style={{ height: "160px", background: "linear-gradient(to bottom, #FFF9F9 0%, #EDE3DF 40%, #E8DCDA 70%, #F5EDEB 100%)" }} />

      {/* ── HOW IT WORKS — each step carries a benefit, not just a logistic ── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#F5EDEB" }}>
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="reveal mb-16">
              <span className="section-label block mb-4">How It Works</span>
              <h2
                className="text-3xl md:text-5xl font-bold text-[#1A1008]"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em" }}
              >
                Three steps.<br />
                <em style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontStyle: "normal" }}>
                  That is it.
                </em>
              </h2>
            </div>

            <div className="flex flex-col">
              {[
                {
                  num: "01",
                  headline: "Book on your phone.",
                  body: "Pick a time. Your private room is held the moment you confirm. Available any hour of the day, every day of the week. No calls, no staff, no waiting.",
                  detail: "24/7 availability.",
                },
                {
                  num: "02",
                  headline: "Walk in. The light begins.",
                  body: "Your phone unlocks the door. Full-body panels surround you — 660nm red light for skin, circulation, and surface-level repair; 850nm near-infrared for deeper tissue, muscle recovery, and inflammation. The session runs automatically. You do nothing except be there.",
                  detail: "660nm + 850nm. Full body.",
                },
                {
                  num: "03",
                  headline: "Ten minutes. Done. The work continues.",
                  body: "The session ends. You walk out. But the cellular response continues for hours — your body keeps producing ATP, repairing tissue, reducing cortisol. One session builds on the last. Most people notice a difference within two to four weeks of consistent use.",
                  detail: "Effects compound over time.",
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="reveal"
                  style={{
                    borderTop: "1px solid rgba(26,16,8,0.10)",
                    paddingTop: "2.75rem",
                    paddingBottom: "2.75rem",
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-16 items-start">
                    <div>
                      <p
                        className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase mb-3"
                        style={{ color: "#D53E0F", fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {step.num}
                      </p>
                      <p
                        className="text-lg font-bold leading-snug text-[#1A1008] mb-3"
                        style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.02em" }}
                      >
                        {step.headline}
                      </p>
                      <p
                        className="text-[0.6rem] font-semibold tracking-[0.12em] uppercase"
                        style={{ color: "#D53E0F", fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {step.detail}
                      </p>
                    </div>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#7A5A54", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: "1px solid rgba(26,16,8,0.10)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Feathered: blush → near-black */}
      <div style={{ height: "220px", background: "linear-gradient(to bottom, #F5EDEB 0%, #C9A89E 25%, #8B5E56 50%, #3D1A14 80%, #1A1008 100%)" }} />

      {/* ── THE STUDIO ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#1A1008" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="reveal mb-12">
              <span className="section-label block mb-6" style={{ color: "#D53E0F" }}>The Studio</span>
              <h2
                className="text-3xl md:text-5xl font-bold leading-[1.1] mb-6 text-white"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em" }}
              >
                Clinical grade.<br />
                <em style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontStyle: "normal", color: "#D53E0F" }}>
                  Private rooms. Just light.
                </em>
              </h2>
              <span className="brand-rule mb-8" style={{ backgroundColor: "#D53E0F" }} />
            </div>
            <div className="reveal grid md:grid-cols-2 gap-12 mb-16">
              <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Private full-body red light therapy. Clinically calibrated 660nm and 850nm wavelengths — the same protocol used in clinical settings, now available in 10 minutes, at a fraction of the cost.
              </p>
              <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Every studio is designed around one principle: remove everything that is not the light. A private room. Full-body panels. Fully autonomous — always calibrated, always consistent, always ready.
              </p>
            </div>
            {/* Spec pills */}
            <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-px" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
              {[
                { value: "660nm", label: "Red light" },
                { value: "850nm", label: "Near-infrared" },
                { value: "10 min", label: "Per session" },
                { value: "24/7", label: "Always open" },
              ].map((spec, i) => (
                <div key={i} className="flex flex-col items-center justify-center text-center py-8 px-4" style={{ backgroundColor: "#1A1008" }}>
                  <p
                    className="text-2xl font-bold mb-1"
                    style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em", color: "#D53E0F" }}
                  >
                    {spec.value}
                  </p>
                  <p
                    className="text-[0.6rem] font-semibold tracking-[0.15em] uppercase"
                    style={{ color: "rgba(255,249,249,0.35)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {spec.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feathered: near-black → blush */}
      <div style={{ height: "220px", background: "linear-gradient(to bottom, #1A1008 0%, #3D1A14 20%, #8B5E56 50%, #C9A89E 75%, #F5EDEB 100%)" }} />

      {/* ── WHO IT'S FOR — editorial rows, benefit-led ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#F5EDEB" }}>
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="reveal mb-16">
              <span className="section-label block mb-4">Who It Is For</span>
              <h2
                className="text-3xl md:text-5xl font-bold text-[#1A1008]"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em" }}
              >
                Built for people who<br />
                <em style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontStyle: "normal", color: "#D53E0F" }}>
                  take their health seriously.
                </em>
              </h2>
            </div>

            <div className="flex flex-col">
              {[
                {
                  num: "01",
                  headline: "Recovery.",
                  body: "After training, long travel, or a week that left your body heavy. Red light at 850nm penetrates deep into muscle tissue — reducing inflammation, accelerating repair, and helping your nervous system settle faster than rest alone.",
                },
                {
                  num: "02",
                  headline: "Skin.",
                  body: "660nm red light stimulates collagen production and supports cellular turnover. When your complexion looks tired, uneven, or older than it should — a consistent weekly session makes a measurable difference over time.",
                },
                {
                  num: "03",
                  headline: "Energy and sleep.",
                  body: "Red light therapy reduces cortisol and supports melatonin regulation. An evening session helps your body wind down properly. A morning session helps you start without the heaviness. Both work. Pick what fits your week.",
                },
                {
                  num: "04",
                  headline: "The long game.",
                  body: "For people who have read the evidence and want consistent access to the real thing. Not a home gadget. Not a clinic appointment. A 10-minute weekly habit with a compounding return.",
                },
              ].map((row, i) => (
                <div
                  key={i}
                  className="reveal"
                  style={{
                    borderTop: "1px solid rgba(26,16,8,0.10)",
                    paddingTop: "2.75rem",
                    paddingBottom: "2.75rem",
                    transitionDelay: `${i * 70}ms`,
                  }}
                >
                  <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-16 items-start">
                    <div>
                      <p
                        className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase mb-3"
                        style={{ color: "#D53E0F", fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {row.num}
                      </p>
                      <p
                        className="text-lg font-bold leading-snug text-[#1A1008]"
                        style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.02em" }}
                      >
                        {row.headline}
                      </p>
                    </div>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#7A5A54", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {row.body}
                    </p>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: "1px solid rgba(26,16,8,0.10)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Feathered: blush → deep dark */}
      <div style={{ height: "220px", background: "linear-gradient(to bottom, #F5EDEB 0%, #C9A89E 25%, #8B5E56 50%, #3D1A14 80%, #0A0303 100%)" }} />

      {/* ── CTA ── */}
      <section
        className="relative py-32 md:py-40 overflow-hidden"
        style={{ background: "linear-gradient(to bottom, #0A0303 0%, #0D0404 50%, #0A0303 100%)" }}
      >
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(61,26,20,0.18) 0%, transparent 70%)" }} />
        <div className="relative z-10 container">
          <div className="reveal max-w-lg mx-auto text-center">
            <span
              className="text-[0.65rem] font-semibold tracking-[0.22em] uppercase block mb-6"
              style={{ color: "#D53E0F", fontFamily: "'DM Sans', sans-serif" }}
            >
              Born in Helsinki. Opening in Fall of 2026
            </span>
            <h2
              className="text-4xl md:text-6xl font-bold text-white mb-4 leading-[1.05]"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}
            >
              Be first<br />
              <em style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontStyle: "normal" }}>
                through the door.
              </em>
            </h2>
            <p
              className="text-white/50 text-sm mb-10 leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              300 founding spots. €25/month. Locked in for life. Once the spots are claimed, the rate goes up.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#waitlist">
                <button className="btn-primary">Reserve my spot</button>
              </a>
              <Link href="/science">
                <button className="btn-ghost" style={{ color: "rgba(255,249,249,0.7)", borderColor: "rgba(255,255,255,0.15)" }}>The Science →</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
