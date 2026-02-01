'use client'

import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Html } from '@react-three/drei'
import { Suspense, useMemo, useRef, useState } from 'react'
import DebugTools, { useDebugControls } from '@/components/DebugTools'
import { Object3D } from 'three'
import { useHelper } from '@react-three/drei'
import * as THREE from 'three'

import FPSControls from '@/components/controls/FPSControls'
import { usePlayerMovement } from '@/hooks/usePlayerMovement'

// Habitaciones
import LivingRoom from '@/components/world/rooms/LivingRoom'
import Kitchen from '@/components/world/rooms/kitchen'

// Componente invisible que maneja la lógica de movimiento del jugador
function Player() {
    usePlayerMovement()
    return null
}

// Componente que rastrea en qué habitación estás
function RoomTracker() {
    const { camera } = useThree()
    const [room, setRoom] = useState('Desconocido')

    useFrame(() => {
        const x = camera.position.x
        const z = camera.position.z

        // Lógica simple de coordenadas (AABB)
        // Sala: está centrada en 0,0 con tamaño 32 (aprox de -16 a 16)
        if (x > -16 && x < 16 && z > -16 && z < 16) {
            if (room !== 'Sala') setRoom('Sala')
        }
        // Cocina: está en x=32, con tamaño 32 (aprox de 16 a 48)
        else if (x > 16 && x < 48 && z > -16 && z < 16) {
            if (room !== 'Cocina') setRoom('Cocina')
        }
        else {
            if (room !== 'Exterior') setRoom('Exterior')
        }
    })
    console.log(room)

    return (
        <Html position={[0, 0, 0]} fullscreen style={{ pointerEvents: 'none' }}>
            <div className="absolute top-4 right-4 bg-white/80 p-2 rounded font-mono font-bold text-black border-2 border-black">
                📍 ZONA: {room}
            </div>
        </Html>
    )
}

function SceneLights() {
    const lightRef = useRef<THREE.SpotLight>(null!)
    useHelper(lightRef, THREE.SpotLightHelper)
    const target = useMemo(() => new Object3D(), [])

    return (
        <>
            <spotLight
                ref={lightRef}
                color={"white"}
                position={[-13.8, 7, 0]}
                angle={Math.PI / 3}
                distance={64}
                intensity={16}
                decay={0.5}
                penumbra={0.125}
                target={target}
                castShadow
            />
            <primitive object={target} position={[0, 7, 0]} />
            {/* Luz ambiental extra para que no esté todo tan oscuro */}
            <ambientLight intensity={0.5} />
        </>
    )
}

export default function House() {
    // Obtenemos el estado de freeCam desde los controles de debug
    const { freeCam } = useDebugControls()

    return (
        <div className="w-full h-screen">
            <Canvas
                camera={{ position: [5, 1.6, 5], fov: 50 }}
                shadows
            >
                {/* Herramientas Globales */}
                <DebugTools />
                <SceneLights />
                <RoomTracker />
                <Environment preset="forest" background />

                {/* LOGICA DE CONTROLES */}
                {freeCam ? (
                    <OrbitControls makeDefault minDistance={2} maxDistance={200} />
                ) : (
                    <>
                        <FPSControls />
                        <Player />
                    </>
                )}

                {/* MUNDO - Aquí cargamos las habitaciones */}
                <Suspense fallback={null}>
                    {/* SALA PRINCIPAL */}
                    <LivingRoom />

                    {/* COCINA - La movemos 100 unidades a la derecha para que no se solape */}
                    <Kitchen position={[32, 0, 0]} />
                </Suspense>

            </Canvas>
        </div>
    )
}
