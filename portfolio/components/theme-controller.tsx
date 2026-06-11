"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ThemeController() {
  const sunRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- State Definitions for explicit fromTo transitions ---
    
    const dawnState = {
      "--bg-1": "#6E8FE6", "--bg-2": "#FDBA74", "--bg-3": "#F59E0B",
      "--overlay-bg": "rgb(15, 23, 42)", "--overlay-opacity": 0.52,
      "--text-primary": "#FFFFFF", "--text-muted": "rgba(255,255,255,0.80)",
      "--card-bg": "rgba(10, 18, 40, 0.55)", "--card-border": "rgba(255,255,255,0.18)",
      "--nav-bg": "rgba(10, 18, 40, 0.55)", "--nav-border": "rgba(255,255,255,0.18)",
      "--nav-text": "#FFFFFF", "--accent": "#FFF1A8",
      "--sun-opacity": 1, "--moon-opacity": 0, "--star-opacity": 0,
      duration: 1,
    };

    const daylightState = {
      "--bg-1": "#7B9FD4", "--bg-2": "#9BB5D6", "--bg-3": "#B8CCE8",
      "--overlay-bg": "rgb(15, 23, 42)", "--overlay-opacity": 0.38,
      "--text-primary": "#FFFFFF", "--text-muted": "rgba(255,255,255,0.75)",
      "--card-bg": "rgba(20, 35, 65, 0.48)", "--card-border": "rgba(255,255,255,0.16)",
      "--nav-bg": "rgba(20, 35, 65, 0.48)", "--nav-border": "rgba(255,255,255,0.16)",
      "--nav-text": "#FFFFFF", "--accent": "#93C5FD",
      "--sun-opacity": 0.45,
      duration: 1,
    };

    const lateMorningState = {
      // Warm blue-to-peach — the visual midpoint between steel blue and amber.
      // Text stays white, so no polarity flip happens here.
      "--bg-1": "#C4956A",          // warm sand — bridges blue and amber
      "--bg-2": "#D4A574",          // soft peach
      "--bg-3": "#E8C99A",          // pale gold horizon
      "--overlay-bg": "rgb(15, 23, 42)",
      "--overlay-opacity": 0.32,    // slightly lighter — "more sun"
      "--text-primary": "#FFFFFF",
      "--text-muted": "rgba(255,255,255,0.75)",
      "--card-bg": "rgba(20, 35, 65, 0.42)",
      "--card-border": "rgba(255,255,255,0.16)",
      "--nav-bg": "rgba(20, 35, 65, 0.42)",
      "--nav-border": "rgba(255,255,255,0.16)",
      "--nav-text": "#FFFFFF",
      "--accent": "#FFD580",
      "--sun-opacity": 0.55,
      "--moon-opacity": 0,
      "--star-opacity": 0,
    };

    const goldenState = {
      "--bg-1": "#E8955A", "--bg-2": "#D4722A", "--bg-3": "#F2D4A0",
      "--overlay-bg": "rgb(255, 248, 235)", "--overlay-opacity": 0.50,
      "--text-primary": "#1A0A00", "--text-muted": "#4A2000",
      "--card-bg": "rgba(255, 245, 220, 0.92)", "--card-border": "rgba(120, 53, 15, 0.18)",
      "--nav-bg": "rgba(255, 245, 220, 0.85)", "--nav-border": "rgba(120, 53, 15, 0.16)",
      "--nav-text": "#1A0A00", "--accent": "#92400E",
      "--sun-opacity": 0.65,
      duration: 1,
    };

    const duskState = {
      // Between golden (light system) and sunset (dark system).
      // Deep amber-to-purple — bg is dark enough that we flip back to white text here,
      // but the warm card backing bleeds in slowly rather than snapping.
      "--bg-1": "#A0522D",          // sienna — dark warm brown, bridges amber and coral
      "--bg-2": "#6B3FA0",          // muted purple, not full electric
      "--bg-3": "#2D1460",          // deep indigo horizon
      "--overlay-bg": "rgb(30, 15, 40)",
      "--overlay-opacity": 0.42,
      "--text-primary": "#FFFFFF",
      "--text-muted": "rgba(255,255,255,0.78)",
      "--card-bg": "rgba(20, 10, 45, 0.55)",    // purple-tinted dark card
      "--card-border": "rgba(255,255,255,0.15)",
      "--nav-bg": "rgba(20, 10, 45, 0.58)",
      "--nav-border": "rgba(255,255,255,0.14)",
      "--nav-text": "#FFFFFF",
      "--accent": "#FBBF7A",        // warm amber accent carries through from golden
      "--sun-opacity": 0.35,
      "--moon-opacity": 0.08,
      "--star-opacity": 0,
    };

    const sunsetState = {
      "--bg-1": "#C45E42", "--bg-2": "#9B5FC0", "--bg-3": "#3B1577",
      "--overlay-bg": "rgb(15, 23, 42)", "--overlay-opacity": 0.46,
      "--text-primary": "#FFFFFF", "--text-muted": "rgba(255,255,255,0.80)",
      "--card-bg": "rgba(10, 8, 30, 0.60)", "--card-border": "rgba(255,255,255,0.16)",
      "--nav-bg": "rgba(10, 8, 30, 0.65)", "--nav-border": "rgba(255,255,255,0.14)",
      "--nav-text": "#FFFFFF", "--accent": "#FFD6A5",
      "--sun-opacity": 0.5, "--moon-opacity": 0.15,
      duration: 1,
    };

    const midnightState = {
      "--bg-1": "#020617", "--bg-2": "#0B1026", "--bg-3": "#111827",
      "--overlay-bg": "rgb(2, 6, 23)", "--overlay-opacity": 0.35,
      "--text-primary": "#F9FAFB", "--text-muted": "#CBD5E1",
      "--card-bg": "rgba(255, 255, 255, 0.09)", "--card-border": "rgba(255,255,255,0.14)",
      "--nav-bg": "rgba(2, 6, 23, 0.75)", "--nav-border": "rgba(255,255,255,0.12)",
      "--nav-text": "#F9FAFB", "--accent": "#A78BFA",
      "--star-opacity": 1, "--moon-opacity": 1, "--sun-opacity": 0,
      duration: 1,
    };

    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.4,
      }
    });

    // ─── PHASE 1: SUNRISE HERO (0% – 18%) ───────────────────────────────────────
    masterTimeline.fromTo(root, dawnState, dawnState, 0).addLabel("sunrise");

    // ─── PHASE 2: MID-MORNING / PROJECTS (18% – 33%) ────────────────────────────
    // Shortened slightly to make room for the late-morning bridge
    masterTimeline.fromTo(root, dawnState, daylightState, 0.18).addLabel("daylight");

    // ─── PHASE 2.5: LATE MORNING (33% – 42%) ────────────────────────────────────
    // Blue → warm sand. Text stays white throughout — no polarity flip.
    // This is the visual ramp-up before golden hour proper.
    masterTimeline.fromTo(root, daylightState, lateMorningState, 0.33).addLabel("latemorning");

    // ─── PHASE 3: GOLDEN HOUR (42% – 58%) ───────────────────────────────────────
    // Now the polarity flip (white → dark) happens from a warm-tinted base,
    // not from steel blue — much less jarring. Golden gets more room: 42%→58%.
    masterTimeline.fromTo(root, lateMorningState, goldenState, 0.42).addLabel("golden");

    // ─── PHASE 3.5: DUSK (58% – 66%) ────────────────────────────────────────────
    // Golden → dusk flips text back to white from the warm state,
    // while bg is already darkening — the eye reads it as natural light loss.
    masterTimeline.fromTo(root, goldenState, duskState, 0.58).addLabel("dusk");

    // ─── PHASE 4: SUNSET / ABOUT (66% – 80%) ────────────────────────────────────
    // Dusk → full sunset. Both are dark + white text — no polarity flip at all.
    // This transition is now purely a hue shift (warm brown → deep purple),
    // which reads as atmospheric rather than jarring.
    masterTimeline.fromTo(root, duskState, sunsetState, 0.66).addLabel("sunset");

    // ─── PHASE 5: MIDNIGHT / CONTACT (80% – 100%) ────────────────────────────────
    masterTimeline.fromTo(root, sunsetState, midnightState, 0.80).addLabel("midnight");

    if (!reduceMotion) {
      // Sun Movement
      gsap.set(sunRef.current, { xPercent: -50, yPercent: -50 });
      masterTimeline
        .fromTo(sunRef.current, { x: "15vw", y: "80vh" }, { x: "25vw", y: "30vh", duration: 0.18 }, 0)
        .fromTo(sunRef.current, { x: "25vw", y: "30vh" }, { x: "85vw", y: "15vh", duration: 0.15 }, 0.18)  // projects
        .fromTo(sunRef.current, { x: "85vw", y: "15vh" }, { x: "70vw", y: "25vh", duration: 0.09 }, 0.33)  // late morning
        .fromTo(sunRef.current, { x: "70vw", y: "25vh" }, { x: "60vw", y: "38vh", duration: 0.16 }, 0.42)  // golden — sun beginning to lower
        .fromTo(sunRef.current, { x: "60vw", y: "38vh" }, { x: "40vw", y: "58vh", duration: 0.08 }, 0.58)  // dusk — dropping fast
        .fromTo(sunRef.current, { x: "40vw", y: "58vh" }, { x: "20vw", y: "78vh", duration: 0.14 }, 0.66)  // sunset
        .fromTo(sunRef.current, { x: "20vw", y: "78vh" }, { x: "10vw", y: "95vh", duration: 0.20 }, 0.80); // midnight

      // Moon Movement
      gsap.set(moonRef.current, { xPercent: -50, yPercent: -50 });
      masterTimeline.fromTo(moonRef.current,
        { x: "90vw", y: "80vh", opacity: 0 },
        { x: "85vw", y: "15vh", opacity: 1, duration: 0.20 }, 0.80);
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      {/* 1. Animated Sky Background is the body background */}
      
      {/* 2. Atmosphere Layer (z-index 1) */}
      <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden">
        {/* Sun */}
        <div 
          ref={sunRef}
          className="absolute w-[clamp(80px,10vw,160px)] h-[clamp(80px,10vw,160px)] rounded-full blur-[2px] will-change-transform"
          style={{ 
            background: "radial-gradient(circle, #FFF7AD 0%, #FFD166 45%, #F97316 100%)",
            opacity: "var(--sun-opacity)",
            boxShadow: "0 0 60px rgba(255, 209, 102, 0.4)"
          }}
        />
        
        {/* Moon */}
        <div 
          ref={moonRef}
          className="absolute w-24 h-24 rounded-full blur-[1px] will-change-transform"
          style={{ 
            background: "#F8FAFC",
            boxShadow: "0 0 40px rgba(147, 197, 253, 0.35)",
            opacity: "var(--moon-opacity)"
          }}
        />

        {/* Stars */}
        <div 
          ref={starsRef}
          className="absolute inset-0 will-change-opacity"
          style={{ opacity: "var(--star-opacity)" }}
        >
           {mounted && [...Array(50)].map((_, i) => (
             <div 
               key={i}
               className="absolute rounded-full bg-white"
               style={{
                 width: Math.random() * 2 + 1 + "px",
                 height: Math.random() * 2 + 1 + "px",
                 top: Math.random() * 100 + "%",
                 left: Math.random() * 100 + "%",
                 opacity: Math.random() * 0.7 + 0.3,
               }}
             />
           ))}
        </div>
      </div>

      {/* 3. Readability Overlay (z-index 2) */}
      <div className="background-overlay" />
    </>
  );
}
