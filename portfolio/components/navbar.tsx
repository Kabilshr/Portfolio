import Link from 'next/link';

export default function Navbar() {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Project', href: '#project' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-fit max-w-[95vw] sm:max-w-none">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-2 py-2 rounded-2xl shadow-2xl transition-all duration-300 hover:border-white/30">
        <ul className="flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => (
            <li key={link.name} className="relative group">
              <Link 
                href={link.href}
                className="text-xs sm:text-sm font-medium text-white/70 hover:text-white hover:bg-white/15 px-3 py-2 sm:px-5 sm:py-2.5 rounded-xl transition-all duration-300 whitespace-nowrap block hover:scale-110 active:scale-95 origin-bottom"
              >
                {link.name}
              </Link>
        
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}