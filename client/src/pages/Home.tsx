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
const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/redvive-hero-blur-wide-N5NgJYxPYnXhAzQvc6Zd6b.webp";

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
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-md mx-auto">
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
      <button type="submit" className="btn-primary justify-center w-full">
        Join the Waitlist
      </button>
      <p className="text-white/40 text-xs text-center">No payment. No commitment.</p>
    </form>
  );
}

/* ── Stats carousel data ── */
const STATS = [
  {
    stat: "5,000+",
    label: "Peer-reviewed studies",
    body: "Clinically calibrated 660nm and 850nm wavelengths. Backed by thousands of studies. Simple to use. Precise where it matters.",
  },
  {
    stat: "660nm",
    label: "Red Light",
    body: "Supports the skin. Stimulates collagen, reduces surface inflammation, and promotes a clearer, more even tone.",
  },
  {
    stat: "850nm",
    label: "Near-Infrared",
    body: "Reaches deeper tissue. Supports recovery, reduces heaviness, and helps your body switch gears after a long day.",
  },
  {
    stat: "10 min",
    label: "Per session",
    body: "Fast enough for a weekday. Consistent enough to become a habit. The point is not perfection — it is repetition.",
  },
  {
    stat: "ATP+",
    label: "Cellular energy output",
    body: "Red light stimulates mitochondrial activity, increasing your cells' natural energy output from the inside out.",
  },
];

