/* InteractiveAIWorld.tsx
   React + TypeScript + React Three Fiber
   Uses the generated GLB scene as the 3D world.
*/

'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, Html, Text } from '@react-three/drei'
import * as THREE from 'three'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'

type Props = {
  modelUrl?: string
  autoWalk?: boolean
  className?: string
}

function FallbackWalker() {
  return (
    <group>
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.28, 20, 14]} />
        <meshStandardMaterial color="#d6a07d" />
      </mesh>
      <mesh position={[0, 1.15, 0]}>
        <capsuleGeometry args={[0.34, 0.65, 8, 16]} />
        <meshStandardMaterial color="#171717" />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.5, 1.1, 0.35]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
    </group>
  )
}

function Walker({
  url,
  autoWalk,
}: {
  url?: string
  autoWalk: boolean
}) {
  return url ? <GLBWalker url={url} autoWalk={autoWalk} /> : <FallbackWalker />
}

function GLBWalker({ url, autoWalk }: { url: string; autoWalk: boolean }) {
  const { scene, animations } = useGLTF(url)
  const root = useRef<THREE.Group>(null)
  const mixer = useRef<THREE.AnimationMixer | null>(null)

  useEffect(() => {
    if (!scene) return

    mixer.current = new THREE.AnimationMixer(scene)

    const walk =
      animations.find(a => /walk/i.test(a.name)) ??
      animations[0]

    if (walk) {
      const action = mixer.current.clipAction(walk)
      action.reset()
      action.setLoop(THREE.LoopRepeat, Infinity)
      action.play()
    }

    return () => {
      mixer.current?.stopAllAction()
      mixer.current?.uncacheRoot(scene)
    }
  }, [scene, animations])

  useFrame((_, delta) => {
    if (autoWalk) {
      mixer.current?.update(delta)
    }

    if (root.current) {
      // Keep the character centered while giving the illusion
      // of walking forward through the circuit world.
      root.current.position.z = Math.sin(Date.now() * 0.00018) * 0.15
      root.current.rotation.y = Math.sin(Date.now() * 0.00012) * 0.035
    }
  })

  return (
    <group ref={root}>
      <primitive object={scene} />
    </group>
  )
}

function CameraDirector({ enabled }: { enabled: boolean }) {
  const { camera } = useThree()
  const target = useMemo(() => new THREE.Vector3(), [])

  useFrame(({ clock, pointer }) => {
    if (!enabled) return

    const t = clock.getElapsedTime()
    const loop = (t % 18) / 18

    let desired: THREE.Vector3

    if (loop < 0.3) {
      const p = loop / 0.3
      const e = p * p * (3 - 2 * p)

      desired = new THREE.Vector3(
        Math.sin(p * Math.PI) * 2,
        THREE.MathUtils.lerp(7, 3.1, e),
        THREE.MathUtils.lerp(12, 7.5, e),
      )
    } else if (loop < 0.68) {
      const p = (loop - 0.3) / 0.38

      desired = new THREE.Vector3(
        Math.sin(p * Math.PI * 1.4) * 2.1,
        2.8 + Math.sin(p * Math.PI) * 0.3,
        7.5 - p * 3,
      )
    } else {
      const p = (loop - 0.68) / 0.32
      const e = p * p * (3 - 2 * p)

      desired = new THREE.Vector3(
        Math.sin(p * Math.PI * 1.2) * 3,
        THREE.MathUtils.lerp(2.8, 7.5, e),
        THREE.MathUtils.lerp(4.5, 13, e),
      )
    }

    camera.position.lerp(desired, 0.035)

    target.set(
      pointer.x * 0.35,
      0.3 + pointer.y * 0.12,
      -3.0,
    )

    camera.lookAt(target)
  })

  return null
}

function SecurityPerimeter() {
  const perimeter = useRef<THREE.Group>(null)
  const alerts: Array<[string, string, [number, number, number]]> = [
    ['EXTRACTION', '#ffbd63', [-2.8, 1.2, -2.5] as [number, number, number]],
    ['INJECTION', '#ff6f91', [2.8, 1.7, -3.2] as [number, number, number]],
    ['POISONING', '#d9a7ff', [-2.4, 0.2, -5.2] as [number, number, number]],
    ['JAILBREAK', '#ff8f68', [2.5, 0.3, -5.8] as [number, number, number]],
  ]

  useFrame(({ clock }) => {
    if (perimeter.current) perimeter.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.25) * 0.08
  })

  return (
    <group ref={perimeter}>
      <mesh position={[0, 1.2, -4.5]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.1, 0.018, 8, 64]} />
        <meshBasicMaterial color="#42d8ff" transparent opacity={0.34} />
      </mesh>
      {alerts.map(([label, color, position]) => (
        <group key={label} position={position}>
          <mesh>
            <octahedronGeometry args={[0.16, 0]} />
            <meshBasicMaterial color={color} wireframe />
          </mesh>
          <Text position={[0.24, 0.03, 0]} fontSize={0.14} color={color} anchorX="left">{label}</Text>
        </group>
      ))}
    </group>
  )
}

