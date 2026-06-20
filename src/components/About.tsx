"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Pinned Column for Desktop Screen
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 901px)", () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        pin: "#pinnedColumn",
        start: "top 120px",
        end: "bottom bottom",
        pinSpacing: false,
      });
    });

    // 2. Staggered fade-up animation for reveal elements
    gsap.from(".reveal-el", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
    });

    return () => {
      mm.revert();
    };
  }, { scope: containerRef });

  return (
    <section className="group-intro-section" id="groupIntro" ref={containerRef}>
      <div className="intro-container">
        <div className="intro-grid">
          <div className="intro-left" id="pinnedColumn">
            <h2 className="intro-title reveal-el">Tentang Kosbu</h2>
            <p className="main-paragraph reveal-el">
              Kosbu adalah sebuah circle persahabatan yang terbentuk secara
              tidak sengaja semasa kuliah di Universitas YARSI.
            </p>
            <p className="sub-paragraph reveal-el">
              Kelompok ini tercipta karena banyaknya kesamaan di antara para
              anggotanya, seperti menyukai aliran musik yang sama, hingga
              pertemuan legendaris &quot;nasi kotak&quot; di masjid kampus YARSI yang
              menandai titik awal berdirinya kelompok ini.
            </p>
            <p className="sub-paragraph reveal-el">
              Bagi kami, persahabatan bukan sekadar duduk bersama di kelas,
              melainkan tentang melewati dinamika kehidupan kampus, saling
              mendukung impian satu sama lain, dan menciptakan ruang bebas di
              mana kami bisa menjadi diri sendiri sepenuhnya.
            </p>
            <p className="sub-paragraph reveal-el">
              Dari koridor kampus hingga obrolan larut malam, setiap memori
              yang terukir adalah fondasi kokoh yang membuat ikatan 12 kepala
              ini tumbuh semakin kuat melampaui waktu kuliah kami.
            </p>
          </div>

          <div className="intro-right">
            <div className="member-list">
              <div className="member-item reveal-el">
                <span className="member-role">01 / Selera Musik</span>
                <span className="member-name">Kurator Playlist Bersama</span>
              </div>
              <div className="member-item reveal-el">
                <span className="member-role">02 / Tradisi</span>
                <span className="member-name">Pemburu Nasi Kotak Masjid</span>
              </div>
              <div className="member-item reveal-el">
                <span className="member-role">03 / Akademik</span>
                <span className="member-name">Tim Saling Bantu Tugas</span>
              </div>
              <div className="member-item reveal-el">
                <span className="member-role">04 / Petualangan</span>
                <span className="member-name">
                  Eksplorasi Tempat Nongkrong
                </span>
              </div>
              <div className="member-item reveal-el">
                <span className="member-role">05 / Liburan</span>
                <span className="member-name">Perencana Trip Dadakan</span>
              </div>
              <div className="member-item reveal-el">
                <span className="member-role">06 / Dokumentasi</span>
                <span className="member-name">Pengabdi Kamera & Momen</span>
              </div>
              <div className="member-item reveal-el">
                <span className="member-role">07 / Komunikasi</span>
                <span className="member-name">Grup Obrolan Tanpa Batas</span>
              </div>
              <div className="member-item reveal-el">
                <span className="member-role">08 / Hiburan</span>
                <span className="member-name">
                  Teman Mabar Game Tiap Malam
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
