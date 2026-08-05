/*
 * REDVIVE — Finnish Long-form SEO Page (/fi/punavaloterapia-helsinki)
 * Copy: verbatim from brief — do not alter Finnish text.
 * Design: same palette and fonts as FiHome.tsx
 */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HERO_IMG_DESKTOP = "https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/hero-desktop_07a3adf7.webp";
const HERO_IMG_MOBILE = "https://d2xsxph8kpxj0f.cloudfront.net/96599177/JqwAwUnbRJPvfQwDrcMJaa/hero-mobile_16619120.webp";

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

function FiWaitlistForm({ dark = true }: { dark?: boolean }) {
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
        body: JSON.stringify({ email, firstName: firstName.trim(), language: "fi", consent: true, eventId, formId: "fi-longform-waitlist" }),
      });
      if (res.ok) { const data = await res.json(); if (data.success) { setSubmitted(true); return; } }
      setError("jokin meni pieleen. yritä uudelleen.");
    } catch { setError("jokin meni pieleen. yritä uudelleen."); }
    finally { setLoading(false); }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
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
      <label className="flex items-start gap-3 cursor-pointer text-left">
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

function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const scrollToForm = () => {
    const el = document.getElementById("fi-lf-waitlist-end");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-4 pb-4 pt-3 transition-transform duration-300" style={{ backgroundColor: "#0A0303", borderTop: "1px solid rgba(255,249,249,0.08)", transform: visible ? "translateY(0)" : "translateY(100%)" }}>
      <button onClick={scrollToForm} className="btn-primary w-full justify-center">liity jonotuslistalle</button>
    </div>
  );
}

