/*
 * REDVIVE — The Experience Page
 * Design: Abstract blur hero, step-by-step session flow, studio imagery
 * Tone: Direct, calm — targets Mikael (recovering pro) + Laura (longevity seeker)
 */

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/redvive-hero-blur-UeKLjdfFrjE973hKCs9uGR.webp";
const CABIN_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/redvive-hero-rlt-3N7CHHjmS72r5k4pWAgZwJ.webp";
const STUDIO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/redvive-studio-v2-7fNysUT8ocQeYm6pNnpWxS.webp";

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

      {/* ── PAGE HERO ── */}
      <section
        className="relative min-h-[70vh] flex flex-col justify-end overflow-hidden"
        style={{ backgroundColor: "#0A0303" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})`, backgroundPosition: "center 60%" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(10,3,3,0.5) 0%, rgba(10,3,3,0.1) 40%, rgba(10,3,3,0.88) 100%)",
          }}
        />
        <div className="relative z-10 container pb-20 pt-32">
          <div className="max-w-2xl">
            <span
              className="text-[0.65rem] font-semibold tracking-[0.22em] uppercase mb-6 block"
              style={{ color: "rgba(250,135,67,0.85)", fontFamily: "'DM Sans', sans-serif" }}
            >
              The Experience
            </span>
            <h1
              className="text-5xl md:text-7xl font-bold text-white leading-[0.95]"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}
            >
              show up<br />
              <em style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontStyle: "italic" }}>
                for yourself.
              </em>
            </h1>
          </div>
        </div>
      </section>

      {/* Seamless transition */}
      <div style={{ height: "100px", background: "linear-gradient(to bottom, #0A0303 0%, #FFF9F9 100%)" }} />

      {/* ── INTRO ── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#FFF9F9" }}>
        <div className="container">
          <div className="max-w-3xl reveal">
            <p
              className="text-2xl md:text-3xl leading-relaxed font-light text-[#1A1008]"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.01em" }}
            >
              redvive is 10 minutes of doing nothing — so your cells can do everything. No staff. No appointments. No friction.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS — STEPS ── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#F5EDEB" }}>
        <div className="container">
          <div className="reveal mb-16">
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

          <div className="grid md:grid-cols-3 gap-px" style={{ backgroundColor: "#E8D8D4" }}>
            {[
              {
                step: "01",
                title: "Book on your phone",
                body: "Open the app. Pick a time. Your cabin is reserved. No calls, no waiting lists, no front desk.",
                detail: "Available 6am – 10pm, 7 days a week.",
              },
              {
                step: "02",
                title: "Walk in",
                body: "Your phone unlocks the door. Your private cabin is ready. Hang your clothes, lie down, close your eyes.",
                detail: "Full-body panels. Private room. No staff.",
              },
              {
                step: "03",
                title: "10 minutes",
                body: "The session runs automatically. When it ends, you're done. Walk out. No checkout, no upsell, no disruption.",
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

      {/* ── CABIN IMAGE ── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#FFF9F9" }}>
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          <div
            className="relative min-h-[400px] lg:min-h-[600px] bg-cover bg-center"
            style={{ backgroundImage: `url(${CABIN_IMAGE})` }}
          >
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, rgba(10,3,3,0) 50%, #FFF9F9 100%)" }}
            />
          </div>
          <div className="flex flex-col justify-center px-8 lg:px-16 py-20">
            <div className="reveal max-w-md">
              <span className="section-label block mb-6">The Studio</span>
              <h2
                className="text-3xl md:text-4xl font-bold leading-[1.1] mb-6 text-[#1A1008]"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em" }}
              >
                Nordic precision.<br />
                <em style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontStyle: "italic" }}>
                  Private rooms. Just light.
                </em>
              </h2>
              <span className="brand-rule mb-6" />
              <p className="text-[#7A5A54] text-sm leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Every Redvive studio is designed around one principle: remove everything that isn't the light. Dark slatted wood. A single bench. Full-body LED panels calibrated to clinical-grade output.
              </p>
              <p className="text-[#7A5A54] text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                No mirrors. No music unless you bring your own. No staff watching through a window. Just you and 10 minutes of the most researched wavelengths in photomedicine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STUDIO INTERIOR ── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#1A1008" }}>
        <div className="grid lg:grid-cols-2 min-h-[500px]">
          <div className="flex flex-col justify-center px-8 lg:px-16 py-20">
            <div className="reveal max-w-md">
              <span className="section-label block mb-6" style={{ color: "#FA8743" }}>The Space</span>
              <h2
                className="text-3xl md:text-4xl font-bold leading-[1.1] mb-6 text-white"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em" }}
              >
                Designed like<br />
                <em style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontStyle: "italic", color: "#FA8743" }}>
                  a Finnish sauna.
                </em>
              </h2>
              <span className="brand-rule mb-6" style={{ backgroundColor: "#FA8743" }} />
              <p className="text-white/60 text-sm leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                The sauna is Finland's most trusted wellness ritual — private, silent, restorative. Redvive takes that same philosophy and applies it to red light therapy.
              </p>
              <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Opening in Helsinki's Punavuori neighbourhood in 2026. A second location in Kallio follows within 12 months.
              </p>
            </div>
          </div>
          <div
            className="relative min-h-[400px] lg:min-h-[500px] bg-cover bg-center"
            style={{ backgroundImage: `url(${STUDIO_IMAGE})` }}
          >
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, #1A1008 0%, rgba(26,16,8,0) 40%)" }}
            />
          </div>
        </div>
      </section>

      {/* ── PRICING TEASER ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#FFF9F9" }}>
        <div className="container">
          <div className="reveal mb-16">
            <span className="section-label block mb-4">Pricing</span>
            <h2
              className="text-3xl md:text-5xl font-bold text-[#1A1008]"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em" }}
            >
              Under €30.<br />
              <em style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontStyle: "italic" }}>
                No commitment traps.
              </em>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px max-w-3xl" style={{ backgroundColor: "#E8D8D4" }}>
            {[
              {
                plan: "Single Session",
                price: "€29",
                note: "Pay as you go",
                features: ["1 × 10-minute session", "Full-body panels", "Private cabin", "Book same-day"],
              },
              {
                plan: "Monthly",
                price: "€79",
                note: "4 sessions / month",
                features: ["4 × 10-minute sessions", "Priority booking", "Founding member rate", "Cancel anytime"],
                highlight: true,
              },
              {
                plan: "Founding Member",
                price: "TBA",
                note: "Waitlist only",
                features: ["Locked-in founding rate", "First access to new studios", "Exclusive founding perks", "Join the waitlist now"],
              },
            ].map((tier, i) => (
              <div
                key={i}
                className="reveal p-10 flex flex-col gap-4"
                style={{
                  backgroundColor: tier.highlight ? "#C01A07" : "#FFF9F9",
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <p
                  className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase"
                  style={{ color: tier.highlight ? "rgba(255,255,255,0.7)" : "#C01A07", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {tier.plan}
                </p>
                <p
                  className="text-4xl font-bold"
                  style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em", color: tier.highlight ? "white" : "#1A1008" }}
                >
                  {tier.price}
                </p>
                <p
                  className="text-xs"
                  style={{ color: tier.highlight ? "rgba(255,255,255,0.6)" : "#7A5A54", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {tier.note}
                </p>
                <span
                  className="brand-rule"
                  style={{ backgroundColor: tier.highlight ? "rgba(255,255,255,0.4)" : "#C01A07" }}
                />
                <ul className="flex flex-col gap-2 mt-2">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span style={{ color: tier.highlight ? "rgba(255,255,255,0.5)" : "#C01A07" }} className="text-xs mt-0.5">—</span>
                      <span
                        className="text-sm"
                        style={{ color: tier.highlight ? "rgba(255,255,255,0.85)" : "#7A5A54", fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="reveal mt-12">
            <a href="/#waitlist">
              <button className="btn-primary">Join the Waitlist — It's Free</button>
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#F5EDEB" }}>
        <div className="container">
          <div className="reveal max-w-xl">
            <h2
              className="text-3xl md:text-5xl font-bold leading-[1.1] mb-8 text-[#1A1008]"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em" }}
            >
              Still have<br />
              <em style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontStyle: "italic" }}>
                questions?
              </em>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/faq">
                <button className="btn-primary">Read the FAQ</button>
              </Link>
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
