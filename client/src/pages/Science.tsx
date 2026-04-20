/*
 * REDVIVE — The Science Page
 * Design: No images. Pure typography + solid color blocks that flow seamlessly.
 * Palette flow: #0A0303 hero → #FFF9F9 intro → #F5EDEB wavelengths → #1A1008 mechanism → #F5EDEB benefits → #FFF9F9 CTA
 * Tone: Direct, evidence-based, calm — not clinical, not corporate
 */

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "wouter";

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
        <div className="relative z-10 container pb-20 pt-32">
          <div className="max-w-2xl">
            <span
              className="text-[0.65rem] font-semibold tracking-[0.22em] uppercase mb-6 block"
              style={{ color: "rgba(250,135,67,0.85)", fontFamily: "'DM Sans', sans-serif" }}
            >
              The Science
            </span>
            <h1
              className="text-5xl md:text-7xl font-bold text-white leading-[0.95]"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}
            >
              light is<br />
              <em style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontStyle: "italic" }}>
                the medicine.
              </em>
            </h1>
          </div>
        </div>
      </section>

      {/* Feathered: dark → rose-white */}
      <div style={{ height: "200px", background: "linear-gradient(to bottom, #0A0303 0%, #FFF9F9 100%)" }} />

      {/* ── INTRO — rose-white ── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#FFF9F9" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto reveal">
            <p
              className="text-2xl md:text-3xl leading-relaxed font-light"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#1A1008", letterSpacing: "-0.01em" }}
            >
              Over 5,000 peer-reviewed studies confirm what we know instinctively. The right wavelengths of light — 660nm and 850nm — restore what modern life depletes.
            </p>
          </div>
        </div>
      </section>

      {/* Feathered: rose-white → blush */}
      <div style={{ height: "120px", background: "linear-gradient(to bottom, #FFF9F9 0%, #F5EDEB 100%)" }} />

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
                  style={{ backgroundColor: "#C01A07", boxShadow: "0 0 12px rgba(192,26,7,0.5)" }}
                />
                <div>
                  <p
                    className="text-4xl font-bold mb-1"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "#C01A07", letterSpacing: "-0.03em" }}
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
                Skin. Collagen. Surface recovery.
              </h3>
              <p className="text-[#7A5A54] text-sm leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Red light at 660nm penetrates the skin's surface layers, stimulating fibroblasts to produce collagen and elastin. The result: improved skin tone, reduced fine lines, and accelerated wound healing.
              </p>
              <p className="text-[#7A5A54] text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                It also reduces inflammation at the surface level — useful for acne, rosacea, and post-workout skin stress.
              </p>
            </div>

            {/* 850nm */}
            <div className="reveal bg-[#FFF9F9] p-10 lg:p-14" style={{ transitionDelay: "100ms" }}>
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: "#FA8743", boxShadow: "0 0 12px rgba(250,135,67,0.4)" }}
                />
                <div>
                  <p
                    className="text-4xl font-bold mb-1"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "#FA8743", letterSpacing: "-0.03em" }}
                  >
                    850nm
                  </p>
                  <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#7A5A54]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Near-Infrared Light
                  </p>
                </div>
              </div>
              <span className="brand-rule mb-6" style={{ backgroundColor: "#FA8743" }} />
              <h3
                className="text-xl font-bold mb-4 text-[#1A1008]"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.01em" }}
              >
                Muscle. Joint. Deep tissue recovery.
              </h3>
              <p className="text-[#7A5A54] text-sm leading-relaxed mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Near-infrared at 850nm penetrates 5–10cm into the body, reaching muscle tissue, joints, and even bone. It activates cytochrome c oxidase in the mitochondria — your cells' energy engines — increasing ATP production.
              </p>
              <p className="text-[#7A5A54] text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                The result: faster muscle recovery, reduced joint pain, improved sleep quality, and systemic anti-inflammatory effects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feathered: blush → near-black */}
      <div style={{ height: "160px", background: "linear-gradient(to bottom, #F5EDEB 0%, #1A1008 100%)" }} />

      {/* ── THE MECHANISM — near-black ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#1A1008" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="reveal mb-12">
              <span className="section-label block mb-6" style={{ color: "#FA8743" }}>The Mechanism</span>
              <h2
                className="text-3xl md:text-5xl font-bold leading-[1.1] mb-6 text-white"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em" }}
              >
                Your mitochondria<br />
                <em style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontStyle: "italic", color: "#FA8743" }}>
                  do the work.
                </em>
              </h2>
              <span className="brand-rule mb-8" style={{ backgroundColor: "#FA8743" }} />
            </div>
            <div className="reveal grid md:grid-cols-2 gap-12">
              <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Photobiomodulation (PBM) is the mechanism behind red light therapy. When specific wavelengths of light hit your cells, they trigger a photochemical reaction in the mitochondria — increasing ATP synthesis, reducing oxidative stress, and activating repair pathways.
              </p>
              <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                This is not heat therapy. It's not UV. It's a precise, non-invasive signal that tells your cells to do what they were designed to do — just faster. The same mechanism studied in over 5,000 peer-reviewed papers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feathered: near-black → blush */}
      <div style={{ height: "160px", background: "linear-gradient(to bottom, #1A1008 0%, #F5EDEB 100%)" }} />

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
                <em style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontStyle: "italic", color: "#C01A07" }}>
                  850nm for everything beneath it.
                </em>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-px" style={{ backgroundColor: "#E8D8D4" }}>
              {[
                {
                  category: "Recovery",
                  items: ["Reduces DOMS by up to 50%", "Accelerates muscle repair", "Decreases joint inflammation", "Improves range of motion"],
                },
                {
                  category: "Skin & Longevity",
                  items: ["Stimulates collagen synthesis", "Reduces fine lines & wrinkles", "Improves skin tone & texture", "Accelerates wound healing"],
                },
                {
                  category: "Performance & Energy",
                  items: ["Increases mitochondrial ATP output", "Improves sleep quality", "Reduces systemic inflammation", "Supports hormonal balance"],
                },
              ].map((group, i) => (
                <div
                  key={i}
                  className="reveal bg-[#FFF9F9] p-10"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <p
                    className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase mb-4"
                    style={{ color: "#C01A07", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {group.category}
                  </p>
                  <span className="brand-rule mb-6" />
                  <ul className="flex flex-col gap-3">
                    {group.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="text-[#C01A07] mt-0.5 text-xs">—</span>
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
      <div style={{ height: "120px", background: "linear-gradient(to bottom, #F5EDEB 0%, #FFF9F9 100%)" }} />

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
              <em style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontStyle: "italic" }}>
                session one.
              </em>
            </h2>
            <span className="brand-rule mb-8" />
            <div className="grid md:grid-cols-2 gap-12">
              <p className="text-[#7A5A54] text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Most people notice improved skin tone and reduced puffiness after their first session. Within 2–4 weeks of consistent use, the deeper effects — better sleep, faster recovery, reduced inflammation — become unmistakable.
              </p>
              <p className="text-[#7A5A54] text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                5,000+ peer-reviewed studies. One 10-minute session. The science is settled — the only question is when you start.
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
              <em style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontStyle: "italic" }}>
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
