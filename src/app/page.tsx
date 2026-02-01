import House from '@/components/world/House'
import GameUI from '@/components/ui/GameUI'

export default function Home() {
  return (
    <main className="relative">
      {/* Escena 3D Principal (La Casa) */}
      <House />

      {/* Interfaz de Usuario (Overlay) */}
      <GameUI />
    </main>
  )
}