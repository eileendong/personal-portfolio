import { useState, useEffect, useRef } from "react";
import type { FC } from "react";
// Per-icon imports keep the bundle small (avoids pulling all ~1950 icons)
import { Computer } from "@react95/icons/Computer";
import { FolderExe } from "@react95/icons/FolderExe";
import { Folder } from "@react95/icons/Folder";
import { Settings } from "@react95/icons/Settings";
import { Mail } from "@react95/icons/Mail";
import { FileText } from "@react95/icons/FileText";
import { Globe } from "@react95/icons/Globe";
import { Camera } from "@react95/icons/Camera";
import "./index.css";

type IconProps = { variant?: string; className?: string; style?: React.CSSProperties };
type IconType = FC<IconProps>;

/* ----------------------------- Résumé data ----------------------------- */

const experiences = [
  {
    period: "Jun – Aug 2026",
    role: "Software Engineer Intern",
    company: "Axon",
    companyUrl: "https://www.axon.com",
    location: "Seattle, WA",
    description:
      "Built Kubernetes-based ephemeral preview environments that give every pull request an isolated, live HTTPS gateway — 41 PRs across 148 automated deployments. Designed a controllerless GitOps architecture (GitHub Actions, OCI Helm charts, ArgoCD). Hardened execution of unreviewed PR code with Istio TLS termination, Kyverno policy enforcement, and FIPS crypto.",
    tech: ["Kubernetes", "ArgoCD", "GitOps", "Helm", "Istio"],
  },
  {
    period: "Jun – Aug 2025",
    role: "Software Engineer Intern",
    company: "H-E-B",
    companyUrl: "https://www.heb.com",
    location: "Austin, TX",
    description:
      "Replaced a legacy hardware alerting pipeline with a FastAPI microservice covering 13,000+ servers at 99% delivery reliability, averting $300K+ in outage cost per incident. Migrated transport from SNMP/UDP to HTTP POST/TCP; instrumented the fleet with Docker, Kubernetes, Prometheus, OpenTelemetry, and Grafana.",
    tech: ["FastAPI", "Docker", "Kubernetes", "Prometheus", "OpenTelemetry"],
  },
  {
    period: "Jan 2024 – Present",
    role: "Student IT Technician",
    company: "University of Washington",
    companyUrl: "https://www.washington.edu",
    location: "Seattle, WA",
    description:
      "Automated device imaging and inventory across Windows, macOS, and Linux, cutting setup time 40% while resolving 400+ issues. Trained 5 technicians and standardized documentation.",
    tech: ["Windows", "macOS", "Linux", "Automation"],
  },
  {
    period: "2022 – 2023",
    role: "Software Engineer, then Research Intern",
    company: "Southwest Research Institute",
    companyUrl: "https://www.swri.org",
    location: "San Antonio, TX",
    description:
      "Rewrote a CLI fluid thermodynamics simulator as a React app with CSV export, cutting engine-test setup from minutes to seconds for 40+ engineers. Processed and digitized telemetry for NASA's Europa Clipper mission.",
    tech: ["React", "Python", "NASA"],
  },
];

const projects = [
  {
    title: "Automated Windows Workstation Deployment",
    description:
      "Ansible-driven bare-metal deployment integrating with Microsoft Deployment Toolkit and PXE boot. Eliminates 20+ manual steps; installs 20+ enterprise apps as Infrastructure as Code.",
    tech: ["Ansible", "PowerShell", "WinRM", "IaC"],
    github: "https://github.com/eileendong/bare-metal-provisioning",
    year: "2026",
  },
  {
    title: "Roomies",
    description:
      "React + AWS Amplify expense-splitting app using Cognito, Lambda, Textract, S3, and DynamoDB. Parses receipts into itemized splits with real-time event-driven sync.",
    tech: ["React", "AWS", "Lambda", "DynamoDB"],
    github: "https://github.com/eileendong/roomies",
    year: "2025",
  },
  {
    title: "Dub-Grind",
    description:
      "AI study-assistant Discord bot built with LangChain, LlamaIndex, and the OpenAI API. Summarizes lecture transcripts and generates adaptive quizzes from retrieval-indexed material.",
    tech: ["Python", "LangChain", "LlamaIndex", "OpenAI"],
    github: "https://github.com/eileendong/dub-grind2",
    year: "2025",
  },
];

