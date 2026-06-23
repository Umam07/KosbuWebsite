"use client";

import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

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
  {
    id: "bukber",
    title: "Bukber & Sahur Bersama",
    category: "Momen Ramadan / 2023",
    description:
      "Kehangatan bulan suci di kosan. Mulai dari memasak sahur bareng hingga berburu takjil di jalanan Jakarta.",
    imgUrl:
      "https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "trip-puncak",
    title: "Trip Dadakan ke Puncak",
    category: "Liburan Singkat / 2024",
    description:
      "Melarikan diri sejenak dari hiruk-pikuk tugas kuliah ke dinginnya udara Puncak, menikmati malam dingin dengan api unggun.",
    imgUrl:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "begadang-tugas",
    title: "Begadang Demi Project",
    category: "Perjuangan Akademik / 2025",
    description:
      "Malam-malam panjang yang dihabiskan bersama cangkir kopi, baris-baris coding, dan tawa untuk menyelesaikan proyek akhir.",
    imgUrl:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "birthday-surprise",
    title: "Kejutan Ulang Tahun",
    category: "Tradisi Circle",
    description:
      "Tradisi sederhana merayakan hari lahir setiap anggota dengan kejutan tengah malam, kue seadanya, dan doa-doa terbaik.",
    imgUrl:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "kopdar-kafe",
    title: "Diskusi & Kopi Malam",
    category: "Nongkrong Santai / 2025",
    description:
      "Obrolan hangat di sudut kafe favorit, bertukar ide, keluh kesah, hingga merencanakan masa depan bersama.",
    imgUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "kelulusan-circle",
    title: "Syukuran Kelulusan",
    category: "Pencapaian Bersama / 2026",
    description:
      "Makan malam bersama sebagai bentuk rasa syukur atas kelulusan seluruh anggota circle tanpa ada yang tertinggal.",
    imgUrl:
      "https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=1000",
  },
];


export default function Memories() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalContainerRef = useRef<HTMLDivElement>(null);
  const [activeMemory, setActiveMemory] = useState<MemoryItem | null>(null);
  const [showGallery, setShowGallery] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activeMemory || showGallery) {
      document.body.classList.add("modal-open");
      lenis?.stop();
    } else {
      document.body.classList.remove("modal-open");
      lenis?.start();
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [activeMemory, showGallery, lenis]);

  const openGallery = () => {
    setShowGallery(true);
  };

  const closeGallery = () => {
    setShowGallery(false);
  };

  const formatIndex = (index: number) => {
    return index < 10 ? `0${index}` : `${index}`;
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // 1. Desktop mode: Horizontal scroll + Pinning
    mm.add("(min-width: 901px)", () => {
      const container = containerRef.current;
      const track = horizontalContainerRef.current;
      if (container && track) {
        const scrollWidth = track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${scrollWidth}`,
            invalidateOnRefresh: true,
          },
        });
      }
    });

    // 2. Staggered reveal of header
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
      document.body.classList.remove("modal-open");
      mm.revert();
    };
  }, { scope: containerRef });

  // Only display the first 4 memories in the horizontal track
  const horizontalMemories = MEMORIES.slice(0, 4);

  return (
    <section className="works-section" id="works" ref={containerRef}>
      <div className="sticky-wrapper">
        <div className="works-container-horizontal" ref={horizontalContainerRef}>
          {/* Header Slide */}
          <div className="works-intro-slide">
            <div className="works-header reveal-work-header">
              <p className="works-subtitle">Kilas Balik</p>
              <h2 className="works-title">Galeri Memori</h2>
              <p className="works-scroll-hint">Gulir untuk menjelajah →</p>
            </div>
          </div>

          {/* Memories Track */}
          <div className="memories-track">
            {horizontalMemories.map((memory, i) => (
              <div
                key={memory.id}
                className="memory-slide"
                onClick={() => setActiveMemory(memory)}
              >
                <div className="slide-num">{formatIndex(i + 1)}</div>
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

            {/* Static "Lihat Lebih Banyak" Slide */}
            <div
              className="memory-slide see-more-slide"
              onClick={openGallery}
            >
              <div className="slide-num">05</div>
              <div className="slide-img-wrapper see-more-img-wrapper">
                <div className="see-more-bg-grid">
                  <div className="see-more-icon-circle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </div>
                </div>
                <div className="slide-img-overlay">
                  <span>Buka Galeri</span>
                </div>
              </div>
              <div className="slide-info">
                <span className="slide-category">Galeri Momen</span>
                <h3 className="slide-title">Lihat Lebih Banyak</h3>
                <p className="slide-desc">
                  Buka sisa foto kenangan dan momen indah kebersamaan kami.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-screen Gallery Overlay (Acts like a new page) */}
      {mounted && createPortal(
        <>
          <div className={`full-gallery-overlay ${showGallery ? "active" : ""}`} data-lenis-prevent>
            <div className="gallery-overlay-inner">
              <div className="gallery-header-container">
                <button className="back-to-home-btn" onClick={closeGallery}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  Kembali
                </button>
                <div className="gallery-title-wrapper">
                  <h2 className="gallery-overlay-title">Semua Kenangan</h2>
                  <p className="gallery-overlay-subtitle">
                    Koleksi foto lengkap perjalanan dan persahabatan lingkaran Kosbu.
                  </p>
                </div>
                <div className="gallery-header-spacer"></div>
              </div>

              <div className="gallery-grid-container">
                <div className="gallery-grid">
                  {MEMORIES.map((memory, i) => (
                    <div
                      key={memory.id}
                      className="gallery-grid-card"
                      onClick={() => setActiveMemory(memory)}
                    >
                      <div className="grid-card-img-wrapper">
                        <img
                          src={memory.imgUrl}
                          alt={memory.title}
                          className="grid-card-img"
                        />
                        <div className="grid-card-overlay">
                          <span>Lihat Detail</span>
                        </div>
                      </div>
                      <div className="grid-card-info">
                        <div className="grid-card-meta">
                          <span className="grid-card-num">{formatIndex(i + 1)}</span>
                          <span className="grid-card-category">{memory.category}</span>
                        </div>
                        <h3 className="grid-card-title">{memory.title}</h3>
                        <p className="grid-card-desc">{memory.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
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
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
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
        </>,
        document.body
      )}
    </section>
  );
}
