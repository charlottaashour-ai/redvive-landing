/*
 * REDVIVE — Finnish Landing Page (/fi/)
 * Copy: verbatim from REDVIVE_FI_Landing_Copy.md — do not alter Finnish text.
 * Design: same palette, fonts, and section patterns as Home.tsx
 * Palette: #0A0303 dark / #FFF9F9 rose-white / #1A1008 near-black
 * Typography: DM Sans headings/body (matches existing site)
 * SEO: lang="fi", canonical, hreflang, meta title/description injected via Helmet pattern
 */
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HERO_IMG_DESKTOP = "https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/hero-desktop_07a3adf7.webp";
const HERO_IMG_MOBILE = "https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/hero-mobile_16619120.webp";

/* ── Animation variants ── */
const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
} as const;
const heroItem = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, type: "tween" as const } },
};

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add("revealed"); obs.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ── Finnish Waitlist Form ── */
function FiWaitlistForm({ dark = true, formId = "fi-waitlist" }: { dark?: boolean; formId?: string }) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!firstName.trim()) { setError("syötä etunimesi."); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) { setError("syötä kelvollinen sähköpostiosoite."); return; }
    if (!consent) { setError("hyväksy jatkaaksesi."); return; }
    setLoading(true);
    const eventId = (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + Math.random();
    try {
      const res = await fetch("/api/waitlist-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName: firstName.trim(), language: "fi", consent: true, eventId, formId }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) { setSubmitted(true); return; }
      }
      setError("jokin meni pieleen. yritä uudelleen.");
    } catch {
      setError("jokin meni pieleen. yritä uudelleen.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center" style={{ animation: "fadeSlideUp 0.5s ease-out both" }}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ animation: "successPop 0.45s cubic-bezier(0.34,1.56,0.64,1) both" }}>
          <circle cx="20" cy="20" r="19" stroke="#D53E0F" strokeWidth="1.5" fill="none" />
          <polyline points="12,21 18,27 29,14" stroke="#D53E0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        <p className={`text-sm font-medium tracking-wide ${dark ? "text-white" : "text-[#1A1008]"}`}>olet mukana.</p>
        <p className={`text-xs ${dark ? "text-white/60" : "text-[#7A5A54]"}`}>lähetämme sinulle viestin pian.</p>
      </div>
    );
  }

  const inputClass = dark
    ? "w-full bg-white/10 border border-white/20 text-white placeholder-white/40 px-4 py-3 text-sm focus:outline-none focus:border-white/50 transition-colors"
    : "w-full bg-[#1A1008]/5 border border-[#1A1008]/15 text-[#1A1008] placeholder-[#7A5A54]/60 px-4 py-3 text-sm focus:outline-none focus:border-[#1A1008]/30 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
      <input type="text" required placeholder="etunimesi" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClass} style={{ fontFamily: "'DM Sans', sans-serif" }} />
      <input type="email" required placeholder="sähköpostiosoitteesi" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} style={{ fontFamily: "'DM Sans', sans-serif" }} />
      <label className="flex items-start gap-3 cursor-pointer group text-left">
        <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 flex-shrink-0 accent-[#D53E0F] w-3.5 h-3.5 cursor-pointer" />
        <span className="text-[0.65rem] leading-relaxed" style={{ color: dark ? "rgba(255,255,255,0.35)" : "rgba(26,16,8,0.45)", fontFamily: "'DM Sans', sans-serif" }}>
          haluan kuulla redviven perustajajäseneduista ja avaamistiedoista. katso{" "}
          <a href="/tietosuoja" className="underline underline-offset-2 hover:opacity-80 transition-opacity" style={{ color: dark ? "rgba(255,255,255,0.45)" : "rgba(26,16,8,0.55)" }}>tietosuojaseloste</a>.
        </span>
      </label>
      {error && <p className="text-xs" style={{ color: "#D53E0F", fontFamily: "'DM Sans', sans-serif" }}>{error}</p>}
      <button type="submit" disabled={loading || !consent} className="btn-primary justify-center w-full" style={{ opacity: (loading || !consent) ? 0.5 : 1, transition: "opacity 0.2s" }}>
        {loading ? "lähetetään…" : "liity jonotuslistalle"}
      </button>
      <p className="text-xs text-center" style={{ color: dark ? "rgba(255,255,255,0.30)" : "rgba(26,16,8,0.35)", fontFamily: "'DM Sans', sans-serif", fontStyle: "italic" }}>
        ei maksua nyt — varaat vain perustajahintasi.
      </p>
    </form>
  );
}