function Scene({ modelUrl, autoWalk, cinematic }: {
  modelUrl?: string
  autoWalk: boolean
  cinematic: boolean
}) {
  return (
    <>
      <color attach="background" args={['#020713']} />
      <fog attach="fog" args={['#020713', 9, 28]} />

      <Suspense fallback={
        <Html center>
          <div style={{
            color: 'white',
            fontFamily: 'system-ui',
            fontSize: 13,
            letterSpacing: '.12em',
          }}>
            LOADING AI WORLD…
          </div>
        </Html>
      }>
        <primitive object={new THREE.AmbientLight(0xffffff, 0.35)} />

        <Walker
          url={modelUrl}
          autoWalk={autoWalk}
        />

        <Environment preset="night" />

        <SecurityPerimeter />

        <CameraDirector enabled={cinematic} />
      </Suspense>
    </>
  )
}

export default function InteractiveAIWorld({
  modelUrl,
  autoWalk = true,
  className = '',
}: Props) {
  const [playing, setPlaying] = useState(autoWalk)
  const [cinematic, setCinematic] = useState(true)

  return (
    <section
      className={className}
      style={{
        width: '100%',
        height: '100vh',
        minHeight: 650,
        position: 'relative',
        overflow: 'hidden',
        background: '#020713',
      }}
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{
          position: [8, 5, 11],
          fov: 48,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        <Scene
          modelUrl={modelUrl}
          autoWalk={playing}
          cinematic={cinematic}
        />

        {!cinematic && (
          <OrbitControls
            enableDamping
            dampingFactor={0.06}
            minDistance={4}
            maxDistance={20}
            maxPolarAngle={Math.PI * 0.48}
          />
        )}
      </Canvas>

      <div
        aria-label="A multidisciplinary practice"
        style={{
          position: 'absolute',
          top: 28,
          right: 28,
          width: 'min(560px, calc(100% - 56px))',
          color: '#d9f3ff',
          pointerEvents: 'none',
          textAlign: 'right',
          zIndex: 5,
        }}
      >
        <div style={{ fontSize: 11, letterSpacing: '.16em', opacity: .72 }}>
          A MULTIDISCIPLINARY PRACTICE
        </div>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: 1, margin: '10px 0' }}>
          The work between the lines.
        </h2>
        <p style={{ color: 'rgba(217,243,255,.72)', lineHeight: 1.5, margin: 0 }}>
          One practice, four entry points. I move between making, teaching,
          research, and translating ideas for wider audiences.
        </p>
        <p style={{ color: 'rgba(217,243,255,.58)', fontFamily: 'monospace', fontSize: 11, letterSpacing: '.06em', lineHeight: 1.7, margin: '14px 0 0' }}>
          AGENTIC AI / VIBE CODING / RAG / MODEL EVALS / RED TEAMING / MULTIMODAL
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px 18px', marginTop: 18 }}>
          <span><b>01 Teaching</b><br />Python, AI, and machine learning made tangible.</span>
          <span><b>02 Researching</b><br />HCI questions where pedagogy meets technology.</span>
          <span><b>03 Building</b><br />Digital products with clarity, care, and a point of view.</span>
          <span><b>04 Explaining</b><br />AI ideas for people who want to understand the why.</span>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 24,
          bottom: 24,
          display: 'flex',
          gap: 8,
          zIndex: 10,
        }}
      >
        <button
          onClick={() => setPlaying(v => !v)}
          style={buttonStyle}
        >
          {playing ? 'Pause walk' : 'Walk'}
        </button>

        <button
          onClick={() => setCinematic(v => !v)}
          style={buttonStyle}
        >
          {cinematic ? 'Manual camera' : 'Drone camera'}
        </button>
      </div>

      <div
        style={{
          position: 'absolute',
          top: 24,
          left: 24,
          color: 'rgba(255,255,255,.7)',
          fontFamily: 'system-ui, sans-serif',
          fontSize: 11,
          letterSpacing: '.16em',
          pointerEvents: 'none',
        }}
      >
        AI CIRCUIT WORLD
      </div>
    </section>
  )
}

const buttonStyle: React.CSSProperties = {
  border: '1px solid rgba(80,180,255,.45)',
  background: 'rgba(2,12,30,.75)',
  color: '#d9f3ff',
  padding: '9px 13px',
  borderRadius: 8,
  cursor: 'pointer',
  backdropFilter: 'blur(10px)',
}

