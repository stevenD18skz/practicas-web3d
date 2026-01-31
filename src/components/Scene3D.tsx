'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import DebugTools, { DirectionalLightWithHelper, useDebugControls } from '@/components/DebugTools'

import Box from '@/components/models/Box'
import Snoopy from '@/components/models/Snoopy'
import Table from '@/components/models/Table'
import Chair from '@/components/models/Chair'

export default function Scene3D() {
  const { showLightHelpers } = useDebugControls()

  
  const colorFloor = "#5C330A"
  const sizeRoom = 100

  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        shadows
      >
        {/* Debug */}
        <DebugTools />

        {/* Iluminación */}
        <ambientLight intensity={0.5} />

        <DirectionalLightWithHelper
          position={[0, 10, -10]}
          intensity={10}
          color={"#0F9A47"}
          showHelper={showLightHelpers}
        />

        {/* Controles de cámara */}
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={40}
        />

        {/* Entorno/fondo */} 
        <Environment preset="forest" background />

        {/* Suelo y paredes */}
        <group>
          <mesh receiveShadow position={[0, -0.5, 0]}>
            <boxGeometry args={[sizeRoom, 1, sizeRoom]} />
            <meshStandardMaterial color={colorFloor} />
          </mesh>
          <mesh receiveShadow position={[-sizeRoom/2, sizeRoom/2, 0]} rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[sizeRoom, 1, sizeRoom]} />
            <meshStandardMaterial color={colorFloor} />
          </mesh>
          <mesh receiveShadow position={[0, sizeRoom/2, -sizeRoom/2]} rotation={[Math.PI / 2, 0, 0]}>
            <boxGeometry args={[sizeRoom, 1, sizeRoom]} />
            <meshStandardMaterial color={colorFloor} />
          </mesh>
          <mesh receiveShadow position={[0, sizeRoom/2, sizeRoom/2]} rotation={[Math.PI / 2, 0, 0]}>
            <boxGeometry args={[sizeRoom, 1, sizeRoom]} />
            <meshStandardMaterial color={colorFloor} />
          </mesh>
          <mesh receiveShadow position={[sizeRoom/2, sizeRoom/2, 0]} rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[sizeRoom, 1, sizeRoom]} />
            <meshStandardMaterial color={colorFloor} />
          </mesh>
        </group>

        {/* Tu contenido 3D */}
        <Suspense fallback={null}>

          <Box position={[3, 1, 0]} />
          <Snoopy position={[0, 1, 0]} />
          <Table position={[5, 0, 5]} />
          <Chair position={[5, 0, 5]}  rotation={[0, 0, 0]}/>
          <Chair position={[5, 0, 5]}  rotation={[0, Math.PI / 2, 0]}/>
          <Chair position={[5, 0, 5]}  rotation={[0, Math.PI, 0]}/>
          <Chair position={[5, 0, 5]}  rotation={[0, -Math.PI / 2, 0]}/>
        </Suspense>
      </Canvas>
    </div>
  )
}