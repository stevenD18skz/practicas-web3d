import { useFrame } from '@react-three/fiber'
import { RefObject } from 'react'
import { Camera, Vector3 } from 'three'

// Hook para evitar que la cámara atraviese paredes (Límites AABB simples)
export function useWallCollision(cameraRef: Camera) {

    useFrame(() => {
        const pos = cameraRef.position

        // Configuración de la Casa (Limites manuales AABB)
        // Asumimos que la casa principal va de -45 a 45 en X y Z (Size 100 - paredes)
        const limit = 48 // SizeRoom 100 / 2 - un margen de 2 metros
        const margin = 0.5 // Radio del cuerpo del jugador

        // Límite Sala Principal
        // X
        if (pos.x > limit - margin) pos.x = limit - margin
        if (pos.x < -limit + margin) pos.x = -limit + margin
        // Z
        if (pos.z > limit - margin) pos.z = limit - margin
        if (pos.z < -limit + margin) pos.z = -limit + margin
    })
}
