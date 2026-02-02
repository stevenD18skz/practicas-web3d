'use client'

import { Center } from '@react-three/drei'

import Box from '@/components/Box'
import InteractableSnoopy from '@/components/pets/snoopy/InteractableSnoopy'
import Table from '@/components/furniture/Table'
import Window from '@/components/furniture/Window'
import Floor from '@/components/world/elemtns/Floor'
import Walls from '@/components/world/elemtns/Walls'
import Door from '@/components/world/elemtns/door'

export default function LivingRoom(props: any) {
  const colorFloor = "#5C330A"
  const sizeRoom = 32

  return (
    <group {...props}>
      {/* Suelo y paredes */}
      <group>
        <Floor size={sizeRoom} />
        {/* Pared Frontal */}
        <Walls size={sizeRoom} position="back" />
        <Walls size={sizeRoom} position="left" />
        <Door size={sizeRoom} position="front" />
      </group>

      {/* contenido 3D */}
      <Box position={[3, 1, 0]} />

      <Center top position={[0, 0, 0]}>
        <InteractableSnoopy id="snoopy-sala" name="Snoopy" position={[0, 0, 0]} />
      </Center>

      <Center top position={[5, 0, 5]}>
        <Table />
      </Center>

      <Center top position={[0, 5, -15.1]} rotation={[0, Math.PI, 0]}>
        <Window />
      </Center>
      <Center top position={[-14, 5, 0]}>
        <Window rotation={[0, Math.PI / 2, 0]} />
      </Center>
    </group>
  )
}