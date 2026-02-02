import Floor from '@/components/world/elemtns/Floor'
import Box from '@/components/Box'
import Walls from '@/components/world/elemtns/Walls'

export default function Kitchen(props: any) {
    const sizeRoom = 32

    return (
        <group {...props}>
            {/* Suelo y Paredes de la Cocina */}
            <group>
                <Floor size={sizeRoom} />
                {/* Pared Fondo */}
                <Walls size={sizeRoom} position="back" />
                <Walls size={sizeRoom} position="right" />
            </group>

            {/* Muebles de Cocina (Simulados) */}
            {/* Nevera */}
            <Box position={[5, 2, 0]} />

            {/* Mesón */}
            <Box position={[-5, 2, 0]} />
        </group>
    )
}
