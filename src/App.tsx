import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";

import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowUpRight,
  Menu,
  X,
  MapPin,
  ChevronRight,
} from "lucide-react";

// Experience data from resume
const experiences = [
  {
    period: "Summer 2026",
    role: "Software Engineer Intern",
    company: "Axon",
    companyUrl: "https://www.axon.com",
    location: "Seattle, WA",
    description:
      "Incoming DevOps platform intern building a zero-touch DevOps application to automate end-to-end infrastructure provisioning and deployment workflows at scale.",
    tech: ["DevOps", "Infrastructure", "Automation"],
  },
  {
    period: "Summer 2025",
    role: "Software Engineer Intern",
    company: "H-E-B",
    companyUrl: "https://www.heb.com",
    location: "Austin, TX",
    description:
      "Replaced a legacy Dell OME alerting pipeline with a FastAPI microservice across 13K+ servers, achieving 99% delivery reliability and preventing $300K+ outage costs per incident. Containerized services with Docker and Kubernetes; automated CI/CD pipelines with Prometheus + OpenTelemetry instrumentation.",
    tech: ["FastAPI", "Docker", "Kubernetes", "Prometheus", "OpenTelemetry"],
  },
  {
    period: "Jan 2024 – Present",
    role: "Student IT Technician",
    company: "University of Washington",
    companyUrl: "https://www.washington.edu",
    location: "Seattle, WA",
    description:
      "Resolved 400+ hardware/software issues across Windows, macOS, and Linux. Automated imaging and inventory workflows, cutting device setup time by 40%. Trained 5 technicians and standardized documentation.",
    tech: ["Windows", "macOS", "Linux", "Automation"],
  },
  {
    period: "Summer 2023",
    role: "Software Engineer Intern",
    company: "Southwest Research Institute",
    companyUrl: "https://www.swri.org",
    location: "San Antonio, TX",
    description:
      "Rewrote a CLI fluid thermodynamics simulator as a React GUI with CSV export, cutting engine test setup from minutes to seconds for 40+ engineers. Refactored Visual Basic data visualization pipelines.",
    tech: ["React", "Python", "Data Visualization"],
  },
];

// Projects data
const projects = [
  {
    title: "Automated Windows Workstation Deployment",
    description:
      "Built an Ansible-driven Windows deployment system integrating with MDT/WDS PXE, eliminating 20+ manual steps. Automated installation of 20+ enterprise applications with checkpoint-based recovery.",
    tech: ["Ansible", "PowerShell", "WinRM", "IaC"],
    github: "https://github.com/eileendong/bare-metal-provisioning",
    year: "2026",
  },
  {
    title: "Roomies",
    description:
      "React + AWS Amplify expense-splitting app with Cognito Auth, Lambda, Textract for receipt scanning, S3, and DynamoDB. Real-time sync via POST APIs and event triggers.",
    tech: ["React", "AWS", "Lambda", "DynamoDB"],
    github: "https://github.com/eileendong/roomies",
    year: "2025",
  },
  {
    title: "Dub-Grind",
    description:
      "AI Discord bot using LangChain, LlamaIndex, and OpenAI that summarizes lectures, generates adaptive quizzes, and delivers real-time interactive feedback.",
    tech: ["Python", "LangChain", "LlamaIndex", "OpenAI"],
    github: "https://github.com/eileendong/dub-grind2",
    year: "2025",
  },
];

// Skills organized by category
const skillCategories = [
  {
    name: "Languages",
    skills: ["Python", "Java", "JavaScript", "C", "C++", "SQL", "Bash", "HTML", "CSS"],
  },
  {
    name: "Backend & APIs",
    skills: ["FastAPI", "REST APIs", "Node.js", "Pydantic", "SQLite", "OAuth 2.0"],
  },
  {
    name: "DevOps & CI/CD",
    skills: ["Docker", "Kubernetes", "Ansible", "Terraform", "GitLab CI/CD", "Prometheus", "OpenTelemetry", "Grafana"],
  },
  {
    name: "Cloud & Infrastructure",
    skills: ["AWS (EC2, Lambda, S3, DynamoDB, Cognito)", "Linux", "PowerShell", "TCP/IP Networking"],
  },
  {
    name: "Frameworks & Tools",
    skills: ["React.js", "LangChain", "LlamaIndex", "Git", "Postman", "Agile/Scrum"],
  },
];

