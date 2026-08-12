/*
 * REDVIVE — Home Page
 * Design: Abstract motion blur hero (full-bleed), text floating over image
 * Palette: #0A0303 dark / #FFF9F9 rose-white / #F5EDEB blush / #1A1008 near-black
 * Sections flow seamlessly — no hard breaks
 * Mobile-first, editorial, left-anchored
 *
 * Structure (conversion-optimised):
 *   Hero (headline + subline + form) → Proof micro-bar → How It Works → Pricing → What It Does → Who It Is For → Waitlist CTA
 * No hyphens anywhere in copy.
 * i18n: useTranslation() + useLanguage() for all copy and form language routing
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/lib/translations";
import { useLanguage } from "@/contexts/LanguageContext";

const HERO_IMG_DESKTOP = "https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/hero-desktop_07a3adf7.webp";
const HERO_IMG_MOBILE = "https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/hero-mobile_16619120.webp";

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

function WaitlistForm({ dark = true }: { dark?: boolean }) {
  const t = useTranslation();
  const { language } = useLanguage();

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [consent, setConsent] = useState(false);
  const [interest, setInterest] = useState<string | null>(null);
  const [segExpanded, setSegExpanded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [foundingNumber, setFoundingNumber] = useState<string | null>(null);
  const [isFounding, setIsFounding] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim()) {
      setError(t("form.err.firstname"));
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError(t("form.err.email"));
      return;
    }
    if (!consent) {
      setError(t("form.err.consent"));
      return;
    }

    setLoading(true);
    const eventId = (typeof crypto !== 'undefined' && crypto.randomUUID)
      ? crypto.randomUUID()
      : String(Date.now()) + Math.random();
    const marketingConsent = (window as any).Cookiebot?.consent?.marketing === true;
    try {
      const res = await fetch("/api/waitlist-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          firstName: firstName.trim(),
          language,
          consent: true,
          postalCode: postalCode.trim() || undefined,
          interest: interest || undefined,
          eventId,
          marketingConsent,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setIsFounding(data.founding === true);
          setFoundingNumber(data.foundingNumber ?? null);
          setSubmitted(true);
          if (marketingConsent && typeof (window as any).fbq === 'function') {
            (window as any).fbq('track', 'Lead',
              { content_name: 'Redvive waitlist', currency: 'EUR', value: 0 },
              { eventID: eventId }
            );
          }
          return;
        }
      }

      if (res.status === 400) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || t("form.err.email"));
      } else {
        setError(t("form.err.generic"));
      }
    } catch {
      setError(t("form.err.generic"));
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    const successLine = isFounding && foundingNumber
      ? t("form.founding_member").replace("{n}", foundingNumber)
      : isFounding === false
        ? t("form.general_waitlist")
        : t("form.success_title");
    return (
      <div
        className="text-center py-6 flex flex-col items-center gap-3"
        style={{ animation: "fadeSlideUp 0.55s ease-out both" }}
      >
        {/* Animated checkmark circle */}
        <svg
          width="40" height="40" viewBox="0 0 40 40" fill="none"
          style={{ animation: "successPop 0.45s cubic-bezier(0.34,1.56,0.64,1) both" }}
        >
          <circle cx="20" cy="20" r="19" stroke="#D53E0F" strokeWidth="1.5" fill="none"
            style={{
              strokeDasharray: 120,
              strokeDashoffset: 0,
              animation: "drawCircle 0.5s ease-out both"
            }}
          />
          <polyline
            points="12,21 18,27 29,14"
            stroke="#D53E0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"
            style={{
              strokeDasharray: 30,
              strokeDashoffset: 0,
              animation: "drawCheck 0.35s 0.3s ease-out both"
            }}
          />
        </svg>
        <p className={`text-sm font-medium tracking-wide ${dark ? "text-white" : "text-[#1A1008]"}`}>{successLine}</p>
        <p className={`text-xs ${dark ? "text-white/60" : "text-[#7A5A54]"}`}>{t("form.success_sub")}</p>
        <style>{`
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(12px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes successPop {
            from { opacity: 0; transform: scale(0.6); }
            to   { opacity: 1; transform: scale(1); }
          }
          @keyframes drawCircle {
            from { stroke-dashoffset: 120; }
            to   { stroke-dashoffset: 0; }
          }
          @keyframes drawCheck {
            from { stroke-dashoffset: 30; }
            to   { stroke-dashoffset: 0; }
          }
        `}</style>
      </div>
    );
  }

  const inputClass = dark
    ? "w-full bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-3 text-sm focus:outline-none focus:border-white/50 transition-colors"
    : "w-full bg-[#1A1008]/5 border border-[#1A1008]/15 text-[#1A1008] placeholder-[#7A5A54]/60 px-4 py-3 text-sm focus:outline-none focus:border-[#1A1008]/30 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
      <input
        type="text"
        required
        placeholder={t("form.firstname_placeholder")}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className={inputClass}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      />
      <input
        type="email"
        required
        placeholder={t("form.email")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      />
      <input
        type="text"
        placeholder={t("form.postal_placeholder")}
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        className={inputClass}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      />
      {/* GDPR consent checkbox */}
      <label className="flex items-start gap-3 cursor-pointer group text-left">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 flex-shrink-0 accent-[#D53E0F] w-3.5 h-3.5 cursor-pointer"
        />
        <span
          className="text-[0.65rem] leading-relaxed"
          style={{ color: dark ? "rgba(255,255,255,0.35)" : "rgba(26,16,8,0.45)", fontFamily: "'DM Sans', sans-serif" }}
        >
          {t("form.consent")}{" "}
          <a
            href={t("footer.privacy_path")}
            className="underline underline-offset-2 hover:opacity-80 transition-opacity"
            style={{ color: dark ? "rgba(255,255,255,0.45)" : "rgba(26,16,8,0.55)" }}
          >
            {t("form.consent_link")}
          </a>
          .
        </span>
      </label>
      {/* ── SEGMENTATION: "what brought you here?" ── */}
      <div className="w-full">
        <button
          type="button"
          onClick={() => setSegExpanded(!segExpanded)}
          className="text-left w-full flex items-center justify-between"
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: dark ? "rgba(255,255,255,0.45)" : "rgba(26,16,8,0.5)", cursor: "pointer", background: "none", border: "none", padding: "4px 0" }}
          aria-expanded={segExpanded}
        >
          <span>{t("seg.question")}</span>
          <span style={{ fontSize: "0.6rem", opacity: 0.6, transition: "transform 0.2s", transform: segExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
        </button>
        <div
          style={{
            maxHeight: segExpanded ? "120px" : "0px",
            opacity: segExpanded ? 1 : 0,
            overflow: "hidden",
            transition: "max-height 0.2s ease, opacity 0.2s ease",
          }}
        >
          <p className="text-[0.6rem] mb-2" style={{ color: dark ? "rgba(255,255,255,0.3)" : "rgba(26,16,8,0.4)", fontFamily: "'DM Sans', sans-serif" }}>
            {t("seg.helper")}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-1" role="radiogroup" aria-label={t("seg.question")}>
            {(["skin", "recovery", "sleep", "energy", "curious"] as const).map((key) => {
              const selected = interest === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setInterest(selected ? null : key)}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.6rem",
                    fontWeight: 500,
                    padding: "4px 10px",
                    borderRadius: "999px",
                    border: selected ? "1px solid #D53E0F" : `1px solid ${dark ? "rgba(255,255,255,0.15)" : "rgba(26,16,8,0.15)"}`,
                    backgroundColor: selected ? "rgba(213,62,15,0.15)" : "transparent",
                    color: selected ? "#D53E0F" : dark ? "rgba(255,255,255,0.5)" : "rgba(26,16,8,0.5)",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {t(`seg.${key}`)}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.55rem", color: dark ? "rgba(255,255,255,0.3)" : "rgba(26,16,8,0.35)", background: "none", border: "none", cursor: "pointer", padding: "2px 0" }}
          >
            {t("seg.skip")}
          </button>
        </div>
      </div>
      {error && (
        <p className="text-xs" style={{ color: "#D53E0F", fontFamily: "'DM Sans', sans-serif" }}>{error}</p>
      )}
      <button
        type="submit"
        className="btn-primary justify-center w-full"
        disabled={loading || !consent}
        style={{ opacity: (loading || !consent) ? 0.5 : 1, transition: "opacity 0.2s", position: "relative" }}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              width="16" height="16" viewBox="0 0 16 16" fill="none"
              style={{ animation: "spinCW 0.75s linear infinite", flexShrink: 0 }}
            >
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"
                strokeDasharray="28" strokeDashoffset="10" strokeLinecap="round" />
            </svg>
            {t("form.sending")}
            <style>{`
              @keyframes spinCW {
                from { transform: rotate(0deg); }
                to   { transform: rotate(360deg); }
              }
            `}</style>
          </span>
        ) : t("form.submit")}
      </button>
      <p className={`text-xs text-center ${dark ? "text-white/40" : "text-[#7A5A54]/60"}`}>{t("form.no_payment")}</p>
    </form>
  );
}

