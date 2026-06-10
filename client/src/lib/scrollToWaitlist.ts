/**
 * scrollToWaitlist
 * ─────────────────
 * If the user is already on the Home page, smoothly scrolls to #waitlist.
 * If they are on any other page, navigates to /#waitlist — the browser will
 * land at the anchor, and a one-shot scroll listener then smooth-scrolls into
 * view once the DOM is ready.
 *
 * Usage:
 *   import { scrollToWaitlist } from "@/lib/scrollToWaitlist";
 *   <button onClick={scrollToWaitlist}>join the waitlist</button>
 */
export function scrollToWaitlist(e?: React.MouseEvent | MouseEvent): void {
  if (e) e.preventDefault();

  const el = document.getElementById("waitlist");

  if (el) {
    // Already on Home — smooth scroll in place
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    // Navigate to home, then scroll after paint
    window.location.href = "/#waitlist";
  }
}
