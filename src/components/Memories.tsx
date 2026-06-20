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
  isPortrait?: boolean;
}

const MEMORIES: MemoryItem[] = [
  {
    id: "yarsi",
    title: "Universitas YARSI",
    category: "Titik Awal Berjumpa / 2022",
    description: "Tempat takdir mempertemukan 12 kepala dengan latar belakang berbeda untuk memulai perjalanan perkuliahan bersama.",
    imgUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "nasi-kotak",
    title: "Momen Nasi Kotak",
    category: "Tradisi Masjid Kampus",
    description: "Pertemuan legendaris setelah ibadah Jumat di masjid kampus YARSI yang menandai titik awal fondasi kebersamaan kami.",
    imgUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=1000",
    isPortrait: true,
  },
  {
    id: "night-out",
    title: "Jakarta Night Out",
    category: "Petualangan Pertama",
    description: "Obrolan santai, tawa lepas, dan petualangan pertama menyusuri gemerlapnya malam ibukota untuk melepas penat tugas.",
    imgUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000",
    isPortrait: true,
  },
  {
    id: "wisuda",
    title: "Hari Wisuda",
    category: "Tumbuh Bersama / 2026",
    description: "Puncak perjuangan akademik kami. Akhir manis dari status mahasiswa, dan lembaran baru persahabatan abadi.",
    imgUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000",
  },
];

export default function Memories() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMemory, setActiveMemory] = useState<MemoryItem | null>(null);

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

    // 3. Premium Parallax scroll effect for cards (vertical offset shifting)
    const cards = gsap.utils.toArray(".work-card");
    cards.forEach((card: any, i) => {
      const speed = i % 2 === 0 ? -40 : 40;
      gsap.fromTo(
        card,
        { y: speed },
        {
          y: -speed,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => {
      document.body.classList.remove("dark-theme");
    };
  }, { scope: containerRef });

  // Mouse move handler for glowing border effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  };

  return (
    <section className="works-section" id="works" ref={containerRef}>
      <div className="works-container">
        <div className="works-header">
          <p className="works-subtitle reveal-work">Kilas Balik</p>
          <h2 className="works-title reveal-work">Galeri Memori</h2>
        </div>

        <div className="works-grid">
          {MEMORIES.map((memory) => (
            <div
              key={memory.id}
              className={`work-card reveal-work ${memory.isPortrait ? "portrait" : ""}`}
              onMouseMove={handleMouseMove}
              onClick={() => setActiveMemory(memory)}
            >
              <div className="work-img-wrapper">
                <img
                  className="work-img"
                  src={memory.imgUrl}
                  alt={memory.title}
                />
              </div>
              <div className="work-info">
                <span className="work-project-title">{memory.title}</span>
                <span className="work-category">{memory.category}</span>
              </div>
              <p className="work-desc">{memory.description}</p>
            </div>
          ))}
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
