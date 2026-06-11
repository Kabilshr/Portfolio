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
    
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Set initial state synchronously before anything renders
    gsap.set(root, {
      "--bg-1": "#6E8FE6",
      "--bg-2": "#FDBA74",
      "--bg-3": "#F59E0B",
      "--overlay-bg": "rgb(15, 23, 42)",
      "--overlay-opacity": 0.52,
      "--text-primary": "#FFFFFF",
      "--text-muted": "rgba(255,255,255,0.80)",
      "--card-bg": "rgba(10, 18, 40, 0.55)",
      "--card-border": "rgba(255,255,255,0.18)",
      "--nav-bg": "rgba(10, 18, 40, 0.55)",
      "--nav-border": "rgba(255,255,255,0.18)",
      "--nav-text": "#FFFFFF",
      "--accent": "#FFF1A8",
      "--sun-opacity": 1,
      "--moon-opacity": 0,
      "--star-opacity": 0,
    });

    setMounted(true);

    // --- State Definitions ---
    // NOTE: no `duration` property on any state — duration lives only on the timeline,
    // not on state objects. Stray duration values in fromTo vars corrupt GSAP's
    // internal tween length calculations and cause up/down asymmetry.

    const dawnState = {
      "--bg-1": "#6E8FE6", "--bg-2": "#FDBA74", "--bg-3": "#F59E0B",
      "--overlay-bg": "rgb(15, 23, 42)", "--overlay-opacity": 0.52,
      "--text-primary": "#FFFFFF", "--text-muted": "rgba(255,255,255,0.80)",
      "--card-bg": "rgba(10, 18, 40, 0.55)", "--card-border": "rgba(255,255,255,0.18)",
      "--nav-bg": "rgba(10, 18, 40, 0.55)", "--nav-border": "rgba(255,255,255,0.18)",
      "--nav-text": "#FFFFFF", "--accent": "#FFF1A8",
      "--sun-opacity": 1, "--moon-opacity": 0, "--star-opacity": 0,
    };

    const daylightState = {
      "--bg-1": "#7B9FD4", "--bg-2": "#9BB5D6", "--bg-3": "#B8CCE8",
      "--overlay-bg": "rgb(15, 23, 42)", "--overlay-opacity": 0.38,
      "--text-primary": "#FFFFFF", "--text-muted": "rgba(255,255,255,0.75)",
      "--card-bg": "rgba(20, 35, 65, 0.48)", "--card-border": "rgba(255,255,255,0.16)",
      "--nav-bg": "rgba(20, 35, 65, 0.48)", "--nav-border": "rgba(255,255,255,0.16)",
      "--nav-text": "#FFFFFF", "--accent": "#93C5FD",
      "--sun-opacity": 0.45, "--moon-opacity": 0, "--star-opacity": 0,
    };

    const lateMorningState = {
      "--bg-1": "#C4956A", "--bg-2": "#D4A574", "--bg-3": "#E8C99A",
      "--overlay-bg": "rgb(15, 23, 42)", "--overlay-opacity": 0.32,
      "--text-primary": "#FFFFFF", "--text-muted": "rgba(255,255,255,0.75)",
      "--card-bg": "rgba(20, 35, 65, 0.42)", "--card-border": "rgba(255,255,255,0.16)",
      "--nav-bg": "rgba(20, 35, 65, 0.42)", "--nav-border": "rgba(255,255,255,0.16)",
      "--nav-text": "#FFFFFF", "--accent": "#FFD580",
      "--sun-opacity": 0.55, "--moon-opacity": 0, "--star-opacity": 0,
    };

    const goldenState = {
      "--bg-1": "#E8955A", "--bg-2": "#D4722A", "--bg-3": "#F2D4A0",
      "--overlay-bg": "rgb(255, 248, 235)", "--overlay-opacity": 0.50,
      "--text-primary": "#1A0A00", "--text-muted": "#4A2000",
      "--card-bg": "rgba(255, 245, 220, 0.92)", "--card-border": "rgba(120, 53, 15, 0.18)",
      "--nav-bg": "rgba(255, 245, 220, 0.85)", "--nav-border": "rgba(120, 53, 15, 0.16)",
      "--nav-text": "#1A0A00", "--accent": "#92400E",
      "--sun-opacity": 0.65, "--moon-opacity": 0, "--star-opacity": 0,
    };

    const duskState = {
      "--bg-1": "#A0522D", "--bg-2": "#6B3FA0", "--bg-3": "#2D1460",
      "--overlay-bg": "rgb(30, 15, 40)", "--overlay-opacity": 0.42,
      "--text-primary": "#FFFFFF", "--text-muted": "rgba(255,255,255,0.78)",
      "--card-bg": "rgba(20, 10, 45, 0.55)", "--card-border": "rgba(255,255,255,0.15)",
      "--nav-bg": "rgba(20, 10, 45, 0.58)", "--nav-border": "rgba(255,255,255,0.14)",
      "--nav-text": "#FFFFFF", "--accent": "#FBBF7A",
      "--sun-opacity": 0.35, "--moon-opacity": 0.08, "--star-opacity": 0,
    };

    const sunsetState = {
      "--bg-1": "#C45E42", "--bg-2": "#9B5FC0", "--bg-3": "#3B1577",
      "--overlay-bg": "rgb(15, 23, 42)", "--overlay-opacity": 0.46,
      "--text-primary": "#FFFFFF", "--text-muted": "rgba(255,255,255,0.80)",
      "--card-bg": "rgba(10, 8, 30, 0.60)", "--card-border": "rgba(255,255,255,0.16)",
      "--nav-bg": "rgba(10, 8, 30, 0.65)", "--nav-border": "rgba(255,255,255,0.14)",
      "--nav-text": "#FFFFFF", "--accent": "#FFD6A5",
      "--sun-opacity": 0.5, "--moon-opacity": 0.15, "--star-opacity": 0,
    };

    const midnightState = {
      "--bg-1": "#020617", "--bg-2": "#0B1026", "--bg-3": "#111827",
      "--overlay-bg": "rgb(2, 6, 23)", "--overlay-opacity": 0.35,
      "--text-primary": "#F9FAFB", "--text-muted": "#CBD5E1",
      "--card-bg": "rgba(255, 255, 255, 0.09)", "--card-border": "rgba(255,255,255,0.14)",
      "--nav-bg": "rgba(2, 6, 23, 0.75)", "--nav-border": "rgba(255,255,255,0.12)",
      "--nav-text": "#F9FAFB", "--accent": "#A78BFA",
      "--sun-opacity": 0, "--moon-opacity": 1, "--star-opacity": 1,
    };

    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.2,  // ← was 1.4, the root cause of up/down asymmetry
      }
    });

    masterTimeline
      .fromTo(root, dawnState,        dawnState,        0     ).addLabel("sunrise")
      .fromTo(root, dawnState,        daylightState,    0.18  ).addLabel("daylight")
      .fromTo(root, daylightState,    lateMorningState, 0.33  ).addLabel("latemorning")
      .fromTo(root, lateMorningState, goldenState,      0.42  ).addLabel("golden")
      .fromTo(root, goldenState,      duskState,        0.58  ).addLabel("dusk")
      .fromTo(root, duskState,        sunsetState,      0.66  ).addLabel("sunset")
      .fromTo(root, sunsetState,      midnightState,    0.80  ).addLabel("midnight");

    if (!reduceMotion) {
      // Sun Movement
      gsap.set(sunRef.current, { xPercent: -50, yPercent: -50 });

      masterTimeline
        // Rise: bottom-left → zenith
        .fromTo(sunRef.current,
          { x: "15vw", y: "80vh" },
          { x: "50vw", y: "8vh", duration: 0.42, ease: "power1.out" }, 0)
        // Cross: zenith → horizon right  
        .fromTo(sunRef.current,
          { x: "50vw", y: "8vh" },
          { x: "82vw", y: "72vh", duration: 0.38, ease: "power1.in" }, 0.42)
        // Set: horizon right → below screen
        .fromTo(sunRef.current,
          { x: "82vw", y: "72vh" },
          { x: "92vw", y: "108vh", duration: 0.20, ease: "power2.in" }, 0.80);

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
            boxShadow: "0 0 60px rgba(255, 209, 102, 0.4)",
            left: 0,
            top: 0,
            // Match the first fromTo start position exactly so there's no jump on mount
            transform: "translate(-50%, -50%) translate(15vw, 80vh)"  // ← this is actually fine
          }}
        />
        
        {/* Moon */}
        <div 
          ref={moonRef}
          className="absolute w-24 h-24 rounded-full blur-[1px] will-change-transform"
          style={{ 
            background: "#F8FAFC",
            boxShadow: "0 0 40px rgba(147, 197, 253, 0.35)",
            opacity: "var(--moon-opacity)",
            left: 0,
            top: 0,
            transform: "translate(-50%, -50%) translate(90vw, 80vh)"
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
