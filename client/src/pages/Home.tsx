/*
 * REDVIVE — Home Page
 * Design: Abstract motion blur hero (full-bleed), text floating over image
 * Sections blend seamlessly — no hard section breaks
 * Background: #FFF9F9 for content sections
 * CTA: crimson only
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HERO_VIDEO = "https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/redvive-hero-web_da16b644.mp4";
const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/redvive-hero-blur-wide-N5NgJYxPYnXhAzQvc6Zd6b.webp";
const STUDIO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/redvive-studio-v2-7fNysUT8ocQeYm6pNnpWxS.webp";

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
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
        <option value="recovery" style={{ color: "#1A1008" }}>Recovery & Performance</option>
        <option value="skin" style={{ color: "#1A1008" }}>Skin & Longevity</option>
        <option value="wellness" style={{ color: "#1A1008" }}>General Wellness</option>
        <option value="science" style={{ color: "#1A1008" }}>I want the science</option>
      </select>
      <button type="submit" className="btn-primary justify-center w-full">
        Join the Waitlist
      </button>
      <p className="text-white/40 text-xs text-center">No cost. No commitment.</p>
    </form>
  );
}

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
        {/* Background video — looping, muted, with static image fallback */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          poster={HERO_IMAGE}
          style={{ opacity: 0.55 }}
        />
        {/* Gradient overlay — dark at top for nav, lighter at bottom for text */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,3,3,0.72) 0%, rgba(10,3,3,0.35) 40%, rgba(10,3,3,0.75) 75%, rgba(10,3,3,0.92) 100%)",
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 container pb-20 pt-32">
          <div className="max-w-2xl">
            <p
              className="text-[0.65rem] font-semibold tracking-[0.22em] uppercase mb-6"
              style={{ color: "rgba(250,135,67,0.85)", fontFamily: "'DM Sans', sans-serif" }}
            >
              Born in Finland · Opening 2026
            </p>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-4"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}
            >
              wellness,<br />
              <span style={{ fontStyle: "italic", fontWeight: 300, fontFamily: "'Fraunces', serif" }}>
                simplified.
              </span>
            </h1>
            <p
              className="text-white/60 text-sm mt-6 mb-10 max-w-sm leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              10 minutes. Clinically calibrated red light. Fully autonomous — no appointments, no friction.
              Helsinki's first autonomous light therapy studio.
            </p>
            <WaitlistForm />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
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

      {/* ── SEAMLESS TRANSITION: dark → light ── */}
      <div
        style={{
          height: "120px",
          background: "linear-gradient(to bottom, #0A0303 0%, #FFF9F9 100%)",
        }}
      />

      {/* ── MANIFESTO ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#FFF9F9" }}>
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="reveal">
              <span className="section-label block mb-6">The Belief</span>
              <h2
                className="text-4xl md:text-6xl font-bold leading-[1.05] mb-8"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em", color: "#1A1008" }}
              >
                light is<br />
                <em
                  style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontStyle: "italic" }}
                >
                  the medicine.
                </em>
              </h2>
              <span className="brand-rule mb-8" />
            </div>
            <div className="reveal grid md:grid-cols-2 gap-12 mt-12">
              <p className="text-[#7A5A54] leading-relaxed text-base" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Finland knows light. We live by its presence in summer, and its absence in winter shapes how we feel, recover, and think. Red light therapy is science that Finns understand intuitively — light as medicine, warmth as restoration, stillness as strength.
              </p>
              <p className="text-[#7A5A54] leading-relaxed text-base" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Redvive was built at the intersection of technology and wellness. Fully autonomous studios — no appointments, no friction. Book on your phone, walk in, and let clinically calibrated light do the work. 10 minutes. Science-backed. Your weekly reset.
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
              {
                num: "01",
                title: "Autonomous",
                body: "Book on your phone. Walk in. The technology does everything — 24/7.",
              },
              {
                num: "02",
                title: "Accessible",
                body: "€25/month for founding members. Locked in for life. No commitment traps.",
              },
              {
                num: "03",
                title: "Science-Backed",
                body: "660nm + 850nm. Over 5,000 peer-reviewed studies. Clinically calibrated.",
              },
              {
                num: "04",
                title: "Finnish-Built",
                body: "Designed with Nordic precision. Private rooms. No excess. Just light.",
              },
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
        </div>
      </section>

      {/* ── STUDIO IMAGE + SCIENCE TEASER ── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#FFF9F9" }}>
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          {/* Image */}
          <div
            className="relative min-h-[400px] lg:min-h-[600px] bg-cover bg-center"
            style={{ backgroundImage: `url(${STUDIO_IMAGE})` }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to right, rgba(10,3,3,0) 60%, #FFF9F9 100%)",
              }}
            />
          </div>
          {/* Text */}
          <div className="flex flex-col justify-center px-8 lg:px-16 py-20">
            <div className="reveal max-w-md">
              <span className="section-label block mb-6">The Science</span>
              <h2
                className="text-3xl md:text-5xl font-bold leading-[1.1] mb-6"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em", color: "#1A1008" }}
              >
                10 minutes.<br />
                <em style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontStyle: "italic" }}>
                  feel it.
                </em>
              </h2>
              <span className="brand-rule mb-6" />
              <p className="text-[#7A5A54] text-sm leading-relaxed mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                At 660nm, red light penetrates the skin and activates collagen production. At 850nm, near-infrared reaches deep into muscle and joint tissue, accelerating recovery and reducing inflammation. Your mitochondria do the rest.
              </p>
              <Link href="/science">
                <button className="btn-ghost">
                  Understand the science →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── NUMBERS ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#1A1008" }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {[
              { stat: "5,000+", label: "Peer-reviewed studies" },
              { stat: "660nm", label: "Red light wavelength" },
              { stat: "850nm", label: "Near-infrared wavelength" },
              { stat: "10 min", label: "Per session" },
            ].map((item, i) => (
              <div
                key={i}
                className="reveal text-center"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <p
                  className="text-4xl md:text-5xl font-bold mb-2"
                  style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em", color: "#FA8743" }}
                >
                  {item.stat}
                </p>
                <p
                  className="text-xs tracking-[0.12em] uppercase"
                  style={{ color: "rgba(255,249,249,0.45)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {item.label}
                </p>
              </div>
            ))}
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
                Founding members get priority booking and the founding member rate — locked in for life.
              </p>
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>

      {/* Seamless transition to footer */}
      <div style={{ height: "2px", backgroundColor: "#1A1008" }} />

      <Footer />

      <style>{`
        @keyframes scrollDot {
          0% { transform: translateY(-100%); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translateY(250%); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
