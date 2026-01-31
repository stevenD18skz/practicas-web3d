import LivingRoom from '@/components/world/rooms/LivingRoom'

export default function Home() {
  return (
    <main className="relative">
      <LivingRoom />
      
      {/* UI overlay */}
      <div className="absolute top-4 left-4 text-white bg-black/50 p-4 rounded">
        <h1 className="text-2xl font-bold mb-2">Práctica Web 3D</h1>
        <p className="text-sm">Click en el cubo para interactuar</p>
        <p className="text-sm">Arrastra para rotar la cámara</p>
        <p className="text-sm">Scroll para zoom</p>
      </div>
    </main>
  )
}