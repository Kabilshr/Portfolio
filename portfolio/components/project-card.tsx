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
  className = "",
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { 
          opacity: 0, 
          y: 40,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 95%",
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
      className={`card group relative flex flex-col p-8 rounded-[24px] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl min-h-[260px] max-w-[560px] opacity-0 ${className}`}
    >
      {/* Status Badge */}
      {status && (
        <div className="absolute top-6 right-8 px-3 py-1 rounded-full bg-current/10 border border-current/10">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">
            {status}
          </span>
        </div>
      )}

      <div className="flex-1 text-left">
        <h3 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight text-primary">
          {title}
        </h3>
        
        <p className="text-base leading-relaxed mb-6 max-w-md text-muted">
          {description}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tech.map((tag) => (
            <span 
              key={tag}
              className="px-2.5 py-0.5 rounded-full bg-current/5 border border-current/10 text-[10px] font-semibold tracking-wide text-muted"
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
          className="inline-flex items-center text-sm font-bold group/link text-primary"
        >
          <span className="border-b-2 border-transparent group-hover/link:border-current transition-all">
            View Project
          </span>
          <svg 
            className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      )}
    </div>
  );
}
