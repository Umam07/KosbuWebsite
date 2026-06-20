"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useGSAP(() => {
    gsap.from(".reveal-outro", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  const handleBackToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    }
  };

  return (
    <section className="footer-section" id="contact" ref={containerRef}>
      <div className="footer-container">
        <div className="footer-outro">
          <h2 className="outro-text reveal-outro">
            Mari buat lebih banyak kenangan tak terlupakan.
          </h2>
        </div>

        <div className="footer-links-grid">
          <div className="footer-col reveal-outro">
            <span className="footer-col-label">Sudut Musik Kami</span>
            <a href="#" className="footer-link-premium" target="_blank" rel="noopener noreferrer">
              Spotify Shared Playlist ↗
            </a>
          </div>
          <div className="footer-col reveal-outro">
            <span className="footer-col-label">Ikuti Jejak Kami</span>
            <a href="#" className="footer-link-premium" target="_blank" rel="noopener noreferrer">
              Instagram Kosbu ↗
            </a>
          </div>
          <div className="footer-col reveal-outro">
            <span className="footer-col-label">Almamater Awal</span>
            <a
              href="https://www.yarsi.ac.id"
              className="footer-link-premium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Universitas YARSI ↗
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-credit">
            © 2026 Kosbu. Crafted with passion.
          </span>
          <span
            className="footer-back-to-top"
            id="backToTopBtn"
            onClick={handleBackToTop}
          >
            Kembali ke Atas ↑
          </span>
        </div>
      </div>
    </section>
  );
}
