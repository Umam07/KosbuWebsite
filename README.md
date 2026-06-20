# 🎓 Kosbu - Komunitas Persahabatan

[![Framework](https://img.shields.io/badge/Framework-Next.js%2016-black?logo=next.js)](https://nextjs.org/)
[![Language](https://img.shields.io/badge/Language-TypeScript-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Style](https://img.shields.io/badge/Styling-Vanilla%20CSS-orange)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Animations](https://img.shields.io/badge/Animations-GSAP-green?logo=greensock)](https://gsap.com/)
[![Scroll](https://img.shields.io/badge/Scroll-Lenis-red)](https://github.com/darkroomengineering/lenis)

**Kosbu** adalah website landing page interaktif premium yang didedikasikan untuk circle persahabatan yang terbentuk di Universitas YARSI (angkatan 2022-2026). Proyek ini telah dimigrasikan dari HTML statis ke **Next.js (TypeScript)** modern dengan arsitektur komponen yang bersih, cepat, dan terorganisir.

---

## ✨ Fitur Utama

- **💼 Custom Video Briefcase Cursor**: Cursor mouse berubah menjadi koper kecil berisi video showcase. Semakin Anda scroll ke bawah, video akan secara dinamis membesar (ekspansi LERP) ke tengah layar dan memunculkan custom video player controls.
- **⏯️ Custom Media Player Controls**: Kontrol video interaktif yang intuitif, termasuk play/pause, mundur 5 detik (`-5s`), dan maju 5 detik (`+5s`). Kontrol ini otomatis memudar (fade-out) saat video diputar agar layar tetap bersih.
- **📌 Pinned Split Column Layout**: Column perkenalan di sebelah kiri akan otomatis tersemat (pinned) secara sticky di layar komputer saat pengguna melakukan scroll di column sebelah kanan.
- **🌓 Dynamic Scroll Theme Transition**: Warna tema website secara otomatis berubah menjadi tema gelap (`#0a0a0a`) saat memasuki area Galeri Memori, dan kembali menjadi terang saat keluar.
- **🎨 Asymmetric Grid & Member Hover Interactions**: Grid asimetris premium untuk 12 anggota kolektif Kosbu, dilengkapi dengan micro-interactions: gambar berubah warna (dari grayscale), index numbers reveal, dan garis nama menebal saat di-hover.
- **🚀 Global Smooth Scroll**: Navigasi dan scrolling yang sangat halus di seluruh halaman menggunakan integrasi **Lenis Scroll**.

---

## 🛠️ Stack Teknologi

- **Core**: React 19 / Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Vanilla CSS (CSS Variables) & Google Fonts (`Plus Jakarta Sans`)
- **Animation Framework**: GSAP 3 (GreenSock Animation Platform) & ScrollTrigger
- **Smooth Scroll**: Lenis (React-Lenis)

---

## 📁 Struktur Folder

```text
src/
├── app/
│   ├── globals.css      # Custom styling, tema, dan animasi
│   ├── layout.tsx       # Root layout & Google Fonts configuration
│   └── page.tsx         # Halaman utama perakitan komponen
└── components/
    ├── About.tsx        # Section perkenalan & pinning ScrollTrigger
    ├── Collective.tsx   # Grid 12 anggota & efek hover
    ├── Footer.tsx       # Tautan media sosial & tombol kembali ke atas
    ├── Header.tsx       # Fixed navigation bar
    ├── Hero.tsx         # Giant title & custom video cursor tracker
    └── LenisProvider.tsx# React-Lenis smooth scroll wrapper
```

---

## 🚀 Memulai Proyek secara Lokal

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek ini di perangkat Anda:

### 1. Klon Repositori
```bash
git clone https://github.com/Umam07/KosbuWebsite.git
cd KosbuWebsite
```

### 2. Instal Dependensi
```bash
npm install
```

### 3. Jalankan Mode Development
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya.

### 4. Build untuk Production
```bash
npm run build
npm run start
```

---

## 📸 Demo & Walkthrough

Detail walkthrough, log perubahan, dan rekaman interaksi lengkap dari hasil refaktor Next.js dapat ditemukan di folder log development:
* **[walkthrough.md](.gemini/antigravity-ide/brain/455f56e1-eb31-4359-815a-2aca2530fb6d/walkthrough.md)**

---

Crafted with 💖 for **Kosbu Collective**.
