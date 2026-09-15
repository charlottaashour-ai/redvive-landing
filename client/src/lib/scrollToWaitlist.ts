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
export type WaitlistFormLocation = "hero" | "footer";

export function openWaitlistModal(formLocation: WaitlistFormLocation) {
  return (event?: React.MouseEvent | MouseEvent): void => {
    if (event) event.preventDefault();
    window.dispatchEvent(new CustomEvent(WAITLIST_MODAL_OPEN_EVENT, { detail: { formLocation } }));
  };
}
