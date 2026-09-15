/*
 * REDVIVE — Canonical Manager
 * Maintains one self-referencing canonical per route after client-side navigation.
 */
import { useEffect } from "react";
import { useLocation } from "wouter";

const ORIGIN = "https://redvivestudios.com";

const canonicalPaths: Record<string, string> = {
  "/": "/",
  "/fi": "/fi/",
  "/fi/": "/fi/",
  "/science": "/science",
  "/fi/tiede": "/fi/tiede",
  "/experience": "/experience",
  "/fi/experience": "/fi/experience",
  "/faq": "/faq",
  "/fi/faq": "/fi/faq",
  "/privacy": "/privacy",
  "/tietosuoja": "/tietosuoja",
};

export default function CanonicalManager() {
  const [location] = useLocation();

  useEffect(() => {
    const canonicalPath = canonicalPaths[location];
    if (!canonicalPath) return;

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${ORIGIN}${canonicalPath}`;
  }, [location]);

  return null;
}
