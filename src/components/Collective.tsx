"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface MemberDetails {
  birthPlace: string;
  birthDate: string;
  about: string;
  favGame: string;
  ig: string;
}

interface Member {
  index: string;
  name: string;
  role: string;
  imgUrl: string;
  details: MemberDetails;
}

const MEMBERS: Member[] = [
  {
    index: "01",
    name: "Rian Kusuma",
    role: "Ketua Circle / Penyatu Suasana",
    imgUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    details: {
      birthPlace: "Jakarta",
      birthDate: "12 April 2004",
      about: "Ketua circle yang selalu punya cara unik untuk menyatukan suasana dan merencanakan nongkrong seru.",
      favGame: "Mobile Legends & Valorant",
      ig: "@riankusuma_",
    },
  },
  {
    index: "02",
    name: "Farhan Adi",
    role: "Andalan Tugas Akademik",
    imgUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
    details: {
      birthPlace: "Bekasi",
      birthDate: "28 Oktober 2003",
      about: "Si jenius akademik yang selalu siap membantu teman-teman saat tugas kuliah menumpuk.",
      favGame: "Dota 2 & Chess.com",
      ig: "@farhanadi",
    },
  },
  {
    index: "03",
    name: "Sarah Amalia",
    role: "Seksi Keuangan & Bendahara Kas",
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600",
    details: {
      birthPlace: "Jakarta",
      birthDate: "5 September 2004",
      about: "Bendahara kas yang teliti dan tegas. Tidak ada rupiah pun yang luput dari pencatatannya.",
      favGame: "Genshin Impact & Stardew Valley",
      ig: "@sarahamalia",
    },
  },
  {
    index: "04",
    name: "Dika Pratama",
    role: "Spesialis Penemu Tempat Nongkrong",
    imgUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
    details: {
      birthPlace: "Tangerang",
      birthDate: "17 Juni 2003",
      about: "Petualang kuliner yang tahu semua hidden gems tempat nongkrong asyik di Jakarta.",
      favGame: "PUBG Mobile & FIFA",
      ig: "@dikapratama",
    },
  },
  {
    index: "05",
    name: "Amelia Putri",
    role: "Pengabdi Kamera & Dokumentasi",
    imgUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=600",
    details: {
      birthPlace: "Depok",
      birthDate: "22 Januari 2004",
      about: "Pengabdi kamera yang selalu mendokumentasikan setiap momen berharga circle.",
      favGame: "Animal Crossing & Minecraft",
      ig: "@amelputri",
    },
  },
  {
    index: "06",
    name: "Bagus Utomo",
    role: "Teman Mabar Game Tiap Malam",
    imgUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600",
    details: {
      birthPlace: "Jakarta",
      birthDate: "9 Agustus 2003",
      about: "Gamer sejati yang selalu online tiap malam, siap menemani mabar game apa saja.",
      favGame: "Valorant & CS:GO",
      ig: "@bagusutomo",
    },
  },
  {
    index: "07",
    name: "Nadia Selina",
    role: "Kurator Musik & Playlist Nongkrong",
    imgUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600",
    details: {
      birthPlace: "Bogor",
      birthDate: "14 Februari 2004",
      about: "Musik enthusiast yang bertugas mengurasi playlist lagu seru saat nongkrong bareng.",
      favGame: "Roblox & Osu!",
      ig: "@nadiaselina",
    },
  },
  {
    index: "08",
    name: "Raka Rayhan",
    role: "Supir Andalan Tiap Road Trip",
    imgUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600",
    details: {
      birthPlace: "Jakarta",
      birthDate: "30 November 2003",
      about: "Supir andalan berlisensi yang paling sabar membawa mobil saat trip dadakan ke luar kota.",
      favGame: "Assetto Corsa & GTA V",
      ig: "@rakarayhan",
    },
  },
  {
    index: "09",
    name: "Gita Clarissa",
    role: "Update Gosip Kampus Terkini",
    imgUrl:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=600",
    details: {
      birthPlace: "Bandung",
      birthDate: "8 Juli 2004",
      about: "Pembawa info terhangat di kampus yang selalu membuat suasana obrolan menjadi ramai.",
      favGame: "The Sims 4 & Among Us",
      ig: "@gitaclarissa",
    },
  },
  {
    index: "10",
    name: "Reza Mahendra",
    role: "Pembuat Rencana Dadakan",
    imgUrl:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600",
    details: {
      birthPlace: "Jakarta",
      birthDate: "19 Mei 2003",
      about: "Inisiator rencana trip dadakan. Moto hidupnya: 'Rencana yang mendadak adalah yang paling jadi.'",
      favGame: "Mobile Legends & Apex Legends",
      ig: "@rezamahendra",
    },
  },
  {
    index: "11",
    name: "Siti Rahma",
    role: "Tempat Curhat & Pendengar Baik",
    imgUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600",
    details: {
      birthPlace: "Tangerang Selatan",
      birthDate: "3 Maret 2004",
      about: "Pendengar yang baik tempat curhat segala keluh kesah kehidupan perkuliahan maupun asmara.",
      favGame: "Candy Crush & Hay Day",
      ig: "@sitirahma",
    },
  },
  {
    index: "12",
    name: "Fajar Ramadhan",
    role: "Seksi Konsumsi & Nasi Kotak",
    imgUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600",
    details: {
      birthPlace: "Jakarta",
      birthDate: "15 November 2003",
      about: "Sang pemburu nasi kotak masjid sejati yang selalu hafal jadwal acara keagamaan kampus.",
      favGame: "Clash of Clans & FIFA",
      ig: "@fajarramadhan",
    },
  },
];

