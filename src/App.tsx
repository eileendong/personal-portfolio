import { useState } from "react";
import { motion } from "framer-motion";
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
  Cable,  Home,
  Bot,
  Calendar,
  ServerCog,
  Laptop,
  Code2,
  FileText,
  Palette,
} from "lucide-react";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <OceanNightBackground />
      </div>

      {/* === NAVIGATION === */}
      <nav className="flex justify-between items-center p-6 sticky top-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div className="font-semibold text-white tracking-wide">EILEEN DONG</div>
        <div className="space-x-6 text-sm flex items-center">
          {["Projects", "Skills", "Experience", "Education", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-white/70 hover:text-white transition"
            >
              {link}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            className="border px-3 py-1 rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
          >
            {theme === "dark" ? "😅" : "😎"}
          </button>
        </div>
      </nav>

      {/* === HERO === */}
      <section className="flex flex-col items-center justify-center text-center py-32 relative">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-semibold leading-snug md:leading-[1.15] tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-blue-300 via-cyan-200 to-purple-400 pb-2"
        >
          Exploring, Learning,
          <br />
          Figuring it out. \n
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-white/70 max-w-2xl mt-8 mb-8 leading-relaxed text-lg"
        >
          Studying Computer Science @ University of Washington '27 — happy to see you!!
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4"
        >
          <a href="#projects" className="btn-glass">View Projects</a>
          <a href="#contact" className="btn-glass">Contact Me</a>
        </motion.div>
      </section>

      {/* === PROJECTS === */}
      <section id="projects" className="flex flex-col items-center justify-center px-12 py-24">
        <h2 className="text-3xl font-semibold mb-12 text-center text-white">Featured Projects</h2>

        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10 max-w-6xl w-full justify-items-center">
          {[
            {
              icon: <Home className="w-8 h-8 text-amber-300" />,
              title: "Roomies",
              desc: "Full-stack expense-splitting app with React & AWS Amplify (Cognito, Lambda, Textract, DynamoDB, S3).",
              tech: ["AWS", "React", "Amplify"],
              link: "https://github.com/eileendong/roomies",
              glow: "from-amber-400/0 via-amber-400/0 to-amber-400/10",
              shadow: "hover:shadow-amber-400/20",
            },
            {
              icon: <Bot className="w-8 h-8 text-blue-400" />,
              title: "Dub-Grind",
              desc: "AI-powered Discord bot using LangChain & LlamaIndex to summarize lectures and generate quizzes.",
              tech: ["Python", "LangChain", "LlamaIndex"],
              link: "https://github.com/eileendong/dub-grind2",
              glow: "from-blue-500/0 via-blue-500/0 to-blue-500/10",
              shadow: "hover:shadow-blue-400/20",
            },
            {
              icon: <Calendar className="w-8 h-8 text-purple-300" />,
              title: "Synchronize",
              desc: "React + Google Calendar app finding shared free time via OAuth 2.0 API sync.",
              tech: ["React", "Google API", "OAuth 2.0"],
              link: "https://github.com/eileendong/synchronize",
              glow: "from-purple-500/0 via-purple-500/0 to-purple-500/10",
              shadow: "hover:shadow-purple-400/20",
            },
            {
              icon: <Cloud className="w-8 h-8 text-cyan-300" />,
              title: "OrchidXR",
              desc: "AR storytelling app honoring Seattle’s Central District, built in Unity, Blender, and 8th Wall’s Web AR SDK.",
              tech: ["Unity", "AR", "8th Wall"],
              link: "https://github.com/eileendong/orchidxr",
              glow: "from-cyan-500/0 via-cyan-500/0 to-cyan-500/10",
              shadow: "hover:shadow-cyan-400/20",
            },
          ].map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-2xl border border-white/[0.08] p-8 text-center shadow-xl ${p.shadow} hover:border-white/20 transition-all duration-500 w-full max-w-sm`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${p.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className="relative z-10 space-y-4">
                <div className="flex justify-center">{p.icon}</div>
                <h3 className="text-white text-2xl font-semibold">{p.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{p.desc}</p>
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  {p.tech.map((t, j) => (
                    <span key={j} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6 relative z-10">
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="inline-block text-sm text-white/80 hover:text-white hover:underline transition-all">
                  View on GitHub →
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
  <h2 className="text-4xl font-semibold mb-16 text-center tracking-tight bg-gradient-to-br from-blue-300 via-cyan-200 to-purple-400 text-transparent bg-clip-text">
    Technical Skills
  </h2>

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
    desc: "Replaced a legacy Dell OME alerting pipeline with a FastAPI backend. Added Prometheus metrics, Dockerized stack, and deployed to Kubernetes with full observability.",
  },
  {
    icon: <Laptop className="w-5 h-5 text-blue-300" />,
    role: "Student IT Technician",
    company: "University of Washington",
    time: "Jan 2024 – Present",
    desc: "Provided in-person IT support, handled device imaging and troubleshooting across multi-OS environments.",
  },
  {
    icon: <Code2 className="w-5 h-5 text-purple-300" />,
    role: "Software Development Intern",
    company: "Southwest Research Institute",
    time: "Summer 2023",
    desc: "Modernized legacy Fortran systems into a React interface and automated simulation data visualization.",
  },
  {
    icon: <FileText className="w-5 h-5 text-teal-300" />,
    role: "Administration Intern",
    company: "Southwest Research Institute",
    time: "Summer 2022",
    desc: "Digitized aerospace documentation for NASA’s New Horizons and Juno missions; shadowed Python calibration work for Europa Clipper.",
  },
  {
    icon: <Palette className="w-5 h-5 text-pink-300" />,
    role: "Product & Development Intern",
    company: "USAA",
    time: "Summer 2021",
    desc: "Developed a mock UI using HTML/CSS for a small business insurance platform; focused on UI/UX and accessibility design.",
  },
  {
    icon: <Coffee className="w-5 h-5 text-amber-300" />,
    role: "Boba Barista",
    company: "Hella Bubble",
    time: "Summer 2021 – 2024",
    desc: "Crafted drinks, managed inventory, and provided excellent customer service in a fast-paced environment.",
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
