/*
 * REDVIVE — The Experience Page
 * Design: Abstract blur hero, step-by-step session flow
 * Palette flow: #0A0303 hero → #FFF9F9 intro → #F5EDEB steps → #1A1008 technology → #F5EDEB who it's for → #FFF9F9 CTA
 * Tone: Direct, calm — educates on red light therapy while describing the experience
 * Every section earns its place: mechanism + sensory feeling, not just logistics
 * No hyphens in copy.
 * i18n: useTranslation() for all copy
 */

import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { useTranslation } from "@/lib/translations";
import { scrollToWaitlist } from "@/lib/scrollToWaitlist";

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

export default function Experience() {
  useReveal();
  const t = useTranslation();

  const steps = [
    {
      num: "01",
      headline: t("exp.step1.label"),
      body: t("exp.step1.body"),
      detail: "",
    },
    {
      num: "02",
      headline: t("exp.step2.label"),
      body: t("exp.step2.body"),
      detail: t("exp.step2.sub"),
    },
    {
      num: "03",
      headline: t("exp.step3.label"),
      body: t("exp.step3.body"),
      detail: t("exp.step3.sub"),
    },
  ];

  const whoRows = [
    { num: "01", headline: t("exp.who.1.title"), body: t("exp.who.1.body") },
    { num: "02", headline: t("exp.who.2.title"), body: t("exp.who.2.body") },
    { num: "03", headline: t("exp.who.3.title"), body: t("exp.who.3.body") },
    { num: "04", headline: t("exp.who.4.title"), body: t("exp.who.4.body") },
  ];

  const specs = [
    { value: "660nm", label: t("exp.spec.red") },
    { value: "850nm", label: t("exp.spec.nir") },
    { value: "10 min", label: t("exp.spec.session") },
    { value: "24/7", label: t("exp.spec.open") },
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
        className="relative min-h-[70vh] flex flex-col justify-end overflow-hidden"
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
              {t("exp.eyebrow")}
            </motion.span>
            <motion.div variants={heroItem}>
              <h1
                className="text-5xl md:text-7xl font-bold text-white leading-[0.95]"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}
              >
                {t("exp.hero1")}
              </h1>
            </motion.div>
            {t("exp.hero2") && (
              <motion.div variants={heroItem}>
                <h1
                  className="text-5xl md:text-7xl leading-[0.95] mt-2"
                  style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontStyle: "italic", letterSpacing: "-0.01em", color: "rgba(255,255,255,0.75)" }}
                >
                  {t("exp.hero2")}
                </h1>
              </motion.div>
            )}
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
              {t("exp.intro")}
            </p>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY BLOCK ── */}
      <section className="py-16 md:py-20" style={{ backgroundColor: "#FFF9F9" }}>
        <div className="container">
          <div className="max-w-3xl reveal">
            <span className="section-label block mb-6">{t("exp.philosophy.eyebrow")}</span>
            <h2
              className="text-3xl md:text-5xl font-bold text-[#1A1008] mb-12"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em" }}
            >
              {(() => {
                const title = t("exp.philosophy.title");
                const lastSpace = title.lastIndexOf(" ");
                return (
                  <>
                    <span>{title.slice(0, lastSpace + 1)}</span>
                    <em style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontStyle: "italic", color: "#7A4A42" }}>{title.slice(lastSpace + 1)}</em>
                  </>
                );
              })()}
            </h2>
            <div className="flex flex-col">
              {(["exp.philosophy.line1", "exp.philosophy.line2", "exp.philosophy.line3"] as const).map((key, i) => (
                <div
                  key={i}
                  className="reveal py-5"
                  style={{ borderTop: "1px solid rgba(26,16,8,0.10)", transitionDelay: `${i * 80}ms` }}
                >
                  <p
                    className="text-lg md:text-xl font-light text-[#3D1A14]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {t(key)}
                  </p>
                </div>
              ))}
            </div>
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
              <span className="section-label block mb-4">{t("hiw.label")}</span>
              <h2
                className="text-3xl md:text-5xl font-bold text-[#1A1008]"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em" }}
              >
                {t("hiw.sub").split(".")[0]}.<br />
                <em style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontStyle: "normal" }}>
                  {t("hiw.sub").split(". ")[1] ?? ""}
                </em>
              </h2>
            </div>

            <div className="flex flex-col">
              {steps.map((step, i) => (
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
                    </div>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#7A5A54", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {step.body.split(/(660 nm|850 nm)/g).map((part, idx) =>
                        part === "660 nm" || part === "850 nm"
                          ? <span key={idx} style={{ color: "#D53E0F" }}>{part}</span>
                          : part
                      )}
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
              <span className="section-label block mb-6" style={{ color: "#D53E0F" }}>{t("exp.studio.label")}</span>
              <h2
                className="text-3xl md:text-5xl font-bold leading-[1.1] mb-6 text-white"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em" }}
              >
                {t("exp.studio.title").split(". ")[0]}.<br />
                <em style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontStyle: "normal", color: "#D53E0F" }}>
                  {t("exp.studio.title").split(". ").slice(1).join(". ")}
                </em>
              </h2>
              <span className="brand-rule mb-8" style={{ backgroundColor: "#D53E0F" }} />
            </div>
            <div className="reveal grid md:grid-cols-2 gap-12 mb-16">
              <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {t("exp.studio.body1")}
              </p>
              <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {t("exp.studio.body2")}
              </p>
            </div>
            {/* Spec pills */}
            <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-px" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
              {specs.map((spec, i) => (
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
              <span className="section-label block mb-4">{t("who.label")}</span>
              <h2
                className="text-3xl md:text-5xl font-bold text-[#1A1008]"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em" }}
              >
                {(() => { const s = t("exp.who.sub"); const i = s.lastIndexOf(" "); return i === -1 ? s : s.slice(0, i); })()}<br />
                <em style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontStyle: "normal", color: "#D53E0F" }}>
                  {(() => { const s = t("exp.who.sub"); const i = s.lastIndexOf(" "); return i === -1 ? "" : s.slice(i + 1); })()}
                </em>
              </h2>
            </div>

            <div className="flex flex-col">
              {whoRows.map((row, i) => (
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
              {t("home.hero.eyebrow")}
            </span>
            <h2
              className="text-4xl md:text-6xl font-bold text-white mb-4 leading-[1.05]"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}
            >
              {t("cta.headline1")}<br />
              <em style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontStyle: "normal" }}>
                {t("cta.headline2")}
              </em>
            </h2>
            <p
              className="text-white/50 text-sm mb-10 leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {t("exp.cta.body")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary" onClick={scrollToWaitlist}>{t("nav.reserve")}</button>
              <Link href="/science">
                <button className="btn-ghost" style={{ color: "rgba(255,249,249,0.7)", borderColor: "rgba(255,255,255,0.15)" }}>{t("exp.cta.link")}</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
