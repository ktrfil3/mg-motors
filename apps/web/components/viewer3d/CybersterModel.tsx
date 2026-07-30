'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ─── MG Cyberster — Modelo 3D Geométrico Premium ──────────────────────────────
// Roadster deportivo eléctrico: perfil bajo, capota descapotable, puertas tijera
// Este modelo geométrico estilizado captura la silueta del Cyberster

interface CybersterModelProps {
  color: string
  wireframe?: boolean
}

export function CybersterModel({ color, wireframe = false }: CybersterModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const wheelRefs = useRef<THREE.Mesh[]>([])

  // Animación de rotación suave
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15
    }
    wheelRefs.current.forEach((wheel) => {
      if (wheel) wheel.rotation.x += delta * 2
    })
  })

  const carMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    metalness: 0.85,
    roughness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    wireframe,
  }), [color, wireframe])

  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#88CCFF'),
    metalness: 0.1,
    roughness: 0.0,
    transparent: true,
    opacity: 0.3,
    transmission: 0.8,
  }), [])

  const darkMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#111111'),
    roughness: 0.8,
  }), [])

  const accentMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#E85D04'),
    emissive: new THREE.Color('#E85D04'),
    emissiveIntensity: 0.5,
  }), [])

  const chromeMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#CCCCCC'),
    metalness: 1.0,
    roughness: 0.05,
  }), [])

  const wheelPositions: [number, number, number][] = [
    [-0.85, -0.25, 1.15],
    [0.85, -0.25, 1.15],
    [-0.85, -0.25, -1.05],
    [0.85, -0.25, -1.05],
  ]

  return (
    <group ref={groupRef} position={[0, 0, 0]}>

      {/* ── Chasis / Piso ────────────────────────────────────── */}
      <mesh position={[0, -0.22, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.55, 0.12, 3.2]} />
        <primitive object={darkMat} attach="material" />
      </mesh>

      {/* ── Carrocería principal (cuerpo bajo del roadster) ── */}
      <mesh position={[0, -0.02, 0.05]} castShadow>
        <boxGeometry args={[1.5, 0.32, 3.0]} />
        <primitive object={carMat} attach="material" />
      </mesh>

      {/* ── Frente afilado / morro largo ─────────────────── */}
      <mesh position={[0, 0.02, 1.6]} castShadow>
        <boxGeometry args={[1.3, 0.28, 0.4]} />
        <primitive object={carMat} attach="material" />
      </mesh>

      {/* ── Punta del morro (aerodinámica) ─────────────────── */}
      <mesh position={[0, -0.02, 1.88]}>
        <boxGeometry args={[1.1, 0.2, 0.2]} />
        <primitive object={carMat} attach="material" />
      </mesh>

      {/* ── Cabina (perfil cupé bajo convertible) ─────────── */}
      <mesh position={[0, 0.26, -0.15]} castShadow>
        <boxGeometry args={[1.35, 0.36, 1.5]} />
        <primitive object={carMat} attach="material" />
      </mesh>

      {/* ── Parabrisas delantero (muy inclinado) ─────────── */}
      <mesh position={[0, 0.35, 0.65]} rotation={[Math.PI / 4.5, 0, 0]}>
        <planeGeometry args={[1.2, 0.55]} />
        <primitive object={glassMat} attach="material" />
      </mesh>

      {/* ── Techo descapotable (capota plegada) ───────────── */}
      <mesh position={[0, 0.48, -0.25]}>
        <boxGeometry args={[1.2, 0.08, 0.9]} />
        <primitive object={darkMat} attach="material" />
      </mesh>

      {/* ── Trasera fastback ───────────────────────────────── */}
      <mesh position={[0, 0.12, -1.5]}>
        <boxGeometry args={[1.4, 0.36, 0.5]} />
        <primitive object={carMat} attach="material" />
      </mesh>

      {/* ── Difusor trasero ────────────────────────────────── */}
      <mesh position={[0, -0.2, -1.72]}>
        <boxGeometry args={[1.3, 0.12, 0.15]} />
        <primitive object={darkMat} attach="material" />
      </mesh>

      {/* ── Alerones laterales aerodinámicos ──────────────── */}
      {([-0.75, 0.75] as number[]).map((x, i) => (
        <mesh key={i} position={[x, 0.05, 0.0]}>
          <boxGeometry args={[0.04, 0.45, 2.8]} />
          <primitive object={carMat} attach="material" />
        </mesh>
      ))}

      {/* ── Luces traseras LED (línea horizontal continua) ── */}
      <mesh position={[0, 0.1, -1.77]}>
        <boxGeometry args={[1.35, 0.04, 0.04]} />
        <primitive object={accentMat} attach="material" />
      </mesh>

      {/* ── Faros delanteros LED ─────────────────────────── */}
      {([-0.55, 0.55] as number[]).map((x, i) => (
        <mesh key={i} position={[x, 0.04, 1.84]}>
          <boxGeometry args={[0.28, 0.06, 0.04]} />
          <primitive object={accentMat} attach="material" />
        </mesh>
      ))}

      {/* ── Logo MG frontal ─────────────────────────────── */}
      <mesh position={[0, 0.0, 1.9]}>
        <boxGeometry args={[0.28, 0.12, 0.03]} />
        <primitive object={chromeMat} attach="material" />
      </mesh>

      {/* ── Spoiler trasero ──────────────────────────────── */}
      <mesh position={[0, 0.52, -1.1]}>
        <boxGeometry args={[1.2, 0.04, 0.18]} />
        <primitive object={carMat} attach="material" />
      </mesh>

      {/* ── Ruedas (4) ───────────────────────────────────── */}
      {wheelPositions.map((pos, i) => (
        <group key={i} position={pos}>
          {/* Neumático */}
          <mesh
            ref={(el) => { if (el) wheelRefs.current[i] = el }}
            rotation={[Math.PI / 2, 0, 0]}
            castShadow
          >
            <torusGeometry args={[0.28, 0.11, 16, 32]} />
            <primitive object={darkMat} attach="material" />
          </mesh>
          {/* Llanta */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.08, 20]} />
            <primitive object={chromeMat} attach="material" />
          </mesh>
          {/* Disco de freno */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.16, 0.16, 0.04, 16]} />
            <primitive object={accentMat} attach="material" />
          </mesh>
          {/* Radios */}
          {[0, 1, 2, 3, 4].map((j) => (
            <mesh
              key={j}
              rotation={[Math.PI / 2, (j * Math.PI * 2) / 5, 0]}
            >
              <boxGeometry args={[0.025, 0.28, 0.025]} />
              <primitive object={chromeMat} attach="material" />
            </mesh>
          ))}
        </group>
      ))}

      {/* ── Puertas tipo tijera (abiertas / efecto visual) ── */}
      {([-0.78, 0.78] as number[]).map((x, i) => (
        <group key={i} position={[x, 0.12, 0.22]} rotation={[0, 0, i === 0 ? -0.3 : 0.3]}>
          <mesh position={[i === 0 ? -0.06 : 0.06, 0.22, 0]}>
            <boxGeometry args={[0.04, 0.55, 1.0]} />
            <primitive object={carMat} attach="material" />
          </mesh>
        </group>
      ))}

      {/* ── Sombra / suelo reflejo ─────────────────────── */}
      <mesh position={[0, -0.35, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.8, 4.5]} />
        <meshStandardMaterial color="#050505" transparent opacity={0.4} />
      </mesh>
    </group>
  )
}
