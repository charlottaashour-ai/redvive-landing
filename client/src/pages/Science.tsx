/*
 * REDVIVE — The Science Page
 * Design: No images. Pure typography + solid color blocks that flow seamlessly.
 * Palette flow: #0A0303 hero → #FFF9F9 intro → #F5EDEB wavelengths → #1A1008 mechanism → #F5EDEB benefits → #FFF9F9 CTA
 * Tone: Direct, evidence-based, calm — not clinical, not corporate
 */

import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";

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
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Science() {
  useReveal();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFF9F9" }}>
      <Navbar />

      {/* ── PAGE HERO — dark video ── */}
      <section
        className="relative min-h-[70vh] flex flex-col justify-end overflow-hidden"
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
              The Science
            </motion.span>
            <motion.div variants={heroItem}>
              <h1
                className="text-5xl md:text-7xl font-bold text-white leading-[0.95]"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}
              >
                light is
              </h1>
            </motion.div>
            <motion.div variants={heroItem}>
              <h1
                className="text-5xl md:text-7xl font-bold text-white leading-[0.95]"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}
              >
                <em style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontStyle: "normal" }}>
                  the medicine.
                </em>
              </h1>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Feathered: dark → rose-white */}
      <div style={{ height: "220px", background: "linear-gradient(to bottom, #0A0303 0%, #3D1A14 20%, #8B5E56 50%, #D4B8B4 75%, #FFF9F9 100%)" }} />

      {/* ── INTRO — rose-white ── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#FFF9F9" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto reveal">
            <p
              className="text-2xl md:text-3xl leading-relaxed font-light"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#1A1008", letterSpacing: "-0.01em" }}
            >
              Redvive uses clinically calibrated 660nm and 850nm light — the wavelengths most commonly associated with skin support and deeper tissue recovery. The science is serious. The experience is simple.
            </p>
          </div>
        </div>
      </section>

      {/* Feathered: rose-white → blush */}
      <div style={{ height: "160px", background: "linear-gradient(to bottom, #FFF9F9 0%, #EDE3DF 40%, #E8DCDA 70%, #F5EDEB 100%)" }} />

      {/* ── WAVELENGTHS — blush ── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#F5EDEB" }}>
        <div className="container">
          <div className="reveal mb-16 max-w-3xl mx-auto">
            <span className="section-label block mb-4">Two Wavelengths. One Protocol.</span>
          </div>

          <div className="grid md:grid-cols-2 gap-px max-w-4xl mx-auto" style={{ backgroundColor: "#E8D8D4" }}>
            {/* 660nm */}
            <div className="reveal bg-[#FFF9F9] p-10 lg:p-14">
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: "#D53E0F", boxShadow: "0 0 12px rgba(213,62,15,0.5)" }}
                />
                <div>
                  <p
                    className="text-4xl font-bold mb-1"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "#D53E0F", letterSpacing: "-0.03em" }}
                  >
                    660nm
                  </p>
                  <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#7A5A54]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Red Light
                  </p>
                </div>
              </div>
              <span className="brand-rule mb-6" />
              <h3
                className="text-xl font-bold mb-4 text-[#1A1008]"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.01em" }}
              >
                Skin first.
              </h3>
              <p className="text-[#7A5A54] text-sm leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Red light at 660nm supports the skin. It stimulates collagen production, reduces surface inflammation, and promotes a clearer, more even tone over time.
              </p>
              <p className="text-[#7A5A54] text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Skin comes first, but the effect starts here — at the surface, where most people notice results earliest.
              </p>
            </div>

            {/* 850nm */}
            <div className="reveal bg-[#FFF9F9] p-10 lg:p-14" style={{ transitionDelay: "100ms" }}>
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: "#D53E0F", boxShadow: "0 0 12px rgba(213,62,15,0.4)" }}
                />
                <div>
                  <p
                    className="text-4xl font-bold mb-1"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "#D53E0F", letterSpacing: "-0.03em" }}
                  >
                    850nm
                  </p>
                  <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#7A5A54]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Near-Infrared Light
                  </p>
                </div>
              </div>
              <span className="brand-rule mb-6" style={{ backgroundColor: "#D53E0F" }} />
              <h3
                className="text-xl font-bold mb-4 text-[#1A1008]"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.01em" }}
              >
                Then everything beneath it.
              </h3>
              <p className="text-[#7A5A54] text-sm leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Near-infrared at 850nm reaches deeper tissue — muscles, joints, and connective tissue. It activates the mitochondria, increasing your cells' natural energy output and supporting faster recovery.
              </p>
              <p className="text-[#7A5A54] text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                The result: less heaviness, better recovery, improved sleep quality, and a calmer baseline through the week.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feathered: blush → near-black */}
      <div style={{ height: "220px", background: "linear-gradient(to bottom, #F5EDEB 0%, #C9A89E 25%, #8B5E56 50%, #3D1A14 80%, #1A1008 100%)" }} />

      {/* ── THE MECHANISM — near-black ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#1A1008" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="reveal mb-12">
              <span className="section-label block mb-6" style={{ color: "#D53E0F" }}>The Mechanism</span>
              <h2
                className="text-3xl md:text-5xl font-bold leading-[1.1] mb-6 text-white"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em" }}
              >
                Your mitochondria<br />
                <em style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontStyle: "normal", color: "#D53E0F" }}>
                  do the work.
                </em>
              </h2>
              <span className="brand-rule mb-8" style={{ backgroundColor: "#D53E0F" }} />
            </div>
            <div className="reveal grid md:grid-cols-2 gap-12">
              <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Photobiomodulation is the mechanism behind red light therapy. When specific wavelengths of light reach your cells, they trigger a reaction in the mitochondria — increasing energy output, reducing oxidative stress, and activating natural repair pathways.
              </p>
              <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                This is not heat therapy. It is not UV. It is a precise, non-invasive signal that tells your cells to do what they were designed to do — just more efficiently. Backed by thousands of peer-reviewed studies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feathered: near-black → blush */}
      <div style={{ height: "220px", background: "linear-gradient(to bottom, #1A1008 0%, #3D1A14 20%, #8B5E56 50%, #C9A89E 75%, #F5EDEB 100%)" }} />

      {/* ── BENEFITS BY CATEGORY — blush ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#F5EDEB" }}>
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="reveal mb-16">
              <span className="section-label block mb-4">What It Does For You</span>
              <h2
                className="text-3xl md:text-5xl font-bold text-[#1A1008]"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em" }}
              >
                660nm for skin.<br />
                <em style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontStyle: "normal", color: "#D53E0F" }}>
                  850nm for everything beneath it.
                </em>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-px" style={{ backgroundColor: "#E8D8D4" }}>
              {[
                {
                  category: "Skin",
                  items: ["A clearer, more supported glow", "Stimulates collagen production", "Reduces surface inflammation", "Supports skin tone and texture"],
                },
                {
                  category: "Recovery",
                  items: ["Less heaviness, more ease", "Faster muscle repair", "Reduced joint discomfort", "Improved range of motion"],
                },
                {
                  category: "Energy & Sleep",
                  items: ["A better baseline through the week", "Improved sleep quality", "Reduced systemic inflammation", "A moment that helps your body switch gears"],
                },
              ].map((group, i) => (
                <div
                  key={i}
                  className="reveal bg-[#FFF9F9] p-10"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <p
                    className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase mb-4"
                    style={{ color: "#D53E0F", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {group.category}
                  </p>
                  <span className="brand-rule mb-6" />
                  <ul className="flex flex-col gap-3">
                    {group.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="text-[#D53E0F] mt-0.5 text-xs">—</span>
                        <span className="text-[#7A5A54] text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feathered: blush → rose-white */}
      <div style={{ height: "160px", background: "linear-gradient(to bottom, #F5EDEB 0%, #EDE3DF 30%, #E8DCDA 60%, #FFF9F9 100%)" }} />

      {/* ── THE RESULT — rose-white ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#FFF9F9" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto reveal">
            <span className="section-label block mb-6">The Result</span>
            <h2
              className="text-3xl md:text-5xl font-bold leading-[1.1] mb-6 text-[#1A1008]"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em" }}
            >
              Visible from<br />
              <em style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontStyle: "normal" }}>
                session one.
              </em>
            </h2>
            <span className="brand-rule mb-8" />
            <div className="grid md:grid-cols-2 gap-12">
              <p className="text-[#7A5A54] text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Most people notice a difference in skin tone and how their body feels after the first few sessions. Within 2–4 weeks of consistent use, the deeper effects — better sleep, faster recovery, a calmer baseline — become part of how your week feels.
              </p>
              <p className="text-[#7A5A54] text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Backed by thousands of peer-reviewed studies. Simple to use. Precise where it matters. The science is serious — the experience is just 10 minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#F5EDEB" }}>
        <div className="container">
          <div className="reveal max-w-xl mx-auto text-center">
            <h2
              className="text-3xl md:text-5xl font-bold leading-[1.1] mb-8 text-[#1A1008]"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em" }}
            >
              Ready to feel it<br />
              <em style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontStyle: "normal" }}>
                for yourself?
              </em>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#waitlist">
                <button className="btn-primary">Join the Waitlist</button>
              </a>
              <Link href="/experience">
                <button className="btn-ghost">See the Experience →</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
