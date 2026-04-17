/*
 * REDVIVE — The Experience Page
 * Design: Abstract blur hero, step-by-step session flow, studio imagery
 * Tone: Direct, calm — targets Mikael (recovering pro) + Sara (optimiser)
 * Pricing: €25/month founding member only — aggressive value comparison
 */

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/redvive-hero-blur-UeKLjdfFrjE973hKCs9uGR.webp";
const CABIN_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/redvive-hero-rlt-3N7CHHjmS72r5k4pWAgZwJ.webp";
const PANEL_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/redvive-panel_586d0319.png";

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
                Every Redvive studio is designed around one principle: remove everything that isn't the light. Full-body LED panels calibrated to clinical-grade output. A private room. Nothing else.
              </p>
              <p className="text-[#7A5A54] text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                No mirrors. No music unless you bring your own. No staff watching through a window. Just you and 10 minutes of the most researched wavelengths in photomedicine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PANEL IMAGE ── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0A0303" }}>
        <div className="grid lg:grid-cols-2 min-h-[500px]">
          <div className="flex flex-col justify-center px-8 lg:px-16 py-20">
            <div className="reveal max-w-md">
              <span className="section-label block mb-6" style={{ color: "#FA8743" }}>The Technology</span>
              <h2
                className="text-3xl md:text-4xl font-bold leading-[1.1] mb-6 text-white"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em" }}
              >
                Clinical-grade.<br />
                <em style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontStyle: "italic", color: "#FA8743" }}>
                  Full-body coverage.
                </em>
              </h2>
              <span className="brand-rule mb-6" style={{ backgroundColor: "#FA8743" }} />
              <p className="text-white/60 text-sm leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Redvive uses medical-grade full-body LED panels delivering 660nm red light and 850nm near-infrared simultaneously. The same technology used in clinical settings — now available to you in 10 minutes, at a fraction of the cost.
              </p>
              <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Opening in Helsinki's Punavuori neighbourhood in 2026.
              </p>
            </div>
          </div>
          <div
            className="relative min-h-[400px] lg:min-h-[500px] bg-cover bg-center"
            style={{ backgroundImage: `url(${PANEL_IMAGE})`, backgroundPosition: "center" }}
          >
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, #0A0303 0%, rgba(10,3,3,0) 40%)" }}
            />
          </div>
        </div>
      </section>

      {/* ── PRICING — FOUNDING MEMBER ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#FFF9F9" }}>
        <div className="container">
          <div className="reveal mb-6">
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
              This is the founding member rate — available only to waitlist members before we open. Once claimed, it's yours forever. No price increases. No conditions.
            </p>
          </div>

          {/* Value comparison table */}
          <div className="reveal mt-16 mb-16 overflow-x-auto">
            <table className="w-full max-w-3xl text-sm" style={{ fontFamily: "'DM Sans', sans-serif", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #E8D8D4" }}>
                  <th className="text-left py-4 pr-8 text-[#1A1008] font-semibold text-xs tracking-[0.12em] uppercase">Option</th>
                  <th className="text-right py-4 px-4 text-[#1A1008] font-semibold text-xs tracking-[0.12em] uppercase">Cost</th>
                  <th className="text-right py-4 px-4 text-[#1A1008] font-semibold text-xs tracking-[0.12em] uppercase">Sessions / mo</th>
                  <th className="text-right py-4 pl-4 text-[#1A1008] font-semibold text-xs tracking-[0.12em] uppercase">Per session</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { option: "Clinic / physio session", cost: "€80–€150", sessions: "1–2", per: "€80–€150", highlight: false },
                  { option: "Home device (one-time)", cost: "€500–€3,000", sessions: "Unlimited", per: "High upfront", highlight: false },
                  { option: "Competitor studio", cost: "€60–€120 / mo", sessions: "4–8", per: "€15–€30", highlight: false },
                  { option: "Redvive — Founding Member", cost: "€25 / mo", sessions: "Unlimited*", per: "< €1 / day", highlight: true },
                ].map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: "1px solid #E8D8D4",
                      backgroundColor: row.highlight ? "#C01A07" : "transparent",
                    }}
                  >
                    <td
                      className="py-4 pr-8 font-medium"
                      style={{ color: row.highlight ? "white" : "#1A1008" }}
                    >
                      {row.highlight && (
                        <span className="inline-block text-[0.6rem] font-bold tracking-[0.15em] uppercase mr-2 px-1.5 py-0.5" style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "white" }}>
                          YOU
                        </span>
                      )}
                      {row.option}
                    </td>
                    <td
                      className="text-right py-4 px-4 font-bold"
                      style={{ color: row.highlight ? "white" : "#1A1008" }}
                    >
                      {row.cost}
                    </td>
                    <td
                      className="text-right py-4 px-4"
                      style={{ color: row.highlight ? "rgba(255,255,255,0.8)" : "#7A5A54" }}
                    >
                      {row.sessions}
                    </td>
                    <td
                      className="text-right py-4 pl-4 font-semibold"
                      style={{ color: row.highlight ? "#FFCAB0" : "#7A5A54" }}
                    >
                      {row.per}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-[#7A5A54] text-xs mt-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              * Founding member rate includes unlimited sessions per month at the founding price. Final session structure confirmed at launch.
            </p>
          </div>

          {/* Value pillars */}
          <div className="reveal grid md:grid-cols-3 gap-px mb-16" style={{ backgroundColor: "#E8D8D4" }}>
            {[
              {
                stat: "< €1",
                label: "per day",
                body: "Less than a coffee. Every single day. For clinically calibrated red light therapy.",
              },
              {
                stat: "10×",
                label: "cheaper than a clinic",
                body: "A single physio or clinic session costs what Redvive costs for an entire month.",
              },
              {
                stat: "Forever",
                label: "locked in",
                body: "This price never increases for founding members. Not next year. Not when we expand. Never.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#FFF9F9] p-10 lg:p-12 flex flex-col gap-3"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <p
                  className="text-5xl font-bold"
                  style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.04em", color: "#C01A07" }}
                >
                  {item.stat}
                </p>
                <p
                  className="text-xs font-semibold tracking-[0.14em] uppercase"
                  style={{ color: "#7A5A54", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {item.label}
                </p>
                <span className="brand-rule" />
                <p className="text-[#7A5A54] text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="reveal">
            <p
              className="text-lg font-semibold text-[#1A1008] mb-2"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.01em" }}
            >
              Claim your founding member rate before we open.
            </p>
            <p className="text-[#7A5A54] text-sm mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              No payment now. No commitment. Just your spot at €25/month — locked in for life.
            </p>
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
