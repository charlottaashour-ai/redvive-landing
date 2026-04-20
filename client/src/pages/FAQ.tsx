/*
 * REDVIVE — FAQ Page
 * Design: Clean, direct, objection-handling
 * Tone: Calm, reassuring, direct — never defensive
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};
const heroItem = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, type: "tween" as const } },
};

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
        a: "Red light therapy uses specific wavelengths of red and near-infrared light to support the body at a cellular level. At 660nm, red light supports the skin — stimulating collagen, reducing surface inflammation, and improving tone. At 850nm, near-infrared reaches deeper tissue to support recovery, energy and sleep. Backed by thousands of peer-reviewed studies.",
      },
      {
        q: "Is it the same as a tanning bed or UV light?",
        a: "No. Red light therapy uses visible red and near-infrared wavelengths — not UV. It does not tan your skin, does not cause sunburn, and carries none of the risks associated with UV exposure. It is a completely different technology.",
      },
      {
        q: "How long is a session?",
        a: "10 minutes. Full-body exposure at clinically calibrated output. Research shows that 10 minutes at the correct wavelength and irradiance delivers the full therapeutic dose. More time does not mean more benefit.",
      },
      {
        q: "How often should I come?",
        a: "Most people see results with 2–4 sessions per week. For skin support, 2× weekly is a good starting point. For recovery and energy, 3× weekly works well. Consistency matters more than frequency — the point is to make it a habit.",
      },
    ],
  },
  {
    category: "The Session",
    items: [
      {
        q: "Do I need to undress?",
        a: "Light cannot penetrate clothing, so the more skin exposed, the more effective the session. Most people remove their clothes entirely. Your room is completely private — no cameras, no windows, no staff. You are alone.",
      },
      {
        q: "Is it safe for my eyes?",
        a: "The panels emit bright red light that can be uncomfortable to look at directly. We provide eye protection in every cabin. You can also simply close your eyes — many people find the session meditative.",
      },
      {
        q: "Will I feel anything during the session?",
        a: "You may feel a gentle warmth. There is no pain, no burning, no tingling. Most people describe it as calm and meditative. Some notice a difference in skin tone or energy within the first few sessions. Deeper effects — better recovery, improved sleep, a calmer baseline — build over 2–4 weeks of consistent use.",
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
        a: "You book on your phone. At your reserved time, your phone unlocks the door. Your private room is ready. The session starts automatically. When it ends, you walk out. No staff, no check-in, no complexity.",
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
        a: "Yes. No payment, no commitment. You are simply reserving your place for priority booking and the €25/month founding rate.",
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
            color: "#D53E0F",
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
              FAQ
            </motion.span>
            <motion.div variants={heroItem}>
              <h1
                className="text-5xl md:text-7xl font-bold text-white leading-[0.95]"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}
              >
                direct
              </h1>
            </motion.div>
            <motion.div variants={heroItem}>
              <h1
                className="text-5xl md:text-7xl font-bold text-white leading-[0.95]"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}
              >
                <em style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontStyle: "normal" }}>
                  answers.
                </em>
              </h1>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Feathered: dark → rose-white */}
      <div style={{ height: "220px", background: "linear-gradient(to bottom, #0A0303 0%, #3D1A14 20%, #8B5E56 50%, #D4B8B4 75%, #FFF9F9 100%)" }} />

      {/* ── FAQ CONTENT ── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#FFF9F9" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {faqs.map((group, gi) => (
              <div key={gi} className="reveal mb-16" style={{ transitionDelay: `${gi * 80}ms` }}>
                <div className="flex items-center gap-4 mb-8">
                  <span
                    className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase"
                    style={{ color: "#D53E0F", fontFamily: "'DM Sans', sans-serif" }}
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
              style={{ color: "#D53E0F", fontFamily: "'DM Sans', sans-serif" }}
            >
              Born in Helsinki. Opening in Fall of 2026
            </span>
            <h2
              className="text-4xl md:text-6xl font-bold text-white mb-4 leading-[1.05]"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}
            >
              Still unsure?<br />
              <em style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontStyle: "normal" }}>
                Try it first.
              </em>
            </h2>
            <p
              className="text-white/50 text-sm mb-10 leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Join the waitlist for first access to Redvive studios in the capital region. Be first to hear about opening dates, founding rates and early access. No payment. No commitment.
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
