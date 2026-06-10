"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for portrait
      gsap.to(portraitRef.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Reveal animation for content
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative w-full py-32 px-6 sm:px-12 lg:px-24 bg-black font-sans overflow-hidden"
    >
      {/* Sunset Atmosphere Background */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[radial-gradient(circle_at_50%_100%,rgba(251,191,36,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-125 h-125 bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-stretch">
        
        {/* Left Column: Portrait Card - Hidden on Mobile */}
        <div className="hidden lg:flex lg:col-span-6 justify-center lg:justify-start">
          <div 
            ref={portraitRef}
            className="relative w-full min-h-[500px] lg:h-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] group"
          >
            {/* Glass Border Highlight */}
            <div className="absolute inset-0 border border-white/5 rounded-3xl pointer-events-none z-20" />
            
            <Image
              src="/portrait.jpeg" 
              alt="Kabil Shrestha"
              fill
              className="object-cover object-center transition-all duration-700 scale-105 group-hover:scale-100"
            />
            
            {/* Warm Sunset Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 via-transparent to-transparent opacity-60 pointer-events-none" />
          </div>
        </div>

        {/* Right Column: Content Area */}
        <div className="col-span-1 lg:col-span-6 flex flex-col justify-center space-y-8 text-left">
          <div className="space-y-2">
            <span className="text-amber-500/80 text-xs font-bold uppercase tracking-[0.3em]">
              Behind the Code
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              About Me
            </h2>
          </div>

          <div 
            ref={contentRef}
            className="journey-card bg-white/[0.03] border border-white/10 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl lg:max-w-[600px] h-full flex flex-col justify-center"
          >
            <div className="space-y-6 text-white/60 leading-relaxed text-base sm:text-lg font-light">
              <p>
                I’m currently studying <span className="text-white font-medium italic">Computing with Artificial Intelligence</span> at Islington College, where I’m building a strong foundation in both software development and emerging technologies such as robotics, IoT, and artificial intelligence.
              </p>

              <p>
                I started exploring Python and web development early on, which gave me practical experience before university and helped me approach academic projects with confidence. Through web development projects using HTML, CSS, JavaScript, and backend technologies such as Django, I’ve developed a strong understanding of building responsive and functional applications.
              </p>

              <p>
                More recently, I’ve been focusing on Java, algorithms, and hands-on experimentation with Arduino. Working across both software and hardware has strengthened my interest in how intelligent systems can interact with the physical world.
              </p>

              <p className="text-white/80">
                My goal is to keep learning, build meaningful projects, and contribute to technology that solves real-world problems. I’m always open to connecting with people who enjoy building, learning, and sharing ideas.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
