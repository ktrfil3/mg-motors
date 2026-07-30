'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Stars } from '@react-three/drei'
import { Suspense } from 'react'
import { CybersterModel } from '@/components/viewer3d/CybersterModel'

interface CybersterViewerProps {
  color: string
}

export default function CybersterViewer({ color }: CybersterViewerProps) {
  return (
    <Canvas
      shadows
      camera={{ position: [4.5, 1.5, 6], fov: 40 }}
      gl={{ antialias: true, alpha: false }}
      style={{ background: '#0A0A0A' }}
    >
      {/* Iluminación premium */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[8, 8, 5]}
        intensity={2.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-6, 4, -4]} intensity={0.8} color="#E85D04" />
      <pointLight position={[0, -0.5, 0]} intensity={1.5} color="#E85D04" distance={4} />
      <spotLight
        position={[0, 8, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1.5}
        castShadow
      />

      <Suspense fallback={null}>
        <CybersterModel color={color} />
        <ContactShadows
          position={[0, -0.36, 0]}
          opacity={0.6}
          scale={8}
          blur={2}
          far={4}
          color="#000000"
        />
        <Stars radius={60} depth={30} count={2000} factor={2} fade />
        <Environment preset="night" />
      </Suspense>

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={12}
        minPolarAngle={Math.PI / 8}
        maxPolarAngle={Math.PI / 2.2}
        autoRotate={false}
        makeDefault
      />
    </Canvas>
  )
}
