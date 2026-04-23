/*
 * REDVIVE — Home Page
 * Design: Abstract motion blur hero (full-bleed), text floating over video
 * Palette: #0A0303 dark / #FFF9F9 rose-white / #F5EDEB blush / #1A1008 near-black
 * Sections flow seamlessly — no hard breaks
 * Mobile-first, editorial, centered
 *
 * Hero animation: Framer Motion staggered fade-up on page load
 *   — eyebrow label → headline word 1 → headline word 2 (italic) → sub-copy → form
 *   — each element fades in from y:20 with 150ms stagger
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HERO_VIDEO = "https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/redvive-hero-web_da16b644.mp4";

/* ── Animation variants ── */
const heroContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15 as number,
      delayChildren: 0.3 as number,
    },
  },
} as const;

const heroItem = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, type: "tween" as const },
  },
};

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && consent) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-4">
        <p className="text-white text-sm font-medium tracking-wide">You're on the list.</p>
        <p className="text-white/60 text-xs mt-1">We'll be in touch before Helsinki opens.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-md mx-auto md:mx-0">
      <input
        type="email"
        required
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-3 text-sm focus:outline-none focus:border-white/50 transition-colors"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      />
      <select
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
        className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/50 transition-colors appearance-none"
        style={{ fontFamily: "'DM Sans', sans-serif", color: interest ? "white" : "rgba(255,255,255,0.4)" }}
      >
        <option value="" disabled style={{ color: "#1A1008" }}>What brings you here?</option>
        <option value="skin" style={{ color: "#1A1008" }}>Skin &amp; Glow</option>
        <option value="recovery" style={{ color: "#1A1008" }}>Recovery &amp; Performance</option>
        <option value="energy" style={{ color: "#1A1008" }}>Energy &amp; Weekly Balance</option>
        <option value="wellness" style={{ color: "#1A1008" }}>General Wellness</option>
        <option value="science" style={{ color: "#1A1008" }}>I want the science</option>
      </select>
      {/* GDPR consent checkbox */}
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 flex-shrink-0 accent-[#D53E0F] w-3.5 h-3.5 cursor-pointer"
        />
        <span
          className="text-[0.65rem] leading-relaxed"
          style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif" }}
        >
          I agree to receive launch updates and founding member information from Redvive. See our{" "}
          <a
            href="/privacy"
            className="underline underline-offset-2 hover:opacity-80 transition-opacity"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Privacy Policy
          </a>
          .
        </span>
      </label>
      <button type="submit" className="btn-primary justify-center w-full" disabled={!consent} style={{ opacity: consent ? 1 : 0.5, transition: "opacity 0.2s" }}>
        Join the Waitlist
      </button>
      <p className="text-white/40 text-xs text-center">No payment. No commitment.</p>
    </form>
  );
}

/* ── Stats carousel data ── */
const STATS = [
  {
    stat: "Skin",
    label: "Clarity & Glow",
    body: "Full-body red light to support calmer, clearer, more resilient skin in 10 minutes.",
  },
  {
    stat: "Recovery",
    label: "Body Reset",
    body: "When training or work leaves you heavy, 10 minutes of light helps your body bounce back.",
  },
  {
    stat: "Hair",
    label: "Scalp Support",
    body: "Targeted red light to support scalp circulation for people who take thinning hair seriously.",
  },
  {
    stat: "Sleep",
    label: "Evening Wind-Down",
    body: "An evening 10-minute session to help your body slow down and make mornings feel less brutal.",
  },
];

