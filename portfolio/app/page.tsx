import Hero from "@/components/hero";
import Journey from "@/components/journey";
import Projects from "@/components/projects";
import About from "@/components/about";

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Journey />
      <About />
    </main>
  );
}
