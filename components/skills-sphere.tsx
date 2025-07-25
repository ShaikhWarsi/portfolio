"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Text, OrbitControls } from "@react-three/drei"
import { useRef } from "react"
import type * as THREE from "three"

interface Skill {
  name: string
  level: number
  category: string
}

interface SkillsSphereProps {
  skills: Skill[]
}

function SkillNode({ skill, position, index }: { skill: Skill; position: [number, number, number]; index: number }) {
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

  const color =
    skill.category === "Programming"
      ? "#00ffff"
      : skill.category === "Finance"
        ? "#ff00ff"
        : skill.category === "Scripting"
          ? "#00ff00"
          : skill.category === "Technology"
            ? "#ffff00"
            : "#ff8800"

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} transparent opacity={0.8} />
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
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {skill.level}%
        </Text>
      </group>
    </group>
  )
}

function SkillsSphereScene({ skills }: SkillsSphereProps) {
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
        <SkillNode key={skill.name} skill={skill} position={positions[index]} index={index} />
      ))}

      {/* Central core */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
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
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <SkillsSphereScene skills={skills} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