/* ── Sticky mobile CTA ── */
function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const scrollToForm = () => {
    const el = document.getElementById("fi-waitlist");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-4 pb-safe-bottom pb-4 pt-3 transition-transform duration-300"
      style={{ backgroundColor: "#0A0303", borderTop: "1px solid rgba(255,249,249,0.08)", transform: visible ? "translateY(0)" : "translateY(100%)" }}
    >
      <button onClick={scrollToForm} className="btn-primary w-full justify-center">liity jonotuslistalle</button>
    </div>
  );
}

export default function FiHome() {
  useReveal();

  // Set document lang and meta
  useEffect(() => {
    document.documentElement.lang = "fi";
    document.title = "Punavaloterapia Helsingissä 24/7 | Redvive Studios";
    // Meta description
    let desc = document.querySelector('meta[name="description"]');
    if (!desc) { desc = document.createElement("meta"); desc.setAttribute("name", "description"); document.head.appendChild(desc); }
    desc.setAttribute("content", "Redvive avaa Helsingin keskustaan syksyllä 2026 — Suomen ainoan pelkälle punavalolle rakennetun studion. Yksityiset huoneet, koko kehon paneelit, auki ympäri vuorokauden. Liity jonotuslistalle.");
    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.setAttribute("rel", "canonical"); document.head.appendChild(canonical); }
    canonical.setAttribute("href", "https://redvivestudios.com/fi/");
    // hreflang
    const addHreflang = (lang: string, href: string) => {
      const existing = document.querySelector(`link[hreflang="${lang}"]`);
      if (existing) { existing.setAttribute("href", href); return; }
      const link = document.createElement("link");
      link.setAttribute("rel", "alternate");
      link.setAttribute("hreflang", lang);
      link.setAttribute("href", href);
      document.head.appendChild(link);
    };
    addHreflang("fi", "https://redvivestudios.com/fi/");
    addHreflang("en", "https://redvivestudios.com/");
    addHreflang("x-default", "https://redvivestudios.com/");
    return () => { document.documentElement.lang = "en"; };
  }, []);

  const benefitItems = [
    { title: "kiinteämpi iho, vahvempi hius", body: "660 nm tukee kollageenin tuotantoa sekä ihon sävyä ja kimmoisuutta — ja herättelee hiuspohjaa." },
    { title: "nopeampi palautuminen", body: "850 nm lähi-infrapuna yltää syvälle lihaksiin ja niveliin ja helpottaa jumeja." },
    { title: "tasaista energiaa", body: "valo ruokkii solujen mitokondrioita — syvempää ja tasaisempaa virtaa, ei kahvipiikkiä." },
    { title: "aito nollaus", body: "kymmenen hiljaista minuuttia, jotka ovat vain sinun." },
  ];

  const roomItems = [
    { title: "ei jaettua makuupintaa", body: "ihosi ei kosketa pintaa, jolla muut ovat maanneet. huone on tyhjä ja sinun." },
    { title: "oma huone, oma ovi", body: "riisut sen verran kuin itse haluat. kukaan ei odota oven takana." },
    { title: "ei uv-säteilyä", body: "punainen ja lähi-infrapunavalo eivät sisällä uv-säteilyä. iho ei ruskettu eikä pala — tämä ei ole solarium." },
  ];

  const faqItems = [
    { q: "onko punavaloterapia lääketieteellistä hoitoa?", a: "ei. redvive on hyvinvointipalvelu, ei terveydenhuoltoa. punavaloterapia tukee kehon palautumista, energiaa ja ihoa, mutta se ei ole sairauden hoitoa eikä korvaa lääkärin arviota. jos sinulla on terveyshuoli, käänny aina ensin lääkärin puoleen." },
    { q: "miksi en vain ostaisi punavalopaneelia kotiin?", a: "hyvä kysymys, ja rehellinen vastaus on: kotipaneeli hoitaa alueen, me koko kehon. sadan euron laite ja meidän laitteemme eivät ole sama tuote halvempana — ne ovat eri tuotteita. meillä aallonpituudet on mitattu ja laitteet huolletaan, sinulle ei tule etukäteismaksua eikä huollettavaa. ja se kaikkein tärkein: makuuhuoneen paneeli jää käyttämättä kolmen viikon jälkeen. paikka johon lähdet, varattuna sovelluksessa, muuttuu rutiiniksi." },
    { q: "onko tämä sama asia kuin solarium?", a: "ei. solarium ruskettaa uv-säteilyllä. punavaloterapiassa käytetään punaista ja lähi-infrapunavaloa, joissa ei ole uv-säteilyä lainkaan — iho ei ruskettu eikä pala. myös kokemus on eri: et makaa laitteessa, vaan olet omassa huoneessa, jonka seinillä on paneelit." },
    { q: "makaanko jossain laitteessa?", a: "et. redvivessä on omat huoneet ja koko kehon paneelit seinillä. voit seisoa, venytellä tai istua — ihan miten haluat. kymmenen minuuttia on sinun, ei laitteen." },
    { q: "kuinka usein kannattaa käydä?", a: "useimmat käyvät 2–4 kertaa viikossa. kymmenen minuuttia kerrallaan. säännöllisyys on tässä se juttu — yksittäinen käynti tuntuu mukavalta, mutta tapa on se joka kannattaa." },
    { q: "miten pääsen sisään ilman henkilökuntaa?", a: "sovelluksella. varaat ajan, avaat oven puhelimella ja huone on sinun. tuki on tavoitettavissa aina, myös silloin kun studiolla ei ole ketään paikalla." },
    { q: "mitä jonotuslistalle liittyminen maksaa?", a: "ei mitään. varaat vain paikkasi ja perustajahintasi. avaamme helsingin keskustaan syksyllä 2026, ja perustajajäsenet kuulevat tarkan päivän ja osoitteen ensimmäisinä — ennen ketään muuta." },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A0303" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden" style={{ backgroundColor: "#0A0303" }}>
        <img src={HERO_IMG_DESKTOP} alt="" aria-hidden="true" width="1920" height="1080" loading="eager" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover hidden md:block" style={{ opacity: 0.85, willChange: "transform", transform: "translateZ(0)" }} />
        <img src={HERO_IMG_MOBILE} alt="" aria-hidden="true" width="1080" height="1920" loading="eager" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover block md:hidden" style={{ opacity: 0.85, willChange: "transform", transform: "translateZ(0)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,3,3,0.62) 0%, rgba(10,3,3,0.28) 40%, rgba(10,3,3,0.68) 75%, rgba(10,3,3,0.88) 100%)" }} />
        <motion.div className="relative z-10 container pb-40 pt-40" variants={heroContainer} initial="hidden" animate="show">
          <div className="max-w-xl">
            <motion.p variants={heroItem} className="text-[0.65rem] font-semibold tracking-[0.22em] uppercase mb-6" style={{ color: "rgba(255,255,255,0.60)", fontFamily: "'DM Sans', sans-serif" }}>
              helsingin keskusta · avaamme syksyllä 2026
            </motion.p>
            <motion.div variants={heroItem}>
              <h1 className="text-[38px] md:text-[64px] font-bold leading-[1.05] mb-6" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em", color: "#FFF9F9" }}>
                suomen ainoa studio, joka on rakennettu vain punavaloa varten.
              </h1>
            </motion.div>
            <motion.div variants={heroItem}>
              <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans', sans-serif", maxWidth: "420px" }}>
                oma huone ja oma sovellus, joka avaa oven ympäri vuorokauden. perustajajäsenyys 29 €/kk, lukittu elinikäisesti. vain 99 paikkaa.
              </p>
            </motion.div>
            <motion.div variants={heroItem} className="max-w-md mb-4">
              <FiWaitlistForm dark={true} />
            </motion.div>
          </div>
        </motion.div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ color: "#D53E0F", animation: "chevronBounce 2s ease-in-out infinite" }}>
            <path d="M3 6l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* ── FEATHERED TRANSITION: dark → rose-white ── */}
      <div style={{ height: "220px", background: "linear-gradient(to bottom, #0A0303 0%, #1A1008 20%, #3D1A14 45%, #7A4A42 65%, #D4B8B4 85%, #FFF9F9 100%)" }} />

      {/* ── SECTION 2: Pricing philosophy ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#FFF9F9" }}>
        <div className="container">
          <div className="max-w-3xl">
            <div className="reveal mb-6">
              <span className="section-label">hinnoittelu</span>
            </div>
            <div className="reveal">
              <h2 className="text-3xl md:text-5xl font-bold leading-[1.05] mb-8" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em", color: "#1A1008" }}>
                palautumisen ei kuulu olla kahdesti vuodessa -luksusta.
              </h2>
              <p className="text-base md:text-lg leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: "#5A3E38" }}>
                punavaloterapia on tähän asti ollut Suomessa joko 40 euron kertakäynti tai lisäpalvelu kylpylän hinnastossa. me rakensimme sille oman studion — ja hinnoittelimme sen reilusti, ihan tarkoituksella. 29 € kuussa tekee siitä tavan, ei hemmottelua.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Benefits ── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#FFF9F9" }}>
        <div className="container">
          <div className="reveal mb-10">
            <span className="section-label">mitä valo tekee.</span>
          </div>
          <div className="reveal mb-10">
            <h2 className="text-3xl md:text-5xl font-bold leading-[1.05]" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em", color: "#1A1008" }}>
              mitä kymmenen minuuttia valoa tekee.
            </h2>
          </div>
          <div className="flex flex-col">
            {benefitItems.map((item, i) => (
              <div key={i} className="reveal py-7" style={{ borderTop: "1px solid rgba(26,16,8,0.10)", transitionDelay: `${i * 70}ms` }}>
                <div className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-12">
                  <p className="text-base font-bold" style={{ fontFamily: "'DM Sans', sans-serif", color: "#1A1008", letterSpacing: "-0.01em" }}>{item.title}</p>
                  <p className="text-base leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: "#5A3E38" }}>{item.body}</p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(26,16,8,0.10)" }} />
          </div>
        </div>
      </section>

      {/* ── FEATHERED TRANSITION: rose-white → dark ── */}
      <div style={{ height: "220px", background: "linear-gradient(to bottom, #FFF9F9 0%, #D4B8B4 25%, #8B5E56 50%, #3D1A14 80%, #1A1008 100%)" }} />

      {/* ── SECTION 4: How It Works ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#1A1008" }}>
        <div className="container">
          <div className="reveal mb-10">
            <span className="section-label" style={{ color: "#D53E0F" }}>miten se toimii.</span>
          </div>
          <div className="reveal mb-12">
            <h2 className="text-3xl md:text-5xl font-bold leading-[1.05] text-white" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em" }}>
              auki silloin kun sinä olet.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px max-w-3xl" style={{ backgroundColor: "rgba(255,249,249,0.06)" }}>
            {[
              { n: "01", step: "varaa sovelluksessa." },
              { n: "02", step: "kävele omaan huoneeseesi." },
              { n: "03", step: "kymmenen minuuttia. valmis." },
            ].map((item, i) => (
              <div key={i} className="reveal px-6 py-10" style={{ backgroundColor: "#1A1008", transitionDelay: `${i * 100}ms` }}>
                <p className="text-xs font-semibold tracking-[0.18em] uppercase mb-4" style={{ color: "#D53E0F", fontFamily: "'DM Sans', sans-serif" }}>{item.n}</p>
                <p className="text-lg font-bold text-white leading-snug" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.02em" }}>{item.step}</p>
              </div>
            ))}
          </div>
          <div className="reveal mt-10 max-w-lg">
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,249,249,0.50)", fontFamily: "'DM Sans', sans-serif" }}>
              ei vastaanottotiskiä. ei aikojen metsästystä. sovellus avaa oven, ja huone on sinun — mihin aikaan tahansa.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 4B: Room not bed ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#1A1008" }}>
        <div className="container">
          <div className="reveal mb-10">
            <span className="section-label" style={{ color: "#D53E0F" }}>studio.</span>
          </div>
          <div className="reveal mb-6">
            <h2 className="text-3xl md:text-5xl font-bold leading-[1.05] text-white" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em" }}>
              huone, ei sänky.
            </h2>
          </div>
          <div className="reveal mb-12 max-w-2xl">
            <p className="text-base leading-relaxed" style={{ color: "rgba(255,249,249,0.55)", fontFamily: "'DM Sans', sans-serif" }}>
              useimmissa paikoissa punavalo tarkoittaa laitetta, jonka sisään mennään makuulle. redvivessä se tarkoittaa omaa huonetta, jonka seinillä on koko kehon punavalopaneelit. et kiipeä laitteeseen etkä asetu pinnalle, jolla on jo maattu. seisot, venyttelet tai istut — ja valo tulee joka puolelta.
            </p>
          </div>
          <div className="flex flex-col max-w-2xl">
            {roomItems.map((item, i) => (
              <div key={i} className="reveal py-7" style={{ borderTop: "1px solid rgba(255,249,249,0.08)", transitionDelay: `${i * 70}ms` }}>
                <div className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-12">
                  <p className="text-base font-bold text-white" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.01em" }}>{item.title}</p>
                  <p className="text-base leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,249,249,0.55)" }}>{item.body}</p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(255,249,249,0.08)" }} />
          </div>
        </div>
      </section>

      {/* ── SECTION 5: Pricing CTA ── */}
      <section id="fi-waitlist" className="py-24 md:py-36" style={{ backgroundColor: "#0A0303" }}>
        <div className="container">
          <div className="max-w-lg mx-auto text-center">
            <div className="reveal">
              <span className="section-label block mb-6" style={{ color: "#D53E0F" }}>perustajajäsenyys.</span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-[1.05]" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}>
                ole yksi ensimmäisestä 99:stä.
              </h2>
              <p className="text-white/50 text-sm mb-10 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                perustajajäsenet lukitsevat 29 €/kk elinikäisesti, pääsevät sisään ensimmäisinä ja ovat mukana muokkaamassa siitä, mitä redvivestä tulee. kun 99 paikkaa on täynnä, perustajahinta menee niiden mukana.
              </p>
              <FiWaitlistForm dark={true} />
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: Founder note ── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#0A0303" }}>
        <div className="container">
          <div className="reveal max-w-2xl">
            <div className="h-px w-10 mb-8" style={{ backgroundColor: "#D53E0F" }} />
            <blockquote className="text-lg md:text-xl leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,249,249,0.70)", fontStyle: "italic" }}>
              rakensin redviven, koska tarvitsin sitä itse enkä löytänyt sellaista Suomesta — kunnollista punavaloa, tehtynä hyvin, hinnalla jonka kanssa jaksaa jatkaa.
            </blockquote>
            <p className="text-sm font-semibold tracking-[0.14em] uppercase" style={{ color: "#D53E0F", fontFamily: "'DM Sans', sans-serif" }}>— charlotta, perustaja</p>
            <p className="text-base mt-6" style={{ color: "rgba(255,249,249,0.45)", fontFamily: "'DM Sans', sans-serif" }}>kehosi osaa parantua. me annamme sille valoa.</p>
          </div>
        </div>
      </section>

      {/* ── FEATHERED TRANSITION: dark → rose-white ── */}
      <div style={{ height: "220px", background: "linear-gradient(to bottom, #0A0303 0%, #1A1008 20%, #3D1A14 45%, #7A4A42 65%, #D4B8B4 85%, #FFF9F9 100%)" }} />

      {/* ── FAQ ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#FFF9F9" }}>
        <div className="container">
          <div className="reveal mb-10">
            <span className="section-label">usein kysyttyä.</span>
          </div>
          <div className="max-w-2xl">
            {faqItems.map((item, i) => (
              <div key={i} className="reveal" style={{ borderTop: "1px solid rgba(26,16,8,0.10)", transitionDelay: `${i * 50}ms` }}>
                <button
                  className="w-full text-left py-6 flex items-start justify-between gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="text-base font-semibold leading-snug" style={{ fontFamily: "'DM Sans', sans-serif", color: "#1A1008", letterSpacing: "-0.01em" }}>{item.q}</span>
                  <span className="flex-shrink-0 mt-0.5 text-lg leading-none" style={{ color: "#D53E0F" }}>{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="pb-6">
                    <p className="text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: "#5A3E38" }}>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(26,16,8,0.10)" }} />
          </div>
        </div>
      </section>

      {/* ── Finnish legal footer note ── */}
      <div style={{ backgroundColor: "#FFF9F9", borderTop: "1px solid rgba(26,16,8,0.08)" }}>
        <div className="container py-6">
          <p className="text-xs leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(26,16,8,0.40)" }}>
            hyvä tietää: redvive on hyvinvointipalvelu, ei terveydenhuoltoa. punavaloterapia tukee kehon omaa palautumista, mutta ei korvaa lääkärin hoitoa tai neuvoa.
          </p>
        </div>
      </div>

      <div style={{ height: "2px", backgroundColor: "#1A1008" }} />
      <Footer />
      <StickyMobileCTA />

      <style>{`
        @keyframes chevronBounce { 0%, 100% { transform: translateY(0); opacity: 0.7; } 50% { transform: translateY(5px); opacity: 1; } }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes successPop { from { opacity: 0; transform: scale(0.6); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}