const skillCategories = [
  { name: "Languages", skills: ["Java", "Go", "Python", "JavaScript", "C", "C++", "SQL", "Bash", "YAML"] },
  { name: "Containers & Orchestration", skills: ["Docker", "Kubernetes", "Helm", "Istio", "Envoy", "Kyverno", "cert-manager", "RBAC"] },
  { name: "CI/CD, GitOps & IaC", skills: ["ArgoCD", "GitHub Actions", "GitLab CI/CD", "Terraform", "Ansible", "Git"] },
  { name: "Cloud Platforms", skills: ["Azure (AKS, ACR, Key Vault)", "AWS (Lambda, S3, DynamoDB, Cognito)", "Linux"] },
  { name: "Backend & Distributed", skills: ["FastAPI", "REST", "Node.js", "React", "Temporal", "Redis", "OAuth 2.0", "mTLS"] },
  { name: "Observability & AI", skills: ["Prometheus", "Grafana", "OpenTelemetry", "Claude", "MCP", "LangChain", "OpenAI"] },
];

/* ----------------------------- Window model ----------------------------- */

type WinId = "about" | "experience" | "projects" | "skills" | "contact" | "pebbles";

interface WinDef {
  id: WinId;
  title: string;
  x: number;
  y: number;
  w: number;
  // Windows default to open on load; set false to require a desktop double-click.
  autoOpen?: boolean;
}

// Overlapping desktop layout — windows spread across the desktop, each showing.
const WINDOWS: WinDef[] = [
  { id: "about", title: "About Me — Properties", x: 70, y: 20, w: 400 },
  { id: "experience", title: "Experience — Explorer", x: 500, y: 34, w: 540 },
  { id: "projects", title: "Projects — Explorer", x: 150, y: 250, w: 470 },
  { id: "skills", title: "Skills — Explorer", x: 700, y: 300, w: 300 },
  { id: "contact", title: "New Message", x: 320, y: 360, w: 400 },
  { id: "pebbles", title: "pebbles.jpg — Preview", x: 260, y: 120, w: 380, autoOpen: false },
];

// Draw order (last = topmost).
const INITIAL_Z: WinId[] = ["about", "experience", "projects", "skills", "contact"];

// Authentic Win95 icon per window (react95).
const WIN_ICON: Record<WinId, IconType> = {
  about: Computer as unknown as IconType,
  experience: FolderExe as unknown as IconType,
  projects: Folder as unknown as IconType,
  skills: Settings as unknown as IconType,
  contact: Mail as unknown as IconType,
  pebbles: Camera as unknown as IconType,
};

// Per-window "app-style" menu bars (visual only) — sells the different-app look.
const MENU_BARS: Record<WinId, string[]> = {
  about: ["File", "Edit", "View", "Help"],
  experience: ["File", "Edit", "View", "Tools", "Help"],
  projects: ["File", "Edit", "View", "Go", "Favorites"],
  skills: ["File", "Edit", "View", "Tools", "Help"],
  contact: ["File", "Edit", "View", "Insert", "Format"],
  pebbles: ["File", "Edit", "View", "Help"],
};

const RESUME_URL = "/Eileen_Dong_Resume.pdf";

