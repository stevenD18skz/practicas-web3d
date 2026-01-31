# 📚 Notas de Aprendizaje - Web 3D con React Three Fiber

> Repositorio de práctica para aprender desarrollo 3D en la web usando React Three Fiber, Three.js y herramientas del ecosistema.

---

## 🛠️ Stack Tecnológico

| Tecnología | Descripción |
|------------|-------------|
| **React Three Fiber** | Renderer de React para Three.js |
| **@react-three/drei** | Helpers y componentes útiles para R3F |
| **@react-three/rapier** | Motor de física (Rapier) para R3F |
| **Leva** | Panel de controles para debug en tiempo real |
| **Three.js** | Librería base de 3D para la web |

---

## 💡 Iluminación

### Tipos de Luces

| Luz | Descripción | Uso típico |
|-----|-------------|------------|
| `ambientLight` | Ilumina todo por igual, sin dirección | Luz base para que nada quede 100% negro |
| `directionalLight` | Rayos paralelos como el sol | Escenas exteriores, sombras definidas |
| `pointLight` | Emite en todas direcciones desde un punto | Bombillas, velas |
| `spotLight` | Cono de luz como linterna | Focos, lámparas direccionales |

### DirectionalLight - Propiedades Importantes

```tsx
<directionalLight
  position={[10, 10, 5]}      // Posición (define dirección de rayos)
  intensity={1.5}              // Brillo
  color="white"                // Color de la luz
  castShadow                   // Habilita proyección de sombras
  // Configuración de sombras
  shadow-mapSize={[1024, 1024]}  // Resolución de sombras
  shadow-camera-left={-10}       // Área de sombras
  shadow-camera-right={10}
  shadow-camera-top={10}
  shadow-camera-bottom={-10}
/>
```

**💡 Tip:** La posición de `directionalLight` solo define la DIRECCIÓN de los rayos, no hay atenuación por distancia.

### Helpers de Luz (Debug)

Para visualizar las luces como en Blender:

```tsx
import { useHelper } from '@react-three/drei'
import * as THREE from 'three'

function MyLight() {
  const lightRef = useRef()
  useHelper(lightRef, THREE.DirectionalLightHelper, 2, 'yellow')
  
  return <directionalLight ref={lightRef} ... />
}
```

---

## 🎮 OrbitControls - Controles de Cámara

```tsx
<OrbitControls
  enableDamping={true}        // Movimiento suave con inercia
  dampingFactor={0.05}        // Rapidez de frenado (menor = más suave)
  minDistance={2}             // Zoom mínimo
  maxDistance={40}            // Zoom máximo
  maxPolarAngle={Math.PI / 2} // Limita rotación vertical (no ver debajo del suelo)
  autoRotate                  // Rotación automática
  enablePan                   // Permite desplazamiento lateral
/>
```

**💡 Tip:** `Math.PI / 2` = 90° - útil para limitar que la cámara no pase por debajo del suelo.

---

## 🎨 Materiales

### Diferencia entre MeshBasicMaterial y MeshStandardMaterial

| Característica | `MeshBasicMaterial` | `MeshStandardMaterial` |
|----------------|---------------------|------------------------|
| Iluminación | ❌ Ignora las luces | ✅ Reacciona a las luces |
| Sombras | ❌ No recibe ni proyecta | ✅ Recibe y proyecta |
| Rendimiento | ⚡ Muy rápido | 🐢 Más lento (PBR) |
| Realismo | Plano, como pintura | Físicamente realista |

### MeshStandardMaterial - Propiedades

```tsx
<meshStandardMaterial
  color="orange"
  metalness={0.3}    // 0 = no metálico, 1 = muy metálico
  roughness={0.4}    // 0 = muy brillante, 1 = mate
/>
```

**Otros materiales:**
- `MeshLambertMaterial` - Reacciona a luz, sin reflejos
- `MeshPhongMaterial` - Reflejos simples
- `MeshPhysicalMaterial` - PBR avanzado con clearcoat, transmisión, etc.

---

## 🌄 Environment (Entorno)

El componente `<Environment />` de drei tiene dos funciones:

1. **Iluminación IBL** - Usa HDRI para iluminar objetos de forma realista
2. **Fondo de escena** - Puede mostrar el HDRI como cielo

```tsx
// Solo iluminación (fondo negro)
<Environment preset="sunset" />

// Iluminación + fondo visible
<Environment preset="sunset" background />

// Con desenfoque
<Environment preset="sunset" background blur={0.5} />
```

