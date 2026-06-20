"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const lenis = useLenis();
  const videoCursorRef = useRef<HTMLDivElement>(null);
  const briefcaseHandleRef = useRef<HTMLDivElement>(null);
  const briefcaseBodyRef = useRef<HTMLDivElement>(null);
  const showcaseLabelRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const scrollProgress = useRef(0);

  // Initialize mouse position to center of screen on load
  useEffect(() => {
    if (typeof window !== "undefined") {
      mouse.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      current.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    }
  }, []);

  // Track mouse coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // GSAP animations
  useGSAP(() => {
    if (!videoCursorRef.current) return;

    // 1. Initial styling
    gsap.set(videoCursorRef.current, { xPercent: -50, yPercent: -50 });
    gsap.set("#heroTitle", { scale: 1.3 });
    gsap.set("#mainHeader", { opacity: 0, y: -20 });
    gsap.set("#heroFooter", { opacity: 0, y: 20 });
    gsap.set(videoCursorRef.current, { opacity: 0, scale: 0.6 });

    // 2. Intro timeline
    const tlIntro = gsap.timeline({ defaults: { ease: "power4.out" } });
    tlIntro
      .to("#heroTitle", {
        scale: 1,
        duration: 1.6,
        delay: 0.3,
        ease: "power4.inOut",
      })
      .to(
        "#mainHeader",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          onComplete: () => {
            const header = document.getElementById("mainHeader");
            if (header) header.classList.add("active");
          },
        },
        "-=0.6"
      )
      .to(
        "#heroFooter",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.6"
      )
      .to(
        videoCursorRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
        },
        "-=0.5"
      );

    // 3. Scroll Trigger timeline
    const tlScroll = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroller-section",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          scrollProgress.current = self.progress;

          const videoCursor = videoCursorRef.current;
          const video = videoRef.current;
          if (videoCursor) {
            if (self.progress > 0.95) {
              videoCursor.classList.add("interactive", "expanded");
              setIsExpanded(true);
            } else {
              videoCursor.classList.remove("interactive", "expanded");
              setIsExpanded(false);
              if (video && !video.paused) {
                video.pause();
                setIsPlaying(false);
              }
            }
          }
        },
      },
    });

    tlScroll
      .to(
        briefcaseHandleRef.current,
        {
          opacity: 0,
          height: 0,
          marginBottom: 0,
          duration: 0.5,
        },
        0
      )
      .to(
        showcaseLabelRef.current,
        {
          opacity: 0,
          duration: 0.5,
        },
        0
      )
      .to(
        videoCursorRef.current,
        {
          width: "92vw",
          height: "82vh",
          duration: 1,
          ease: "power1.inOut",
        },
        0
      )
      .to(
        briefcaseBodyRef.current,
        {
          borderRadius: "20px",
          duration: 1,
        },
        0
      )
      .to(
        "#heroTitle",
        {
          opacity: 0.03,
          scale: 0.95,
          duration: 0.8,
        },
        0
      )
      .to(
        "#heroFooter",
        {
          opacity: 0,
          y: -30,
          duration: 0.5,
        },
        0
      );

    // 4. LERP tick loop
    const tick = () => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const targetX = gsap.utils.interpolate(
        mouse.current.x,
        centerX,
        scrollProgress.current
      );
      const targetY = gsap.utils.interpolate(
        mouse.current.y,
        centerY,
        scrollProgress.current
      );

      current.current.x += (targetX - current.current.x) * 0.1;
      current.current.y += (targetY - current.current.y) * 0.1;

      gsap.set(videoCursorRef.current, {
        x: current.current.x,
        y: current.current.y,
      });
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
    };
  }, []);

  // Handle Play/Pause
  const togglePlayState = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
        })
        .catch((err) => console.log("Video play failed:", err));
    } else {
      video.pause();
      setIsPlaying(false);
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
    }
  };

  // Skip timecode
  const handleSkip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(
      0,
      Math.min(video.duration || 0, video.currentTime + seconds)
    );
  };

  // Hover overlay handlers
  const handleMouseEnter = () => {
    if (isExpanded && isPlaying) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
    }
  };

  const handleMouseLeave = () => {
    if (isExpanded && isPlaying) {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
    }
  };

  const handleFooterLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo("#groupIntro", { duration: 1.2 });
    }
  };

  return (
    <>
      <section className="scroller-section">
        <div className="sticky-container">
          {/* Giant Title */}
          <div className="hero-title-container">
            <h1 className="hero-title" id="heroTitle">
              KOSBU
            </h1>
          </div>

          {/* Clean Bottom UI Hero */}
          <div className="hero-footer" id="heroFooter">
            <div className="hero-left-col">
              <p className="hero-statement">
                Komunitas persahabatan yang tumbuh bersama, bermain bersama, dan
                menciptakan kenangan tak terlupakan.
              </p>
              <a
                href="#groupIntro"
                className="hero-clean-link"
                onClick={handleFooterLinkClick}
              >
                Telusuri kisah kami lebih dalam
              </a>
            </div>
            <span className="hero-scroll-tag">(Gulir)</span>
          </div>
        </div>
      </section>

      {/* Briefcase Video Wrapper */}
      <div
        className="video-cursor-wrapper"
        id="videoCursor"
        ref={videoCursorRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => {
          // If expanded and clicked on the overlay container directly, toggle play
          if (isExpanded && e.target === overlayRef.current) {
            togglePlayState();
          }
        }}
      >
        <div
          className="briefcase-handle"
          id="briefcaseHandle"
          ref={briefcaseHandleRef}
        ></div>
        <div
          className="briefcase-body"
          id="briefcaseBody"
          ref={briefcaseBodyRef}
        >
          <video id="mainVideo" ref={videoRef} loop playsInline>
            <source
              src="https://res.cloudinary.com/dr57ribr5/video/upload/v1781887629/Video_Kosbu_w8mw5b.mp4"
              type="video/mp4"
            />
          </video>
          {/* Custom Play/Pause Overlay */}
          <div className="video-overlay" id="videoOverlay" ref={overlayRef}>
            <div className="player-controls">
              {/* Tombol Mundur 5 Detik */}
              <button
                className="control-btn skip-btn"
                id="rewindBtn"
                title="Mundur 5 Detik"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSkip(-5);
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="11 19 2 12 11 5 11 19"></polygon>
                  <polygon points="22 19 13 12 22 5 22 19"></polygon>
                </svg>
                <span className="skip-label">-5s</span>
              </button>

              {/* Tombol Play/Pause Utama (Tengah) */}
              <button
                className="control-btn play-btn-circle"
                id="playPauseBtn"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlayState();
                }}
              >
                {!isPlaying ? (
                  <svg
                    className="play-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                ) : (
                  <svg
                    className="pause-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                  </svg>
                )}
              </button>

              {/* Tombol Maju 5 Detik */}
              <button
                className="control-btn skip-btn"
                id="forwardBtn"
                title="Maju 5 Detik"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSkip(5);
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="13 19 22 12 13 5 13 19"></polygon>
                  <polygon points="2 19 11 12 2 5 2 19"></polygon>
                </svg>
                <span className="skip-label">+5s</span>
              </button>
            </div>
          </div>
        </div>
        <div
          className="showcase-label"
          id="showcaseLabel"
          ref={showcaseLabelRef}
        >
          Showcase Kosbu
          <br />
          (Kenangan Kuliah — 2022/2026)
        </div>
      </div>
    </>
  );
}