function StatsCarousel() {
  const items = [...STATS, ...STATS, ...STATS];

  return (
    <div className="reveal" style={{ backgroundColor: "#1A1008", overflow: "hidden" }}>
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
              className="flex-shrink-0 flex flex-col items-center justify-center text-center px-10 md:px-14"
              style={{
                width: "280px",
                borderRight: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p
                className="text-5xl md:text-6xl font-bold mb-1 whitespace-nowrap"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.04em", color: "#FA8743" }}
              >
                {item.stat}
              </p>
              <p
                className="text-[0.6rem] font-semibold tracking-[0.18em] uppercase mb-4 whitespace-nowrap"
                style={{ color: "rgba(255,249,249,0.4)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {item.label}
              </p>
              <div className="w-6 h-px mb-4" style={{ backgroundColor: "#C01A07" }} />
              <p
                className="text-white/50 text-xs leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif", maxWidth: "200px" }}
              >
                {item.body}
              </p>
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
  { option: "Redvive — Founding Member", cost: "€25", label: "per month", note: "Unlimited · locked in forever", highlight: true },
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
          poster={HERO_IMAGE}
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
              style={{ color: "rgba(250,135,67,0.85)", fontFamily: "'DM Sans', sans-serif" }}
            >
              Born in Finland · Opening 2026
            </motion.p>

            {/* Headline line 1 */}
            <motion.div variants={heroItem}>
              <h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95]"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}
              >
                wellness,
              </h1>
            </motion.div>

            {/* Headline line 2 — italic serif */}
            <motion.div variants={heroItem}>
              <h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-4"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}
              >
                <span style={{ fontStyle: "italic", fontWeight: 300, fontFamily: "'Fraunces', serif" }}>
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
              For skin, recovery and energy. A private 10-minute red light session, fully autonomous — no staff, no appointments, no friction.
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

      {/* ── FEATHERED TRANSITION: dark → light ── */}
      <div style={{ height: "200px", background: "linear-gradient(to bottom, #0A0303 0%, #FFF9F9 100%)" }} />

      {/* ── MANIFESTO ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#FFF9F9" }}>
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="reveal">
              <span className="section-label block mb-6">The Belief</span>
              <h2
                className="text-4xl md:text-6xl font-bold leading-[1.05] mb-6"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em", color: "#1A1008" }}
              >
                light is<br />
                <em style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontStyle: "italic" }}>
                  the medicine.
                </em>
              </h2>
              <span className="brand-rule mb-8" />
            </div>
            <div className="reveal grid md:grid-cols-2 gap-12 mt-12">
              <p className="text-[#7A5A54] leading-relaxed text-base" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Finland knows light. We live by its presence in summer, and its absence in winter shapes how we feel, recover, and think. Red light therapy is science that Finns understand intuitively — light as medicine, warmth as restoration, stillness as strength.

              Redvive is a new kind of wellness studio built around full-body red light therapy. Book on your phone, walk into your private room, and spend 10 minutes in clinically calibrated light designed to support skin, recovery, energy and better weekly balance.
              </p>
              <p className="text-[#7A5A54] leading-relaxed text-base" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              No staff. No complexity. Just light, privacy and consistency. Use it when your skin looks tired, your body feels heavy, or your week has taken too much out of you. 10 minutes. Private. Science-backed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUR PILLARS ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#F5EDEB" }}>
        <div className="container">
          <div className="reveal mb-16">
            <span className="section-label block mb-4">What We Stand For</span>
            <h2
              className="text-3xl md:text-5xl font-bold"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em", color: "#1A1008" }}
            >
              Built differently.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: "#E8D8D4" }}>
            {[
              { num: "01", title: "Autonomous", body: "Book on your phone. Walk in. Close the door. Begin. No staff in the room. No small talk. No waiting around." },
              { num: "02", title: "Accessible", body: "€25/month for founding members. Locked in for life. Fast enough for a weekday. Calm enough to become a habit." },
              { num: "03", title: "Science-Backed", body: "Clinically calibrated 660nm and 850nm wavelengths. Backed by thousands of peer-reviewed studies." },
              { num: "04", title: "Finnish-Built", body: "Designed with Nordic precision. Private rooms. No excess. Just light, privacy and consistency." },
            ].map((pillar, i) => (
              <div
                key={i}
                className="reveal bg-[#FFF9F9] p-8 lg:p-10 flex flex-col gap-4"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span
                  className="text-[0.65rem] font-semibold tracking-[0.18em]"
                  style={{ color: "#C01A07", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {pillar.num}
                </span>
                <h3
                  className="text-lg font-bold text-[#1A1008]"
                  style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.01em" }}
                >
                  {pillar.title}
                </h3>
                <span className="brand-rule" />
                <p className="text-[#7A5A54] text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>

          <div className="reveal mt-12">
            <Link href="/science">
              <button className="btn-ghost">
                Understand the science →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATHERED TRANSITION: blush → dark ── */}
      <div style={{ height: "160px", background: "linear-gradient(to bottom, #F5EDEB 0%, #1A1008 100%)" }} />
      <StatsCarousel />
      {/* ── FEATHERED TRANSITION: dark → rose-white ── */}
      <div style={{ height: "160px", background: "linear-gradient(to bottom, #1A1008 0%, #FFF9F9 100%)" }} />

      {/* ── FOUNDING MEMBER PRICING ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#FFF9F9" }}>
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="reveal mb-4">
              <span className="section-label block mb-4">Founding Member Pricing</span>
              <h2
                className="text-3xl md:text-5xl font-bold text-[#1A1008] mb-4"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em" }}
              >
                €25 / month.<br />
                <em style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontStyle: "italic" }}>
                  Locked in for life.
                </em>
              </h2>
              <p className="text-[#7A5A54] text-base max-w-xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Redvive is built for repeat use. This is the founding member rate — available only to waitlist members before we open. Once claimed, it's yours forever. No price increases. No conditions.
              </p>
            </div>

            <div className="reveal flex flex-col gap-3 mt-12 mb-12">
              {PRICING_ROWS.map((row, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4 px-6 py-5"
                  style={{
                    backgroundColor: row.highlight ? "#C01A07" : "#F5EDEB",
                    borderLeft: row.highlight ? "4px solid #FA8743" : "4px solid transparent",
                  }}
                >
                  <div className="flex flex-col gap-1 min-w-0">
                    {row.highlight && (
                      <span
                        className="text-[0.6rem] font-bold tracking-[0.18em] uppercase mb-0.5"
                        style={{ color: "#FFCAB0", fontFamily: "'DM Sans', sans-serif" }}
                      >
                        You
                      </span>
                    )}
                    <span
                      className="text-sm font-semibold leading-snug"
                      style={{ color: row.highlight ? "white" : "#1A1008", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {row.option}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: row.highlight ? "rgba(255,255,255,0.6)" : "#7A5A54", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {row.note}
                    </span>
                  </div>
                  <div className="flex flex-col items-end flex-shrink-0">
                    <span
                      className="text-2xl font-bold leading-none"
                      style={{ color: row.highlight ? "white" : "#1A1008", fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}
                    >
                      {row.cost}
                    </span>
                    <span
                      className="text-xs mt-0.5"
                      style={{ color: row.highlight ? "rgba(255,255,255,0.6)" : "#7A5A54", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {row.label}
                    </span>
                  </div>
                </div>
              ))}
              <p className="text-[#7A5A54] text-xs mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                * Final session structure confirmed at launch. Founding rate locked in for life.
              </p>
            </div>

            <div className="reveal grid grid-cols-1 sm:grid-cols-3 gap-px mb-12" style={{ backgroundColor: "#E8D8D4" }}>
              {[
                { stat: "< €1", label: "per day", body: "Less than a coffee. Every single day." },
                { stat: "10×", label: "vs. clinic", body: "One clinic session = one month at Redvive." },
                { stat: "Forever", label: "locked in", body: "This price never increases. Not ever." },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-[#FFF9F9] p-8 flex flex-col gap-3 text-center"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <p
                    className="text-4xl font-bold whitespace-nowrap"
                    style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.04em", color: "#C01A07" }}
                  >
                    {item.stat}
                  </p>
                  <p
                    className="text-xs font-semibold tracking-[0.14em] uppercase whitespace-nowrap"
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
          </div>
        </div>
      </section>

      {/* ── WAITLIST CTA ── */}
      <section
        id="waitlist"
        className="relative py-32 md:py-40 overflow-hidden"
        style={{ backgroundColor: "#0A0303" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/redvive-hero-blur-UeKLjdfFrjE973hKCs9uGR.webp)` }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(10,3,3,0.6)" }} />
        <div className="relative z-10 container">
          <div className="max-w-lg mx-auto text-center">
            <div className="reveal">
              <span className="section-label block mb-6" style={{ color: "#FA8743" }}>
                Helsinki · Opening 2026
              </span>
              <h2
                className="text-4xl md:text-6xl font-bold text-white mb-4 leading-[1.05]"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}
              >
                Be first<br />
                <em style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontStyle: "italic" }}>
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
          100% { transform: translateX(calc(-280px * 5)); }
        }
      `}</style>
    </div>
  );
}
