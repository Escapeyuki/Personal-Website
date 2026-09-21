import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/*
 * The one 3D accent (grill.md § "The one 3D effect"). A slow, near-monochrome
 * grid of points that ripples like a data surface — a quiet nod to the quant
 * theme. It reacts gently to the mouse (subtle parallax) and stays strictly grey
 * so it never competes with Action Blue (the only "click me" color, DESIGN.md).
 *
 * Reduced motion: the Canvas runs on-demand instead of every frame, so it paints
 * a single frozen frame — a still image of the same wave, no motion, no parallax.
 */

const GRID = 100 // points per side → GRID * GRID points total
const SPREAD = 14 // world size of the plane

// Soft, round, grey points on a rippling plane; the outer ring fades to hide the
// square edge so the field reads as a quiet circular cloud.
const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uSpread;
  varying float vEdge;
  void main() {
    vec3 p = position;
    float wave = sin(p.x * 0.55 + uTime) * 0.6 + cos(p.z * 0.5 + uTime * 0.8) * 0.6;
    p.y += wave;
    float r = length(position.xz);
    vEdge = 1.0 - smoothstep(uSpread * 0.30, uSpread * 0.5, r);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (1.0 / -mv.z);
  }
`

const FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vEdge;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.15, d) * uOpacity * vEdge;
    gl_FragColor = vec4(uColor, alpha);
  }
`

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (event) => setReduced(event.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

// Pointer tracked at the window level — the canvas is pointer-events:none so it
// never blocks the hero text or the page scroll.
function usePointer() {
  const pointer = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
  return pointer
}

function WaveField({ pointer }) {
  const groupRef = useRef()
  const materialRef = useRef()

  const positions = useMemo(() => {
    const array = new Float32Array(GRID * GRID * 3)
    let i = 0
    for (let ix = 0; ix < GRID; ix++) {
      for (let iz = 0; iz < GRID; iz++) {
        array[i++] = (ix / (GRID - 1) - 0.5) * SPREAD
        array[i++] = 0
        array[i++] = (iz / (GRID - 1) - 0.5) * SPREAD
      }
    }
    return array
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 22 },
      uSpread: { value: SPREAD },
      uColor: { value: new THREE.Color('#6e6e73') },
      uOpacity: { value: 0.55 },
    }),
    [],
  )

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta * 0.4 // slow ripple
    }
    const group = groupRef.current
    if (group) {
      // Ease the whole field toward a small rotation that follows the pointer.
      group.rotation.y += (pointer.current.x * 0.12 - group.rotation.y) * 0.04
      group.rotation.x += (-pointer.current.y * 0.06 - group.rotation.x) * 0.04
    }
  })

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          uniforms={uniforms}
          vertexShader={VERTEX_SHADER}
          fragmentShader={FRAGMENT_SHADER}
          transparent
          depthWrite={false}
        />
      </points>
    </group>
  )
}

export default function HeroCanvas() {
  const reduced = usePrefersReducedMotion()
  const pointer = usePointer()
  return (
    <div className="landing-hero__canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 3.4, 7], fov: 50, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false }}
        frameloop={reduced ? 'demand' : 'always'}
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
      >
        <WaveField pointer={pointer} />
      </Canvas>
    </div>
  )
}
