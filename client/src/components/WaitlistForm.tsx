/*
 * REDVIVE — Waitlist Form
 * Shared by the centered waitlist modal. Keeps the established signup,
 * consent, segmentation, success, and analytics behaviour intact.
 */
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/lib/translations";
import type { WaitlistFormLocation } from "@/lib/scrollToWaitlist";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function WaitlistForm({ formLocation }: { formLocation: WaitlistFormLocation }) {
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!firstName.trim()) return setError(t("form.err.firstname"));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError(t("form.err.email"));
    if (!consent) return setError(t("form.err.consent"));

    setLoading(true);
    const eventId = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}${Math.random()}`;
    const marketingConsent = (window as any).Cookiebot?.consent?.marketing === true;

    try {
      const response = await fetch("/api/waitlist-signup", {
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

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setIsFounding(data.founding === true);
          setFoundingNumber(data.foundingNumber ?? null);
          setSubmitted(true);
          if (marketingConsent && typeof (window as any).fbq === "function") {
            (window as any).fbq("track", "Lead", { content_name: "Redvive waitlist", currency: "EUR", value: 0 }, { eventID: eventId });
          }
          if (typeof window.gtag === "function") {
            window.gtag("event", "waitlist_signup", {
              language: language,
              form_location: formLocation,
              interest: interest || "skip",
            });
          }
          return;
        }
      }

      if (response.status === 400) {
        const data = await response.json().catch(() => ({}));
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
      : isFounding === false ? t("form.general_waitlist") : t("form.success_title");

    return (
      <div className="py-10 text-center" role="status" aria-live="polite">
        <div className="mx-auto mb-5 grid h-10 w-10 place-items-center rounded-full border border-[#D53E0F] text-[#D53E0F]">✓</div>
        <p className="text-base font-semibold text-[#FFF9F9]">{successLine}</p>
        <p className="mt-2 text-sm text-white/55">{t("form.success_sub")}</p>
      </div>
    );
  }

  const inputClass = "w-full border border-white/20 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-[#D53E0F]";

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3" noValidate>
      <label className="sr-only" htmlFor="waitlist-first-name">{t("form.firstname_placeholder")}</label>
      <input id="waitlist-first-name" type="text" autoFocus placeholder={t("form.firstname_placeholder")} value={firstName} onChange={(event) => setFirstName(event.target.value)} className={inputClass} />
      <label className="sr-only" htmlFor="waitlist-email">{t("form.email")}</label>
      <input id="waitlist-email" type="email" placeholder={t("form.email")} value={email} onChange={(event) => setEmail(event.target.value)} className={inputClass} />
      <label className="sr-only" htmlFor="waitlist-postal-code">{t("form.postal_placeholder")}</label>
      <input id="waitlist-postal-code" type="text" placeholder={t("form.postal_placeholder")} value={postalCode} onChange={(event) => setPostalCode(event.target.value)} className={inputClass} />

      <label className="flex cursor-pointer items-start gap-3 pt-1 text-left">
        <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[#D53E0F]" />
        <span className="text-[0.65rem] leading-relaxed text-white/45">
          {t("form.consent")} {" "}
          <a href={t("footer.privacy_path")} className="underline underline-offset-2 transition-opacity hover:opacity-80">{t("form.consent_link")}</a>.
        </span>
      </label>

      <div className="w-full pt-1">
        <button type="button" onClick={() => setSegExpanded((value) => !value)} className="flex w-full items-center justify-between bg-transparent py-1 text-left text-[0.7rem] text-white/45" aria-expanded={segExpanded}>
          <span>{t("seg.question")}</span>
          <span className="text-[0.6rem] opacity-60 transition-transform" style={{ transform: segExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
        </button>
        <div className={segExpanded ? "mt-2 max-h-36 overflow-hidden opacity-100 transition-all" : "max-h-0 overflow-hidden opacity-0 transition-all"}>
          <p className="mb-2 text-[0.6rem] text-white/30">{t("seg.helper")}</p>
          <div className="mb-1 flex flex-wrap gap-1.5" role="radiogroup" aria-label={t("seg.question")}>
            {(["skin-hair", "recovery", "sleep", "stiffness", "energy", "curious"] as const).map((key) => {
              const selected = interest === key;
              return <button key={key} type="button" role="radio" aria-checked={selected} onClick={() => setInterest(selected ? null : key)} className={selected ? "rounded-full border border-[#D53E0F] bg-[#D53E0F]/15 px-2.5 py-1 text-[0.6rem] font-medium text-[#D53E0F]" : "rounded-full border border-white/15 px-2.5 py-1 text-[0.6rem] font-medium text-white/50"}>{t(`seg.${key}`)}</button>;
            })}
          </div>
          <button type="button" className="bg-transparent py-0.5 text-[0.55rem] text-white/30">{t("seg.skip")}</button>
        </div>
      </div>

      {error && <p className="text-xs text-[#D53E0F]" role="alert">{error}</p>}
      <button type="submit" className="btn-primary mt-1 w-full justify-center" disabled={loading || !consent} style={{ opacity: loading || !consent ? 0.5 : 1 }}>
        {loading ? t("form.sending") : t("form.submit")}
      </button>
      <p className="text-center text-xs text-white/40">{t("form.no_payment")}</p>
    </form>
  );
}
