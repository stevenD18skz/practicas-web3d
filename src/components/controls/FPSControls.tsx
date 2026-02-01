// src/components/controls/FPSControls.tsx
'use client'

import { PointerLockControls } from '@react-three/drei'
import { useRef } from 'react'

export default function FPSControls() {
  const controlsRef = useRef()
  
  return (
    <PointerLockControls
      ref={controlsRef}
      selector="#lock-button" // Botón para activar
    />
  )
}