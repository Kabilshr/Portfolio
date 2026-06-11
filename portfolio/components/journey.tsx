"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Experience {
  title: string;
  organization: string;
  dates: string;
  description: string;
  badge?: string;
  website?: string;
  nodeColor: string;
}

const experiences: Experience[] = [
  {
    title: "Contractual Project Manager & Full-Stack Developer",
    organization: "NepGate",
    dates: "Aug 2025 – Present",
    description: "Leading the planning and development of NepGate, a freelance marketplace platform for Nepal. Responsible for project coordination, product direction, and full-stack implementation.",
    badge: "Current",
    nodeColor: "#FBBF24", // Warm gold
  },
  {
    title: "Tech Lead",
    organization: "Islington Webdev Community",
    dates: "Jan 2025 – Present",
    description: "Supporting student developers, guiding technical discussions, and helping coordinate development initiatives within the community.",
    badge: "Leadership",
    nodeColor: "#60A5FA", // Soft blue
  },
  {
    title: "Customer Success Representative",
    organization: "ING Skill Academy",
    dates: "Sep 2024 – Oct 2025",
    description: "Worked directly with learners and customers, supporting communication, issue resolution, and overall customer experience.",
    nodeColor: "#FFFFFF", // White
  },
  {
    title: "Freelance Full-Stack Web Developer",
    organization: "National Solution and Research Center (NSRC)",
    dates: "Jun 2024 – Aug 2024",
    description: "Developed and delivered the NSRC corporate website as a freelance engagement, creating a professional digital presence for the organization.",
    website: "nsrc.com.np",
    nodeColor: "#9CA3AF", // Muted white
  },
];

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line progress animation
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 70%",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" className="w-full py-32 px-6 sm:px-12 lg:px-24 bg-transparent font-sans overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight text-left transition-colors text-primary">
            Journey
          </h2>
          <p className="text-lg leading-relaxed text-left transition-colors text-muted">
            A progression from freelance development and customer-facing roles to technical leadership and product ownership.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line Anchor (Centered on Desktop, Left on Mobile) */}
          <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-current opacity-10" />
          
          {/* Progress Filling Line */}
          <div 
            ref={lineRef}
            className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-0 bottom-0 w-px origin-top z-10"
            style={{ backgroundColor: 'var(--accent)' }}
          />

          {/* Timeline Items */}
          <div className="relative space-y-12 sm:space-y-4">
            {experiences.map((exp, index) => (
              <div 
                key={exp.title + exp.dates}
                className={`journey-item relative flex flex-col sm:flex-row items-start sm:items-center w-full sm:justify-between ${
                  index % 2 === 0 ? "sm:flex-row-reverse" : ""
                }`}
              >
                {/* Milestone Node */}
                <div 
                  className="journey-node absolute left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-20 transition-colors"
                  style={{ 
                    backgroundColor: 'var(--accent)',
                    boxShadow: `0 0 15px var(--accent)`
                  }}
                />

                {/* Content Card Side */}
                <div className="w-full sm:w-[42%] pl-12 sm:pl-0">
                  <div 
                    className="journey-card card p-6 sm:p-8 rounded-[24px] transition-all duration-300 hover:opacity-100"
                  >
                    <ExperienceContent exp={exp} />
                  </div>
                </div>

                {/* Empty Side (Desktop Only) / Date and Organization placeholder */}
                <div className="hidden sm:flex sm:w-[42%] px-12 flex-col justify-center">
                   <div className={`space-y-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] transition-colors text-muted opacity-40">{exp.dates}</p>
                      <h4 className="text-sm font-semibold uppercase tracking-wider transition-colors text-primary opacity-20">{exp.organization}</h4>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceContent({ exp }: { exp: Experience }) {
  return (
    <div className="space-y-4 text-left">
      <div className="flex flex-wrap items-center gap-3">
        {exp.badge && (
          <span 
            className="px-2.5 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-widest transition-colors text-muted"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.209)', borderColor: 'var(--card-border)' }}
          >
            {exp.badge}
          </span>
        )}
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] transition-colors opacity-60">{exp.dates}</p>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight leading-tight transition-colors text-primary">{exp.title}</h3>
        <h4 className="text-base font-medium transition-colors">{exp.organization}</h4>
      </div>

      <p className="leading-relaxed text-sm sm:text-[15px] max-w-xl transition-colors opacity-80">
        {exp.description}
      </p>
      
      {exp.website && (
        <a 
          href={`https://${exp.website}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block text-xs font-bold border-b transition-all pb-0.5 text-primary"
          style={{ borderColor: 'var(--card-border)' }}
        >
          {exp.website}
        </a>
      )}
    </div>
  );
}
