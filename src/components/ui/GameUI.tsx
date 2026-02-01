// src/components/ui/GameUI.tsx
'use client'

import { useState } from 'react'

export default function GameUI() {

  return (
    <>
      <div className="absolute top-4 left-4 text-white bg-black/50 p-4 rounded">
        <h1 className="text-2xl font-bold mb-2">Práctica Web 3D</h1>
        <p className="text-sm">Click en la pantalla para jugar</p>
        <p className="text-sm">WASD para moverte</p>
        <p className="text-sm">ESC para salir</p>
      </div>

      {/* 🎯 CROSSHAIR (Mira Central) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]"></div>
      </div>

      <div className="absolute bottom-4 left-4 bg-black/70 text-white p-4 rounded">
        <p>🐕 Perros alimentados: 0/3</p>
        <p>🍖 Comida: 5</p>
      </div>
    </>
  )
}