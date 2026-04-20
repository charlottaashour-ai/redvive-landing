// CookieNotice — Redvive
// Minimal GDPR-compliant cookie/privacy notice. Appears at the bottom of the screen.
// Dismissed state is stored in localStorage so it only shows once per browser session.
// Design: very subtle, dark, unobtrusive — matches brand aesthetic.

import { useState, useEffect } from "react";
import { Link } from "wouter";

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("redvive_cookie_notice_dismissed");
    if (!dismissed) {
      // Slight delay so it doesn't flash on first paint
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  function dismiss() {
    localStorage.setItem("redvive_cookie_notice_dismissed", "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-4 px-5 py-3 md:px-8"
      style={{
        backgroundColor: "rgba(10,3,3,0.97)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(8px)",
      }}
    >
      <p
        className="text-xs leading-relaxed"
        style={{ color: "rgba(255,249,249,0.45)", fontFamily: "'DM Sans', sans-serif", maxWidth: "640px" }}
      >
        This site uses no tracking or advertising cookies. We collect only the data you provide
        when joining our waitlist.{" "}
        <Link href="/privacy">
          <span
            className="underline underline-offset-2 cursor-pointer hover:opacity-80 transition-opacity"
            style={{ color: "rgba(255,249,249,0.55)" }}
          >
            Privacy Policy
          </span>
        </Link>
      </p>
      <button
        onClick={dismiss}
        className="flex-shrink-0 text-xs font-semibold tracking-widest uppercase hover:opacity-60 transition-opacity"
        style={{ color: "rgba(255,249,249,0.4)", fontFamily: "'DM Sans', sans-serif" }}
        aria-label="Dismiss cookie notice"
      >
        OK
      </button>
    </div>
  );
}
