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

### Presets disponibles

`city` | `apartment` | `lobby` | `night` | `warehouse` | `forest` | `studio` | `sunset`

---

## 💡 Iluminación

### Tipos de Luces

| Luz | Descripción | Uso típico |
|-----|-------------|------------|
| `ambientLight` | Ilumina todo por igual, sin dirección | Luz base para que nada quede 100% negro |
| `directionalLight` | Rayos paralelos como el sol | Escenas exteriores, sombras definidas |
| `pointLight` | Emite en todas direcciones desde un punto | Bombillas, velas |
| `spotLight` | Cono de luz como linterna | Focos, lámparas direccionales |
| `rectAreaLight` | Luz rectangular como lámpara de escritorio | Ambiente general |
| `hemiLight` | Luz hemisférica | Ambiente general |
| `IBLHDRLight` | Luz de iluminación base | Ambiente general |

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

- `MeshLambertMaterial` - Reacciona a luz, sin reflejos
- `MeshPhongMaterial` - Reflejos simples
- `MeshPhysicalMaterial` - PBR avanzado con clearcoat, transmisión, etc.

---

## 🖼️ Texturas

### ¿Qué es una Textura?

Una **textura** es una imagen 2D que se aplica sobre la superficie de un objeto 3D para darle apariencia visual. Sin texturas, los objetos solo tendrían colores sólidos.

```
Geometría (forma) + Material (propiedades) + Textura (imagen) = Objeto 3D realista
```

### UV Mapping - Cómo se "envuelve" una imagen en 3D

**UV Mapping** es el proceso de "desenvolver" un modelo 3D en 2D para poder pintarle una textura encima, como desenvolver una caja de cartón.

- **U** = eje horizontal de la textura (equivale a X)
- **V** = eje vertical de la textura (equivale a Y)

```
         Modelo 3D              Textura 2D
        ┌─────────┐              ┌─────┐
       /│        /│              │     │
      / │       / │    UV Map    │ 🪵  │
     ┌─────────┐  │   ────────►  │     │
     │  │      │  │              └─────┘
     │  └──────│──┘             (imagen)
     │ /       │ /
     └─────────┘
```

**💡 Tip:** Los modelos `.glb` ya vienen con UV mapping definido. Los modelos de Poly Haven y Sketchfab suelen tenerlo bien hecho.

### Tipos de Mapas de Textura

| Mapa | Propiedad R3F | Descripción | Ejemplo uso |
|------|---------------|-------------|-------------|
| **Diffuse/Color** | `map` | El color base de la superficie | La imagen del ladrillo, madera, etc. |
| **Normal** | `normalMap` | Simula relieve sin modificar geometría | Vetas de madera, grietas |
| **Roughness** | `roughnessMap` | Controla brillo/mate por zona | Madera pulida vs áspera |
| **Metalness** | `metalnessMap` | Define qué partes son metálicas | Tornillos en mueble de madera |
| **Displacement** | `displacementMap` | Modifica la geometría real | Relieve real de ladrillos |
| **AO (Ambient Occlusion)** | `aoMap` | Sombras suaves en esquinas/bordes | Más realismo en hendiduras |

### Cargando Texturas en React Three Fiber

```tsx
import { useTexture } from '@react-three/drei'
import { RepeatWrapping } from 'three'

function Floor() {
  // Cargar múltiples texturas a la vez
  const textures = useTexture({
    map: '/textures/wood_diff.jpg',
    normalMap: '/textures/wood_nor.png',
    roughnessMap: '/textures/wood_rough.png',
    displacementMap: '/textures/wood_disp.png'
  })
  
  // Configurar repetición para todas
  Object.values(textures).forEach(texture => {
    texture.wrapS = texture.wrapT = RepeatWrapping
    texture.repeat.set(4, 4)
  })
  
  return (
    <mesh>
      {/* Más subdivisiones para displacement */}
      <planeGeometry args={[10, 10, 64, 64]} />
      <meshStandardMaterial 
        {...textures}
        displacementScale={0.1}
      />
    </mesh>
  )
}
```

### Propiedades de Repetición

```tsx
import { RepeatWrapping, ClampToEdgeWrapping, MirroredRepeatWrapping } from 'three'

texture.wrapS = RepeatWrapping  // Repetición en eje U (horizontal)
texture.wrapT = RepeatWrapping  // Repetición en eje V (vertical)
texture.repeat.set(4, 4)        // Repetir 4x4 veces
```

