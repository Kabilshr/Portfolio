"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Button from "./button";
import gsap from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const cardFloatRef = useRef<HTMLDivElement>(null);
  const cardInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entry Reveal Animations
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        cardWrapperRef.current,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 1.5 }
      );

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2 },
        "-=1.2"
      );

      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 1.0 },
        "-=0.9"
      );

      tl.fromTo(
        buttonsRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.8"
      );

      // 2. Ambient floating movement (yoyo vertical bobbing)
      gsap.fromTo(
        cardFloatRef.current,
        { y: 2 },
        {
          y: -2,
          duration: 5.0,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        }
      );

      // 3. Mouse-move Parallax & 3D Tilt Effect
      const handleMouseMove = (e: MouseEvent) => {
        if (!cardWrapperRef.current || !cardInnerRef.current) return;
        
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        // Calculate normalized offset from center (-0.5 to 0.5)
        const xPercent = (clientX / innerWidth) - 0.5;
        const yPercent = (clientY / innerHeight) - 0.5;

        // Parallax position offset (wrapper translation)
        gsap.to(cardWrapperRef.current, {
          x: xPercent * 5,
          y: yPercent * 5,
          duration: 0.8,
          ease: "power2.out",
        });

        // 3D Tilt (inner card rotation)
        gsap.to(cardInnerRef.current, {
          rotationY: xPercent * 3,
          rotationX: -yPercent * 3,
          duration: 0.8,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        if (!cardWrapperRef.current || !cardInnerRef.current) return;

        // Reset positions
        gsap.to(cardWrapperRef.current, {
          x: 0,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        });

        gsap.to(cardInnerRef.current, {
          rotationY: 0,
          rotationX: 0,
          duration: 1.2,
          ease: "power3.out",
        });
      };

      // Desktop/Mouse only check
      const mediaQuery = window.matchMedia("(hover: hover)");
      if (mediaQuery.matches) {
        window.addEventListener("mousemove", handleMouseMove);
        // Track mouse leaving the section to snap elements back to center
        sectionRef.current?.addEventListener("mouseleave", handleMouseLeave);
      }

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        sectionRef.current?.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center px-6 sm:px-12 lg:px-24 overflow-hidden font-sans"
    >
      {/* Background Decor handled by Controller */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 lg:gap-20 xl:gap-24 items-center relative z-2">
        
        {/* Left Content Block */}
        <div className="md:col-span-7 flex flex-col justify-center space-y-10 mt-24 md:mt-0">
          <h1 
            ref={titleRef} 
            className="text-6xl sm:text-7xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black tracking-tighter leading-[0.85] uppercase transition-colors text-primary"
          >
            Kabil <br />
            <span className="opacity-90">Shrestha</span>
          </h1>
          
          <p 
            ref={subtitleRef} 
            className="text-lg sm:text-xl font-medium tracking-wide max-w-xl border-l-2 pl-6 transition-colors text-muted" 
            style={{ borderColor: 'var(--card-border)' }}
          >
            Artificial Intelligence Student • Full-Stack Developer • Tech-Lead Islington Webdev Community 
          </p>

          <div ref={buttonsRef} className="flex flex-wrap gap-5 pt-4">
            <Button variant="primary" href="#projects">
              View Work
            </Button>
            <Button variant="secondary" href="#contact">
              Contact
            </Button>
          </div>
        </div>

        {/* Right Visual Block */}
        <div className="md:col-span-5 flex justify-center md:justify-end items-center">
          {/* Card Wrapper for Parallax Shift */}
          <div 
            ref={cardWrapperRef} 
            className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[280px] lg:max-w-[360px] xl:max-w-[420px] aspect-[10/14] flex items-center justify-center"
            style={{ perspective: "1000px" }}
          >
            {/* Floating Wrapper for Auto-Bobbing */}
            <div ref={cardFloatRef} className="w-full h-full flex items-center justify-center">
              {/* Inner Card for 3D Tilt */}
              <div 
                ref={cardInnerRef} 
                className="relative w-full h-full rounded-[32px] card overflow-hidden shadow-2xl transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-end justify-center"
              >
                {/* Subtle gradient pattern / texture inside the card background */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 opacity-70" />
                {/* Glowing accent circle inside the card */}
                <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
                {/* Inner decorative border line */}
                <div className="absolute inset-[8px] rounded-[24px] border border-dashed border-white/10 pointer-events-none" />

                {/* Portrait Cutout Image placed inside the card container */}
                <Image 
                  src="/portrait_cutout.png"
                  alt="Kabil Shrestha"
                  fill
                  className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)] z-10"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
