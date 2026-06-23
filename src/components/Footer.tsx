"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MARQUEE_ITEMS = [
  "KOSBU", "·", "12 KEPALA", "·", "SATU JIWA", "·",
  "YARSI '25", "·", "KENANGAN ABADI", "·",
];

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useGSAP(() => {
    // Reveal animations
    gsap.from(".reveal-outro", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 60,
      opacity: 0,
      duration: 1.2,
      stagger: 0.12,
      ease: "power3.out",
    });

    // Infinite marquee
    if (marqueeRef.current) {
      const marqueeTrack = marqueeRef.current.querySelector(".footer-marquee-track");
      if (marqueeTrack) {
        gsap.to(marqueeTrack, {
          xPercent: -50,
          repeat: -1,
          duration: 20,
          ease: "none",
        });
      }
    }
  }, { scope: containerRef });

  const handleBackToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.8 });
    }
  };

  return (
    <section className="footer-section" id="contact" ref={containerRef}>
      {/* Decorative top marquee strip */}
      <div className="footer-marquee-wrapper reveal-outro" ref={marqueeRef} aria-hidden="true">
        <div className="footer-marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className={`footer-marquee-item ${item === "·" ? "footer-marquee-dot" : ""}`}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="footer-container">
        {/* Big CTA Statement */}
        <div className="footer-cta-block">
          <p className="footer-eyebrow reveal-outro">Hubungi Kami</p>
          <h2 className="footer-cta-heading reveal-outro">
            Mari buat lebih banyak kenangan tak terlupakan.
          </h2>
          <a
            href="mailto:kosbu@yarsi.ac.id"
            className="footer-cta-btn reveal-outro"
            aria-label="Kirim email ke Kosbu"
          >
            <span className="footer-cta-btn-text">Sapa Kami</span>
            <span className="footer-cta-btn-arrow" aria-hidden="true">↗</span>
          </a>
        </div>

        {/* Divider */}
        <div className="footer-divider reveal-outro" aria-hidden="true"></div>

        {/* Links Grid */}
        <div className="footer-links-grid">
          <div className="footer-col reveal-outro">
            <span className="footer-col-label">Sudut Musik Kami</span>
            <a href="#" className="footer-link-premium" target="_blank" rel="noopener noreferrer" aria-label="Buka Spotify Shared Playlist Kosbu">
              Spotify Playlist ↗
            </a>
          </div>
          <div className="footer-col reveal-outro">
            <span className="footer-col-label">Ikuti Jejak Kami</span>
            <a href="#" className="footer-link-premium" target="_blank" rel="noopener noreferrer" aria-label="Buka Instagram Kosbu">
              Instagram ↗
            </a>
          </div>
          <div className="footer-col reveal-outro">
            <span className="footer-col-label">Almamater Awal</span>
            <a
              href="https://www.yarsi.ac.id"
              className="footer-link-premium"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kunjungi website Universitas YARSI"
            >
              Universitas YARSI ↗
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-left reveal-outro">
            <span className="footer-logo-mark">KOSBU</span>
            <span className="footer-credit">© 2026 · Crafted with passion.</span>
          </div>
          <button
            className="footer-back-to-top reveal-outro"
            id="backToTopBtn"
            onClick={handleBackToTop}
            aria-label="Kembali ke bagian atas halaman"
          >
            <span className="footer-btt-label">Kembali ke Atas</span>
            <span className="footer-btt-icon" aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </section>
  );
}