### Presets disponibles:
`city` | `apartment` | `lobby` | `night` | `warehouse` | `forest` | `studio` | `sunset`

---

## 🔄 Animación con useFrame

`useFrame` se ejecuta en cada frame (60fps típicamente):

```tsx
import { useFrame } from '@react-three/fiber'

function AnimatedBox() {
  const meshRef = useRef()
  
  useFrame((state, delta) => {
    // delta = tiempo desde el último frame (para animación consistente)
    meshRef.current.rotation.y += delta * 0.5
    meshRef.current.rotation.x += delta * 0.5
  })
  
  return <mesh ref={meshRef}>...</mesh>
}
```

**💡 Tip:** Multiplicar por `delta` hace que la animación sea consistente independientemente del framerate.

---

## 📦 Cargando Modelos 3D (GLTF/GLB)

### Usando gltfjsx

1. Instalar: `npx gltfjsx modelo.glb`
2. Genera un componente React listo para usar

```tsx
import { useGLTF } from '@react-three/drei'

export default function Table(props) {
  const { nodes, materials } = useGLTF('/models/Table.glb')
  
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Table_7.geometry}
        material={materials.Table_7_mat}
        castShadow
        receiveShadow
      />
    </group>
  )
}

useGLTF.preload('/models/Table.glb') // Pre-carga
```

**💡 Tip:** Usa `<Suspense fallback={null}>` para envolver modelos que se cargan.

---

## 🎛️ Debug Tools con Leva

Panel de controles en tiempo real:

```tsx
import { useControls } from 'leva'

function DebugTools() {
  const { showAxes, showGrid } = useControls('Debug', {
    showAxes: true,
    showGrid: true,
  })
  
  return (
    <>
      {showAxes && <primitive object={new THREE.AxesHelper(10)} />}
      {showGrid && <Grid args={[20, 20]} />}
    </>
  )
}
```

### Helpers útiles de drei:
- `<Stats />` - Muestra FPS, MS, MB
- `<Grid />` - Cuadrícula de referencia
- `<GizmoHelper>` - Brújula 3D en esquina
- `useHelper()` - Visualizar luces, cámaras, etc.

---

## ⚛️ Física con Rapier (para el futuro)

```bash
npm install @react-three/rapier
```

```tsx
import { Physics, RigidBody } from '@react-three/rapier'

// Envolver toda la escena
<Physics gravity={[0, -9.81, 0]}>
  
  {/* Objeto fijo (suelo) */}
  <RigidBody type="fixed" colliders="cuboid">
    <mesh>
      <boxGeometry args={[20, 1, 20]} />
    </mesh>
  </RigidBody>
  
  {/* Objeto dinámico (cae con gravedad) */}
  <RigidBody colliders="hull">
    <MyModel />
  </RigidBody>
  
</Physics>
```

### Tipos de colliders:
- `cuboid` - Caja
- `ball` - Esfera
- `hull` - Envolvente convexa del mesh
- `trimesh` - Mesh exacto (más lento)

---

## 📁 Estructura del Proyecto

```
practicas-web3d/
├── public/
│   └── models/          # Modelos .glb/.gltf
├── src/
│   ├── app/
│   │   └── page.tsx     # Página principal
│   ├── components/
│   │   ├── Scene3D.tsx  # Escena principal con Canvas
│   │   ├── DebugTools.tsx
│   │   └── models/      # Componentes de modelos 3D
│   │       ├── Box.tsx
│   │       ├── Snoopy.tsx
│   │       ├── Table.tsx
│   │       └── Chair.tsx
└── notes.md             # ¡Este archivo!
```

---

## 🎯 Tips Generales

1. **Sombras:** Activar `shadows` en Canvas Y `castShadow`/`receiveShadow` en meshes/luces
2. **Posiciones:** Three.js usa sistema de coordenadas Y-up (Y es arriba)
3. **Rotaciones:** Se miden en radianes, no grados. `Math.PI` = 180°
4. **Performance:** Usa `<Suspense>` para cargar modelos y `useGLTF.preload()` para pre-cargar
5. **Debug:** Siempre ten herramientas de debug (Stats, Grid, AxesHelper) durante desarrollo

---

## 📖 Recursos Útiles

- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Drei (Helpers)](https://github.com/pmndrs/drei)
- [Three.js Docs](https://threejs.org/docs/)
- [Rapier Physics](https://rapier.rs/)
- [Sketchfab (Modelos gratis)](https://sketchfab.com/)
- [Poly Haven (HDRIs gratis)](https://polyhaven.com/)

---

*Última actualización: 31 de enero de 2026*
