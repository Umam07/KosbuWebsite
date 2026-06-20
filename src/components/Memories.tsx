"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface MemoryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imgUrl: string;
}

const MEMORIES: MemoryItem[] = [
  {
    id: "yarsi",
    title: "Universitas YARSI",
    category: "Titik Awal Berjumpa / 2022",
    description:
      "Tempat takdir mempertemukan 12 kepala dengan latar belakang berbeda untuk memulai perjalanan perkuliahan bersama.",
    imgUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "nasi-kotak",
    title: "Momen Nasi Kotak",
    category: "Tradisi Masjid Kampus",
    description:
      "Pertemuan legendaris setelah ibadah Jumat di masjid kampus YARSI yang menandai titik awal fondasi kebersamaan kami.",
    imgUrl:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "night-out",
    title: "Jakarta Night Out",
    category: "Petualangan Pertama",
    description:
      "Obrolan santai, tawa lepas, dan petualangan pertama menyusuri gemerlapnya malam ibukota untuk melepas penat tugas.",
    imgUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "wisuda",
    title: "Hari Wisuda",
    category: "Tumbuh Bersama / 2026",
    description:
      "Puncak perjuangan akademik kami. Akhir manis dari status mahasiswa, dan lembaran baru persahabatan abadi.",
    imgUrl:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000",
  },
];

export default function Memories() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeMemory, setActiveMemory] = useState<MemoryItem | null>(null);

  useGSAP(() => {
    // 1. Dark Theme toggle on scroll
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 20%",
      end: "bottom 80%",
      onToggle: (self) => {
        if (self.isActive) {
          document.body.classList.add("dark-theme");
        } else {
          document.body.classList.remove("dark-theme");
        }
      },
    });

    // 2. Horizontal scroll translation for Desktop
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 901px)", () => {
      const track = trackRef.current;
      if (track) {
        const scrollWidth = track.scrollWidth - window.innerWidth;
        // Horizontal sliding timeline
        gsap.to(track, {
          x: -scrollWidth - 150, // scroll offset
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });
      }
    });

    // 3. Staggered reveal of header
    gsap.from(".reveal-work-header", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    return () => {
      document.body.classList.remove("dark-theme");
      mm.revert();
    };
  }, { scope: containerRef });

  return (
    <section className="works-section" id="works" ref={containerRef}>
      <div className="sticky-wrapper">
        <div className="works-container-horizontal">
          {/* Header Slide */}
          <div className="works-intro-slide">
            <div className="works-header reveal-work-header">
              <p className="works-subtitle">Kilas Balik</p>
              <h2 className="works-title">Galeri Memori</h2>
              <p className="works-scroll-hint">Gulir untuk menjelajah →</p>
            </div>
          </div>

          {/* Memories Track */}
          <div className="memories-track" ref={trackRef}>
            {MEMORIES.map((memory, i) => (
              <div
                key={memory.id}
                className="memory-slide"
                onClick={() => setActiveMemory(memory)}
              >
                <div className="slide-num">0{i + 1}</div>
                <div className="slide-img-wrapper">
                  <img
                    className="slide-img"
                    src={memory.imgUrl}
                    alt={memory.title}
                  />
                  <div className="slide-img-overlay">
                    <span>Lihat Detail</span>
                  </div>
                </div>
                <div className="slide-info">
                  <span className="slide-category">{memory.category}</span>
                  <h3 className="slide-title">{memory.title}</h3>
                  <p className="slide-desc">{memory.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Pop-up Modal */}
      <div
        className={`memory-lightbox-overlay ${activeMemory ? "active" : ""}`}
        onClick={() => setActiveMemory(null)}
      >
        {activeMemory && (
          <div
            className="memory-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-lightbox-btn"
              onClick={() => setActiveMemory(null)}
            >
              &times;
            </button>
            <img
              src={activeMemory.imgUrl}
              alt={activeMemory.title}
              className="lightbox-img"
            />
            <div className="lightbox-info">
              <h3>{activeMemory.title}</h3>
              <p className="lightbox-category">{activeMemory.category}</p>
              <p className="lightbox-desc">{activeMemory.description}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
