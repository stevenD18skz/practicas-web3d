import Floor from '@/components/world/Floor'
import Box from '@/components/Box'
import { Center } from '@react-three/drei'

export default function Kitchen(props: any) {
    const sizeRoom = 32
    const colorFloor = "#808080" // Suelo gris para diferenciar

    return (
        <group {...props}>
            {/* Suelo y Paredes de la Cocina */}
            <group>
                <Floor size={sizeRoom} color={colorFloor} />
                {/* Pared Fondo */}
                <mesh receiveShadow position={[0, sizeRoom / 2, -sizeRoom / 2]} rotation={[Math.PI / 2, 0, 0]}>
                    <boxGeometry args={[sizeRoom, 1, sizeRoom]} />
                    <meshStandardMaterial color="#AEC6CF" /> {/* Pared azul pastel */}
                </mesh>
            </group>

            {/* Muebles de Cocina (Simulados) */}
            <Center bottom position={[0, 0, -20]}>
                {/* Nevera */}
                <Box position={[0, 10, 0]} color="white" scale={[8, 16, 8]} />
            </Center>

            <Center bottom position={[-20, 0, -20]}>
                {/* Mesón */}
                <Box position={[0, 5, 0]} color="#555" scale={[20, 5, 5]} />
            </Center>
        </group>
    )
}
