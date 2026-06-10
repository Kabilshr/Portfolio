import ProjectCard from "./project-card";

interface Project {
  title: string;
  description: string;
  tech: string[];
  status?: string;
  link?: string;
  isPrimary?: boolean;
}

const projects: Project[] = [
  {
    title: "NepGate",
    status: "In Development",
    description: "Freelance marketplace platform built for Nepal. Designed to connect businesses and individuals with skilled freelancers through a modern web platform.",
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "ShadCN UI"],
    link: "https://nepgate.com",
    isPrimary: true,
  },
  {
    title: "National Solution and Research Center",
    description: "Corporate website developed as a freelance project for Nepal's first casework company, providing a modern online presence and information platform.",
    tech: ["Django", "Python", "Bootstrap", "HTML", "CSS", "JavaScript"],
    link: "https://nsrc.com.np",
  },
  {
    title: "QuickChat",
    description: "Real-time messaging application created during Nepal's social media ban to explore chat system architecture and maintain communication with friends and family.",
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "ShadCN UI"],
    link: "https://connect.kabilshrestha.com.np",
  },
  {
    title: "Economic Uncertainty Policy Nepal",
    description: "Research-oriented web scraping project developed to collect and process data from nine English-language newspapers in Nepal for economic policy uncertainty analysis.",
    tech: ["Python", "BeautifulSoup4", "Web Scraping"],
    link: "https://github.com/Kabilshr/Economic-Uncertainty-Policy-Nepal",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="w-full py-24 px-6 sm:px-12 lg:px-24 bg-black font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
            Featured Projects
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            A selection of academic, freelance, and personal projects spanning full-stack development, research automation, and real-time systems.
          </p>
        </div>

        {/* Staggered Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.title}
              {...project}
              className={index % 2 !== 0 ? "lg:mt-12" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