export default function Collective() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

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

  const openDetails = (member: Member) => {
    setSelectedMember(member);
  };

  const closeDetails = () => {
    setSelectedMember(null);
  };

  return (
    <section className="members-section" id="members" ref={containerRef}>
      <div className="members-container">
        <div className="members-header">
          <p className="members-subtitle reveal-member">Kolektif Kami</p>
          <h2 className="members-title reveal-member">12 Kepala di Balik Kosbu</h2>
        </div>

        <div className="members-grid">
          {MEMBERS.map((member) => (
            <div
              className="member-card reveal-member"
              key={member.index}
              onClick={() => openDetails(member)}
            >
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

      {/* Premium Detail Modal Overlay */}
      <div
        className={`member-modal-overlay ${selectedMember ? "active" : ""}`}
        onClick={closeDetails}
      >
        {selectedMember && (
          <div
            className="member-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-modal-btn" onClick={closeDetails}>
              &times;
            </button>
            <div className="modal-body-grid">
              <div className="modal-img-col">
                <img
                  src={selectedMember.imgUrl}
                  alt={selectedMember.name}
                />
              </div>
              <div className="modal-info-col">
                <h2>{selectedMember.name}</h2>
                <p className="modal-role">{selectedMember.role}</p>
                <div className="modal-detail-items">
                  <div className="modal-detail-item">
                    <span className="detail-label">Tempat, Tanggal Lahir</span>
                    <span className="detail-value">
                      {selectedMember.details.birthPlace},{" "}
                      {selectedMember.details.birthDate}
                    </span>
                  </div>
                  <div className="modal-detail-item">
                    <span className="detail-label">Tentang</span>
                    <span className="detail-value">
                      {selectedMember.details.about}
                    </span>
                  </div>
                  <div className="modal-detail-item">
                    <span className="detail-label">Game Favorit</span>
                    <span className="detail-value">
                      {selectedMember.details.favGame}
                    </span>
                  </div>
                  <div className="modal-detail-item">
                    <span className="detail-label">Instagram</span>
                    <span className="detail-value">
                      <a
                        href={`https://instagram.com/${selectedMember.details.ig.replace(
                          "@",
                          ""
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {selectedMember.details.ig} ↗
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
