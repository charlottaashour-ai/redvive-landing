/*
 * REDVIVE — FAQ Page
 * Design: Clean, direct, objection-handling
 * Tone: Calm, reassuring, direct — never defensive
 */

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HERO_VIDEO = "https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/redvive-hero-web_da16b644.mp4";
const BLUR_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/redvive-hero-blur-UeKLjdfFrjE973hKCs9uGR.webp";

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const faqs = [
  {
    category: "The Basics",
    items: [
      {
        q: "What is red light therapy?",
        a: "Red light therapy (also called photobiomodulation or PBM) uses specific wavelengths of red and near-infrared light to stimulate cellular function. At 660nm, red light activates collagen production and surface-level healing. At 850nm, near-infrared penetrates deep into muscle and joint tissue, accelerating recovery and reducing inflammation. Over 5,000 peer-reviewed studies support its efficacy.",
      },
      {
        q: "Is it the same as a tanning bed or UV light?",
        a: "No. Red light therapy uses visible red and near-infrared wavelengths — not UV. It does not tan your skin, does not cause sunburn, and carries none of the risks associated with UV exposure. It is a completely different technology.",
      },
      {
        q: "How long is a session?",
        a: "10 minutes. Full-body exposure at clinical-grade output. Research shows that 10 minutes at the correct wavelength and irradiance delivers the full therapeutic dose — more time does not mean more benefit.",
      },
      {
        q: "How often should I come?",
        a: "Most people see results with 2–4 sessions per week. For recovery and performance, 3× weekly is optimal. For skin and longevity, 2× weekly is sufficient. Consistency matters more than frequency.",
      },
    ],
  },
  {
    category: "The Session",
    items: [
      {
        q: "Do I need to undress?",
        a: "Light cannot penetrate clothing, so the more skin exposed, the more effective the session. Most people remove their clothes entirely. Your cabin is completely private — no cameras, no windows. You are alone.",
      },
      {
        q: "Is it safe for my eyes?",
        a: "The panels emit bright red light that can be uncomfortable to look at directly. We provide eye protection in every cabin. You can also simply close your eyes — many people find the session meditative.",
      },
      {
        q: "Will I feel anything during the session?",
        a: "You may feel a gentle warmth. There is no pain, no burning, no tingling. Most people describe it as deeply relaxing. Some notice improved energy within hours of their first session; others see cumulative effects over 2–4 weeks.",
      },
      {
        q: "Are there any contraindications?",
        a: "Red light therapy is safe for the vast majority of people. We recommend consulting your doctor if you are pregnant, have active cancer, are taking photosensitising medications, or have a condition that affects light sensitivity.",
      },
    ],
  },
  {
    category: "The Studio",
    items: [
      {
        q: "How does the autonomous studio work?",
        a: "You book via the Redvive app. At your reserved time, your phone unlocks the studio door and your cabin door. The session starts automatically. When it ends, you walk out. Fully autonomous — the technology handles everything.",
      },
      {
        q: "What if something goes wrong during my session?",
        a: "Every cabin has an emergency stop button and a direct line to our support team, available 24/7. You are never truly alone — just undisturbed.",
      },
      {
        q: "Where is the first studio?",
        a: "Helsinki, opening in 2026. Join the waitlist to get priority access and the founding member rate.",
      },
    ],
  },
  {
    category: "Membership & Pricing",
    items: [
      {
        q: "How much does it cost?",
        a: "The founding member rate is €25 per month — available exclusively to waitlist members before we open. Once claimed, it is locked in for life. No price increases, ever.",
      },
      {
        q: "What does €25/month include?",
        a: "Unlimited sessions per month at the founding price. Final session structure will be confirmed at launch, but founding members will always pay €25/month — regardless of how pricing evolves.",
      },
      {
        q: "What happens to my price when you expand?",
        a: "Nothing. Your founding member rate never changes. Not when we open a second location, not when we raise standard pricing, not ever. That is the founding member promise.",
      },
      {
        q: "Can I cancel my subscription?",
        a: "Yes, at any time. No notice period, no cancellation fees. We don't believe in commitment traps.",
      },
      {
        q: "Is the waitlist free?",
        a: "Yes. No cost, no commitment. You are simply reserving your place in line for priority booking and the €25/month founding rate.",
      },
    ],
  },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b"
      style={{ borderColor: "#E8D8D4" }}
    >
      <button
        className="w-full text-left py-5 flex items-start justify-between gap-4"
        onClick={() => setOpen(!open)}
      >
        <span
          className="text-sm font-semibold text-[#1A1008] leading-snug"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {q}
        </span>
        <span
          className="flex-shrink-0 w-5 h-5 flex items-center justify-center transition-transform duration-200"
          style={{
            color: "#C01A07",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            fontSize: "1.2rem",
            lineHeight: 1,
            marginTop: "1px",
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div className="pb-5">
          <p
            className="text-sm leading-relaxed text-[#7A5A54]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {a}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  useReveal();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFF9F9" }}>
      <Navbar />

      {/* ── PAGE HERO ── */}
      <section
        className="relative min-h-[60vh] flex flex-col justify-end overflow-hidden"
        style={{ backgroundColor: "#0A0303" }}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          poster={BLUR_IMAGE}
          style={{ opacity: 0.45 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(10,3,3,0.62) 0%, rgba(10,3,3,0.28) 40%, rgba(10,3,3,0.88) 100%)",
          }}
        />
        <div className="relative z-10 container pb-20 pt-32">
          <div className="max-w-2xl">
            <span
              className="text-[0.65rem] font-semibold tracking-[0.22em] uppercase mb-6 block"
              style={{ color: "rgba(250,135,67,0.85)", fontFamily: "'DM Sans', sans-serif" }}
            >
              FAQ
            </span>
            <h1
              className="text-5xl md:text-7xl font-bold text-white leading-[0.95]"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}
            >
              direct<br />
              <em style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontStyle: "italic" }}>
                answers.
              </em>
            </h1>
          </div>
        </div>
      </section>

      {/* Feathered: dark → rose-white */}
      <div style={{ height: "200px", background: "linear-gradient(to bottom, #0A0303 0%, #FFF9F9 100%)" }} />

      {/* ── FAQ CONTENT ── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#FFF9F9" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {faqs.map((group, gi) => (
              <div key={gi} className="reveal mb-16" style={{ transitionDelay: `${gi * 80}ms` }}>
                <div className="flex items-center gap-4 mb-8">
                  <span
                    className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase"
                    style={{ color: "#C01A07", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {group.category}
                  </span>
                  <div className="flex-1 h-px" style={{ backgroundColor: "#E8D8D4" }} />
                </div>
                <div>
                  {group.items.map((item, ii) => (
                    <AccordionItem key={ii} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section
        className="relative py-32 md:py-40 overflow-hidden"
        style={{ backgroundColor: "#0A0303" }}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          poster={BLUR_IMAGE}
          style={{ opacity: 0.25 }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(10,3,3,0.75)" }} />
        <div className="relative z-10 container">
          <div className="max-w-lg mx-auto text-center reveal">
            <span
              className="text-[0.65rem] font-semibold tracking-[0.22em] uppercase mb-6 block"
              style={{ color: "#FA8743", fontFamily: "'DM Sans', sans-serif" }}
            >
              Helsinki · Opening 2026
            </span>
            <h2
              className="text-4xl md:text-6xl font-bold text-white mb-4 leading-[1.05]"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}
            >
              Still unsure?<br />
              <em style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontStyle: "italic" }}>
                Try it first.
              </em>
            </h2>
            <p
              className="text-white/50 text-sm mb-10 leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Join the waitlist. Founding members get the first 48 hours — exclusive access before anyone else. At €25/month, locked in for life.
            </p>
            <a href="/#waitlist">
              <button className="btn-primary mx-auto">
                Join the Waitlist — No Cost
              </button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
