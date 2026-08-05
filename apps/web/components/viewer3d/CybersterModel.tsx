'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

interface CybersterModelProps {
  color: string
  wireframe?: boolean
}

export function CybersterModel({ color, wireframe = false }: CybersterModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/m_cyberster.glb')

  // Animación de rotación suave
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15
    }
  })

  const clonedScene = useMemo(() => {
    const clone = scene.clone()
    clone.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) {
        const mesh = node as THREE.Mesh
        mesh.castShadow = true
        mesh.receiveShadow = true
        
        // Apply wireframe if requested
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial
          if (wireframe !== undefined) {
             mat.wireframe = wireframe
          }
          // Intenta aplicar el color seleccionado a la pintura principal
          const matName = mat.name.toLowerCase()
          
          // Target robusto: GLTFLoader a veces sanitiza nombres (ej. blinn1.001 -> blinn1_001)
          // La pintura original es roja y usa variaciones de blinn1, blinn11 y blinn8.
          // Evitamos pisar otros materiales grises/verdes como blinn13, blinn14, etc.
          const isTargetBlinn = (matName.includes('blinn1') && !['13','14','16','18','19'].some(n => matName.includes('blinn' + n))) || 
                                matName.includes('blinn8')
                                
          const isPaint = matName.includes('paint') || 
                          matName.includes('body') || 
                          matName.includes('carroceria') ||
                          matName.includes('exterior') ||
                          isTargetBlinn

          if (isPaint) {
            // Utilizamos clone para no modificar el material original compartido
            mesh.material = mat.clone()
            ;(mesh.material as THREE.MeshStandardMaterial).color = new THREE.Color(color)
          }
        }
      }
    })
    return clone
  }, [scene, color, wireframe])

  return (
    <group ref={groupRef} position={[0, -0.8, 0]} scale={1.5}>
      <primitive object={clonedScene} />
    </group>
  )
}

useGLTF.preload('/m_cyberster.glb')
