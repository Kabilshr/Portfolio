"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ContactNode {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const contactLinks: ContactNode[] = [
  {
    label: "Email",
    href: "mailto:kabilshrestha06@gmail.com",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kabil-shrestha-049845285",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/Kabilshr",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 4.288 9.638 9.788 11.174.6.101.82-.258.82-.577 0-.285-.021-1.04-.032-2.042-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .322.218.694.825.576 5.5-1.54 9.782-5.872 9.782-11.174 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const linesRef = useRef<(SVGLineElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal nodes sequentially
      gsap.fromTo(
        nodesRef.current,
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Draw connecting lines
      gsap.fromTo(
        linesRef.current,
        { strokeDasharray: 100, strokeDashoffset: 100 },
        {
          strokeDashoffset: 0,
          duration: 1.5,
          delay: 0.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative w-full py-40 pb-20 px-6 sm:px-12 lg:px-24 bg-transparent font-sans overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-16">
        
        <div className="space-y-6 max-w-2xl">
          <span className="text-2xl m-3 font-bold uppercase tracking-[0.3em] transition-colors text-accent">
            Let&apos;s Connect
          </span>
          <p className="text-lg sm:text-xl leading-relaxed font-light transition-colors text-muted">
            Open to internships, software engineering opportunities, freelance projects, and conversations about technology.
          </p>
        </div>

        <div className="relative w-full max-w-2xl mx-auto pt-10 pb-10 flex flex-col sm:flex-row justify-center items-center gap-12 sm:gap-24">
          
          <div className="absolute hidden sm:block inset-0 pointer-events-none z-0">
             <div className="absolute top-1/2 left-[20%] right-[20%] h-px transition-colors -translate-y-1/2" style={{ backgroundColor: 'var(--card-border)' }} />
          </div>

          <div className="absolute sm:hidden top-24 bottom-24 left-1/2 -translate-x-1/2 w-px transition-colors z-0" style={{ backgroundColor: 'var(--card-border)' }} />

          {contactLinks.map((node, index) => (
            <Link
              key={node.label}
              href={node.href}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => { if (el) nodesRef.current[index] = el; }}
              className="card group relative z-10 w-32 h-32 flex flex-col items-center justify-center rounded-full transition-all duration-500 hover:-translate-y-2 shrink-0 backdrop-blur-xl"
            >
              <div className="absolute inset-0 rounded-full bg-blue-500/0 group-hover:bg-blue-500/5 transition-all duration-500" />
              
              <div className="relative flex flex-col items-center space-y-3">
                <div className="flex items-center justify-center w-6 h-6 transition-all duration-500 text-muted">
                  <div className="group-hover:scale-110 transition-transform group-hover:text-current">
                    {node.icon}
                  </div>
                </div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-colors opacity-40 group-hover:opacity-100 text-primary">
                  {node.label}
                </span>
              </div>
            </Link>
          ))}

        </div>

      </div>

      <div className="mt-20 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium transition-colors text-muted opacity-30" style={{ borderColor: 'var(--card-border)' }}>
        <p>© 2026 Kabil Shrestha. All rights reserved.</p>
        <p>Built with Next.js & GSAP</p>
      </div>
    </section>
  );
}
