import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
}

export default function Button({ 
  children, 
  variant = "primary", 
  onClick, 
  className = "" 
}: ButtonProps) {
  const baseStyles = "px-10 py-4 font-bold rounded-xl transition-all hover:scale-105 active:scale-95 cursor-pointer text-center whitespace-nowrap";
  
  const variants = {
    primary: "bg-white text-black hover:bg-white/90 shadow-xl",
    secondary: "border border-white/30 text-white hover:bg-white/10"
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
