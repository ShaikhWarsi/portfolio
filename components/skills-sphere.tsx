"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Text, OrbitControls } from "@react-three/drei"
import { useRef, useState, useEffect } from "react"
import { useTheme } from "next-themes"
import type * as THREE from "three"

interface Skill {
  name: string
  level: number
  category: string
}

interface SkillsSphereProps {
  skills: Skill[]
}

function SkillNode({ skill, position, index, isDarkTheme }: { skill: Skill; position: [number, number, number]; index: number; isDarkTheme: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const textRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime + index) * 0.1
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime + index) * 0.1
    }
    if (textRef.current) {
      textRef.current.lookAt(state.camera.position)
    }
  })

  // Define colors based on theme
  const darkThemeColors = {
    Programming: "#00ffff",
    Finance: "#ff00ff",
    Scripting: "#00ff00",
    Technology: "#ffff00",
    default: "#ff8800"
  }
  
  const lightThemeColors = {
    Programming: "#6699cc", // Softer blue
    Finance: "#9966cc",     // Softer purple
    Scripting: "#669966",   // Softer green
    Technology: "#cc9966",  // Softer gold
    default: "#cc8866"      // Softer orange
  }
  
  const colorMap = isDarkTheme ? darkThemeColors : lightThemeColors
  const color = colorMap[skill.category as keyof typeof colorMap] || colorMap.default

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={isDarkTheme ? 0.2 : 0.1} // Reduce intensity in light mode
          transparent 
          opacity={isDarkTheme ? 0.8 : 0.7} // Slightly more transparent in light mode
        />
      </mesh>
      <group ref={textRef}>
        <Text
          position={[0, -0.6, 0]}
          fontSize={0.2}
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          {skill.name}
        </Text>
        <Text
          position={[0, -0.9, 0]}
          fontSize={0.15}
          color={isDarkTheme ? "#ffffff" : "#333333"}
          anchorX="center"
          anchorY="middle"
        >
          {skill.level}%
        </Text>
      </group>
    </group>
  )
}

interface SkillsSphereSceneProps extends SkillsSphereProps {
  isDarkTheme: boolean
}

function SkillsSphereScene({ skills, isDarkTheme }: SkillsSphereSceneProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005
    }
  })

  // Position skills in a sphere formation
  const positions: [number, number, number][] = skills.map((_, index) => {
    const phi = Math.acos(-1 + (2 * index) / skills.length)
    const theta = Math.sqrt(skills.length * Math.PI) * phi
    const radius = 3

    return [radius * Math.cos(theta) * Math.sin(phi), radius * Math.cos(phi), radius * Math.sin(theta) * Math.sin(phi)]
  })

  return (
    <group ref={groupRef}>
      {skills.map((skill, index) => (
        <SkillNode key={skill.name} skill={skill} position={positions[index]} index={index} isDarkTheme={isDarkTheme} />
      ))}

      {/* Central core */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={isDarkTheme ? "#ffffff" : "#333333"}
          emissive={isDarkTheme ? "#ffffff" : "#333333"}
          emissiveIntensity={0.1}
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>
    </group>
  )
}

export default function SkillsSphere({ skills }: SkillsSphereProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // Set mounted state once component mounts
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) return <div className="w-full h-full"></div>
  
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={theme === 'dark' ? 0.5 : 0.4} /> {/* Slightly dimmer in light mode */}
        <pointLight position={[10, 10, 10]} intensity={theme === 'dark' ? 1 : 0.8} /> {/* Slightly dimmer in light mode */}
        <SkillsSphereScene skills={skills} isDarkTheme={theme === 'dark'} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