// Navigation items
const navItems = ["About", "Experience", "Projects", "Skills", "Contact"];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position for spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Track active section for navigation highlight
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.toLowerCase());
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-900 text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900">
      {/* Gradient spotlight that follows cursor */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
        }}
      />

      {/* Skip to content link */}
      <a
        href="#about"
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-teal-400 focus:text-slate-900 focus:rounded-lg focus:font-semibold"
      >
        Skip to content
      </a>

      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          {/* Left Column - Fixed Info */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <div>
              {/* Profile Photo */}
              <div className="mb-6">
                <img
                  src="/eileen-photo.jpeg"
                  alt="Eileen Dong"
                  className="w-48 h-48 rounded-full object-cover object-top border-2 border-slate-700 shadow-lg"
                />
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
                <a href="/">Eileen Dong</a>
              </h1>
              <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
                Software Engineer
              </h2>
              <p className="mt-4 max-w-xs leading-normal text-slate-400">
                I’m most interested in the parts of software that support everything else: infrastructure, automation, and security!
              </p>

              {/* Desktop Navigation */}
              <nav className="nav hidden lg:block" aria-label="In-page jump links">
                <ul className="mt-16 w-max">
                  {navItems.map((item) => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase()}`}
                        className={`group flex items-center py-3 ${activeSection === item.toLowerCase() ? "active" : ""
                          }`}
                      >
                        <span
                          className={`nav-indicator mr-4 h-px transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none ${activeSection === item.toLowerCase()
                              ? "w-16 bg-slate-200"
                              : "w-8 bg-slate-600"
                            }`}
                        />
                        <span
                          className={`nav-text text-xs font-bold uppercase tracking-widest group-hover:text-slate-200 group-focus-visible:text-slate-200 ${activeSection === item.toLowerCase()
                              ? "text-slate-200"
                              : "text-slate-500"
                            }`}
                        >
                          {item}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Social Links */}
            <ul className="ml-1 mt-8 flex items-center gap-5" aria-label="Social media">
              <li>
                <a
                  href="https://github.com/eileendong"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-slate-200 transition-colors"
                  aria-label="GitHub (opens in new tab)"
                >
                  <Github className="h-6 w-6" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/eileen-dong-459187136/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-slate-200 transition-colors"
                  aria-label="LinkedIn (opens in new tab)"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:eileendong1@gmail.com"
                  className="block hover:text-slate-200 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="h-6 w-6" />
                </a>
              </li>
            </ul>
          </header>

          {/* Mobile Navigation */}
          <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
            <div className="flex items-center justify-between px-6 py-4">
              <span className="font-bold text-slate-200">ED</span>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.nav
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-slate-800 overflow-hidden"
                >
                  <ul className="py-4 px-6 space-y-2">
                    {navItems.map((item) => (
                      <li key={item}>
                        <a
                          href={`#${item.toLowerCase()}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-2 text-slate-400 hover:text-slate-200 transition-colors"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.nav>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column - Main Content */}
          <main id="content" className="pt-24 lg:w-1/2 lg:py-24">
            {/* About Section */}
            <section
              id="about"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
              aria-label="About me"
            >
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                  About
                </h2>
              </div>

              <div className="space-y-4">
                <p>
                  I&apos;m a software engineer passionate about building <span className="text-slate-200 font-medium">reliable systems at scale</span>.
                  Currently studying Computer Science at the <span className="text-slate-200 font-medium">University of Washington 2027</span>,
                  I specialize in DevOps, backend development, and cloud infrastructure.
                </p>

                <p>
                  This summer, I&apos;m joining <a href="https://www.axon.com" className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 transition-colors" target="_blank" rel="noopener noreferrer">Axon</a> as
                  a DevOps Platform intern, where I&apos;ll be building zero-touch automation for infrastructure provisioning.
                  Previously at <a href="https://www.heb.com" className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 transition-colors" target="_blank" rel="noopener noreferrer">H-E-B</a>,
                  I shipped a FastAPI microservice handling alerts across 13,000+ servers with 99% delivery reliability.
                </p>

                <p>
                  While I&apos;m not coding, you can find me playing with my cat Pebbles, exploring Seattle&apos;s farmers markets,
                  or cooking way too much food for one person.
                </p>

                {/* Cat photo */}
                <div className="mt-6 flex items-end gap-4">
                  <div>
                    <img
                      src="/images/cat.jpg"
                      alt="Pebbles the cat being petted"
                      className="rounded-lg w-48 h-48 object-cover shadow-lg border border-slate-700/50"
                    />
                    <p className="text-xs text-slate-500 mt-2">Pebbles ^^</p>
                  </div>
                  <a href="/win95/" className="win95-btn" aria-label="View stylized Windows 95 version of this site">
                    <span className="win95-flag" aria-hidden="true" />
                    View Stylized Version
                  </a>
                </div>
              </div>
            </section>

            {/* Experience Section */}
            <section
              id="experience"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
              aria-label="Work experience"
            >
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                  Experience
                </h2>
              </div>

              <div>
                <ol className="group/list">
                  {experiences.map((exp, index) => (
                    <li key={index} className="mb-12">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
                      >
                        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

                        <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                          {exp.period}
                        </header>

                        <div className="z-10 sm:col-span-6">
                          <h3 className="font-medium leading-snug text-slate-200">
                            <div>
                              <a
                                href={exp.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
                              >
                                <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                                <span>
                                  {exp.role} ·{" "}
                                  <span className="inline-block">
                                    {exp.company}
                                    <ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                                  </span>
                                </span>
                              </a>
                            </div>
                            <div className="text-slate-500 text-sm flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3" />
                              {exp.location}
                            </div>
                          </h3>

                          <p className="mt-2 text-sm leading-normal">{exp.description}</p>

                          <ul className="mt-2 flex flex-wrap gap-2" aria-label="Technologies used">
                            {exp.tech.map((t) => (
                              <li key={t}>
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                                  {t}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    </li>
                  ))}
                </ol>

                <div className="mt-12">
                  <a
                    href="https://drive.google.com/file/d/1Zq8XdVQiVLua2d3aVbJX5PMwk8XZ3pGX/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center font-medium leading-tight text-slate-200 group"
                  >
                    <span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
                      View My Resume!
                    </span>
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-2 motion-reduce:transition-none" />
                  </a>
                </div>
              </div>
            </section>

            {/* Projects Section */}
            <section
              id="projects"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
              aria-label="Selected projects"
            >
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                  Projects
                </h2>
              </div>

              <div>
                <ul className="group/list">
                  {projects.map((project, index) => (
                    <li key={index} className="mb-12">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
                      >
                        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

                        <div className="z-10 sm:order-2 sm:col-span-6">
                          <h3>
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
                            >
                              <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                              <span>
                                {project.title}
                                <ExternalLink className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                              </span>
                            </a>
                          </h3>

                          <p className="mt-2 text-sm leading-normal">{project.description}</p>

                          <ul className="mt-2 flex flex-wrap gap-2" aria-label="Technologies used">
                            {project.tech.map((t) => (
                              <li key={t}>
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                                  {t}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="z-10 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2 sm:order-1">
                          {project.year}
                        </div>
                      </motion.div>
                    </li>
                  ))}
                </ul>

                <div className="mt-12">
                  <a
                    href="https://github.com/eileendong"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center font-medium leading-tight text-slate-200 group"
                  >
                    <span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
                      View All Projects on GitHub
                    </span>
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-2 motion-reduce:transition-none" />
                  </a>
                </div>
              </div>
            </section>

            {/* Skills Section */}
            <section
              id="skills"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
              aria-label="Technical skills"
            >
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                  Skills
                </h2>
              </div>

              <div className="space-y-8">
                {skillCategories.map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-sm font-semibold text-slate-200 mb-3">{category.name}</h3>
                    <ul className="flex flex-wrap gap-2" aria-label={`${category.name} skills`}>
                      {category.skills.map((skill) => (
                        <li key={skill}>
                          <div className="flex items-center rounded-full bg-slate-800/80 px-3 py-1 text-xs font-medium leading-5 text-slate-300 border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600 transition-colors">
                            {skill}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Contact Section */}
            <section
              id="contact"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
              aria-label="Contact"
            >
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                  Contact
                </h2>
              </div>

              <div className="space-y-4">
                <p>
                  I&apos;m currently looking for <span className="text-slate-200 font-medium">new grad opportunities</span> starting
                  Summer 2027. If you&apos;re hiring software engineers with experience in DevOps, backend systems, or cloud
                  infrastructure, I&apos;d to get involved!
                </p>

                <p>
                  The best way to reach me is via email at{" "}
                  <a
                    href="mailto:eileendong1@gmail.com"
                    className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 transition-colors"
                  >
                    eileendong1@gmail.com
                  </a>
                  . You can also find me on{" "}
                  <a
                    href="https://www.linkedin.com/in/eileen-dong-459187136/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 transition-colors"
                  >
                    LinkedIn
                  </a>{" "}
                  or{" "}
                  <a
                    href="https://github.com/eileendong"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 transition-colors"
                  >
                    GitHub
                  </a>
                  .
                </p>
              </div>
            </section>

            {/* Footer */}
            <footer className="max-w-md pb-16 text-sm text-slate-500 sm:pb-0">
              <p>
                Designed in{" "}
                <a
                  href="https://www.figma.com/"
                  className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Figma
                </a>{" "}
                and coded in{" "}
                <a
                  href="https://code.visualstudio.com/"
                  className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visual Studio Code
                </a>
                . Built with{" "}
                <a
                  href="https://react.dev/"
                  className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  React
                </a>{" "}
                and{" "}
                <a
                  href="https://tailwindcss.com/"
                  className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tailwind CSS
                </a>
                , deployed with{" "}
                <a
                  href="https://vercel.com/"
                  className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vercel
                </a>
                .
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
