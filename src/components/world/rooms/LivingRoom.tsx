'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Center } from '@react-three/drei'
import { Suspense, useMemo } from 'react'
import DebugTools, { useDebugControls } from '@/components/DebugTools'
import { Object3D } from 'three'
import { useRef } from 'react'

import { useHelper } from '@react-three/drei'
import * as THREE from 'three'

import Box from '@/components/Box'
import Snoopy from '@/components/pets/Snoopy'
import Table from '@/components/furniture/Table'
import Chair from '@/components/furniture/Chair'
import Window from '@/components/furniture/Window'

import Floor from '@/components/world/Floor'

function SceneLights() {
  const lightRef = useRef<THREE.SpotLight>(null!)
  useHelper(lightRef, THREE.SpotLightHelper)

  // useMemo evita que se cree un nuevo Object3D en cada render
  const target = useMemo(() => new Object3D(), [])

  return (
    <>
      <spotLight
        ref={lightRef}
        color={"white"}              // Color de la luz
        position={[-13.8, 7, 0]}       // Posición (define dirección de rayos)
        angle={Math.PI / 3}          // Ángulo del cono de luz
        distance={64}                // Distancia máxima de la luz
        intensity={16}               // Brillo
        decay={0.5}                  // Atenuación por distancia
        penumbra={0.125}                 // Gradualidad de la luz
        target={target}              // Punto de destino
        castShadow                   // Habilita proyección de sombras
      />
      <primitive object={target} position={[0, 7, 0]} />
    </>
  )
}

import FPSControls from '@/components/controls/FPSControls'
import { usePlayerMovement } from '@/hooks/usePlayerMovement'

// Componente invisible que maneja la lógica de movimiento del jugador
function Player() {
  usePlayerMovement()
  return null
}

export default function Scene3D() {
  const colorFloor = "#5C330A"
  const sizeRoom = 100

  // Obtenemos el estado de freeCam desde los controles de debug
  const { freeCam } = useDebugControls()

  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [5, 1.6, 5], fov: 50 }} // Altura de ojos (1.6m)
        shadows
      >
        {/* Debug */}
        <DebugTools />

        {/* Iluminación */}
        <SceneLights />

        {/* LOGICA DE CONTROLES: FPS vs ORBIT - Alternar según el checkbox de Debug */}
        {freeCam ? (
          <OrbitControls
            makeDefault // Importante para que tome el control de la cámara
            minDistance={2}
            maxDistance={50}
          />
        ) : (
          <>
            <FPSControls />
            <Player />
          </>
        )}

        {/* Entorno/fondo  */}
        <Environment preset="forest" background />

        {/* CONTENIDO 3D  */}
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

        {/* contenido 3D */}
        <Suspense fallback={null}>
          <Box position={[3, 1, 0]} />

          <Center top position={[0, 0, 0]}>
            <Snoopy />
          </Center>

          <Center top position={[5, 0, 5]}>
            <Table />
          </Center>

          <Center top position={[0, 5, -14]}>
            <Window />
          </Center>
          <Center top position={[-14, 5, 0]}>
            <Window rotation={[0, Math.PI / 2, 0]} />
          </Center>
        </Suspense>
      </Canvas>
    </div>
  )
}