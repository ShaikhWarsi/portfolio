"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Play } from "lucide-react"

interface Project {
  title: string
  description: string
  tech: string
  color: string
}

interface HologramCardProps {
  project: Project
  index: number
}

export default function HologramCard({ project, index }: HologramCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px", amount: 0.3 }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.01 },
        }}
        initial="rest"
        whileHover="hover"
        transition={{ duration: 0.2 }}
      >
        <Card className="relative overflow-hidden bg-black/40 border-cyan-500/30 backdrop-blur-sm h-full">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />

        <motion.div
          className="absolute inset-0 border-2 border-transparent bg-gradient-to-br from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(45deg, transparent, ${project.color.includes("cyan") ? "#00ffff20" : "#ff00ff20"}, transparent)`,
          }}
        />

        <div className="relative z-10 p-6">
          <motion.div
            animate={{
              rotateY: isHovered ? 5 : 0,
              scale: isHovered ? 1.02 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-xl font-bold bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}>
                {project.title}
              </h3>
              <motion.div animate={{ rotate: isHovered ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <Play className="h-5 w-5 text-cyan-400" />
              </motion.div>
            </div>

            <p className="text-gray-300 text-sm mb-4 leading-relaxed">{project.description}</p>

            <div className="flex items-center justify-between">
              <span className="text-xs text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
                {project.tech}
              </span>

              <div className="flex gap-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-cyan-400 hover:bg-cyan-500/10 border border-cyan-500/30"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? "Less" : "More"}
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-purple-400 hover:bg-purple-500/10 border border-purple-500/30"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-cyan-500/30 bg-black/60 backdrop-blur-sm"
            >
              <div className="p-6">
                <h4 className="text-cyan-400 font-semibold mb-3">Project Details</h4>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-green-400">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Version:</span>
                    <span className="text-cyan-400">2.1.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Update:</span>
                    <span className="text-purple-400">2024.01.15</span>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  >
                    Launch Demo
                  </Button>
                  <Button size="sm" variant="outline" className="border-cyan-500/30 text-cyan-400 bg-transparent">
                    View Code
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Holographic effect overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: isHovered
              ? "linear-gradient(45deg, transparent 30%, rgba(0,255,255,0.1) 50%, transparent 70%)"
              : "transparent",
          }}
          transition={{ duration: 0.5 }}
        />
        </Card>
      </motion.div>
    </motion.div>
  )
}
