/*
 * REDVIVE — Waitlist Modal
 * Centered, dark editorial banner. The modal owns focus, Escape/backdrop close,
 * and a short staggered reveal while the form retains its established logic.
 */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useTranslation } from "@/lib/translations";
import WaitlistForm from "@/components/WaitlistForm";
import { WAITLIST_MODAL_OPEN_EVENT, type WaitlistFormLocation } from "@/lib/scrollToWaitlist";

const container = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.07, delayChildren: 0.05, duration: 0.36 } },
};

const item = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.36 } } };

export default function WaitlistModal() {
  const t = useTranslation();
  const [open, setOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [formLocation, setFormLocation] = useState<WaitlistFormLocation>("hero");

  useEffect(() => {
    const openModal = (event?: Event) => {
      const detail = event instanceof CustomEvent ? event.detail as { formLocation?: WaitlistFormLocation } : undefined;
      setFormLocation(detail?.formLocation === "footer" ? "footer" : "hero");
      setFormKey((value) => value + 1);
      setOpen(true);
    };
    const openFromLegacyHash = () => {
      if (window.location.hash === "#waitlist") openModal();
    };
    openFromLegacyHash();
    window.addEventListener(WAITLIST_MODAL_OPEN_EVENT, openModal);
    window.addEventListener("hashchange", openFromLegacyHash);
    return () => {
      window.removeEventListener(WAITLIST_MODAL_OPEN_EVENT, openModal);
      window.removeEventListener("hashchange", openFromLegacyHash);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          requestAnimationFrame(() => document.getElementById("waitlist-first-name")?.focus());
        }}
        className="w-[min(100%-2rem,34rem)] max-h-[calc(100svh-2rem)] overflow-y-auto rounded-none border border-[#D53E0F]/30 bg-[#0A0303] p-0 text-[#FFF9F9] shadow-2xl shadow-black/60"
      >
        <DialogClose aria-label="Close waitlist form" className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center border border-white/15 text-white/60 transition-colors hover:border-[#D53E0F] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#D53E0F]">
          <X size={16} aria-hidden="true" />
        </DialogClose>
        <motion.div variants={container} initial="hidden" animate="visible" className="p-7 sm:p-10">
          <motion.div variants={item} className="mb-7">
            <span className="section-label block mb-5">{t("home.hero.eyebrow")}</span>
            <DialogTitle className="max-w-sm pr-9 text-3xl font-bold leading-[1.05] text-[#FFF9F9] sm:text-4xl" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}>
              {t("cta.headline1")}<br />
              <em style={{ fontFamily: "'Lora', serif", fontWeight: 400, fontStyle: "normal" }}>{t("cta.headline2")}</em>
            </DialogTitle>
            <DialogDescription className="mt-4 max-w-md text-sm leading-relaxed text-white/55">
              {t("cta.body")}
            </DialogDescription>
          </motion.div>
          <motion.div variants={item}>
            <WaitlistForm key={formKey} formLocation={formLocation} />
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
