'use client'

import { Center } from '@react-three/drei'

import Box from '@/components/Box'
import Snoopy from '@/components/pets/Snoopy'
import Table from '@/components/furniture/Table'
import Window from '@/components/furniture/Window'
import Floor from '@/components/world/Floor'

export default function LivingRoom(props: any) {
  const colorFloor = "#5C330A"
  const sizeRoom = 32

  return (
    <group {...props}>
      {/* Suelo y paredes */}
      <group>
        <Floor size={sizeRoom} />
        {/* Pared Izquierda */}
        <mesh receiveShadow position={[-sizeRoom / 2, sizeRoom / 2, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[sizeRoom, 1, sizeRoom]} />
          <meshStandardMaterial color={colorFloor} />
        </mesh>
        {/* Pared Fondo */}
        <mesh receiveShadow position={[0, sizeRoom / 2, -sizeRoom / 2]} rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[sizeRoom, 1, sizeRoom]} />
          <meshStandardMaterial color={colorFloor} />
        </mesh>
        {/* Pared Derecha 
        <mesh receiveShadow position={[0, sizeRoom / 2, sizeRoom / 2]} rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[sizeRoom, 1, sizeRoom]} />
          <meshStandardMaterial color={colorFloor} />
        </mesh>*/}
        {/* Pared Frontal */}
        <mesh receiveShadow position={[sizeRoom / 2, sizeRoom - sizeRoom/4 , 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[sizeRoom/2, 1, sizeRoom]} />
          <meshStandardMaterial color={colorFloor} />
        </mesh>
      </group>

      {/* contenido 3D */}
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
    </group>
  )
}