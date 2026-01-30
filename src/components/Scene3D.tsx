'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Grid } from '@react-three/drei'
import { Suspense } from 'react'
import Box from '@/components/models/Box'
import Snoopy from '@/components/models/Snoopy'
import * as THREE from 'three'

export default function Scene3D() {
  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        shadows
      >
        <primitive object={new THREE.AxesHelper(5)} />
        {/* Iluminación */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1}
          castShadow
        />
        
        {/* Controles de cámara */}
        <OrbitControls 
          enableDamping 
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={20}
        />
        
        {/* Grid de referencia */}
        <Grid args={[10, 10]} />
        
        {/* Entorno/fondo */}
        <Environment preset="sunset" />
        
        {/* Tu contenido 3D */}
        <Suspense fallback={null}>
          <Box position={[3, 1, 0]} />
          <Snoopy position={[0, 1, 0]} />
        </Suspense>
      </Canvas>
    </div>
  )
}