"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Diperbarui ke YARSI '22 sesuai angkatanmu
const MARQUEE_ITEMS = [
  "KOSBU", "·", "12 KEPALA", "·", "SATU JIWA", "·",
  "YARSI '22", "·", "KENANGAN ABADI", "·",
];

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const ctaBtnRef = useRef<HTMLAnchorElement>(null);
  const lenis = useLenis();

  useGSAP(() => {
    // 1. Reveal animations saat section masuk viewport
    gsap.from(".reveal-outro", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.08,
      ease: "power3.out",
    });

    // 2. Infinite marquee yang reaktif terhadap kecepatan scroll
    if (marqueeRef.current) {
      const marqueeTrack = marqueeRef.current.querySelector(".footer-marquee-track");
      if (marqueeTrack) {
        // Gandakan track secara internal untuk infinite loop yang smooth
        const marqueeTween = gsap.to(marqueeTrack, {
          xPercent: -50,
          repeat: -1,
          duration: 25, // Sedikit diperlambat agar lebih elegan saat idle
          ease: "none",
        });

        // Membuat marquee berakselerasi dan berbalik arah sesuai arah scroll
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const velocity = self.getVelocity() * 0.005;
            // Batasi kecepatan minimal dan arah gerak marquee
            const targetTimeScale = self.direction === 1 ? 1 + Math.abs(velocity) : -1 - Math.abs(velocity);
            
            gsap.to(marqueeTween, {
              timeScale: targetTimeScale,
              duration: 0.5,
              ease: "power2.out"
            });
          }
        });
      }
    }

    // 3. Efek Mikro-interaksi Magnetik Ringan pada Tombol CTA Utama
    const ctaBtn = ctaBtnRef.current;
    if (ctaBtn) {
      const onMouseMove = (e: MouseEvent) => {
        const rect = ctaBtn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(ctaBtn, {
          x: x * 0.3, // Faktor magnetik (30%)
          y: y * 0.3,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const onMouseLeave = () => {
        gsap.to(ctaBtn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
      };

      ctaBtn.addEventListener("mousemove", onMouseMove);
      ctaBtn.addEventListener("mouseleave", onMouseLeave);

      return () => {
        ctaBtn.removeEventListener("mousemove", onMouseMove);
        ctaBtn.removeEventListener("mouseleave", onMouseLeave);
      };
    }
  }, { scope: containerRef });

  const handleBackToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="footer-section w-full relative overflow-hidden" id="contact" ref={containerRef}>
      {/* Decorative top marquee strip */}
      <div className="footer-marquee-wrapper reveal-outro select-none" ref={marqueeRef} aria-hidden="true">
        <div className="footer-marquee-track flex whitespace-nowrap w-max">
          {/* Loop 4 kali agar track memanjang sempurna dan tidak terputus */}
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className={`footer-marquee-item inline-block mx-4 ${item === "·" ? "footer-marquee-dot font-bold" : ""}`}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="footer-container max-w-7xl mx-auto px-6 md:px-12 py-16 flex flex-col justify-between">
        {/* Big CTA Statement */}
        <div className="footer-cta-block my-12 flex flex-col items-start gap-4">
          <p className="footer-eyebrow reveal-outro text-sm uppercase tracking-widest opacity-60">Hubungi Kami</p>
          <h2 className="footer-cta-heading reveal-outro text-4xl md:text-6xl font-bold tracking-tight max-w-3xl leading-tight">
            Mari buat lebih banyak kenangan tak terlupakan.
          </h2>
          <a
            ref={ctaBtnRef}
            href="mailto:kosbu@yarsi.ac.id"
            className="footer-cta-btn reveal-outro mt-6 inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium rounded-full transition-transform duration-200 hover:scale-105"
            aria-label="Kirim email ke Kosbu"
          >
            <span className="footer-cta-btn-text">Sapa Kami</span>
            <span className="footer-cta-btn-arrow text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true">↗</span>
          </a>
        </div>

        {/* Divider */}
        <div className="footer-divider w-full h-[1px] bg-white/10 my-8 reveal-outro" aria-hidden="true"></div>

        {/* Links Grid */}
        <div className="footer-links-grid grid grid-cols-1 md:grid-cols-3 gap-8 my-8">
          <div className="footer-col flex flex-col gap-2 reveal-outro">
            <span className="footer-col-label text-xs uppercase tracking-wider opacity-40">Sudut Musik Kami</span>
            <a href="#" className="footer-link-premium text-lg hover:opacity-70 transition-opacity w-fit" target="_blank" rel="noopener noreferrer" aria-label="Buka Spotify Shared Playlist Kosbu">
              Spotify Playlist ↗
            </a>
          </div>
          <div className="footer-col flex flex-col gap-2 reveal-outro">
            <span className="footer-col-label text-xs uppercase tracking-wider opacity-40">Ikuti Jejak Kami</span>
            <a href="#" className="footer-link-premium text-lg hover:opacity-70 transition-opacity w-fit" target="_blank" rel="noopener noreferrer" aria-label="Buka Instagram Kosbu">
              Instagram ↗
            </a>
          </div>
          <div className="footer-col flex flex-col gap-2 reveal-outro">
            <span className="footer-col-label text-xs uppercase tracking-wider opacity-40">Almamater Awal</span>
            <a
              href="https://www.yarsi.ac.id"
              className="footer-link-premium text-lg hover:opacity-70 transition-opacity w-fit"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kunjungi website Universitas YARSI"
            >
              Universitas YARSI ↗
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-12 pt-8 border-t border-white/5">
          <div className="footer-bottom-left flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 reveal-outro">
            <span className="footer-logo-mark font-black text-xl tracking-wider">KOSBU</span>
            <span className="footer-credit text-sm opacity-50">© 2026 · Crafted with passion.</span>
          </div>
          <button
            className="footer-back-to-top group flex items-center gap-2 text-sm uppercase tracking-wider opacity-70 hover:opacity-100 transition-opacity reveal-outro"
            id="backToTopBtn"
            onClick={handleBackToTop}
            aria-label="Kembali ke bagian atas halaman"
          >
            <span className="footer-btt-label">Kembali ke Atas</span>
            <span className="footer-btt-icon transition-transform duration-300 group-hover:-translate-y-1" aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </section>
  );
}