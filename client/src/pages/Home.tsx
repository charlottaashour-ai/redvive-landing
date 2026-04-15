/**
 * REDVIVE — WARM LACQUER DESIGN SYSTEM
 * Design: Japanese Minimalism meets Parisian Luxury Beauty
 * Typography: Playfair Display (italic serif) + Jost (geometric sans)
 * Palette: Oxblood #7E0306 | Tia Maria #D53E0F | Crusta #FA8743 | Koromiko #FCAF67 | Tuft Bush #FFDECD
 * Layout: Asymmetric editorial, full-bleed hero, diagonal transitions
 */

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BrandPromise from "@/components/BrandPromise";
import BenefitsSection from "@/components/BenefitsSection";
import RitualSection from "@/components/RitualSection";
import IngredientsSection from "@/components/IngredientsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhyRedvive from "@/components/WhyRedvive";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";

export default function Home() {
  useEffect(() => {
    // Scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFDECD" }}>
      <Navbar />
      <HeroSection />
      <TrustBar />
      <BrandPromise />
      <BenefitsSection />
      <RitualSection />
      <IngredientsSection />
      <TestimonialsSection />
      <WhyRedvive />
      <FinalCTA />
      <Footer />
    </div>
  );
}
