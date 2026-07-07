/*
 * REDVIVE — FAQ Page
 * Design: Clean, direct, objection-handling
 * Tone: Calm, reassuring, direct — never defensive
 * i18n: useTranslation() for all copy
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/lib/translations";

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};
const heroItem = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, type: "tween" as const } },
};

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/hero-abstract-desktop_afb796a6.webp";
const HERO_IMG_MOBILE = "https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/hero-abstract-mobile_6f56db7e.webp";

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
  const t = useTranslation();

  const faqs = [
    {
      category: t("faq.cat1"),
      items: [
        { q: t("faq.q1"), a: t("faq.a1") },
        { q: t("faq.q2"), a: t("faq.a2") },
        { q: t("faq.q3"), a: t("faq.a3") },
        { q: t("faq.q4"), a: t("faq.a4") },
      ],
    },
    {
      category: t("faq.cat2"),
      items: [
        { q: t("faq.q5"), a: t("faq.a5") },
        { q: t("faq.q6"), a: t("faq.a6") },
        { q: t("faq.q7"), a: t("faq.a7") },
        { q: t("faq.q8"), a: t("faq.a8") },
      ],
    },
    {
      category: t("faq.cat3"),
      items: [
        { q: t("faq.q9"), a: t("faq.a9") },
        { q: t("faq.q10"), a: t("faq.a10") },
        { q: t("faq.q11"), a: t("faq.a11") },
      ],
    },
    {
      category: t("faq.cat4"),
      items: [
        { q: t("faq.q12"), a: t("faq.a12") },
        { q: t("faq.q13"), a: t("faq.a13") },
        { q: t("faq.q14"), a: t("faq.a14") },
        { q: t("faq.q15"), a: t("faq.a15") },
        { q: t("faq.q16"), a: t("faq.a16") },
      ],
    },
  ];

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
        className="relative min-h-[60vh] flex flex-col justify-end overflow-hidden"
        style={{ backgroundColor: "#0A0303" }}
      >
        <img
          src={HERO_IMG}
          srcSet={`${HERO_IMG_MOBILE} 768w, ${HERO_IMG} 1920w`}
          sizes="100vw"
          alt=""
          aria-hidden="true"
          width="1672"
          height="941"
          loading="eager"
          fetchPriority="high"
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
              {t("faq.eyebrow")}
            </motion.span>
            <motion.div variants={heroItem}>
              <h1 className="text-5xl md:text-7xl leading-[0.95]" style={{ letterSpacing: "-0.03em" }}>
                <span className="block font-bold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {t("faq.hero1")}
                </span>
                <span className="block font-bold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  <em style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontStyle: "normal" }}>
                    {t("faq.hero2")}
                  </em>
                </span>
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


      <Footer />
    </div>
  );
}
