/**
 * openWaitlistModal
 * ─────────────────
 * Opens the one shared centered waitlist-modal banner from any page.
 *
 * Usage:
 *   import { openWaitlistModal } from "@/lib/scrollToWaitlist";
 *   <button onClick={openWaitlistModal}>join the waitlist</button>
 */
export const WAITLIST_MODAL_OPEN_EVENT = "redvive:open-waitlist-modal";

export function openWaitlistModal(e?: React.MouseEvent | MouseEvent): void {
  if (e) e.preventDefault();
  window.dispatchEvent(new Event(WAITLIST_MODAL_OPEN_EVENT));
}
