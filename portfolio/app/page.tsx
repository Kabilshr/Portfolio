import Hero from "@/components/hero";
import Journey from "@/components/journey";
import Projects from "@/components/projects";
import About from "@/components/about";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Journey />
      <About />
      <Contact />
    </main>
  );
}