| Wrap Mode | Descripción |
|-----------|-------------|
| `RepeatWrapping` | Repite la textura infinitamente |
| `ClampToEdgeWrapping` | Estira el último píxel (default) |
| `MirroredRepeatWrapping` | Repite alternando espejo |

### Normal Map: OpenGL vs DirectX

Las texturas de Poly Haven vienen en dos formatos:

- `_nor_gl` = **OpenGL** ✅ (usar este en Three.js)
- `_nor_dx` = DirectX ❌ (canal verde invertido)

### 🌐 Fuentes de Texturas Gratuitas

| Sitio | Descripción | URL |
|-------|-------------|-----|
| **Poly Haven** | Texturas PBR de alta calidad, CC0 | [polyhaven.com/textures](https://polyhaven.com/textures) |
| **AmbientCG** | Miles de materiales PBR gratis | [ambientcg.com](https://ambientcg.com/) |
| **Texture Ninja** | Fotos de texturas naturales | [texture.ninja](https://texture.ninja/) |
| **3D Textures** | Texturas PBR seamless | [3dtextures.me](https://3dtextures.me/) |
| **FreePBR** | Materiales PBR gratuitos | [freepbr.com](https://freepbr.com/) |

### Nomenclatura común en texturas descargadas

| Sufijo | Tipo de mapa |
|--------|--------------|
| `_diff`, `_col`, `_albedo` | Diffuse/Color |
| `_nor`, `_nrm`, `_normal` | Normal |
| `_rough`, `_roughness` | Roughness |
| `_metal`, `_metallic`, `_metalness` | Metalness |
| `_disp`, `_height`, `_bump` | Displacement |
| `_ao`, `_occ` | Ambient Occlusion |

**💡 Tip:** Siempre descarga texturas del mismo pack para que las UVs coincidan entre mapas.


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


## 🎮 Modelos 3D Externos (GLTF/GLB) - Guía Completa

### Formato GLTF vs GLB - Diferencias

| Característica | GLTF (.gltf) | GLB (.glb) |
|----------------|--------------|------------|
| **Tipo** | Archivo JSON + recursos externos | Todo en un solo archivo binario |
| **Estructura** | Múltiples archivos (.gltf + .bin + texturas) | Un solo archivo empaquetado |
| **Tamaño** | Más grande en total | Más compacto |
| **Edición** | Fácil de editar (es JSON) | Requiere herramientas para editar |
| **Carga** | Múltiples peticiones HTTP | Una sola petición |
| **Uso web** | ⚠️ Más lento | ✅ Recomendado para producción |

**💡 Recomendación:** Usa **.GLB** para proyectos web. Es más eficiente.

### El formato GLTF en detalle

```
📁 modelo/
├── modelo.gltf     # JSON con estructura, materiales, animaciones
├── modelo.bin      # Datos binarios (geometría, animaciones)
├── textura1.jpg    # Texturas externas
└── textura2.png
```

El **GLB** es lo mismo pero todo comprimido en un solo archivo binario.

### 🌐 Dónde descargar modelos 3D gratuitos

| Sitio | Descripción | Formatos | URL |
|-------|-------------|----------|-----|
| **Sketchfab** | La mayor biblioteca de modelos 3D | GLTF, GLB, FBX, OBJ | [sketchfab.com](https://sketchfab.com/features/free-3d-models) |
| **Poly Haven** | Modelos de alta calidad, CC0 | GLTF, FBX, Blend | [polyhaven.com/models](https://polyhaven.com/models) |
| **Quaternius** | Packs de modelos low-poly gratuitos | GLTF, FBX | [quaternius.com](https://quaternius.com/) |
| **Kenney** | Assets para juegos (low-poly) | GLTF, OBJ | [kenney.nl/assets](https://kenney.nl/assets) |
| **Mixamo** | Personajes + animaciones gratis | FBX (convertir a GLB) | [mixamo.com](https://www.mixamo.com/) |
| **Google Poly** (archivo) | Modelos simples | GLTF | [poly.pizza](https://poly.pizza/) |
| **CGTrader** | Algunos modelos gratis | Varios | [cgtrader.com](https://www.cgtrader.com/free-3d-models) |
| **TurboSquid** | Modelos profesionales (algunos gratis) | Varios | [turbosquid.com](https://www.turbosquid.com/Search/3D-Models/free) |

**💡 Tip:** En Sketchfab, filtra por "Downloadable" y licencia CC para modelos gratuitos.

### 🛠️ Herramientas para Modelos 3D

#### Blender (Gratuito y Open Source)

**Blender** es el software estándar para crear y editar modelos 3D.

| Tarea | Cómo hacerlo en Blender |
|-------|------------------------|
| **Importar** | File → Import → glTF 2.0 |
| **Exportar a GLB** | File → Export → glTF 2.0 → Format: GLB |
| **Reducir polígonos** | Modifier → Decimate → Ratio (0.1 = 10% de polígonos) |
| **Ver UV Map** | UV Editing workspace |
| **Aplicar transformaciones** | Ctrl+A → All Transforms (IMPORTANTE antes de exportar) |

**Configuración recomendada al exportar:**

- ✅ Format: glTF Binary (.glb)
- ✅ Include → Selected Objects (si solo quieres exportar algunos)
- ✅ Mesh → Apply Modifiers
- ✅ Compression (si el modelo es grande)

#### gltf.report (Herramienta Online)

**[gltf.report](https://gltf.report/)** - Analiza y optimiza modelos GLB online.

Funcionalidades:

- 📊 Ver estadísticas del modelo (vértices, triángulos, texturas)
- 🔍 Inspeccionar estructura del modelo
- ⚡ Optimizar/comprimir el modelo
- 👁️ Preview 3D del modelo

#### Otras herramientas útiles

| Herramienta | Uso | URL |
|-------------|-----|-----|
| **gltf-transform** | CLI para optimizar GLB | [github.com/donmccurdy/glTF-Transform](https://github.com/donmccurdy/glTF-Transform) |
| **glTF Viewer** | Preview online de modelos | [gltf-viewer.donmccurdy.com](https://gltf-viewer.donmccurdy.com/) |
| **Gestaltor** | Editor visual de GLTF | [gestaltor.io](https://gestaltor.io/) |
| **gltfjsx** | Genera componentes React | `npx gltfjsx modelo.glb` |

### ⚡ Optimización de Modelos

#### ¿Por qué optimizar?

| Problema | Consecuencia |
|----------|--------------|
| Muchos polígonos | FPS bajo, carga lenta |
| Texturas grandes (4K) | Memoria GPU alta, carga lenta |
| Modelo sin comprimir | Archivo pesado |

#### Métricas recomendadas para web

| Métrica | Valor recomendado | Para escenas simples |
|---------|-------------------|---------------------|
| **Triángulos totales** | < 100,000 | < 50,000 |
| **Por modelo decorativo** | < 5,000 | < 2,000 |
| **Texturas** | 1K-2K max | 512px-1K |
| **Tamaño archivo** | < 5MB | < 2MB |

#### Técnicas de optimización

##### 1. Reducir polígonos (Blender)

```
1. Seleccionar objeto
2. Modifier → Add Modifier → Decimate
3. Ajustar "Ratio" (0.5 = 50% menos polígonos)
4. Apply modifier
```

##### 2. Comprimir texturas

```bash
# Usando gltf-transform CLI
npx @gltf-transform/cli optimize input.glb output.glb --compress draco --texture-compress webp
```

##### 3. Usar LOD (Level of Detail)

Para objetos lejanos, usar versiones con menos detalle:

```tsx
import { Detailed } from '@react-three/drei'

function Tree() {
  return (
    <Detailed distances={[0, 10, 25]}>
      <TreeHighDetail />   {/* < 10 unidades de distancia */}
      <TreeMediumDetail /> {/* 10-25 unidades */}
      <TreeLowDetail />    {/* > 25 unidades */}
    </Detailed>
  )
}
```

##### 4. Instancing para objetos repetidos

Si tienes muchos objetos iguales (árboles, rocas):

```tsx
import { Instances, Instance } from '@react-three/drei'
import { useGLTF } from '@react-three/drei'

function Trees() {
  const { nodes } = useGLTF('/tree.glb')
  
  return (
    <Instances geometry={nodes.tree.geometry} material={nodes.tree.material}>
      <Instance position={[0, 0, 0]} />
      <Instance position={[5, 0, 3]} />
      <Instance position={[-3, 0, 7]} />
      {/* Cientos de árboles sin impacto en rendimiento */}
    </Instances>
  )
}
```

#### Checklist antes de usar un modelo

- [ ] ¿Tiene menos de 10,000 triángulos? (para objetos individuales)
- [ ] ¿Las texturas son 2K o menos?
- [ ] ¿El archivo pesa menos de 5MB?
- [ ] ¿Tiene UV mapping correcto?
- [ ] ¿Las transformaciones están aplicadas? (Blender: Ctrl+A)
- [ ] ¿El modelo está centrado en el origen?

**💡 Tip:** Usa `console.log(nodes)` para ver la estructura del modelo y qué meshes contiene.

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

### Helpers útiles de drei

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

### Tipos de colliders

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