function StatsCarousel() {
  const items = [...STATS, ...STATS, ...STATS];

  return (
    <div style={{ backgroundColor: "#1A1008", overflow: "hidden" }}>
      <div className="relative py-16 md:py-20" style={{ overflow: "hidden" }}>
        <div
          className="flex"
          style={{
            animation: "statsScroll 22s linear infinite",
            width: "max-content",
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex flex-col items-center text-center px-10 md:px-14"
              style={{
                width: "280px",
                borderRight: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Heading — fixed height so all cards align */}
              <div
                className="flex items-end justify-center"
                style={{ height: "80px", flexShrink: 0 }}
              >
                <p
                  className="font-bold leading-none"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "3rem",
                    letterSpacing: "-0.04em",
                    color: "#D53E0F",
                  }}
                >
                  {item.stat}
                </p>
              </div>
              {/* Subheading — fixed height */}
              <div
                className="flex items-center justify-center"
                style={{ height: "32px", flexShrink: 0 }}
              >
                <p
                  className="text-[0.6rem] font-semibold tracking-[0.18em] uppercase"
                  style={{ color: "rgba(255,249,249,0.4)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {item.label}
                </p>
              </div>
              {/* Divider — fixed position */}
              <div className="w-6 h-px mb-5 mt-1" style={{ backgroundColor: "#D53E0F", flexShrink: 0 }} />
              {/* Body — fixed height, top-aligned */}
              <div
                className="flex items-start justify-center"
                style={{ height: "80px", flexShrink: 0 }}
              >
                <p
                  className="text-white/50 text-xs leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif", maxWidth: "200px" }}
                >
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-16 pointer-events-none" style={{ background: "linear-gradient(to right, #1A1008 0%, transparent 100%)" }} />
        <div className="absolute inset-y-0 right-0 w-16 pointer-events-none" style={{ background: "linear-gradient(to left, #1A1008 0%, transparent 100%)" }} />
      </div>

      <div
        className="flex justify-center py-8 px-8"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <Link href="/science">
          <button className="btn-ghost" style={{ color: "rgba(255,249,249,0.7)", borderColor: "rgba(255,255,255,0.15)" }}>
            Understand the science →
          </button>
        </Link>
      </div>
    </div>
  );
}

const PRICING_ROWS = [
  { option: "Clinic / physio", cost: "€80–€150", label: "per session", note: "1–2 sessions max", highlight: false },
  { option: "Home device", cost: "€500–€3,000", label: "one-time", note: "High upfront, no guidance", highlight: false },
  { option: "Competitor studio", cost: "€60–€120", label: "per month", note: "4–8 sessions included", highlight: false },
  { option: "Redvive — Founding Member", cost: "€25", label: "per month", note: "", highlight: true },
];

export default function Home() {
  useReveal();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFF9F9" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex flex-col justify-end overflow-hidden"
        style={{ backgroundColor: "#0A0303" }}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          style={{ opacity: 0.45 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,3,3,0.62) 0%, rgba(10,3,3,0.28) 40%, rgba(10,3,3,0.68) 75%, rgba(10,3,3,0.88) 100%)",
          }}
        />

        {/* Staggered hero content */}
        <motion.div
          className="relative z-10 container pb-40 pt-32"
          variants={heroContainer}
          initial="hidden"
          animate="show"
        >
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <motion.p
              variants={heroItem}
              className="text-[0.65rem] font-semibold tracking-[0.22em] uppercase mb-6"
              style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'DM Sans', sans-serif" }}
            >
              Born in Helsinki. Opening in Fall of 2026
            </motion.p>

            {/* Headline line 1 */}
            <motion.div variants={heroItem}>
              <h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95]"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}
              >
                Wellness,
              </h1>
            </motion.div>

            {/* Headline line 2 — italic serif */}
            <motion.div variants={heroItem}>
              <h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-4"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}
              >
                <span style={{ fontWeight: 400, fontStyle: "normal", fontFamily: "'Lora', serif" }}>
                  simplified.
                </span>
              </h1>
            </motion.div>

            {/* Sub-copy */}
            <motion.p
              variants={heroItem}
              className="text-white/60 text-sm mt-6 mb-10 max-w-sm leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Redvive is a fully autonomous private red light studio — built for people who choose themselves daily.
            </motion.p>

            {/* Waitlist form */}
            <motion.div variants={heroItem}>
              <WaitlistForm />
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="text-white/30 text-[0.6rem] tracking-[0.2em] uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Scroll
          </span>
          <div className="w-px h-8 bg-white/20 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full bg-white/60"
              style={{ height: "40%", animation: "scrollDot 1.8s ease-in-out infinite" }}
            />
          </div>
        </div>
      </section>

      {/* ── FEATHERED TRANSITION: dark → rose-white ── */}
      <div style={{ height: "220px", background: "linear-gradient(to bottom, #0A0303 0%, #3D1A14 20%, #8B5E56 50%, #D4B8B4 75%, #FFF9F9 100%)" }} />

      {/* ── FOUNDING MEMBER PRICING ── */}
      <section className="py-24 md:py-36" style={{ backgroundColor: "#FFF9F9" }}>
        <div className="container">

          {/* Scarcity pill */}
          <div className="reveal flex justify-center mb-10">
            <div
              className="inline-flex items-center gap-2 px-4 py-2"
              style={{ backgroundColor: "#D53E0F" }}
            >
              <span
                className="block rounded-full flex-shrink-0"
                style={{
                  width: "5px",
                  height: "5px",
                  backgroundColor: "white",
                  animation: "dotBlink 2s ease-in-out infinite",
                }}
              />
              <span
                className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Limited to 300 Spots
              </span>
            </div>
          </div>

          {/* Section label */}
          <div className="reveal text-center mb-6">
            <span className="section-label">Founding Member Pricing</span>
          </div>

          {/* Monument price */}
          <div className="reveal text-center mb-6">
            <div className="flex items-baseline justify-center gap-3 md:gap-5 flex-wrap">
              <span
                className="text-[5rem] sm:text-[7rem] md:text-[10rem] lg:text-[13rem] font-bold leading-none text-[#1A1008]"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.04em" }}
              >
                €25
              </span>
              <span
                className="text-xl sm:text-2xl md:text-3xl font-normal text-[#7A5A54] self-end pb-3 md:pb-6"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                / month.
              </span>
            </div>
          </div>

          {/* Serif sub-headline */}
          <div className="reveal text-center mb-6">
            <p
              className="text-2xl sm:text-3xl md:text-4xl text-[#1A1008]"
              style={{ fontFamily: "'Lora', serif", fontWeight: 400 }}
            >
              Locked in for life.
            </p>
          </div>

          {/* Body copy */}
          <div className="reveal text-center mb-16">
            <p
              className="text-[#7A5A54] text-sm md:text-base leading-relaxed max-w-lg mx-auto"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Available only to waitlist members before we open. Once claimed, it's yours forever. No price increases. No conditions.
            </p>
          </div>

          {/* Thin rule */}
          <div className="reveal max-w-2xl mx-auto mb-16">
            <div className="h-px w-full" style={{ backgroundColor: "#E8D8D4" }} />
          </div>

          {/* Three value facts */}
          <div className="reveal grid grid-cols-1 sm:grid-cols-3 gap-px max-w-3xl mx-auto" style={{ backgroundColor: "#E8D8D4" }}>
            {[
              { stat: "< €1", label: "per day", body: "Less than a coffee. Every single day." },
              { stat: "10×", label: "vs. clinic", body: "One clinic session = one month at Redvive." },
              { stat: "Forever", label: "locked in", body: "This price never increases. Not ever." },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#FFF9F9] px-6 py-10 flex flex-col gap-3 text-center"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <p
                  className="text-4xl md:text-5xl font-bold"
                  style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.04em", color: "#D53E0F" }}
                >
                  {item.stat}
                </p>
                <p
                  className="text-xs font-semibold tracking-[0.14em] uppercase"
                  style={{ color: "#7A5A54", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {item.label}
                </p>
                <span className="brand-rule mx-auto" />
                <p className="text-[#7A5A54] text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          {/* Footnote */}
          <div className="reveal text-center mt-8">
            <p className="text-[#B89490] text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              * Final session structure confirmed at launch. Founding rate locked in for life.
            </p>
          </div>

        </div>
      </section>

      {/* ── FEATHERED TRANSITION: rose-white → dark ── */}
      <div style={{ height: "220px", background: "linear-gradient(to bottom, #FFF9F9 0%, #D4B8B4 25%, #8B5E56 50%, #3D1A14 80%, #1A1008 100%)" }} />
      <StatsCarousel />
      {/* ── FEATHERED TRANSITION: dark → rose-white (via blush mid-tones) ── */}
      <div style={{ height: "280px", background: "linear-gradient(to bottom, #1A1008 0%, #3D1A14 15%, #7A4A42 35%, #B89490 55%, #E0D0CC 75%, #F5EDEB 88%, #FFF9F9 100%)" }} />

      {/* ── WHAT WE STAND FOR — editorial rows ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#FFF9F9" }}>
        <div className="container">
          <div className="max-w-4xl mx-auto">

            {/* Section header */}
            <div className="reveal mb-16">
              <span className="section-label block mb-6">What We Stand For</span>
              <h2
                className="text-4xl md:text-6xl font-bold leading-[1.05]"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em", color: "#1A1008" }}
              >
                light is<br />
                <em style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontStyle: "normal" }}>
                  the medicine.
                </em>
              </h2>
            </div>

            {/* Editorial rows */}
            <div className="flex flex-col">
              {[
                {
                  num: "01",
                  title: "Autonomous",
                  headline: "No staff. No small talk. Just light.",
                  body: "Book on your phone. Walk in. Close the door. Begin. Your private room is ready. No check-in, no upsell, no wellness theatre.",
                },
                {
                  num: "02",
                  title: "Accessible",
                  headline: "Fast enough for a weekday.",
                  body: "€25/month for founding members. Locked in for life. Less than a coffee a day — calm enough to become a habit, affordable enough to stay one.",
                },
                {
                  num: "03",
                  title: "Science-Backed",
                  headline: "Clinically calibrated. Peer-reviewed.",
                  body: "660nm and 850nm wavelengths — the same protocol used in clinical settings. Backed by thousands of peer-reviewed studies. Precise where it matters.",
                },
                {
                  num: "04",
                  title: "Finnish-Built",
                  headline: "Nordic precision. No excess.",
                  body: "Designed in Helsinki. Private rooms. No noise, no complexity. Just light, privacy and consistency — the way Finland has always understood wellness.",
                },
              ].map((pillar, i) => (
                <div
                  key={i}
                  className="reveal"
                  style={{
                    borderTop: "1px solid rgba(26,16,8,0.1)",
                    paddingTop: "2.75rem",
                    paddingBottom: "2.75rem",
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-16 items-start">
                    {/* Left: number + title + headline */}
                    <div>
                      <p
                        className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase mb-2"
                        style={{ color: "#D53E0F", fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {pillar.num} — {pillar.title}
                      </p>
                      <p
                        className="text-lg font-bold leading-snug text-[#1A1008]"
                        style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.02em" }}
                      >
                        {pillar.headline}
                      </p>
                    </div>
                    {/* Right: body copy */}
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#7A5A54", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {pillar.body}
                    </p>
                  </div>
                </div>
              ))}
              {/* Closing rule */}
              <div style={{ borderTop: "1px solid rgba(26,16,8,0.1)" }} />
            </div>

            {/* Experience CTA */}
            <div className="reveal mt-14">
              <Link href="/experience">
                <button className="btn-ghost">Understand the experience →</button>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── FEATHERED TRANSITION: rose-white → deep dark ── */}
      <div style={{ height: "280px", background: "linear-gradient(to bottom, #FFF9F9 0%, #EDE3DF 15%, #C9A89E 35%, #7A4A42 55%, #3D1A14 75%, #1A1008 90%, #0A0303 100%)" }} />

      {/* ── WAITLIST CTA ── */}
      <section
        id="waitlist"
        className="relative py-32 md:py-40 overflow-hidden"
        style={{ background: "linear-gradient(to bottom, #0A0303 0%, #0D0404 50%, #0A0303 100%)" }}
      >
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(61,26,20,0.18) 0%, transparent 70%)" }} />
        <div className="relative z-10 container">
          <div className="max-w-lg mx-auto text-center">
            <div className="reveal">
              <span className="section-label block mb-6" style={{ color: "#D53E0F" }}>
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
              <p className="text-white/50 text-sm mb-10 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Join the waitlist for first access to Redvive studios in the capital region. Be first to hear about opening dates, founding rates and early access.
              </p>
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: "2px", backgroundColor: "#1A1008" }} />
      <Footer />

      <style>{`
        @keyframes scrollDot {
          0% { transform: translateY(-100%); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translateY(250%); opacity: 0; }
        }
        @keyframes statsScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-280px * 4)); }
        }
        @keyframes carouselItemFade {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.15; }
        }
      `}</style>
    </div>
  );
}
