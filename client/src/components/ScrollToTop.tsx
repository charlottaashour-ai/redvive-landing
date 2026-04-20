import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * ScrollToTop
 * Listens for Wouter location changes and immediately scrolls the window
 * to the top of the page. Place this inside the router so it fires on
 * every navigation event — including Navbar links, Footer links, and
 * any in-page CTA buttons that use <Link> or navigate().
 */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return null;
}
