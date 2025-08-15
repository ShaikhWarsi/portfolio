"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import HologramCard from "@/components/hologram-card"
import { projects } from "@/app/page"

export default function ProjectsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 text-cyan-400 relative z-10">
          ALL PROJECTS
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <HologramCard key={index} project={project} index={index} />
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Button
            onClick={() => window.location.href = '/'}
            className="px-8 py-3 rounded-lg border border-cyan-500/30 backdrop-blur-sm transition-all duration-300 hover:bg-cyan-500/10 hover:text-cyan-400"
          >
            GO BACK
          </Button>
        </div>
      </div>
    </div>
  )
}