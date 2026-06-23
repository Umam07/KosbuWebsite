"use client";

import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface MemberDetails {
  birthPlace: string;
  birthDate: string;
  about: string;
  favGames: string[];
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
    name: "Rafly Eryan Azis",
    role: "Lorem Ipsum",
    imgUrl:
      "https://res.cloudinary.com/dr57ribr5/image/upload/v1766763775/Rafly_apu6fy.jpg",
    details: {
      birthPlace: "Jakarta",
      birthDate: "12 April 2004",
      about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      favGames: ["Mobile Legends", "Valorant"],
      ig: "@raflyeryan",
    },
  },
  {
    index: "02",
    name: "Muhammad Syafi'ul Umam",
    role: "Lorem Ipsum",
    imgUrl:
      "https://res.cloudinary.com/dr57ribr5/image/upload/v1766763773/MamSky_qy1328.jpg",
    details: {
      birthPlace: "Bekasi",
      birthDate: "28 Oktober 2003",
      about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      favGames: ["Dota 2", "Chess.com"],
      ig: "@syafiulumam",
    },
  },
  {
    index: "03",
    name: "Kiki Aimar Wicaksana",
    role: "Lorem Ipsum",
    imgUrl:
      "https://res.cloudinary.com/dr57ribr5/image/upload/v1764063005/Kiki_kblf1v.jpg",
    details: {
      birthPlace: "Jakarta",
      birthDate: "5 September 2004",
      about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      favGames: ["Genshin Impact", "Stardew Valley"],
      ig: "@kikiaimar",
    },
  },
  {
    index: "04",
    name: "Muhammad Ramadhan Prinada",
    role: "Lorem Ipsum",
    imgUrl:
      "https://www.yarsi.ac.id/dpjj/wp-content/uploads/2024/08/DSC05140-2048x1152.jpg",
    details: {
      birthPlace: "Tangerang",
      birthDate: "17 Juni 2003",
      about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      favGames: ["PUBG Mobile", "FIFA"],
      ig: "@ramadhanprinada",
    },
  },
  {
    index: "05",
    name: "Muhammad Taufiqulhakim Maha",
    role: "Lorem Ipsum",
    imgUrl:
      "https://res.cloudinary.com/dr57ribr5/image/upload/v1751428375/IMG_20230526_114827_je7c6w.jpg",
    details: {
      birthPlace: "Depok",
      birthDate: "22 Januari 2004",
      about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      favGames: ["Animal Crossing", "Minecraft"],
      ig: "@taufiqulhakim",
    },
  },
  {
    index: "06",
    name: "Rafi Daniswara Anggoro Putra",
    role: "Lorem Ipsum",
    imgUrl:
      "https://res.cloudinary.com/dr57ribr5/image/upload/v1766763774/Denis_ohil78.jpg",
    details: {
      birthPlace: "Jakarta",
      birthDate: "9 Agustus 2003",
      about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      favGames: ["Valorant", "CS:GO"],
      ig: "@rafidaniswara",
    },
  },
  {
    index: "07",
    name: "Muhammad Isa Agiya Ashari",
    role: "Lorem Ipsum",
    imgUrl:
      "https://res.cloudinary.com/dr57ribr5/image/upload/v1764063129/isa_lcwn9n.jpg",
    details: {
      birthPlace: "Bogor",
      birthDate: "14 Februari 2004",
      about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      favGames: ["Roblox", "Osu!"],
      ig: "@isaagiya",
    },
  },
  {
    index: "08",
    name: "Andhika Ardianto",
    role: "Lorem Ipsum",
    imgUrl:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=600",
    details: {
      birthPlace: "Jakarta",
      birthDate: "30 November 2003",
      about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      favGames: ["Assetto Corsa", "GTA V"],
      ig: "@andhikaard",
    },
  },
  {
    index: "09",
    name: "Wily Ahmad Fauzan",
    role: "Lorem Ipsum",
    imgUrl:
      "https://res.cloudinary.com/dr57ribr5/image/upload/v1764062074/Willy_Gaming_tpg45k.jpg",
    details: {
      birthPlace: "Bandung",
      birthDate: "8 Juli 2004",
      about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      favGames: ["The Sims 4", "Among Us"],
      ig: "@wilyahmad",
    },
  },
  {
    index: "10",
    name: "Hilal Rizqi Akbar",
    role: "Lorem Ipsum",
    imgUrl:
      "https://www.yarsi.ac.id/dpjj/wp-content/uploads/2024/08/DSC05134-2048x1152.jpg",
    details: {
      birthPlace: "Jakarta",
      birthDate: "19 Mei 2003",
      about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      favGames: ["Mobile Legends", "Apex Legends"],
      ig: "@hilalrizqi",
    },
  },
  {
    index: "11",
    name: "Hafizh Vito Pratomo",
    role: "Lorem Ipsum",
    imgUrl:
      "https://res.cloudinary.com/dr57ribr5/image/upload/v1764063276/IMG_20240606_163924_enzzqn.jpg",
    details: {
      birthPlace: "Tangerang Selatan",
      birthDate: "3 Maret 2004",
      about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      favGames: ["Candy Crush", "Hay Day"],
      ig: "@hafizhvito",
    },
  },
  {
    index: "12",
    name: "Bernando Idayah",
    role: "Lorem Ipsum",
    imgUrl:
      "https://images.unsplash.com/photo-1506803682981-6e718a9dd3ee?auto=format&fit=crop&q=80&w=600",
    details: {
      birthPlace: "Jakarta",
      birthDate: "15 November 2003",
      about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      favGames: ["Clash of Clans", "FIFA"],
      ig: "@bernandoidayah",
    },
  },
];

export default function Collective() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [mounted, setMounted] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedMember) {
      document.body.classList.add("modal-open");
      lenis?.stop();
    } else {
      document.body.classList.remove("modal-open");
      lenis?.start();
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [selectedMember, lenis]);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1px)", () => {
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
    });

    return () => {
      mm.revert();
    };
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
      {mounted && createPortal(
        <div
          className={`member-modal-overlay ${selectedMember ? "active" : ""}`}
          onClick={closeDetails}
        >
          {selectedMember && (
            <div
              className="member-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-modal-btn"
                onClick={closeDetails}
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
                      <div className="modal-tags-container">
                        {selectedMember.details.favGames.map((game, i) => (
                          <span key={i} className="game-tag">
                            {game}
                          </span>
                        ))}
                      </div>
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
        </div>,
        document.body
      )}
    </section>
  );
}
