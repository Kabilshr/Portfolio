"use client";

import Link from 'next/link';

export default function Navbar() {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Project', href: '#projects' },
    { name: 'Journey', href: '#journey' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (

    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-fit max-w-[95vw] sm:max-w-none">
      <div 
        className="nav-glass px-4 py-2 rounded-2xl shadow-2xl transition-all duration-500"
      >
        <ul className="flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => (
            <li key={link.name} className="relative group">
              <Link 
                href={link.href}
                className="text-xs sm:text-sm font-medium px-4 py-2 sm:px-7 sm:py-2.5 rounded-xl transition-all duration-300 whitespace-nowrap block hover:scale-110 active:scale-95 origin-bottom"
                style={{ color: 'var(--nav-text)' }}
              >
                <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                  {link.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

