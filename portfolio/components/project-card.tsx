"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  status?: string;
  link?: string;
  isPrimary?: boolean;
  className?: string;
}

export default function ProjectCard({
  title,
  description,
  tech,
  status,
  link,
  isPrimary,
  className = "",
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { 
          opacity: 0, 
          y: 80,
          scale: 0.95,
          rotationX: 10,
          skewY: 2
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          skewY: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={cardRef}
      style={{ perspective: "1000px" }}
      className={`group relative flex flex-col p-8 sm:p-10 rounded-[24px] bg-white/[0.03] border border-white/10 backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.04] hover:border-white/15 hover:-translate-y-1 hover:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)] ${
        isPrimary ? "lg:scale-[1.01] border-white/20 bg-white/[0.04]" : ""
      } ${className} opacity-0`}
    >
      {/* Status Badge */}
      {status && (
        <div className="absolute top-8 right-8 px-3 py-1 rounded-full bg-white/10 border border-white/10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">
            {status}
          </span>
        </div>
      )}

      <div className="flex-1 text-left">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-white transition-colors">
          {title}
        </h3>
        
        <p className="text-white/50 leading-relaxed mb-8 max-w-md">
          {description}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {tech.map((tag) => (
            <span 
              key={tag}
              className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[11px] font-medium text-white/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Link */}
      {link && (
        <Link 
          href={link} 
          target="_blank"
          className="inline-flex items-center text-sm font-semibold text-white group/link"
        >
          <span className="border-b border-transparent group-hover/link:border-white transition-all">
            View Project
          </span>
          <svg 
            className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      )}
    </div>
  );
}
