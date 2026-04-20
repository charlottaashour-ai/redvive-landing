/*
 * REDVIVE — The Experience Page
 * Design: Abstract blur hero, step-by-step session flow, no images except the studio blur
 * Palette flow: #0A0303 hero → #FFF9F9 intro → #F5EDEB steps → #1A1008 technology → #FFF9F9 CTA
 * Tone: Direct, calm — targets Mikael (recovering pro) + Sara (optimiser)
 * Pricing: Moved to Home page — not shown here
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

const HERO_VIDEO = "https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/redvive-hero-web_da16b644.mp4";
const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/redvive-hero-blur-UeKLjdfFrjE973hKCs9uGR.webp";
const STUDIO_BLUR_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/redvive-studio-blur-Pq3aZTAAiRMjG62Mvq7BTZ.webp";

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
      <Navbar />

      {/* ── PAGE HERO — dark video ── */}
      <section
        className="relative min-h-[70vh] flex flex-col justify-end overflow-hidden"
        style={{ backgroundColor: "#0A0303" }}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          poster={HERO_IMAGE}
          style={{ opacity: 0.45 }}
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
              style={{ color: "rgba(250,135,67,0.85)", fontFamily: "'DM Sans', sans-serif" }}
            >
              The Experience
            </motion.span>
            <motion.div variants={heroItem}>
              <h1
                className="text-5xl md:text-7xl font-bold text-white leading-[0.95]"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}
              >
                show up
              </h1>
            </motion.div>
            <motion.div variants={heroItem}>
              <h1
                className="text-5xl md:text-7xl font-bold text-white leading-[0.95]"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}
              >
                <em style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontStyle: "italic" }}>
                  for yourself.
                </em>
              </h1>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Feathered: dark → rose-white */}
      <div style={{ height: "200px", background: "linear-gradient(to bottom, #0A0303 0%, #FFF9F9 100%)" }} />

      {/* ── INTRO — rose-white ── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#FFF9F9" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto reveal">
            <p
              className="text-2xl md:text-3xl leading-relaxed font-light text-[#1A1008]"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.01em" }}
            >
              10 minutes of doing nothing — so your cells can do everything. Fully autonomous. No appointments. No friction.
            </p>
          </div>
        </div>
      </section>

      {/* Feathered: rose-white → blush */}
      <div style={{ height: "120px", background: "linear-gradient(to bottom, #FFF9F9 0%, #F5EDEB 100%)" }} />

      {/* ── HOW IT WORKS — STEPS — blush ── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#F5EDEB" }}>
        <div className="container">
          <div className="reveal mb-16 max-w-4xl mx-auto">
            <span className="section-label block mb-4">How It Works</span>
            <h2
              className="text-3xl md:text-5xl font-bold text-[#1A1008]"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em" }}
            >
              Three steps.<br />
              <em style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontStyle: "italic" }}>
                That's it.
              </em>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px max-w-4xl mx-auto" style={{ backgroundColor: "#E8D8D4" }}>
            {[
              {
                step: "01",
                title: "Book on your phone",
                body: "Open the app. Pick a time. Your cabin is reserved. No calls, no waiting lists.",
                detail: "24/7, 7 days a week.",
              },
              {
                step: "02",
                title: "Walk in",
                body: "Your phone unlocks the door. Your private cabin is ready. Lie down, close your eyes.",
                detail: "Full-body panels. Private room.",
              },
              {
                step: "03",
                title: "10 minutes",
                body: "The session runs automatically. When it ends, you're done. Walk out. No checkout, no upsell.",
                detail: "660nm + 850nm. Clinically calibrated.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="reveal bg-[#FFF9F9] p-10 lg:p-14 flex flex-col gap-4"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span
                  className="text-[0.65rem] font-semibold tracking-[0.18em]"
                  style={{ color: "#C01A07", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {step.step}
                </span>
                <h3
                  className="text-xl font-bold text-[#1A1008]"
                  style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.01em" }}
                >
                  {step.title}
                </h3>
                <span className="brand-rule" />
                <p className="text-[#7A5A54] text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {step.body}
                </p>
                <p
                  className="text-xs font-semibold tracking-[0.1em] uppercase mt-auto"
                  style={{ color: "#C01A07", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feathered: blush → near-black */}
      <div style={{ height: "160px", background: "linear-gradient(to bottom, #F5EDEB 0%, #1A1008 100%)" }} />

      {/* ── THE STUDIO — fused dark section (Technology color scheme + Studio content) ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#1A1008" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="reveal mb-12">
              <span className="section-label block mb-6" style={{ color: "#FA8743" }}>The Studio</span>
              <h2
                className="text-3xl md:text-5xl font-bold leading-[1.1] mb-6 text-white"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em" }}
              >
                Clinical-grade.<br />
                <em style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontStyle: "italic", color: "#FA8743" }}>
                  Private rooms. Just light.
                </em>
              </h2>
              <span className="brand-rule mb-8" style={{ backgroundColor: "#FA8743" }} />
            </div>
            <div className="reveal grid md:grid-cols-2 gap-12 mb-16">
              <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Redvive uses medical-grade full-body LED panels delivering 660nm red light and 850nm near-infrared simultaneously. The same technology used in clinical settings — now available to you in 10 minutes, at a fraction of the cost.
              </p>
              <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Every studio is designed around one principle: remove everything that isn't the light. A private room. Full-body panels. Fully autonomous — always calibrated, always consistent, always ready.
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
                    style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em", color: "#FA8743" }}
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
      <div style={{ height: "160px", background: "linear-gradient(to bottom, #1A1008 0%, #F5EDEB 100%)" }} />

      {/* ── WHO IT'S FOR — blush ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#F5EDEB" }}>
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="reveal mb-16">
              <span className="section-label block mb-4">Who It's For</span>
              <h2
                className="text-3xl md:text-5xl font-bold text-[#1A1008]"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em" }}
              >
                Built for people who<br />
                <em style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontStyle: "italic", color: "#C01A07" }}>
                  take their health seriously.
                </em>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-px" style={{ backgroundColor: "#E8D8D4" }}>
              {[
                {
                  label: "The Optimiser",
                  title: "You track everything. You want results.",
                  body: "You've read the studies. You know what 660nm and 850nm do. You want the protocol — consistent, clinical-grade, without the clinic price tag or the clinic schedule.",
                },
                {
                  label: "The Performer",
                  title: "Recovery is part of your training.",
                  body: "You push hard. Your body needs to recover harder. Redvive is the 10-minute protocol that reduces DOMS, accelerates muscle repair, and keeps you consistent — week after week.",
                },
              ].map((persona, i) => (
                <div
                  key={i}
                  className="reveal bg-[#FFF9F9] p-10 lg:p-14 flex flex-col gap-4"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <p
                    className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase"
                    style={{ color: "#C01A07", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {persona.label}
                  </p>
                  <h3
                    className="text-xl font-bold text-[#1A1008]"
                    style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.01em" }}
                  >
                    {persona.title}
                  </h3>
                  <span className="brand-rule" />
                  <p className="text-[#7A5A54] text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {persona.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feathered: blush → rose-white */}
      <div style={{ height: "120px", background: "linear-gradient(to bottom, #F5EDEB 0%, #FFF9F9 100%)" }} />

      {/* ── CTA — rose-white ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#FFF9F9" }}>
        <div className="container">
          <div className="reveal max-w-xl mx-auto text-center">
            <h2
              className="text-3xl md:text-5xl font-bold leading-[1.1] mb-8 text-[#1A1008]"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em" }}
            >
              Ready to start?<br />
              <em style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontStyle: "italic" }}>
                €25/month. Locked in forever.
              </em>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#waitlist">
                <button className="btn-primary">Join the Waitlist</button>
              </a>
              <Link href="/science">
                <button className="btn-ghost">The Science →</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
