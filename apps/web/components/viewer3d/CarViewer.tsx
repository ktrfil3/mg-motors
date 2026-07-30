'use client'

import { Suspense, useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, ContactShadows, Html } from '@react-three/drei'
import { RotateCcw, Palette } from 'lucide-react'
import * as THREE from 'three'

// ─── CarViewer — Visualizador 3D ─────────────────────────────────────────────
// Carrega modelo .glb se disponível, caso contrário exibe placeholder geométrico

interface CarViewerProps {
  model3dUrl?: string
  colors: Array<{ name: string; hexCode: string; isPremium?: boolean }>
  vehicleName: string
}

// Componente placeholder quando não há modelo .glb real
function PlaceholderCar({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null)

  // Rotação suave automática
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    metalness: 0.7,
    roughness: 0.3,
  })

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Carroceria principal */}
      <mesh position={[0, 0.5, 0]} material={mat}>
        <boxGeometry args={[3.5, 0.8, 1.8]} />
      </mesh>
      {/* Cabine */}
      <mesh position={[0, 1.1, 0.1]} material={mat}>
        <boxGeometry args={[2, 0.7, 1.6]} />
      </mesh>
      {/* Para-choque dianteiro */}
      <mesh position={[1.9, 0.3, 0]} material={new THREE.MeshStandardMaterial({ color: '#222', metalness: 0.5, roughness: 0.5 })}>
        <boxGeometry args={[0.15, 0.4, 1.8]} />
      </mesh>
      {/* Para-choque traseiro */}
      <mesh position={[-1.9, 0.3, 0]} material={new THREE.MeshStandardMaterial({ color: '#222', metalness: 0.5, roughness: 0.5 })}>
        <boxGeometry args={[0.15, 0.4, 1.8]} />
      </mesh>
      {/* Rodas */}
      {[
        [1.3, 0, 1.0], [1.3, 0, -1.0],
        [-1.3, 0, 1.0], [-1.3, 0, -1.0],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.3, 32]} />
          <meshStandardMaterial color="#111" metalness={0.3} roughness={0.7} />
        </mesh>
      ))}
    </group>
  )
}

// Modelo GLB real (quando disponível)
function GLBModel({ url, color }: { url: string; color: string }) {
  const { scene } = useGLTF(url)

  // Aplica cor à carroceria
  scene.traverse((child: any) => {
    if (child.isMesh && child.name?.toLowerCase().includes('body')) {
      child.material = child.material.clone()
      child.material.color.set(color)
    }
  })

  return <primitive object={scene} scale={1.5} position={[0, -0.5, 0]} />
}

// ─── CarViewer ────────────────────────────────────────────────────────────────

export function CarViewer({ model3dUrl, colors, vehicleName }: CarViewerProps) {
  const [selectedColor, setSelectedColor] = useState(colors[0]?.hexCode || '#1A1A1A')
  const controlsRef = useRef<any>(null)

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset()
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* ─── Canvas 3D ───────────────────────────────────────────── */}
      <div
        className="relative rounded-xl overflow-hidden bg-gradient-to-br from-brand-darker to-brand-dark border border-brand-mid/20"
        style={{ height: '500px' }}
        role="img"
        aria-label={`Visualizador 3D do ${vehicleName}`}
      >
        <Canvas
          camera={{ position: [0, 1.5, 5], fov: 50 }}
          shadows
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
          <directionalLight position={[-5, 3, -5]} intensity={0.5} />
          <pointLight position={[0, 10, 0]} intensity={0.3} color="#E85D04" />

          <Suspense
            fallback={
              <Html center>
                <div className="text-white text-sm font-condensed">Carregando modelo...</div>
              </Html>
            }
          >
            {model3dUrl ? (
              <GLBModel url={model3dUrl} color={selectedColor} />
            ) : (
              <PlaceholderCar color={selectedColor} />
            )}

            <ContactShadows
              position={[0, -0.8, 0]}
              opacity={0.4}
              scale={8}
              blur={2}
              far={4}
              color="#000"
            />

            <Environment preset="city" />
          </Suspense>

          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            minDistance={3}
            maxDistance={10}
            maxPolarAngle={Math.PI / 2.1}
          />
        </Canvas>

        {/* Watermark placeholder */}
        {!model3dUrl && (
          <div className="absolute bottom-4 left-4 text-xs text-brand-muted font-condensed uppercase tracking-wider">
            [Modelo 3D Ilustrativo — substituir pelo asset .glb real]
          </div>
        )}

        {/* Controls overlay */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={resetCamera}
            title="Resetar câmera"
            aria-label="Resetar câmera"
            className="w-9 h-9 glass flex items-center justify-center rounded text-brand-subtle hover:text-accent transition-colors"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* ─── Seletor de cores ─────────────────────────────────────── */}
      <div className="glass rounded-xl p-5">
        <h3 className="text-sm font-bold font-condensed uppercase tracking-wider text-brand-light mb-4 flex items-center gap-2">
          <Palette size={16} className="text-accent" />
          Escolha a Cor
        </h3>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color.hexCode}
              onClick={() => setSelectedColor(color.hexCode)}
              title={color.name}
              aria-label={`Selecionar cor ${color.name}`}
              aria-pressed={selectedColor === color.hexCode}
              className={[
                'relative w-10 h-10 rounded-full transition-all duration-200',
                selectedColor === color.hexCode
                  ? 'ring-2 ring-accent ring-offset-2 ring-offset-brand-darker scale-110'
                  : 'ring-1 ring-brand-mid/40 hover:ring-accent/50 hover:scale-105',
              ].join(' ')}
              style={{ backgroundColor: color.hexCode }}
            />
          ))}
        </div>
        <p className="text-xs text-brand-subtle mt-3">
          Cor selecionada:{' '}
          <span className="text-brand-light font-medium">
            {colors.find(c => c.hexCode === selectedColor)?.name || selectedColor}
          </span>
        </p>
      </div>

      {/* Instrução de interação */}
      <p className="text-xs text-brand-muted text-center">
        Arraste para rotacionar · Scroll para zoom · Duplo clique para resetar
      </p>
    </div>
  )
}
