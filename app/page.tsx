"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, Instagram, Terminal, Sun, Moon } from "lucide-react"
import ParticleBackground from "@/components/particle-background"
import SkillsSphere from "@/components/skills-sphere"
import HologramCard from "@/components/hologram-card"
import AboutMeCard from "@/components/about-me-card"
import { useScrollSpy } from "@/hooks/use-scroll-spy"

export const projects = [
  {
    title: "AxinTweak",
    description:
      "A Windows performance-boosting tool written in batch scripting to optimize system performance and enhance user experience.",
    tech: "Batch Programming",
    color: "from-cyan-400 to-blue-500",
    launchDemo: "https://github.com/ShaikhWarsi/AxinTweak",
    viewCode: "https://github.com/ShaikhWarsi/AxinTweak",
  },

  {
    title: "AI Assist",
    description:
      "A comprehensive personal AI assistant that can write content, code in any language, open applications, search files, and send emails.",
    tech: "Python, NLP",
    color: "from-green-400 to-emerald-500",
    launchDemo: "https://github.com/ShaikhWarsi/JarvisAI",
    viewCode: "https://github.com/ShaikhWarsi/JarvisAI",
  },
  {
    title: "Codevert",
    description:
      "An AI code conversion tool that can transform code between programming languages (e.g., Python to C++, JavaScript to TypeScript).",
    tech: "Python, AI/ML",
    color: "from-yellow-400 to-amber-500",
    viewCode: "https://github.com/ShaikhWarsi/CodeVert/tree/main",
    launchDemo: "https://codevert.vercel.app",
  },
  {
    title: "Dietmaxx",
    description: "An app for finding the best diet based on your day-to-day life.",
    tech: "React Native, AI",
    color: "from-green-500 to-lime-600",
    launchDemo: "https://dietmaxx.vercel.app",
    viewCode: "#",
  },

  {
    title: "CROPIX",
    description:
      "An AI-driven program with 6 ML models to help farmers increase their productivity and efficiency.",
    tech: "Python, AI/ML, FastAPI, Next.js",
    color: "from-green-400 to-lime-500",
    launchDemo: "https://cropixbitlyfe.vercel.app",
    viewCode: "https://github.com/ShaikhWarsi/CROPIX",
  },
  {
    title: "HumanEval",
    description:
      "An advanced cognitive assessment platform featuring neural-based testing protocols and comprehensive brain performance analytics, designed to test and improve various cognitive skills through interactive games and challenges.",
    tech: "Web Development, Cognitive Science, UI/UX",
    color: "from-blue-400 to-purple-500",
    launchDemo: "https://humaneval.vercel.app/",
    viewCode: "https://github.com/ShaikhWarsi/HumanEval",
  },
]

const skills = [
  { name: "Python", level: 95, category: "Programming" },
  { name: "Crypto Analysis", level: 85, category: "Finance" },
  { name: "Batch Programming", level: 90, category: "Scripting" },
  { name: "AI/ML", level: 80, category: "Technology" },
  { name: "Data Analysis", level: 75, category: "Analytics" },
]

