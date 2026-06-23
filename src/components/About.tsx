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
                <div className="member-item-left">
                  <span className="member-role">01 / Selera Musik</span>
                </div>
                <div className="member-item-right">
                  <span className="member-name">Kurator Playlist Bersama</span>
                  <p className="member-desc">
                    Mengkombinasikan berbagai genre musik favorit dari setiap anggota untuk menemani setiap perjalanan dan sesi nongkrong.
                  </p>
                </div>
              </div>
              <div className="member-item reveal-el">
                <div className="member-item-left">
                  <span className="member-role">02 / Tradisi</span>
                </div>
                <div className="member-item-right">
                  <span className="member-name">Pemburu Nasi Kotak Masjid</span>
                  <p className="member-desc">
                    Tradisi berkumpul setelah ibadah Jumat untuk mencari nasi kotak bersama sebagai simbol awal persahabatan kami.
                  </p>
                </div>
              </div>
              <div className="member-item reveal-el">
                <div className="member-item-left">
                  <span className="member-role">03 / Akademik</span>
                </div>
                <div className="member-item-right">
                  <span className="member-name">Tim Saling Bantu Tugas</span>
                  <p className="member-desc">
                    Saling berbagi referensi, mengajari materi sulit, dan begadang bersama demi menuntaskan tugas kuliah tepat waktu.
                  </p>
                </div>
              </div>
              <div className="member-item reveal-el">
                <div className="member-item-left">
                  <span className="member-role">04 / Petualangan</span>
                </div>
                <div className="member-item-right">
                  <span className="member-name">Eksplorasi Tempat Nongkrong</span>
                  <p className="member-desc">
                    Mencari dan mencoba berbagai kafe, warung kopi, hingga hidden gems di penjuru kota untuk berkumpul dan bercerita.
                  </p>
                </div>
              </div>
              <div className="member-item reveal-el">
                <div className="member-item-left">
                  <span className="member-role">05 / Liburan</span>
                </div>
                <div className="member-item-right">
                  <span className="member-name">Perencana Trip Dadakan</span>
                  <p className="member-desc">
                    Merancang perjalanan spontan ke Puncak, pantai, atau kota terdekat tanpa rencana rumit yang justru selalu berhasil.
                  </p>
                </div>
              </div>
              <div className="member-item reveal-el">
                <div className="member-item-left">
                  <span className="member-role">06 / Dokumentasi</span>
                </div>
                <div className="member-item-right">
                  <span className="member-name">Pengabdi Kamera & Momen</span>
                  <p className="member-desc">
                    Merekam setiap senyum, tawa, kelakuan konyol, dan perjalanan berharga agar tidak ada satu pun memori yang terlupakan.
                  </p>
                </div>
              </div>
              <div className="member-item reveal-el">
                <div className="member-item-left">
                  <span className="member-role">07 / Komunikasi</span>
                </div>
                <div className="member-item-right">
                  <span className="member-name">Grup Obrolan Tanpa Batas</span>
                  <p className="member-desc">
                    Saluran komunikasi 24/7 yang dipenuhi diskusi tugas, meme jenaka, gosip hangat, hingga obrolan masa depan yang mendalam.
                  </p>
                </div>
              </div>
              <div className="member-item reveal-el">
                <div className="member-item-left">
                  <span className="member-role">08 / Hiburan</span>
                </div>
                <div className="member-item-right">
                  <span className="member-name">Teman Mabar Game Tiap Malam</span>
                  <p className="member-desc">
                    Mengisi waktu santai malam hari dengan bermain game kompetitif bersama untuk melepaskan penat aktivitas seharian.
                  </p>
                </div>
              </div>
              <div className="member-item reveal-el">
                <div className="member-item-left">
                  <span className="member-role">09 / Finansial</span>
                </div>
                <div className="member-item-right">
                  <span className="member-name">Pengelola Kas Circle</span>
                  <p className="member-desc">
                    Manajemen iuran kas secara transparan dan disiplin guna membiayai rencana liburan dan perayaan ulang tahun anggota.
                  </p>
                </div>
              </div>
              <div className="member-item reveal-el">
                <div className="member-item-left">
                  <span className="member-role">10 / Kuliner</span>
                </div>
                <div className="member-item-right">
                  <span className="member-name">Berburu Makanan Tengah Malam</span>
                  <p className="member-desc">
                    Aktivitas dadakan menyusuri jalanan malam untuk berburu nasi goreng, mie instan warkop, atau kuliner malam favorit.
                  </p>
                </div>
              </div>
              <div className="member-item reveal-el">
                <div className="member-item-left">
                  <span className="member-role">11 / Diskusi</span>
                </div>
                <div className="member-item-right">
                  <span className="member-name">Sesi Curhat & Pendengar Baik</span>
                  <p className="member-desc">
                    Menyediakan ruang aman untuk saling bertukar keluh kesah, memberikan saran, dan saling menguatkan dalam berbagai hal.
                  </p>
                </div>
              </div>
              <div className="member-item reveal-el">
                <div className="member-item-left">
                  <span className="member-role">12 / Solidaritas</span>
                </div>
                <div className="member-item-right">
                  <span className="member-name">Syukuran & Pencapaian Anggota</span>
                  <p className="member-desc">
                    Selalu hadir merayakan kelulusan, keberhasilan proyek, atau momen penting anggota sebagai wujud rasa bangga bersama.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
