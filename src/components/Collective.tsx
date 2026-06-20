"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Member {
  index: string;
  name: string;
  role: string;
  imgUrl: string;
}

const MEMBERS: Member[] = [
  {
    index: "01",
    name: "Rian Kusuma",
    role: "Ketua Circle / Penyatu Suasana",
    imgUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
  },
  {
    index: "02",
    name: "Farhan Adi",
    role: "Andalan Tugas Akademik",
    imgUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
  },
  {
    index: "03",
    name: "Sarah Amalia",
    role: "Seksi Keuangan & Bendahara Kas",
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600",
  },
  {
    index: "04",
    name: "Dika Pratama",
    role: "Spesialis Penemu Tempat Nongkrong",
    imgUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
  },
  {
    index: "05",
    name: "Amelia Putri",
    role: "Pengabdi Kamera & Dokumentasi",
    imgUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=600",
  },
  {
    index: "06",
    name: "Bagus Utomo",
    role: "Teman Mabar Game Tiap Malam",
    imgUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600",
  },
  {
    index: "07",
    name: "Nadia Selina",
    role: "Kurator Musik & Playlist Nongkrong",
    imgUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600",
  },
  {
    index: "08",
    name: "Raka Rayhan",
    role: "Supir Andalan Tiap Road Trip",
    imgUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600",
  },
  {
    index: "09",
    name: "Gita Clarissa",
    role: "Update Gosip Kampus Terkini",
    imgUrl:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=600",
  },
  {
    index: "10",
    name: "Reza Mahendra",
    role: "Pembuat Rencana Dadakan",
    imgUrl:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600",
  },
  {
    index: "11",
    name: "Siti Rahma",
    role: "Tempat Curhat & Pendengar Baik",
    imgUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600",
  },
  {
    index: "12",
    name: "Fajar Ramadhan",
    role: "Seksi Konsumsi & Nasi Kotak",
    imgUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600",
  },
];

export default function Collective() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".reveal-member", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.08,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <section className="members-section" id="members" ref={containerRef}>
      <div className="members-container">
        <div className="members-header">
          <p className="members-subtitle reveal-member">Kolektif Kami</p>
          <h2 className="members-title reveal-member">12 Kepala di Balik Kosbu</h2>
        </div>

        <div className="members-grid">
          {MEMBERS.map((member) => (
            <div className="member-card reveal-member" key={member.index}>
              <div className="member-img-wrapper">
                <span className="member-index">{member.index}</span>
                <img
                  className="member-img"
                  src={member.imgUrl}
                  alt={member.name}
                />
              </div>
              <div className="member-info-wrapper">
                <div className="member-line"></div>
                <h3 className="member-card-name">{member.name}</h3>
                <p className="member-card-role">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