export default function Home() {
  useReveal();
  const t = useTranslation();

  // Smooth-scroll to #waitlist when arriving via /#waitlist hash link
  useEffect(() => {
    if (window.location.hash === "#waitlist") {
      const el = document.getElementById("waitlist");
      if (el) {
        // Small delay to let the page paint before scrolling
        const timer = setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 120);
        return () => clearTimeout(timer);
      }
    }
  }, []);
  // ── SEO: dynamic title, meta description, hreflang ──
  const { language } = useLanguage();
  useEffect(() => {
    if (language === "fi") {
      document.title = "redvive — suomen ensimmäinen automatisoitu punavalostudio | helsinki";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", "yksityistä punavaloa helsingissä, auki 24/7. liity jonotuslistalle ja lukitse perustajahinta 29 €/kk elinikäisesti — vain 99 paikkaa.");
    } else {
      document.title = "Redvive — Punavalohoito Helsinki | Red Light Therapy";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", "Private red light therapy studio in Helsinki, open 24/7. Join the waitlist and lock in the founding member rate of 29€/month for life — only 99 spots.");
    }
    // hreflang tags
    const existing = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existing.forEach(el => el.remove());
    const hreflangs = [
      { hreflang: "en", href: "https://redvivestudios.com/" },
      { hreflang: "fi", href: "https://redvivestudios.com/fi/" },
      { hreflang: "x-default", href: "https://redvivestudios.com/" },
    ];
    hreflangs.forEach(({ hreflang, href }) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = hreflang;
      link.href = href;
      document.head.appendChild(link);
    });
  }, [language]);

  const howBeats = [
    { title: t("hiw.step1.title"), body: t("hiw.step1.body") },
    { title: t("hiw.step2.title"), body: t("hiw.step2.body") },
    { title: t("hiw.step3.title"), body: t("hiw.step3.body") },
  ];

  const STATS = [
    { stat: t("carousel.skin"), label: t("carousel.skin_sub"), body: t("carousel.skin_body") },
    { stat: t("carousel.recovery"), label: t("carousel.recovery_sub"), body: t("carousel.recovery_body") },
    { stat: t("carousel.sleep"), label: t("carousel.sleep_sub"), body: t("carousel.sleep_body") },
  ];

  const whoLines = [
    t("who.1"),
    t("who.2"),
    t("who.3"),
    t("who.4"),
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

      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex flex-col justify-end overflow-hidden"
        style={{ backgroundColor: "#0A0303" }}
      >
        {/* Desktop image: 16:9 with human */}
        <img
          src={HERO_IMG_DESKTOP}
          alt=""
          aria-hidden="true"
          width="1920"
          height="1080"
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover hidden md:block"
          style={{ opacity: 0.85, willChange: "transform", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
        />
        {/* Mobile image: 9:16 with human */}
        <img
          src={HERO_IMG_MOBILE}
          alt=""
          aria-hidden="true"
          width="1080"
          height="1920"
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover block md:hidden"
          style={{ opacity: 0.85, willChange: "transform", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
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
          className="relative z-10 container pb-40 pt-40"
          variants={heroContainer}
          initial="hidden"
          animate="show"
        >
          <div className="max-w-xl">
            {/* Eyebrow */}
            <motion.p
              variants={heroItem}
              className="text-[0.65rem] font-semibold tracking-[0.22em] uppercase mb-6"
              style={{ color: "rgba(255,255,255,0.60)", fontFamily: "'DM Sans', sans-serif" }}
            >
              {t("home.hero.eyebrow")}
            </motion.p>

            {/* Headline line 1 — DM Sans bold */}
            {(() => {
              const line1 = t("home.hero.line1");
              // Split into preamble + last word (language-agnostic)
              const lastSpace1 = line1.lastIndexOf(" ");
              const pre1 = lastSpace1 >= 0 ? line1.slice(0, lastSpace1 + 1) : "";
              const last1 = lastSpace1 >= 0 ? line1.slice(lastSpace1 + 1) : line1;
              return (
                <motion.div variants={heroItem}>
                  <h1 className="mb-6">
                    {/* Line 1 — DM Sans bold */}
                    <span
                      className="block text-[42px] md:text-[72px] font-bold leading-[1.05]"
                      style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em", color: "rgba(255,255,255,0.72)" }}
                    >
                      <span>{pre1}</span>
                      <span style={{ color: "rgba(255,255,255,1)" }}>{last1}</span>
                    </span>
                    {/* Line 2 — Lora italic (only if non-empty) */}
                    {(() => {
                      const line2 = t("home.hero.line2");
                      if (!line2) return null;
                      const lastSpace2 = line2.lastIndexOf(" ");
                      const pre2 = lastSpace2 >= 0 ? line2.slice(0, lastSpace2 + 1) : "";
                      const last2 = lastSpace2 >= 0 ? line2.slice(lastSpace2 + 1) : line2;
                      return (
                        <span
                          className="block text-[42px] md:text-[72px] leading-[1.05]"
                          style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontStyle: "italic", letterSpacing: "-0.01em", color: "rgba(255,255,255,0.65)" }}
                        >
                          <span>{pre2}</span>
                          <span style={{ color: "rgba(255,255,255,1)" }}>{last2}</span>
                        </span>
                      );
                    })()}
                  </h1>
                </motion.div>
              );
            })()}

            {/* Hero subtitle — offer-led */}
            <motion.div variants={heroItem}>
              <p
                className="text-sm md:text-base leading-relaxed mb-4"
                style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans', sans-serif", maxWidth: "420px" }}
              >
                {t("home.hero.sub")}
              </p>
              {t("home.hero.offer") && (
                <p
                  className="text-sm md:text-base leading-relaxed mt-2"
                  style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, maxWidth: "420px" }}
                >
                  {t("home.hero.offer")}
                </p>
              )}
            </motion.div>
            {/* Waitlist form */}
            <motion.div variants={heroItem} className="max-w-md mb-4">
              <WaitlistForm dark={true} />
            </motion.div>
            {/* Disclosure line */}
            <motion.div variants={heroItem}>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif", fontStyle: "italic", maxWidth: "420px" }}
              >
                {t("home.hero.disclosure")}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10">
          <svg
            width="18" height="18" viewBox="0 0 18 18" fill="none"
            style={{ color: "#D53E0F", animation: "chevronBounce 2s ease-in-out infinite" }}
          >
            <path d="M3 6l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-white/30 text-[0.55rem] tracking-[0.18em] uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {t("home.hero.scroll")}
          </span>
        </div>
      </section>


      {/* ── FEATHERED TRANSITION: dark → rose-white ── */}
      <div style={{ height: "140px", background: "linear-gradient(to bottom, #0A0303 0%, #3D1A14 20%, #8B5E56 50%, #D4B8B4 75%, #FFF9F9 100%)" }} />

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#FFF9F9" }}>
        <div className="container">
          <div className="max-w-4xl mx-auto">

            <div className="reveal mb-16">
              <span className="section-label block mb-6">{t("hiw.label")}</span>
              <h2
                className="text-4xl md:text-6xl font-bold leading-[1.05]"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em", color: "#1A1008" }}
              >
                {t("hiw.sub").split(".")[0]}.<br />
                <em style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontStyle: "normal" }}>
                  {t("hiw.sub").split(". ")[1] ?? ""}
                </em>
              </h2>
            </div>

            <div className="flex flex-col">
              {howBeats.map((beat, i) => (
                <div
                  key={i}
                  className="reveal flex items-start gap-5"
                  style={{
                    borderTop: "1px solid rgba(26,16,8,0.1)",
                    paddingTop: "1.5rem",
                    paddingBottom: "1.5rem",
                    transitionDelay: `${i * 60}ms`,
                  }}
                >
                  <span
                    className="shrink-0 text-[0.6rem] font-semibold tracking-[0.2em] uppercase mt-[3px]"
                    style={{ color: "#D53E0F", fontFamily: "'DM Sans', sans-serif", minWidth: "28px" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p
                    className="text-base md:text-lg leading-snug"
                    style={{ color: "#1A1008", fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.01em" }}
                  >
                    <span className="font-semibold">{beat.title}</span>{" "}
                    <span style={{ color: "rgba(26,16,8,0.55)" }}>{beat.body}</span>
                  </p>
                </div>
              ))}
              <div style={{ borderTop: "1px solid rgba(26,16,8,0.1)" }} />
            </div>

            {/* Experience CTA */}
            <div className="reveal mt-14">
              <Link href="/experience">
                <button className="btn-ghost">{t("hiw.cta")}</button>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── THE APP ── */}
      <section className="py-24 md:py-36" style={{ backgroundColor: "#FFF9F9" }}>
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 lg:gap-24">

            {/* Mobile: phone first — hidden on md+ */}
            <div className="w-full flex justify-center md:hidden reveal">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/app-mockup-transparent_c5fab88c.png"
                alt="redvive app — book a session screen"
                width="320"
                height="420"
                loading="lazy"
                className="w-[260px] object-contain"
                style={{ filter: "drop-shadow(0 24px 48px rgba(28,26,25,0.18))" }}
              />
            </div>

            {/* Left: text */}
            <div className="flex-1 reveal">
              <span
                className="section-label block mb-5"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
{t("app.label")}
              </span>
              <h2
                className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.05] mb-6"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#1c1a19", letterSpacing: "-0.03em" }}
              >
{t("app.headline")}
              </h2>
              <p
                className="text-base md:text-lg leading-relaxed mb-10 max-w-md"
                style={{ color: "#6f6763", fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}
              >
{t("app.body")}
              </p>

            </div>

            {/* Right: phone mockup — desktop only */}
            <div className="hidden md:flex flex-1 justify-center md:justify-end reveal">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/app-mockup-transparent_c5fab88c.png"
                alt="redvive app — book a session screen"
                width="420"
                height="560"
                loading="lazy"
                className="w-[300px] lg:w-[380px] object-contain"
                style={{ filter: "drop-shadow(0 32px 64px rgba(28,26,25,0.20))" }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── FEATHERED TRANSITION: rose-white → deep dark ── */}
      <div style={{ height: "220px", background: "linear-gradient(to bottom, #FFF9F9 0%, #D4B8B4 25%, #8B5E56 50%, #3D1A14 80%, #1A1008 100%)" }} />

      {/* ── FOUNDING MEMBER PRICING ── */}
      <section className="py-24 md:py-36" style={{ backgroundColor: "#1A1008" }}>
        <div className="container">

          {/* Section label */}
          <div className="reveal text-center mb-6">
            <span className="section-label">{t("pricing.title")}</span>
          </div>

          {/* Monument price */}
          <div className="reveal text-center mb-6">
            <div className="flex items-baseline justify-center gap-3 md:gap-5 flex-wrap">
              <span
                className="text-[5rem] sm:text-[7rem] md:text-[10rem] lg:text-[13rem] font-bold leading-none"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.04em", color: "#FFF9F9" }}
              >
                {t("pricing.amount")}
              </span>
              <span
                className="text-xl sm:text-2xl md:text-3xl font-normal self-end pb-3 md:pb-6"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,249,249,0.5)" }}
              >
                {t("pricing.period")}
              </span>
            </div>
          </div>

          {/* Serif sub-headline */}
          <div className="reveal text-center mb-6">
            <p
              className="text-2xl sm:text-3xl md:text-4xl"
              style={{ fontFamily: "'Lora', serif", fontWeight: 400, color: "#FFF9F9" }}
            >
              {t("pricing.locked")}
            </p>
          </div>

          {/* Body copy */}
          <div className="reveal text-center mb-16">
            <p
              className="text-sm md:text-base leading-relaxed max-w-lg mx-auto"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,249,249,0.55)" }}
            >
              {t("pricing.body")}
            </p>
          </div>

          {/* Thin rule */}
          <div className="reveal max-w-2xl mx-auto mb-16">
            <div className="h-px w-full" style={{ backgroundColor: "rgba(255,249,249,0.10)" }} />
          </div>

          {/* Two value facts */}
          <div className="reveal grid grid-cols-1 sm:grid-cols-3 gap-px max-w-2xl mx-auto" style={{ backgroundColor: "rgba(255,249,249,0.08)" }}>
            {[
              { stat: t("pricing.stat1_num"), label: t("pricing.stat1_label"), body: "" },
              { stat: t("pricing.stat2_num"), label: t("pricing.stat2_label"), body: "" },
              { stat: t("pricing.stat3_num"), label: t("pricing.stat3_label"), body: "" },
            ].map((item, i) => (
              <div
                key={i}
                className="px-6 py-10 flex flex-col text-center"
                style={{ backgroundColor: "#1A1008", transitionDelay: `${i * 100}ms`, minHeight: "180px" }}
              >
                <p
                  className="text-4xl md:text-5xl font-bold mb-3"
                  style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.04em", color: "#D53E0F" }}
                >
                  {item.stat}
                </p>
                {item.label && (
                  <p
                    className="text-xs font-semibold tracking-[0.14em] uppercase flex-1"
                    style={{ color: "rgba(255,249,249,0.40)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {item.label}
                  </p>
                )}
                <span className="brand-rule mx-auto mt-4" />
              </div>
            ))}
          </div>

          {/* Footnote */}
          <div className="reveal text-center mt-8">
            <p className="text-xs" style={{ color: "rgba(255,249,249,0.25)", fontFamily: "'DM Sans', sans-serif" }}>
              {t("pricing.footnote")}
            </p>
          </div>

        </div>
      </section>

      {/* ── FEATHERED TRANSITION: dark → rose-white ── */}
      <div style={{ height: "280px", background: "linear-gradient(to bottom, #1A1008 0%, #3D1A14 15%, #7A4A42 35%, #B89490 55%, #E0D0CC 75%, #F5EDEB 88%, #FFF9F9 100%)" }} />

      {/* ── WHAT IT DOES (CAROUSEL) ── */}
      <div style={{ backgroundColor: "#FFF9F9" }}>
        <div className="container pb-4">
          <div className="reveal mb-2">
            <span className="section-label">{t("carousel.label")}</span>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "#FFF9F9", overflow: "hidden" }}>
        <div className="relative py-10 md:py-14" style={{ overflow: "hidden" }}>
          <div
            className="flex"
            style={{
              animation: "statsScroll 22s linear infinite",
              width: "max-content",
            }}
          >
            {[...STATS, ...STATS, ...STATS].map((item, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex flex-col items-center text-center px-10 md:px-14"
                style={{
                  width: "280px",
                  borderRight: "1px solid rgba(26,16,8,0.07)",
                }}
              >
                <div className="flex items-end justify-center" style={{ height: "80px", flexShrink: 0 }}>
                  <p
                    className="font-bold leading-none"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "3rem", letterSpacing: "-0.04em", color: "#D53E0F" }}
                  >
                    {item.stat}
                  </p>
                </div>
                <div className="flex items-center justify-center" style={{ height: "32px", flexShrink: 0 }}>
                  <p className="text-[0.6rem] font-semibold tracking-[0.18em] uppercase" style={{ color: "rgba(26,16,8,0.40)", fontFamily: "'DM Sans', sans-serif" }}>
                    {item.label}
                  </p>
                </div>
                <div className="w-6 h-px mb-5 mt-1" style={{ backgroundColor: "#D53E0F", flexShrink: 0 }} />
                <div className="flex items-start justify-center" style={{ height: "80px", flexShrink: 0 }}>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(26,16,8,0.50)", fontFamily: "'DM Sans', sans-serif", maxWidth: "200px" }}>
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-16 pointer-events-none" style={{ background: "linear-gradient(to right, #FFF9F9 0%, transparent 100%)" }} />
          <div className="absolute inset-y-0 right-0 w-16 pointer-events-none" style={{ background: "linear-gradient(to left, #FFF9F9 0%, transparent 100%)" }} />
        </div>
        <div className="flex justify-center py-8 px-8" style={{ borderTop: "1px solid rgba(26,16,8,0.07)" }}>
          <Link href="/science">
            <button className="btn-ghost">{t("carousel.cta")}</button>
          </Link>
        </div>
      </div>

      {/* ── FEATHERED TRANSITION: rose-white → dark ── */}
      <div style={{ height: "280px", background: "linear-gradient(to bottom, #FFF9F9 0%, #EDE3DF 15%, #C9A89E 35%, #7A4A42 55%, #3D1A14 75%, #1A1008 90%, #0A0303 100%)" }} />

      {/* ── WHO IT IS FOR ── */}
      <section className="py-24 md:py-36" style={{ backgroundColor: "#0A0303" }}>
        <div className="container">
          <div className="max-w-4xl mx-auto">

            <div className="reveal mb-16 text-center">
              <span
                className="text-[0.65rem] font-semibold tracking-[0.22em] uppercase block mb-6"
                style={{ color: "#D53E0F", fontFamily: "'DM Sans', sans-serif" }}
              >
                {t("who.label")}
              </span>
              <h2
                className="text-4xl md:text-6xl font-bold leading-[1.05] text-white"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em" }}
              >
                {(() => { const s = t("who.sub"); const i = s.lastIndexOf(" "); return i === -1 ? s : s.slice(0, i); })()}<br />
                <em style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontStyle: "normal" }}>
                  {(() => { const s = t("who.sub"); const i = s.lastIndexOf(" "); return i === -1 ? "" : s.slice(i + 1); })()}
                </em>
              </h2>
            </div>

            <div className="flex flex-col">
              {whoLines.map((line, i) => (
                <div
                  key={i}
                  className="reveal py-7 text-center"
                  style={{
                    borderTop: "1px solid rgba(255,249,249,0.08)",
                    transitionDelay: `${i * 70}ms`,
                  }}
                >
                  <p
                    className="text-base md:text-xl font-semibold text-white leading-snug mx-auto"
                    style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.02em", maxWidth: "600px" }}
                  >
                    {line}
                  </p>
                </div>
              ))}
              <div style={{ borderTop: "1px solid rgba(255,249,249,0.08)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── WAITLIST CTA — continues seamlessly from #0A0303 Who It Is For section ── */}
      <section
        id="waitlist"
        className="relative py-32 md:py-40 overflow-hidden"
        style={{ backgroundColor: "#0A0303" }}
      >
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(61,26,20,0.18) 0%, transparent 70%)" }} />
        <div className="relative z-10 container">
          <div className="max-w-lg mx-auto text-center">
            <div className="reveal">
              <span className="section-label block mb-6" style={{ color: "#D53E0F" }}>
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
              <p className="text-white/50 text-sm mb-10 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {t("cta.body")}
              </p>
              <WaitlistForm dark={true} />
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
        @keyframes dotBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.15; }
        }
        @keyframes chevronBounce {
          0%, 100% { transform: translateY(0); opacity: 0.7; }
          50% { transform: translateY(5px); opacity: 1; }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
