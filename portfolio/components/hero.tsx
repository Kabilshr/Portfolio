import Image from "next/image";
import Button from "./button";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center px-6 sm:px-12 lg:px-24 overflow-hidden bg-black font-sans">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.05)_0%,transparent_50%)]" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Content Block */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-10">
          <h1 className="text-7xl sm:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] text-white uppercase">
            Kabil <br />
            <span className="text-white/90">Shrestha</span>
          </h1>
          
          <p className="text-lg sm:text-xl font-medium text-white/50 tracking-wide max-w-xl border-l-2 border-white/20 pl-6">
            Artificial Intelligence Student • Full-Stack Developer • Tech-Lead Islington Webdev Community 
          </p>

          <div className="flex flex-wrap gap-5 pt-4">
            <Button variant="primary">
              View Work
            </Button>
            <Button variant="secondary">
              Contact
            </Button>
          </div>
        </div>

        {/* Right Visual Block */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
          <div className="relative w-95 h-135">
             <Image 
                src="/portrait_cutout.png"
                alt="Kabil Shrestha"
                fill
                className="object-contain object-center"
                priority
              />
          </div>
        </div>

      </div>
    </section>
  );
}
