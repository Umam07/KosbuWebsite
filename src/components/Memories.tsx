"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Memories() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Dark Theme toggle on scroll
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 60%",
      end: "bottom 30%",
      onToggle: (self) => {
        if (self.isActive) {
          document.body.classList.add("dark-theme");
        } else {
          document.body.classList.remove("dark-theme");
        }
      },
    });

    // 2. Staggered fade-up animation for memories
    gsap.from(".reveal-work", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
      y: 60,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power3.out",
    });

    return () => {
      document.body.classList.remove("dark-theme");
    };
  }, { scope: containerRef });

  return (
    <section className="works-section" id="works" ref={containerRef}>
      <div className="works-container">
        <div className="works-header">
          <p className="works-subtitle reveal-work">Kilas Balik</p>
          <h2 className="works-title reveal-work">Galeri Memori</h2>
        </div>

        <div className="works-grid">
          {/* Card 1 */}
          <div className="work-card reveal-work">
            <div className="work-img-wrapper">
              <img
                className="work-img"
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000"
                alt="Universitas YARSI"
              />
            </div>
            <div className="work-info">
              <span className="work-project-title">Universitas YARSI</span>
              <span className="work-category">Titik Awal Berjumpa / 2022</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="work-card portrait reveal-work">
            <div className="work-img-wrapper">
              <img
                className="work-img"
                src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=1000"
                alt="Nasi Kotak Masjid"
              />
            </div>
            <div className="work-info">
              <span className="work-project-title">Momen Nasi Kotak</span>
              <span className="work-category">Tradisi Masjid Kampus</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="work-card portrait reveal-work">
            <div className="work-img-wrapper">
              <img
                className="work-img"
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000"
                alt="Eksplorasi Jakarta"
              />
            </div>
            <div className="work-info">
              <span className="work-project-title">Jakarta Night Out</span>
              <span className="work-category">Petualangan Pertama</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="work-card reveal-work">
            <div className="work-img-wrapper">
              <img
                className="work-img"
                src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000"
                alt="Graduation Wisuda"
              />
            </div>
            <div className="work-info">
              <span className="work-project-title">Hari Wisuda</span>
              <span className="work-category">Tumbuh Bersama / 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