/* ── Inline CTA block (used twice) ── */
function InlineCTA({ id }: { id?: string }) {
  return (
    <section id={id} className="py-20 md:py-28" style={{ backgroundColor: "#0A0303" }}>
      <div className="container">
        <div className="max-w-lg mx-auto text-center">
          <div className="reveal">
            <span className="section-label block mb-6" style={{ color: "#D53E0F" }}>perustajajäsenyys.</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-[1.05]" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}>
              ole yksi ensimmäisestä 99:stä.
            </h2>
            <p className="text-white/50 text-sm mb-10 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              perustajajäsenet lukitsevat 29 €/kk elinikäisesti, pääsevät sisään ensimmäisinä ja ovat mukana muokkaamassa siitä, mitä redvivestä tulee.
            </p>
            <FiWaitlistForm dark={true} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function FiLongform() {
  useReveal();

  useEffect(() => {
    document.documentElement.lang = "fi";
    document.title = "Punavaloterapia Helsingissä — mitä se on ja kenelle | Redvive";
    let desc = document.querySelector('meta[name="description"]');
    if (!desc) { desc = document.createElement("meta"); desc.setAttribute("name", "description"); document.head.appendChild(desc); }
    desc.setAttribute("content", "Mitä punavaloterapia on, miten se toimii ja kenelle se sopii. Redvive avaa Helsingin keskustaan syksyllä 2026 studion, joka on auki ympäri vuorokauden.");
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.setAttribute("rel", "canonical"); document.head.appendChild(canonical); }
    canonical.setAttribute("href", "https://redvivestudios.com/fi/punavaloterapia-helsinki");
    const addHreflang = (lang: string, href: string) => {
      const existing = document.querySelector(`link[hreflang="${lang}"]`);
      if (existing) { existing.setAttribute("href", href); return; }
      const link = document.createElement("link"); link.setAttribute("rel", "alternate"); link.setAttribute("hreflang", lang); link.setAttribute("href", href); document.head.appendChild(link);
    };
    addHreflang("fi", "https://redvivestudios.com/fi/punavaloterapia-helsinki");
    addHreflang("en", "https://redvivestudios.com/");
    addHreflang("x-default", "https://redvivestudios.com/");
    return () => { document.documentElement.lang = "en"; };
  }, []);

  const benefitItemsExpanded = [
    { title: "kiinteämpi iho, vahvempi hius", body: "660 nm punainen valo tukee kollageenin tuotantoa sekä ihon sävyä ja kimmoisuutta. säännöllinen käyttö herättelee myös hiuspohjaa ja tukee hiusten kasvua." },
    { title: "nopeampi palautuminen", body: "850 nm lähi-infrapuna yltää syvälle lihaksiin ja niveliin ja helpottaa jumeja. se tukee kehon omaa tulehdusreaktiota ja nopeuttaa palautumista treenistä tai raskaasta viikosta." },
    { title: "tasaista energiaa", body: "valo ruokkii solujen mitokondrioita — syvempää ja tasaisempaa virtaa, ei kahvipiikkiä. moni huomaa eron unessa ja päiväenergian tasaisuudessa muutaman viikon käytön jälkeen." },
    { title: "aito nollaus", body: "kymmenen hiljaista minuuttia, jotka ovat vain sinun. ei puhelinta, ei häiriöitä — vain valo ja hiljaisuus." },
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
      <section className="relative min-h-[70svh] flex flex-col justify-end overflow-hidden" style={{ backgroundColor: "#0A0303" }}>
        <img src={HERO_IMG_DESKTOP} alt="" aria-hidden="true" width="1920" height="1080" loading="eager" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover hidden md:block" style={{ opacity: 0.75 }} />
        <img src={HERO_IMG_MOBILE} alt="" aria-hidden="true" width="1080" height="1920" loading="eager" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover block md:hidden" style={{ opacity: 0.75 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,3,3,0.55) 0%, rgba(10,3,3,0.25) 40%, rgba(10,3,3,0.75) 80%, rgba(10,3,3,0.95) 100%)" }} />
        <motion.div className="relative z-10 container pb-32 pt-40" variants={heroContainer} initial="hidden" animate="show">
          <div className="max-w-2xl">
            <motion.p variants={heroItem} className="text-[0.65rem] font-semibold tracking-[0.22em] uppercase mb-6" style={{ color: "rgba(255,255,255,0.60)", fontFamily: "'DM Sans', sans-serif" }}>
              helsingin keskusta · avaamme syksyllä 2026
            </motion.p>
            <motion.div variants={heroItem}>
              <h1 className="text-[34px] md:text-[58px] font-bold leading-[1.05] mb-6 text-white" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}>
                punavaloterapia helsingissä — auki silloin kun sinä olet.
              </h1>
            </motion.div>
            <motion.div variants={heroItem}>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans', sans-serif", maxWidth: "540px" }}>
                punavaloterapia on yleistynyt Suomessa nopeasti, mutta sitä on ollut vaikea saada silloin kun se sopisi omaan arkeen. helsingin studiot sulkevat ovensa iltakuudelta eivätkä ole auki sunnuntaisin. redvive avaa syksyllä 2026 helsingin keskustaan studion, joka on auki ympäri vuorokauden — ilman vastaanottoa, ilman soittelua, oman sovelluksen kautta.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── FEATHERED TRANSITION: dark → rose-white ── */}
      <div style={{ height: "220px", background: "linear-gradient(to bottom, #0A0303 0%, #1A1008 20%, #3D1A14 45%, #7A4A42 65%, #D4B8B4 85%, #FFF9F9 100%)" }} />

      {/* ── H2: mitä punavaloterapia on? ── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#FFF9F9" }}>
        <div className="container max-w-3xl">
          <div className="reveal mb-4"><span className="section-label">tieto.</span></div>
          <div className="reveal">
            <h2 className="text-3xl md:text-4xl font-bold leading-[1.1] mb-6" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em", color: "#1A1008" }}>mitä punavaloterapia on?</h2>
            <p className="text-base leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: "#5A3E38" }}>
              punavaloterapiassa keho altistetaan tietyille punaisen ja lähi-infrapunavalon aallonpituuksille — tyypillisesti 660 ja 850 nanometrille. valo ei lämmitä eikä polta; se on pehmeää ja miellyttävää. käynti kestää kymmenen minuuttia.
            </p>
          </div>
        </div>
      </section>

      {/* ── H2: mihin punavaloa käytetään? ── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#FFF9F9" }}>
        <div className="container">
          <div className="reveal mb-8"><span className="section-label">hyödyt.</span></div>
          <div className="reveal mb-10">
            <h2 className="text-3xl md:text-4xl font-bold leading-[1.1]" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em", color: "#1A1008" }}>mihin punavaloa käytetään?</h2>
          </div>
          <div className="flex flex-col max-w-3xl">
            {benefitItemsExpanded.map((item, i) => (
              <div key={i} className="reveal py-7" style={{ borderTop: "1px solid rgba(26,16,8,0.10)", transitionDelay: `${i * 70}ms` }}>
                <div className="grid md:grid-cols-[220px_1fr] gap-4 md:gap-12">
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

      {/* ── FIRST CTA ── */}
      <InlineCTA id="fi-lf-waitlist-mid" />

      {/* ── FEATHERED TRANSITION: dark → rose-white ── */}
      <div style={{ height: "220px", background: "linear-gradient(to bottom, #0A0303 0%, #1A1008 20%, #3D1A14 45%, #7A4A42 65%, #D4B8B4 85%, #FFF9F9 100%)" }} />

      {/* ── H2: kenelle se sopii? ── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#FFF9F9" }}>
        <div className="container max-w-3xl">
          <div className="reveal mb-4"><span className="section-label">kenelle.</span></div>
          <div className="reveal">
            <h2 className="text-3xl md:text-4xl font-bold leading-[1.1] mb-6" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em", color: "#1A1008" }}>kenelle se sopii?</h2>
            <p className="text-base leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: "#5A3E38" }}>
              ihmisille jotka ovat huomanneet kehon pyytävän enemmän — unen laatu, ihon kunto, hitaampi palautuminen. urheilijoille, kiireisille vanhemmille, kaikille jotka haluavat rakentaa palautumisen osaksi viikkoa eikä juhlapäiväksi.
            </p>
          </div>
        </div>
      </section>

      {/* ── H2: paneelit vai punavalosänky ── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#FFF9F9" }}>
        <div className="container max-w-3xl">
          <div className="reveal mb-4"><span className="section-label">studio.</span></div>
          <div className="reveal">
            <h2 className="text-3xl md:text-4xl font-bold leading-[1.1] mb-6" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em", color: "#1A1008" }}>paneelit vai punavalosänky — mitä eroa?</h2>
            <p className="text-base leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: "#5A3E38" }}>
              punavaloa annetaan Suomessa yleensä laitteella, jonka sisään asiakas menee makuulle. redvive on rakennettu toisin: omia huoneita, joiden seinillä on koko kehon paneelit. käytännön ero on siinä, miltä käynti tuntuu — et kiipeä laitteeseen etkä asetu jaettuun makuupintaan, vaan olet omassa huoneessa ja liikut vapaasti. kummassakaan ei ole uv-säteilyä; punavaloterapia ei ole solariumia eikä rusketa ihoa.
            </p>
          </div>
        </div>
      </section>

      {/* ── H2: punavaloterapia vai infrapunasauna ── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#FFF9F9" }}>
        <div className="container max-w-3xl">
          <div className="reveal mb-4"><span className="section-label">vertailu.</span></div>
          <div className="reveal">
            <h2 className="text-3xl md:text-4xl font-bold leading-[1.1] mb-6" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em", color: "#1A1008" }}>punavaloterapia vai infrapunasauna?</h2>
            <p className="text-base leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: "#5A3E38" }}>
              infrapunasauna lämmittää. punavalo ei — se toimii eri mekanismilla ja vie kymmenen minuuttia, ei tuntia. moni käyttää molempia. jos aikaa on vähän, punavalo mahtuu arkeen helpommin.
            </p>
          </div>
        </div>
      </section>

      {/* ── H2: mitä punavaloterapia maksaa Helsingissä ── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#FFF9F9" }}>
        <div className="container max-w-3xl">
          <div className="reveal mb-4"><span className="section-label">hinnoittelu.</span></div>
          <div className="reveal">
            <h2 className="text-3xl md:text-4xl font-bold leading-[1.1] mb-6" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.025em", color: "#1A1008" }}>mitä punavaloterapia maksaa Helsingissä?</h2>
            <p className="text-base leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: "#5A3E38" }}>
              kertakäynnit liikkuvat Helsingissä tyypillisesti 25–45 eurossa. redvive on jäsenyys, ei kertakäynti — koska säännöllisyys on se mikä tässä merkitsee. perustajajäsenyys on 29 €/kk, lukittuna elinikäisesti, ensimmäiselle 99:lle.
            </p>
          </div>
        </div>
      </section>

      {/* ── FEATHERED TRANSITION: rose-white → dark ── */}
      <div style={{ height: "220px", background: "linear-gradient(to bottom, #FFF9F9 0%, #D4B8B4 25%, #8B5E56 50%, #3D1A14 80%, #1A1008 100%)" }} />

      {/* ── H2: usein kysyttyä ── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: "#1A1008" }}>
        <div className="container">
          <div className="reveal mb-10"><span className="section-label" style={{ color: "#D53E0F" }}>usein kysyttyä.</span></div>
          <div className="max-w-2xl">
            {faqItems.map((item, i) => (
              <div key={i} className="reveal" style={{ borderTop: "1px solid rgba(255,249,249,0.08)", transitionDelay: `${i * 50}ms` }}>
                <button className="w-full text-left py-6 flex items-start justify-between gap-4" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                  <span className="text-base font-semibold leading-snug text-white" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.01em" }}>{item.q}</span>
                  <span className="flex-shrink-0 mt-0.5 text-lg leading-none" style={{ color: "#D53E0F" }}>{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="pb-6">
                    <p className="text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,249,249,0.55)" }}>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(255,249,249,0.08)" }} />
          </div>
        </div>
      </section>

      {/* ── SECOND (FINAL) CTA ── */}
      <InlineCTA id="fi-lf-waitlist-end" />

      {/* ── Finnish legal footer note ── */}
      <div style={{ backgroundColor: "#0A0303", borderTop: "1px solid rgba(255,249,249,0.06)" }}>
        <div className="container py-6">
          <p className="text-xs leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.25)" }}>
            hyvä tietää: redvive on hyvinvointipalvelu, ei terveydenhuoltoa. punavaloterapia tukee kehon omaa palautumista, mutta ei korvaa lääkärin hoitoa tai neuvoa.
          </p>
        </div>
      </div>

      <div style={{ height: "2px", backgroundColor: "#1A1008" }} />
      <Footer />
      <StickyMobileCTA />

      <style>{`
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
