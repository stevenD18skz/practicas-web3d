// src/components/DebugTools.tsx
import { Stats, Grid, GizmoHelper, GizmoViewport, useHelper } from '@react-three/drei'
import { useControls } from 'leva'
import { useRef } from 'react'
import * as THREE from 'three'

// Hook para crear el contexto de debug
export function useDebugControls() {
    return useControls('Debug', {
        showAxes: true,
        showGrid: true,
        showStats: true,
        showGizmo: true,
        showLightHelpers: true,
        freeCam: false // Nuevo control para alternar cámara
    })
}

export default function DebugTools() {
    const { showAxes, showGrid, showStats, showGizmo } = useDebugControls()

    return (
        <>
            {showStats && <Stats />}
            {showAxes && <primitive object={new THREE.AxesHelper(10)} />}
            {showGrid && <Grid args={[20, 20]} />}
            {showGizmo && <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                <GizmoViewport />
            </GizmoHelper>}
        </>
    )
}

// Componente de luz direccional con helper visual
interface DirectionalLightWithHelperProps {
    position?: [number, number, number]
    intensity?: number
    color?: string | number
    castShadow?: boolean
    showHelper?: boolean
}

export function DirectionalLightWithHelper({
    position = [10, 10, 5],
    intensity = 1,
    color = 'white',
    castShadow = true,
    showHelper = true,
}: DirectionalLightWithHelperProps) {
    const lightRef = useRef<THREE.DirectionalLight>(null!)

    // El helper solo se muestra si showHelper es true
    useHelper(showHelper && lightRef, THREE.DirectionalLightHelper, 2, 'yellow')

    return (
        <directionalLight
            ref={lightRef}
            position={position}
            intensity={intensity}
            color={color}
            castShadow={castShadow}

        />
    )
}

// Componente de SpotLight con helper visual
interface SpotLightWithHelperProps {
    position?: [number, number, number]
    intensity?: number
    color?: string | number
    angle?: number
    penumbra?: number
    castShadow?: boolean
    showHelper?: boolean
}

export function SpotLightWithHelper({
    position = [0, 10, 0],
    intensity = 40,
    color = 'white',
    angle = Math.PI / 4,
    penumbra = 0.5,
    castShadow = true,
    showHelper = true,
}: SpotLightWithHelperProps) {
    const lightRef = useRef<THREE.SpotLight>(null!)

    // El helper solo se muestra si showHelper es true
    useHelper(showHelper && lightRef, THREE.SpotLightHelper, 'cyan')

    return (
        <spotLight
            ref={lightRef}
            position={position}
            intensity={intensity}
            distance={1}
            color={color}
            angle={angle}
            penumbra={penumbra}
            castShadow={castShadow}
        />
    )
}