import { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function Button({ 
  children, 
  variant = "primary", 
  onClick, 
  href,
  className = "" 
}: ButtonProps) {
  const baseStyles = "px-10 py-4 font-bold rounded-full transition-all hover:scale-105 active:scale-95 cursor-pointer text-center whitespace-nowrap inline-block";
  
  const variants = {
    primary: "hover:opacity-90 shadow-xl",
    secondary: "border border-white/30 text-current hover:bg-white/10"
  };

  const finalStyles = `${baseStyles} ${variants[variant]} ${className}`;
  const finalStyleAttr = variant === "primary" ? { backgroundColor: 'var(--text-primary)', color: 'var(--bg-2)' } : {};

  if (href) {
    return (
      <Link 
        href={href}
        className={finalStyles}
        style={finalStyleAttr}
      >
        {children}
      </Link>
    );
  }

  return (
    <button 
      onClick={onClick}
      className={finalStyles}
      style={finalStyleAttr}
    >
      {children}
    </button>
  );
}
