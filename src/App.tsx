import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";
import { OceanNightBackground } from "./components/OceanNightBackground";

import {
  Code,
  FileCode,
  Braces,
  Database,
  Layout,
  Rocket,
  Cpu,
  Network,
  Cloud,
  GitBranch,
  Server,
  Terminal,
  Workflow,
  Gauge,
  Boxes,
  Layers,
  Coffee,
  Wrench,
  Cable,
  Home,
  Bot,
  Calendar,
  ServerCog,
  Laptop,
  Code2,
  FileText,
  Palette,
  Menu,
  X,
  ExternalLink,
  Sparkles,
} from "lucide-react";

// Project data with optional demo links
const projects = [
  {
    icon: <Home className="w-8 h-8 text-amber-300" />,
    title: "Roomies",
    desc: "Smart expense splitting with receipt photo parsing. Automatically extracts costs using computer vision and syncs in real-time across roommates.",
    tech: ["AWS", "React", "Amplify"],
    link: "https://github.com/eileendong/roomies",
    glow: "from-amber-400/0 via-amber-400/0 to-amber-400/10",
    shadow: "hover:shadow-amber-400/20",
  },
  {
    icon: <Bot className="w-8 h-8 text-blue-400" />,
    title: "Dub-Grind",
    desc: "Discord bot that transforms lecture recordings into study materials. Auto-generates summaries and practice quizzes using RAG architecture.",
    tech: ["Python", "LangChain", "LlamaIndex"],
    link: "https://github.com/eileendong/dub-grind2",
    glow: "from-blue-500/0 via-blue-500/0 to-blue-500/10",
    shadow: "hover:shadow-blue-400/20",
  },
  {
    icon: <Calendar className="w-8 h-8 text-purple-300" />,
    title: "Synchronize",
    desc: "Find mutual free time across friend groups. Syncs Google Calendars via OAuth and highlights overlapping availability.",
    tech: ["React", "Google API", "OAuth 2.0"],
    link: "https://github.com/eileendong/synchronize",
    glow: "from-purple-500/0 via-purple-500/0 to-purple-500/10",
    shadow: "hover:shadow-purple-400/20",
  },
  {
    icon: <Cloud className="w-8 h-8 text-cyan-300" />,
    title: "OrchidXR",
    desc: "Immersive AR experience honoring Seattle's Central District history. Built with Unity and 8th Wall for web-based augmented reality.",
    tech: ["Unity", "AR", "8th Wall"],
    link: "https://github.com/eileendong/orchidxr",
    glow: "from-cyan-500/0 via-cyan-500/0 to-cyan-500/10",
    shadow: "hover:shadow-cyan-400/20",
  },
  {
    icon: <Server className="w-8 h-8 text-emerald-300" />,
    title: "Bare Metal Provisioning",
    desc: "Automated Windows workstation deployment replacing 4-hour manual setup with 20-minute Ansible playbooks. Reduced configuration errors by 95%.",
    tech: ["Ansible", "DevOps", "WinRM"],
    link: "https://github.com/eileendong/UW-bare-metal-provisioning",
    glow: "from-emerald-500/0 via-emerald-500/0 to-emerald-500/10",
    shadow: "hover:shadow-emerald-400/20",
  },
];

// Filter categories
const filterCategories = ["All", "React", "AWS", "Python", "DevOps"];

// Particle colors
const particleColors = ["#60a5fa", "#a78bfa", "#34d399", "#f472b6", "#fbbf24", "#22d3ee"];

