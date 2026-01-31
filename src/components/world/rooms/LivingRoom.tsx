'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Suspense, useMemo } from 'react'
import DebugTools, { DirectionalLightWithHelper, SpotLightWithHelper, useDebugControls } from '@/components/DebugTools'
import { Object3D, RepeatWrapping } from 'three'
import { useTexture } from '@react-three/drei'

import Box from '@/components/Box'
import Snoopy from '@/components/pets/Snoopy'
import Table from '@/components/furniture/Table'
import Chair from '@/components/furniture/Chair'
import Window from '@/components/furniture/Window'

import Floor from '@/components/world/Floor'

export default function Scene3D() {
  const { showLightHelpers } = useDebugControls()

 

  const colorFloor = "#5C330A"
  const sizeRoom = 100


  // useMemo evita que se cree un nuevo Object3D en cada render
  const target = useMemo(() => new Object3D(), []);

  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        shadows
      >
        {/* Debug */}
        <DebugTools />

        {/* Iluminación */}
        
        

        <spotLight
          color={"white"}
          position={[-10, 4, 0]}
          intensity={20}
          distance={80}
          decay={0.5}
          angle={Math.PI / 4}
          penumbra={1}
          target={target} 
          castShadow
        />

        <primitive object={target} position={[0, 0, 0]} />

        {/* Controles de cámara */}
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={40}
        />

        {/* Entorno/fondo  */}
        <Environment preset="forest" background />

        {/* Suelo y paredes */}
        <group>
           
          <Floor size={sizeRoom} />
          <mesh receiveShadow position={[-sizeRoom / 2, sizeRoom / 2, 0]} rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[sizeRoom, 1, sizeRoom]} />
            <meshStandardMaterial color={colorFloor} />
          </mesh>
          <mesh receiveShadow position={[0, sizeRoom / 2, -sizeRoom / 2]} rotation={[Math.PI / 2, 0, 0]}>
            <boxGeometry args={[sizeRoom, 1, sizeRoom]} />
            <meshStandardMaterial color={colorFloor} />
          </mesh>
          <mesh receiveShadow position={[0, sizeRoom / 2, sizeRoom / 2]} rotation={[Math.PI / 2, 0, 0]}>
            <boxGeometry args={[sizeRoom, 1, sizeRoom]} />
            <meshStandardMaterial color={colorFloor} />
          </mesh>
          <mesh receiveShadow position={[sizeRoom / 2, sizeRoom / 2, 0]} rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[sizeRoom, 1, sizeRoom]} />
            <meshStandardMaterial color={colorFloor} />
          </mesh>
        </group>

        {/* Tu contenido 3D */}
        <Suspense fallback={null}>
          <Box position={[3, 1, 0]} />
          <Snoopy position={[0, 1, 0]} />
          <Table position={[5, 0, 5]} />
          <Chair position={[5, 0, 5]} rotation={[0, 0, 0]} />
          <Window position={[0, 8, -14]} rotation={[0, 0, 0]} />
          <Window position={[-14, 4, 0]} rotation={[0, Math.PI / 2, 0]} />
        </Suspense>
      </Canvas>
    </div>
  )
}