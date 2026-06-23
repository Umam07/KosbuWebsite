"use client";

import { useLenis } from "lenis/react";

export default function Header() {
  const lenis = useLenis();

  const handleLogoClick = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.2 });
    }
  };

  return (
    <header id="mainHeader">
      <div className="header-logo" id="logoBtn" onClick={handleLogoClick}>
        KOSBU
      </div>
      <div className="header-right">
        <nav className="nav-links">
          <a href="#groupIntro" onClick={(e) => handleNavClick(e, "#groupIntro")}>
            Tentang
          </a>
          <a href="#works" onClick={(e) => handleNavClick(e, "#works")}>
            Memories
          </a>
          <a href="#members" onClick={(e) => handleNavClick(e, "#members")}>
            Kolektif
          </a>
          <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>
            Hubungi
          </a>
        </nav>
      </div>
    </header>
  );
}