// Particle component for the silly effect
const Particle = ({ style, color }: { style: React.CSSProperties; color: string }) => {
  const angle = Math.random() * Math.PI * 2;
  const distance = 50 + Math.random() * 80;
  const size = 6 + Math.random() * 8;

  return (
    <motion.div
      initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
      animate={{
        opacity: 0,
        scale: [0, 1.5, 0.5],
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed",
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 ${size}px ${color}`,
        pointerEvents: "none",
        zIndex: 9999,
        ...style,
      }}
    />
  );
};

export default function App() {
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Project filter state
  const [activeFilter, setActiveFilter] = useState("All");

  // Particles state for silly effect
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

  // Silly button effect - spawns confetti particles
  const doSillyEffect = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Create particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: centerX,
      y: centerY,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
    }));

    setParticles((prev) => [...prev, ...newParticles]);

    // Clean up particles after animation
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
    }, 800);
  };

  // Filter projects based on active filter
  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(p =>
        p.tech.some(t => t.toLowerCase().includes(activeFilter.toLowerCase()))
      );

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Particles for silly button effect */}
      <AnimatePresence>
        {particles.map((particle) => (
          <Particle key={particle.id} style={{ left: particle.x, top: particle.y }} color={particle.color} />
        ))}
      </AnimatePresence>

      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg"
      >
        Skip to content
      </a>

      <div className="fixed inset-0 -z-10">
        <OceanNightBackground />
      </div>

      {/* === NAVIGATION === */}
      <nav className="flex justify-between items-center p-6 sticky top-0 z-50 nav-bg border-b border-white/10">
        <div className="font-semibold text-white tracking-wide">EILEEN DONG</div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 text-sm items-center">
          {["Projects", "Skills", "Experience", "Education", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="nav-link text-white/70 hover:text-white transition"
            >
              {link}
            </a>
          ))}
          <button
            onClick={doSillyEffect}
            aria-label="Do something fun"
            className="border border-white/20 px-3 py-2 rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 hover:scale-110 transition-all flex items-center justify-center"
          >
            <Sparkles className="w-4 h-4 text-cyan-300" />
          </button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={doSillyEffect}
            aria-label="Do something fun"
            className="border border-white/20 p-2 rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 hover:scale-110 transition-all"
          >
            <Sparkles className="w-4 h-4 text-cyan-300" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="border border-white/20 p-2 rounded-lg backdrop-blur-sm bg-white/10 hover:bg-white/20 transition"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden sticky top-[73px] z-40 nav-bg border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-3">
              {["Projects", "Skills", "Experience", "Education", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="nav-link text-white/70 hover:text-white transition py-2 px-4 rounded-lg hover:bg-white/10"
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === HERO === */}
      <section id="main-content" className="flex flex-col items-center justify-center text-center py-32 px-6 relative">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-snug md:leading-[1.15] tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-blue-300 via-cyan-200 to-purple-400 pb-2"
        >
          Exploring, Learning
          <br />
          Figuring it out.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-white/70 max-w-2xl mt-8 mb-8 leading-relaxed text-lg"
        >
          Studying Computer Science @ University of Washington '27 -- happy to see you!!
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a href="#projects" className="btn-glass">View Projects</a>
          <a href="#contact" className="btn-glass">Contact Me</a>
        </motion.div>
      </section>

      {/* === PROJECTS === */}
      <section id="projects" className="flex flex-col items-center justify-center px-6 md:px-12 py-24">
        <h2 className="text-3xl font-semibold mb-8 text-center section-title">Featured Projects</h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filterCategories.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-blue-500/30 text-white border border-blue-400/50"
                  : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full justify-items-center">
          {filteredProjects.map((p) => (
            <motion.div
              key={p.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-white/[0.08] p-8 text-center shadow-xl ${p.shadow} hover:border-white/20 transition-all duration-500 w-full max-w-sm`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${p.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className="relative z-10 space-y-4">
                <div className="flex justify-center">{p.icon}</div>
                <h3 className="text-white text-2xl font-semibold">{p.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{p.desc}</p>
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  {p.tech.map((t, j) => (
                    <span key={j} className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6 relative z-10 flex justify-center gap-4">
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white hover:underline transition-all py-2"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  GitHub
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>



{/* ================= SKILLS SECTION (Lucide Icons + 5-STAR SYSTEM) ================= */}
<section
  id="skills"
  className="relative px-6 md:px-12 py-32 backdrop-blur-sm"
>
  <h2 className="text-4xl font-semibold mb-8 text-center tracking-tight bg-gradient-to-br from-blue-300 via-cyan-200 to-purple-400 text-transparent bg-clip-text">
    Technical Skills
  </h2>

  {/* Skills Legend */}
  <div className="flex justify-center gap-6 mb-12 text-sm text-white/60">
    <div className="flex items-center gap-2">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-blue-400">★★★★★</span>
      <span>Expert</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-blue-400">★★★★</span><span className="text-gray-600">★</span>
      <span>Advanced</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-blue-400">★★★</span><span className="text-gray-600">★★</span>
      <span>Proficient</span>
    </div>
  </div>

  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14">
    {[
      {
        category: "Languages",
        items: [
          { icon: <FileCode size={16} className="text-blue-300" />, name: "Python", level: 5 },
          { icon: <Braces size={16} className="text-blue-300" />, name: "C/C++", level: 5 },
          { icon: <Coffee size={16} className="text-blue-300" />, name: "Java", level: 5 },
          { icon: <Code size={16} className="text-blue-300" />, name: "JavaScript", level: 4 },
          { icon: <Database size={16} className="text-blue-300" />, name: "SQL", level: 3 },
          { icon: <Layout size={16} className="text-blue-300" />, name: "HTML/CSS", level: 4 },
          { icon: <Terminal size={16} className="text-blue-300" />, name: "Visual Basic", level: 3 },
        ],
      },
      {
        category: "Frameworks & Libraries",
        items: [
          { icon: <Rocket size={16} className="text-purple-300" />, name: "React", level: 4 },
          { icon: <Rocket size={16} className="text-purple-300" />, name: "FastAPI", level: 5 },
          { icon: <Workflow size={16} className="text-purple-300" />, name: "LangChain", level: 4 },
          { icon: <Layers size={16} className="text-purple-300" />, name: "LlamaIndex", level: 3 },
          { icon: <Server size={16} className="text-purple-300" />, name: "Node.js", level: 3 },
        ],
      },
      {
        category: "DevOps & Cloud",
        items: [
          { icon: <Boxes size={16} className="text-cyan-300" />, name: "Docker", level: 3 },
          { icon: <Network size={16} className="text-cyan-300" />, name: "Kubernetes", level: 3 },
          { icon: <Cloud size={16} className="text-cyan-300" />, name: "AWS", level: 4 },
          { icon: <GitBranch size={16} className="text-cyan-300" />, name: "GitLab CI/CD", level: 5 },
          { icon: <Wrench size={16} className="text-cyan-300" />, name: "Ansible", level: 3 },
          { icon: <Terminal size={16} className="text-cyan-300" />, name: "Linux", level: 4 },
        ],
      },
      {
        category: "Concepts & Systems",
        items: [
          { icon: <Network size={16} className="text-teal-300" />, name: "APIs", level: 5 },
          { icon: <Cpu size={16} className="text-teal-300" />, name: "Concurrent Programming", level: 4 },
          { icon: <Server size={16} className="text-teal-300" />, name: "Distributed Systems", level: 4 },
          { icon: <Cable size={16} className="text-teal-300" />, name: "TCP Socket Programming", level: 3 },
          { icon: <Gauge size={16} className="text-teal-300" />, name: "Observability (Prometheus, OTel)", level: 4 },
        ],
      },
    ].map((cat, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: i * 0.2 }}
        className="space-y-6"
      >
        <h3 className="text-xl font-medium mb-6 text-white/80 flex items-center gap-2">
          <Layers size={18} className="text-blue-400" /> {cat.category}
        </h3>
        {cat.items.map((skill, s) => (
          <div
            key={s}
            className="flex items-center justify-between group transition-transform duration-300 hover:translate-x-1"
          >
            <span className="text-gray-200 text-sm flex items-center gap-2">
              {skill.icon}
              {skill.name}
            </span>

            {/* Star Rating */}
            <div className="flex space-x-[2px]">
              {[...Array(5)].map((_, starIndex) => {
                const filled = starIndex < skill.level;
                return (
                  <motion.span
                    key={starIndex}
                    className={`text-lg ${
                      filled
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-blue-400"
                        : "text-gray-600"
                    }`}
                  >
                    ★
                  </motion.span>
                );
              })}
            </div>
          </div>
        ))}
      </motion.div>
    ))}
  </div>
</section>

{/* 🌊 Experience Section */}
<section id="experience" className="relative py-32 px-6 md:px-12 overflow-hidden">
  <h2 className="text-3xl font-semibold mb-20 text-center text-white tracking-wide">
    Experience
  </h2>

  {/* Wavy timeline path */}
  <svg
    className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-[4px]"
    viewBox="0 0 10 1000"
    preserveAspectRatio="none"
  >
    <defs>
      <linearGradient id="waveLine" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    <path
      d="M5 0 C8 100, 2 200, 5 300 S8 500, 5 700 S2 900, 5 1000"
      stroke="url(#waveLine)"
      strokeWidth="1.5"
      fill="none"
      className="animate-[waveFlow_6s_ease-in-out_infinite_alternate]"
    />
  </svg>

  {/* Rising bubbles */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 10 }).map((_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 bg-cyan-300/40 rounded-full blur-[1px]"
        style={{
          left: `${45 + Math.sin(i * 2) * 5}%`,
          animation: `bubbleRise ${6 + i * 1.5}s linear ${i * 1}s infinite`,
          top: `${100 + i * 150}px`,
        }}
      ></div>
    ))}
  </div>

  <div className="relative max-w-5xl mx-auto space-y-20">
    {
      [
  {
    icon: <ServerCog className="w-5 h-5 text-cyan-400" />,
    role: "Software Engineer Intern",
    company: "H-E-B",
    time: "Summer 2025",
    desc: "Built FastAPI backend replacing legacy Dell OME alerting, reducing alert latency by 60%. Deployed Dockerized stack to Kubernetes with Prometheus observability serving 500+ retail locations.",
  },
  {
    icon: <Laptop className="w-5 h-5 text-blue-300" />,
    role: "Student IT Technician",
    company: "University of Washington",
    time: "Jan 2024 – Present",
    desc: "Resolved 50+ support tickets monthly across Windows, macOS, and Linux. Streamlined device imaging workflows reducing setup time by 30%.",
  },
  {
    icon: <Code2 className="w-5 h-5 text-purple-300" />,
    role: "Software Development Intern",
    company: "Southwest Research Institute",
    time: "Summer 2023",
    desc: "Modernized legacy Fortran simulation system into React dashboard, enabling real-time data visualization for 20+ researchers.",
  },
  {
    icon: <FileText className="w-5 h-5 text-teal-300" />,
    role: "Administration Intern",
    company: "Southwest Research Institute",
    time: "Summer 2022",
    desc: "Digitized 1000+ aerospace documents for NASA's New Horizons and Juno missions. Shadowed Python calibration work for Europa Clipper.",
  },
  {
    icon: <Palette className="w-5 h-5 text-pink-300" />,
    role: "Product & Development Intern",
    company: "USAA",
    time: "Summer 2021",
    desc: "Designed and developed mock UI for small business insurance platform, conducting user testing with 15+ stakeholders.",
  },
  {
    icon: <Coffee className="w-5 h-5 text-amber-300" />,
    role: "Boba Barista",
    company: "Hella Bubble",
    time: "Summer 2021 – 2024",
    desc: "Served 100+ customers daily while managing inventory and training 5 new team members.",
  },
].map((exp, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: i * 0.1 }}
        viewport={{ once: true }}
        className={`relative w-full md:w-[48%] ${
          i % 2 === 0 ? "ml-auto text-left" : "mr-auto text-right"
        }`}
      >
        <div
          className={`relative bg-white/[0.05] border border-white/[0.1] backdrop-blur-2xl rounded-2xl p-6 shadow-lg shadow-cyan-500/5 transition-all hover:scale-[1.02] hover:shadow-cyan-400/20 ${
            i % 2 === 0 ? "md:ml-10" : "md:mr-10"
          }`}
        >
          <h3 className="text-xl font-semibold text-white">
            {exp.role} <span className="text-blue-300">| {exp.company}</span>
          </h3>
          <p className="text-sm text-white/60 mt-1">{exp.time}</p>
          <p className="text-white/70 mt-3 leading-relaxed">{exp.desc}</p>

          {/* Connection dot */}
          <div
            className={`absolute top-1/2 w-3 h-3 rounded-full bg-cyan-400/70 border border-cyan-200/30 shadow-[0_0_15px_rgba(34,211,238,0.6)] ${
              i % 2 === 0 ? "-left-[30px]" : "-right-[30px]"
            }`}
          ></div>
        </div>
      </motion.div>
    ))}
  </div>
</section>

{/* ================= EDUCATION SECTION ================= */}
<section
  id="education"
  className="relative px-6 md:px-12 py-32 text-center overflow-hidden"
>
  {/* Watermark */}
  <div className="absolute inset-0 flex items-center justify-center opacity-[0.05]">
    <span className="text-[15rem] font-bold text-white/5 select-none">
      UW
    </span>
  </div>

  <div className="relative z-10 max-w-3xl mx-auto">
    <h2 className="text-4xl font-semibold mb-8 tracking-tight bg-gradient-to-r from-blue-300 via-cyan-200 to-purple-400 text-transparent bg-clip-text">
      Education
    </h2>

    <p className="text-lg font-medium mb-2">
      University of Washington – B.S. Computer Science
    </p>
    <p className="text-gray-400 text-sm mb-4">
     GPA: 3.45 
    </p>

    <motion.p
      animate={{
        textShadow: [
          "0 0 10px rgba(56,189,248,0.7)",
          "0 0 20px rgba(56,189,248,1)",
          "0 0 10px rgba(56,189,248,0.7)",
        ],
      }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
      className="text-blue-200"
    >
      Expected Graduation: June 2027
    </motion.p>
      
    <p className="text-gray-400 mt-4 text-sm leading-relaxed">
      Relevant Coursework: Data Structures & Parallelism, Algorithms, Distributed Systems,
      Software Engineering, Computer Architecture, Discrete Math, Systems Programming, Probability & Statistics.
    </p>
  </div>
</section>

     
      <section id="contact" className="px-12 py-24 text-center text-white">
        <h2 className="text-4xl font-semibold mb-8">Talk to me!</h2>
        <p className="text-white/60 mb-8">
          <a href="mailto:eileendong1@gmail.com" className="underline hover:text-white transition"> eileendong1@gmail.com </a> • Seattle, WA • <a href="https://www.linkedin.com/in/eileen-dong-459187136/" className="underline hover:text-white transition">LinkedIn</a> • <a href="https://github.com/eileendong" className="underline hover:text-white transition">GitHub</a>
        </p>
        {/* <form
          onSubmit={(e) => e.preventDefault()}
          className="max-w-md mx-auto space-y-4"
        >
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded bg-white/10 border border-white/20"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded bg-white/10 border border-white/20"
            required
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            className="w-full p-3 rounded bg-white/10 border border-white/20"
            required
          />
          <button
            type="submit"
            className="w-full border border-white/20 px-6 py-2 rounded-full hover:bg-white hover:text-black transition"
          >
            Send Message
          </button>
        </form> */}
      </section>
      {/* === FOOTER === */}
      <footer className="py-8 text-center text-white/50 text-sm border-t border-white/10">
        © {new Date().getFullYear()} Eileen Dong • Built with React, Tailwind, & Framer Motion
      </footer>
    </div>
    
  );
}