export default function Portfolio() {
  const activeSection = useScrollSpy(["home", "projects", "skills", "about-me", "contact"], 200)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [terminalInput, setTerminalInput] = useState("")
  const [showLogo, setShowLogo] = useState(true)
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "> System initialized...",
    "> Welcome to the AI interface",
    '> Type "help" for available commands',
  ])
  
  // Track scroll position to hide logo when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      // Hide logo when scrolled down more than 100px
      setShowLogo(window.scrollY < 100)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleTerminalCommand = (command: string) => {
    const newHistory = [...terminalHistory, `> ${command}`]

    switch (command.toLowerCase()) {
      case "help":
        newHistory.push("Available commands: about, projects, skills, contact, clear")
        break
      case "about":
        scrollToSection("about")
        break
      case "projects":
        window.location.href = '/projects'
        break
      case "skills":
        scrollToSection("skills")
        break
      case "contact":
        scrollToSection("contact")
        break
      case "clear":
        setTerminalHistory(["> Terminal cleared"])
        setTerminalInput("")
        return
      default:
        newHistory.push('Command not recognized. Type "help" for available commands.')
    }

    setTerminalHistory(newHistory)
    setTerminalInput("")
  }

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) return null

  return (
    <>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ParticleBackground />

        {/* Logo - Fixed at top left, hidden on scroll */}
        <div className={`fixed top-0 left-0 z-50 p-6 pointer-events-none transition-opacity duration-300 ${showLogo ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent pointer-events-auto">
            AI DEV
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-40 p-6">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="invisible text-2xl font-bold">AI DEV</div>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex gap-6">
                {["home", "projects", "skills", "about-me", "contact"].map((section) => (
                  <button
                    key={section}
                    onClick={() => section === 'projects-page' ? window.location.href = '/projects' : scrollToSection(section)}
                    className={`px-4 py-2 rounded-lg border border-cyan-500/30 backdrop-blur-sm transition-all duration-300 ${
                      activeSection === section
                        ? "bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/25"
                        : "hover:bg-cyan-500/10 hover:text-cyan-400"
                    }`}
                  >
                    {section.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="border border-cyan-500/30 hover:bg-cyan-500/10"
                >
                  {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTerminalOpen(!terminalOpen)}
                  className="border border-cyan-500/30 hover:bg-cyan-500/10"
                >
                  <Terminal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Terminal */}
          {terminalOpen && (
            <div
              className="fixed top-20 right-6 w-96 h-64 bg-black/90 border border-cyan-500/30 rounded-lg backdrop-blur-sm z-40 p-4"
            >
              <div className="h-full flex flex-col">
                <div className="flex-1 overflow-y-auto text-sm font-mono text-green-400 mb-2">
                  {terminalHistory.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
                <div className="flex items-center text-sm font-mono">
                  <span className="text-cyan-400 mr-2">{">"}</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleTerminalCommand(terminalInput)
                      }
                    }}
                    className="flex-1 bg-transparent outline-none text-green-400"
                    placeholder="Enter command..."
                  />
                </div>
              </div>
            </div>
          )}


        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center relative">
          <div className="text-center z-10">
            <div
              className="mb-8"
            >
              <h1 className="text-6xl md:text-8xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  SHAIKH
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                  WARSI
                </span>
              </h1>
              <p
                className="text-xl md:text-2xl text-gray-300 mb-8"
              >
                Back End DEV • AI Specialist • Crypto Analyst
              </p>
            </div>

            <div
              className="flex flex-wrap justify-center gap-4"
            >
              <Button
                onClick={() => scrollToSection("projects")}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg shadow-lg shadow-cyan-500/25"
              >
                View Projects
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                variant="outline"
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-8 py-3 rounded-lg"
              >
                Contact Me
              </Button>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-cyan-400 relative z-10">
              PROJECT ARCHIVE
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {projects.filter(project => project.title !== "Exam AI" && project.title !== "MovieRec AI").map((project, index) => (
                <HologramCard key={index} project={project} index={index} />
              ))}
            </div>
            <div className="flex justify-center mt-12">
              <Button
                onClick={() => window.location.href = '/projects'}
                className="px-8 py-3 rounded-lg border border-cyan-500/30 backdrop-blur-sm transition-all duration-300 hover:bg-cyan-500/10 hover:text-cyan-400"
              >
                VIEW MORE PROJECTS
              </Button>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-purple-400 relative z-10">
              AI CAPABILITIES
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="h-96">
                <SkillsSphere skills={skills} />
              </div>

              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className="bg-black/40 border border-cyan-500/30 rounded-lg p-4 backdrop-blur-sm"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-semibold text-cyan-400">{skill.name}</span>
                      <span className="text-sm text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section id="about-me" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <AboutMeCard cgpa={8.2} year="second" githubAuthor="ShaikhWarsi" />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-orange-400 relative z-10">
              ESTABLISH CONNECTION
            </h2>

            <div className="flex flex-col items-center w-full">
              <div className="space-y-6 w-full max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-purple-400 mb-6 relative z-10"></h3>

                <div className="flex justify-center space-x-4 w-full mx-auto">
                  {[{"icon":Github,"label":"GitHub","href":"https://github.com/ShaikhWarsi"},
                    {"icon":Linkedin,"label":"LinkedIn","href":"https://www.linkedin.com/in/shaikh-mohammad-warsi-141532271/"},
                    {"icon":Mail,"label":"Email","href":"mailto:yollotemp@gmail.com"},
                    {"icon":Instagram,"label":"Instagram","href":"https://www.instagram.com/shaikh_warsi7/"},
                  ].map((social, index) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="flex flex-col items-center p-4 bg-black/40 border border-purple-500/30 rounded-lg backdrop-blur-sm hover:bg-purple-500/10 transition-all duration-300 hover:scale-105"
                    >
                      <social.icon className="h-6 w-6 text-purple-400 mb-2" />
                      <span className="text-white text-sm font-medium">{social.label}</span>
                    </a>
                  ))}

                </div>
                <div className="mt-8 p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/20">
                  <h4 className="text-lg font-bold text-orange-400 mb-2 relative z-10">Status: Online</h4>
                  <p className="text-gray-300 text-sm">
                    AI interface active. Ready to collaborate on your next project.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-cyan-500/20">

          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-400">© Vit 2028 • Btech in CSE with specialization in AI/ML</p>

          </div>
        </footer>
      </div>
    </>
  )
}