export default function App() {
  const [positions, setPositions] = useState<Record<WinId, { x: number; y: number }>>(
    () => Object.fromEntries(WINDOWS.map((w) => [w.id, { x: w.x, y: w.y }])) as Record<WinId, { x: number; y: number }>
  );
  const [zOrder, setZOrder] = useState<WinId[]>(INITIAL_Z);
  const [openIds, setOpenIds] = useState<Set<WinId>>(
    () => new Set(WINDOWS.filter((w) => w.autoOpen !== false).map((w) => w.id))
  );
  const [minimized, setMinimized] = useState<Set<WinId>>(() => new Set());
  const [maximized, setMaximized] = useState<Set<WinId>>(() => new Set());
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [startOpen, setStartOpen] = useState(false);
  const [clock, setClock] = useState("");

  const drag = useRef<{ id: WinId; dx: number; dy: number } | null>(null);

  /* Live taskbar clock */
  useEffect(() => {
    const tick = () =>
      setClock(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    tick();
    const t = setInterval(tick, 15000);
    return () => clearInterval(t);
  }, []);

  /* Global drag handlers */
  useEffect(() => {
    const move = (e: MouseEvent) => {
      const s = drag.current;
      if (!s) return;
      setPositions((p) => ({
        ...p,
        [s.id]: { x: Math.max(0, e.clientX - s.dx), y: Math.max(0, e.clientY - s.dy) },
      }));
    };
    const up = () => (drag.current = null);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  const bringToFront = (id: WinId) =>
    setZOrder((z) => [...z.filter((x) => x !== id), id]);

  const openWindow = (id: WinId) => {
    setOpenIds((s) => new Set(s).add(id));
    setMinimized((s) => {
      const n = new Set(s);
      n.delete(id);
      return n;
    });
    bringToFront(id);
    setStartOpen(false);
  };

  const closeWindow = (id: WinId) =>
    setOpenIds((s) => {
      const n = new Set(s);
      n.delete(id);
      return n;
    });

  const minimizeWindow = (id: WinId) =>
    setMinimized((s) => new Set(s).add(id));

  const toggleMaximize = (id: WinId) =>
    setMaximized((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  // Taskbar click: restore if minimized, raise if in the background, else minimize.
  const onTaskClick = (id: WinId) => {
    if (minimized.has(id)) {
      openWindow(id);
    } else if (zOrder[zOrder.length - 1] !== id) {
      bringToFront(id);
    } else {
      minimizeWindow(id);
    }
  };

  const startDrag = (id: WinId) => (e: React.MouseEvent) => {
    bringToFront(id);
    const pos = positions[id];
    drag.current = { id, dx: e.clientX - pos.x, dy: e.clientY - pos.y };
  };

  const zIndexOf = (id: WinId) => 10 + zOrder.indexOf(id);

  return (
    <>
      <div
        className="desktop"
        onMouseDown={() => {
          setStartOpen(false);
          setSelectedIcon(null);
        }}
      >
        {/* -------- Desktop icons: single-click selects, double-click opens -------- */}
        <div className="desk-icons">
          {WINDOWS.map((w) => {
            const Icon = WIN_ICON[w.id];
            return (
              <button
                key={w.id}
                className={`desk-icon ${selectedIcon === w.id ? "selected" : ""}`}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={() => setSelectedIcon(w.id)}
                onDoubleClick={() => openWindow(w.id)}
                title={`Double-click to open ${titleForIcon(w.id)}`}
              >
                <span className="glyph" aria-hidden>
                  <Icon variant="32x32_4" />
                </span>
                <span className="label">{titleForIcon(w.id)}</span>
              </button>
            );
          })}
          <button
            className={`desk-icon ${selectedIcon === "resume" ? "selected" : ""}`}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => setSelectedIcon("resume")}
            onDoubleClick={() => window.open(RESUME_URL, "_blank")}
            title="Double-click to open résumé (PDF)"
          >
            <span className="glyph" aria-hidden>
              <FileText variant="32x32_4" />
            </span>
            <span className="label">Resume.pdf</span>
          </button>
        </div>

        {/* -------- Windows -------- */}
        {WINDOWS.filter((w) => openIds.has(w.id) && !minimized.has(w.id)).map((w) => {
          const Icon = WIN_ICON[w.id];
          return (
          <div
            key={w.id}
            className={`window win ${maximized.has(w.id) ? "maximized" : ""}`}
            style={
              maximized.has(w.id)
                ? { zIndex: zIndexOf(w.id) }
                : {
                    left: positions[w.id].x,
                    top: positions[w.id].y,
                    width: w.w,
                    zIndex: zIndexOf(w.id),
                  }
            }
            onMouseDown={() => bringToFront(w.id)}
          >
            <div
              className="title-bar"
              onMouseDown={maximized.has(w.id) ? undefined : startDrag(w.id)}
              onDoubleClick={() => toggleMaximize(w.id)}
            >
              <div className="title-bar-text">
                <Icon variant="16x16_4" />
                {w.title}
              </div>
              <div className="title-bar-controls">
                <button aria-label="Minimize" onMouseDown={(e) => e.stopPropagation()} onClick={() => minimizeWindow(w.id)} />
                <button
                  aria-label={maximized.has(w.id) ? "Restore" : "Maximize"}
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={() => toggleMaximize(w.id)}
                />
                <button aria-label="Close" onMouseDown={(e) => e.stopPropagation()} onClick={() => closeWindow(w.id)} />
              </div>
            </div>
            <div className="menu-bar">
              {MENU_BARS[w.id].map((m) => (
                <span key={m} className="menu-item">
                  <u>{m[0]}</u>
                  {m.slice(1)}
                </span>
              ))}
            </div>
            <div className="window-body win-body-scroll">{renderBody(w.id)}</div>
          </div>
          );
        })}
      </div>

      {/* -------- Start menu -------- */}
      {startOpen && (
        <div className="start-menu window" onMouseDown={(e) => e.stopPropagation()}>
          <div className="rail">Eileen&nbsp;98</div>
          <ul>
            {WINDOWS.map((w) => {
              const Icon = WIN_ICON[w.id];
              return (
                <li key={w.id}>
                  <a href={`#${w.id}`} onClick={(e) => { e.preventDefault(); openWindow(w.id); }}>
                    <Icon variant="16x16_4" /> {titleForIcon(w.id)}
                  </a>
                </li>
              );
            })}
            <li>
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                <FileText variant="16x16_4" /> Résumé.pdf
              </a>
            </li>
            <li>
              <a href="https://github.com/eileendong" target="_blank" rel="noopener noreferrer">
                <Globe variant="16x16_4" /> GitHub
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/eileen-dong-459187136/" target="_blank" rel="noopener noreferrer">
                <Globe variant="16x16_4" /> LinkedIn
              </a>
            </li>
          </ul>
        </div>
      )}

      {/* -------- Taskbar -------- */}
      <div className="taskbar">
        <button
          className="start-btn"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => setStartOpen((s) => !s)}
          aria-expanded={startOpen}
        >
          <span className="win-flag" aria-hidden /> Start
        </button>
        <div className="tasks">
          {WINDOWS.filter((w) => openIds.has(w.id)).map((w) => {
            const isFront = !minimized.has(w.id) && zOrder[zOrder.length - 1] === w.id;
            const Icon = WIN_ICON[w.id];
            return (
              <button
                key={w.id}
                className={`task ${isFront ? "active" : ""}`}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={() => onTaskClick(w.id)}
              >
                <Icon variant="16x16_4" /> {titleForIcon(w.id)}
              </button>
            );
          })}
        </div>
        <a href="/" className="task" title="Back to the regular site">
          <Globe variant="16x16_4" /> Simple Version
        </a>
        <div className="tray" title="Open to New Grad SWE roles · 2027">
          {clock}
        </div>
      </div>
    </>
  );
}

/* ----------------------------- Helpers ----------------------------- */

function titleForIcon(id: WinId): string {
  switch (id) {
    case "about":
      return "About Me";
    case "experience":
      return "Experience";
    case "projects":
      return "Projects";
    case "skills":
      return "Skills";
    case "contact":
      return "Contact";
    case "pebbles":
      return "Pebbles";
  }
}

function renderBody(id: WinId) {
  switch (id) {
    case "about":
      return <AboutBody />;
    case "experience":
      return <ExperienceBody />;
    case "projects":
      return <ProjectsBody />;
    case "skills":
      return <SkillsBody />;
    case "contact":
      return <ContactBody />;
    case "pebbles":
      return <PebblesBody />;
  }
}

// About → "System Properties" dialog (tabbed)
function AboutBody() {
  const [tab, setTab] = useState<"general" | "details">("general");
  return (
    <div>
      <menu role="tablist">
        <li role="tab" aria-selected={tab === "general"}>
          <a href="#general" onClick={(e) => { e.preventDefault(); setTab("general"); }}>General</a>
        </li>
        <li role="tab" aria-selected={tab === "details"}>
          <a href="#details" onClick={(e) => { e.preventDefault(); setTab("details"); }}>Details</a>
        </li>
      </menu>
      <div className="window" role="tabpanel" style={{ padding: 14 }}>
        {tab === "general" ? (
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <span className="inset" style={{ flexShrink: 0 }}>
              <img src="/eileen-photo.jpeg" alt="Eileen Dong" width={96} height={96}
                style={{ display: "block", objectFit: "cover", objectPosition: "top" }} />
            </span>
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>
              <p style={{ margin: 0, fontWeight: "bold", fontSize: 15 }}>Eileen Dong</p>
              <p style={{ margin: "0 0 8px" }}>Software Engineer</p>
              <hr />
              <p style={{ margin: "8px 0 0" }}>Registered to:</p>
              <p style={{ margin: 0 }}>University of Washington</p>
              <p style={{ margin: 0 }}>B.S. Computer Science · 2027</p>
              <hr />
              <p style={{ margin: "8px 0 0" }}>Location: Seattle, WA</p>
              <p style={{ margin: "6px 0 0", color: "#0a6b2f", fontWeight: "bold" }}>
                Open to New Grad SWE roles · 2027
              </p>
            </div>
          </div>
        ) : (
          <div style={{ fontSize: 13, lineHeight: 1.6 }}>
            <p style={{ marginTop: 0 }}>
              Software engineer focused on the parts of software that hold everything
              else up — infrastructure, automation, and security. Most recently built
              Kubernetes-based preview environments at Axon.
            </p>
            <fieldset>
              <legend>Relevant coursework</legend>
              <p style={{ margin: 0 }}>
                Distributed Systems · Computer Security · Databases · Networks ·
                Computer Architecture · Systems Programming · Algorithms · NLP
              </p>
            </fieldset>
            <fieldset style={{ marginTop: 8 }}>
              <legend>Also runs</legend>
              <p style={{ margin: 0 }}>Pebbles the cat · Seattle farmers markets · cooking way too much food for one person</p>
            </fieldset>
          </div>
        )}
      </div>
    </div>
  );
}

// Experience → Explorer "detail" list view
function ExperienceBody() {
  return (
    <div>
      <div className="explorer">
        <div className="exp-cols">
          <span>Name</span>
          <span>Company</span>
          <span>Location</span>
          <span>Date</span>
        </div>
        {experiences.map((exp, i) => (
          <div key={i} className="exp-row">
            <div className="exp-line">
              <span><FileText variant="16x16_4" /> {exp.role}</span>
              <span className="muted">
                <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer">
                  {exp.company}
                </a>
              </span>
              <span className="muted">{exp.location}</span>
              <span className="muted">{exp.period}</span>
            </div>
            <div className="exp-desc">{exp.description}</div>
            <div className="exp-tags">
              {exp.tech.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        ))}
        <p className="statusbar">{experiences.length} object(s)</p>
      </div>
      <div style={{ marginTop: 8 }}>
        <button onClick={() => window.open(RESUME_URL, "_blank")}>Open full résumé</button>
      </div>
    </div>
  );
}

// Projects → Explorer "large icons" folder view with a preview pane
function ProjectsBody() {
  const [sel, setSel] = useState(0);
  const short = ["Bare-Metal Deploy", "Roomies", "Dub-Grind"];
  const p = projects[sel];
  return (
    <div>
      <div className="icon-grid">
        {projects.map((pj, i) => (
          <button
            key={pj.title}
            className={`file-icon ${i === sel ? "selected" : ""}`}
            onClick={() => setSel(i)}
            onDoubleClick={() => window.open(pj.github, "_blank")}
            title={`Double-click to open ${short[i]} on GitHub`}
          >
            <span className="glyph" aria-hidden>
              <Folder variant="32x32_4" />
            </span>
            <span className="fname">{short[i]}</span>
          </button>
        ))}
      </div>
      <fieldset style={{ marginTop: 10 }}>
        <legend>{p.title} · {p.year}</legend>
        <p style={{ margin: "0 0 8px", fontSize: 13, lineHeight: 1.5 }}>{p.description}</p>
        <div className="exp-tags" style={{ marginBottom: 10 }}>
          {p.tech.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
        <button onClick={() => window.open(p.github, "_blank")}>Open on GitHub ↗</button>
      </fieldset>
    </div>
  );
}

// Skills → Explorer folder tree-view
function SkillsBody() {
  return (
    <ul className="tree-view">
      <li>
        <details open>
          <summary><Computer variant="16x16_4" /> Technical Skills</summary>
          <ul>
            {skillCategories.map((c) => (
              <li key={c.name}>
                <details>
                  <summary><Folder variant="16x16_4" /> {c.name}</summary>
                  <ul>
                    {c.skills.map((s) => (
                      <li key={s}><FileText variant="16x16_4" /> {s}</li>
                    ))}
                  </ul>
                </details>
              </li>
            ))}
          </ul>
        </details>
      </li>
    </ul>
  );
}

// Contact → Outlook Express "New Message" compose window
function ContactBody() {
  return (
    <div className="mail">
      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        <button
          className="mail-send"
          onClick={() =>
            (window.location.href =
              "mailto:eileendong1@gmail.com?subject=Let's%20work%20together")
          }
        >
          <Mail variant="16x16_4" /> Send
        </button>
        <button onClick={() => window.open("https://www.linkedin.com/in/eileen-dong-459187136/", "_blank")}>
          LinkedIn
        </button>
        <button onClick={() => window.open("https://github.com/eileendong", "_blank")}>
          GitHub
        </button>
      </div>
      <div className="field-row">
        <label>To:</label>
        <input type="text" readOnly value="eileendong1@gmail.com" />
      </div>
      <div className="field-row">
        <label>Subject:</label>
        <input type="text" readOnly value="Let's work together" />
      </div>
      <div className="inset" style={{ background: "#fff", padding: 10, marginTop: 6, fontSize: 13, lineHeight: 1.5 }}>
        <p style={{ marginTop: 0 }}>Hi Eileen,</p>
        <p>
          I&apos;m reaching out about a New Grad SWE role (Summer 2027) in DevOps,
          backend, or cloud infrastructure. I&apos;d love to chat!
        </p>
        <p style={{ marginBottom: 0, color: "#555" }}>— Click “Send” to open your mail app.</p>
      </div>
      <p className="statusbar" style={{ marginTop: 10 }}>
        © 2026 Eileen Dong · Built with React + 98.css
      </p>
    </div>
  );
}

// Pebbles → full-size photo viewer, opened from the desktop icon
function PebblesBody() {
  return (
    <div>
      <span className="inset" style={{ display: "block", background: "#fff", padding: 4 }}>
        <img
          src="/images/cat.jpg"
          alt="Pebbles the cat"
          style={{ display: "block", width: "100%", height: "auto" }}
        />
      </span>
      <p className="statusbar" style={{ marginTop: 8 }}>Pebbles.jpg</p>
    </div>
  );
}
