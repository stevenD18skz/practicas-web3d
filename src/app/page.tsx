import LivingRoom from '@/components/world/rooms/LivingRoom'
import GameUI from '@/components/ui/GameUI'

export default function Home() {
  return (
    <main className="relative">
      {/* Escena 3D */}
      <LivingRoom />

      {/* Interfaz de Usuario (Overlay) */}
      <GameUI />
    </main>
  )
}