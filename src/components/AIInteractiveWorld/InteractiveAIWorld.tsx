'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, Line, OrbitControls, Text, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { Suspense, useEffect, useMemo, useRef } from 'react'

type Props = { modelUrl?: string }
type Point = [number, number, number]

const cyan = '#42d8ff'
const electricBlue = '#168dff'
const violet = '#8e7dff'
const defaultModelUrl = new URL('../../assets/3Dmodel/low_poly_man_working_at_a_table_with_a_laptop_edited.glb', import.meta.url).href

function Walker({ modelUrl }: Props) {
  if (modelUrl) return <GLBWalker url={modelUrl} />
  return <Mannequin />
}

function GLBWalker({ url }: { url: string }) {
  const { scene, animations } = useGLTF(url)
  const mixer = useRef<THREE.AnimationMixer | null>(null)
  const motionTargets = useRef<Array<{ node: THREE.Object3D; rotation: THREE.Euler }>>([])

  useEffect(() => {
    const animationMixer = new THREE.AnimationMixer(scene)
    const clip = animations.find((animation) => /type|typing|work|working|computer|laptop|write|idle|sit/i.test(animation.name)) ?? animations[0]
    if (clip) {
      const action = animationMixer.clipAction(clip)
      action.reset().setLoop(THREE.LoopRepeat, Infinity)
      action.timeScale = 1.2
      action.play()
    }
    const targetNames = ['Torso1_82', 'Torso2_71', 'Shoulder.L_50', 'Shoulder.R_68', 'Forearm.L_49', 'Forearm.R_67']
    motionTargets.current = targetNames.flatMap((name) => {
      const node = scene.getObjectByName(name)
      return node ? [{ node, rotation: node.rotation.clone() }] : []
    })
    mixer.current = animationMixer

    return () => {
      animationMixer.stopAllAction()
      animationMixer.uncacheRoot(scene)
      mixer.current = null
      motionTargets.current = []
    }
  }, [animations, scene])

  useFrame(({ clock }, delta) => {
    mixer.current?.update(delta)
    const time = clock.getElapsedTime()
    motionTargets.current.forEach(({ node, rotation }, index) => {
      const phase = time * 2.4 + index * 0.7
      const amount = index < 2 ? 0.18 : 0.28
      node.rotation.z = rotation.z + Math.sin(phase) * amount
      node.rotation.y = rotation.y + Math.sin(phase * 0.7) * amount * 0.45
    })
  })
  return <primitive object={scene} scale={0.34} />
}

function Mannequin() {
  const root = useRef<THREE.Group>(null)
  const leftArm = useRef<THREE.Group>(null)
  const rightArm = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const typing = Math.sin(clock.getElapsedTime() * 12) * 0.06
    if (root.current) root.current.position.y = Math.sin(clock.getElapsedTime() * 2) * 0.015
    if (leftArm.current) leftArm.current.rotation.x = -0.35 + typing
    if (rightArm.current) rightArm.current.rotation.x = -0.35 - typing
  })

  return (
    <group ref={root}>
      <mesh position={[0, 2.05, 0]}><sphereGeometry args={[0.28, 24, 16]} /><meshStandardMaterial color="#d6a07d" /></mesh>
      <mesh position={[0, 2.22, 0]} scale={[1.05, 0.55, 1.05]}><sphereGeometry args={[0.29, 24, 16]} /><meshStandardMaterial color="#171717" /></mesh>
      <mesh position={[0, 1.45, 0]}><capsuleGeometry args={[0.34, 0.65, 8, 16]} /><meshStandardMaterial color="#f5f5f5" /></mesh>
      <mesh position={[0, 1.35, 0.2]}><boxGeometry args={[0.5, 0.75, 0.2]} /><meshStandardMaterial color="#111827" /></mesh>
      <group ref={leftArm} position={[-0.43, 1.58, 0]}><mesh position={[0, -0.28, 0]}><capsuleGeometry args={[0.11, 0.45, 6, 10]} /><meshStandardMaterial color="#f5f5f5" /></mesh></group>
      <group ref={rightArm} position={[0.43, 1.58, 0]}><mesh position={[0, -0.28, 0]}><capsuleGeometry args={[0.11, 0.45, 6, 10]} /><meshStandardMaterial color="#f5f5f5" /></mesh></group>
      <mesh position={[-0.18, 0.35, 0]}><capsuleGeometry args={[0.13, 0.65, 6, 10]} /><meshStandardMaterial color="#171717" /></mesh>
      <mesh position={[0.18, 0.35, 0]}><capsuleGeometry args={[0.13, 0.65, 6, 10]} /><meshStandardMaterial color="#171717" /></mesh>
    </group>
  )
}

function CircuitFloor() {
  const paths = useMemo(() => {
    const result: Point[][] = []
    for (let index = -11; index <= 11; index += 1) {
      const x = index * 0.72
      result.push([[x, -2.9, 2], [x, -2.9, -5], [x + (index % 2 ? 0.8 : -0.8), -2.9, -6], [x + (index % 2 ? 0.8 : -0.8), -2.9, -13]])
      const z = -4 - (index + 11) * 0.38
      result.push([[-10, -2.9, z], [index * 0.35, -2.9, z], [index * 0.35, -2.9, z - 0.65], [10, -2.9, z - 0.65]])
    }
    return result
  }, [])

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.94, -5]}><planeGeometry args={[24, 18]} /><meshBasicMaterial color="#06132a" transparent opacity={0.66} /></mesh>
      {paths.map((points, index) => <Line key={index} points={points} color={index % 3 === 0 ? cyan : electricBlue} lineWidth={index % 3 === 0 ? 1.2 : 0.55} transparent opacity={index % 3 === 0 ? 0.5 : 0.2} />)}
    </group>
  )
}

function BitStream() {
  const streams = useMemo(() => Array.from({ length: 22 }, (_, index) => ({
    x: (index - 11) * 0.72,
    offset: (index * 0.37) % 1,
    value: index % 3 === 0 ? '101101' : index % 2 === 0 ? '010011' : '110010',
  })), [])

  return <group>{streams.map((stream, index) => <Text key={index} position={[stream.x, 1.8 + stream.offset, -3.5 - (index % 4) * 1.7]} rotation={[0, 0, index % 2 ? 0.02 : -0.02]} fontSize={0.16 + (index % 3) * 0.025} color={index % 3 === 0 ? cyan : '#286cae'} anchorX="center" anchorY="middle" fillOpacity={0.5}>{stream.value}</Text>)}</group>
}

function DataNodes() {
  const nodes = useMemo(() => Array.from({ length: 18 }, (_, index) => ({
    position: [((index * 17) % 13) - 6, ((index * 11) % 7) - 2.3, -2 - ((index * 7) % 10)] as Point,
    phase: index * 0.7,
  })), [])
  const group = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!group.current) return
    group.current.children.forEach((node, index) => {
      node.position.y = nodes[index].position[1] + Math.sin(clock.getElapsedTime() * 0.8 + nodes[index].phase) * 0.12
    })
  })

  return <group ref={group}>{nodes.map((node, index) => <group key={index} position={node.position}><mesh><sphereGeometry args={[index % 4 === 0 ? 0.09 : 0.045, 10, 10]} /><meshBasicMaterial color={index % 4 === 0 ? cyan : violet} /></mesh>{index % 4 === 0 && <Text position={[0.18, 0.02, 0]} fontSize={0.12} color="#81cfff">0x{(index * 271).toString(16).padStart(3, '0')}</Text>}</group>)}</group>
}

function Core() {
  const core = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (!core.current) return
    core.current.rotation.y = clock.getElapsedTime() * 0.18
    core.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.35) * 0.08
    core.current.position.y = 0.7 + Math.sin(clock.getElapsedTime() * 0.7) * 0.08
  })

  return <group ref={core} position={[0, 0.7, -5.8]}><mesh><icosahedronGeometry args={[2.35, 2]} /><meshBasicMaterial color={electricBlue} wireframe transparent opacity={0.22} /></mesh><mesh scale={0.78}><icosahedronGeometry args={[2.35, 2]} /><meshBasicMaterial color={cyan} wireframe transparent opacity={0.16} /></mesh><mesh><sphereGeometry args={[0.62, 24, 24]} /><meshBasicMaterial color="#d5f7ff" transparent opacity={0.24} /></mesh><Text position={[0, 0, 0.68]} fontSize={0.48} color="#ffffff" anchorX="center" anchorY="middle">AI</Text></group>
}

function SecurityTelemetry() {
  const telemetry = useMemo(() => [
    { label: 'MODEL EXTRACTION', code: 'QUERY FLOOD', position: [-5.2, 1.9, -4.5] as Point, color: '#ffbd63' },
    { label: 'PROMPT INJECTION', code: 'INSTRUCTION OVERRIDE', position: [5.2, 1.25, -5.8] as Point, color: '#ff6f91' },
    { label: 'DATA POISONING', code: 'TRAINING DRIFT', position: [-4.8, -0.1, -8] as Point, color: '#d9a7ff' },
    { label: 'JAILBREAK SIGNAL', code: 'POLICY BYPASS', position: [4.7, -0.65, -8.7] as Point, color: '#ff8f68' },
  ], [])
  const group = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!group.current) return
    group.current.children.forEach((item, index) => {
      const pulse = 1 + Math.sin(clock.getElapsedTime() * 2.2 + index) * 0.08
      item.scale.setScalar(pulse)
    })
  })

  return (
    <group ref={group}>
      {telemetry.map((item, index) => (
        <group key={item.label} position={item.position}>
          <Line points={[[0, 0, 0], [item.position[0] > 0 ? -item.position[0] * 0.52 : -item.position[0] * 0.52, 0.7, 2.5]]} color={item.color} lineWidth={0.7} transparent opacity={0.42} />
          <mesh>
            <octahedronGeometry args={[0.18, 0]} />
            <meshBasicMaterial color={item.color} wireframe />
          </mesh>
          <Text position={[0.25, 0.14, 0]} fontSize={0.14} color={item.color} anchorX="left">{item.label}</Text>
          <Text position={[0.25, -0.08, 0]} fontSize={0.09} color="#8da8c7" anchorX="left">{index % 2 ? 'ACTIVE / BLOCKED' : item.code}</Text>
        </group>
      ))}
    </group>
  )
}

function PracticeVocabulary() {
  const terms = useMemo(() => [
    ['AGENTIC AI', [-5.8, 2.6, -7.5] as Point, cyan],
    ['VIBE CODING', [4.2, 2.9, -9] as Point, violet],
    ['RAG / RETRIEVAL', [-5.8, 1.1, -11] as Point, '#81cfff'],
    ['MODEL EVALS', [4.4, 0.75, -12] as Point, '#ffbd63'],
    ['RED TEAMING', [0, 3.25, -10] as Point, '#ff6f91'],
    ['MULTIMODAL', [0, -0.1, -13] as Point, '#d9a7ff'],
  ], [])

  return <group>{terms.map(([label, position, color]) => <Text key={label as string} position={position as Point} fontSize={0.15} color={color as string} anchorX="center" fillOpacity={0.72}>{label as string}</Text>)}</group>
}

function Scene({ modelUrl }: Props) {
  const { camera, pointer } = useThree()
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 1.7, 0.03)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 3.4 + pointer.y * 0.5, 0.03)
    camera.lookAt(0, 0.3, -4.5)
  })

  return <><color attach="background" args={['#020711']} /><fog attach="fog" args={['#020711', 8, 26]} /><CircuitFloor /><BitStream /><DataNodes /><Core /><SecurityTelemetry /><PracticeVocabulary /><group position={[0, -2.85, -2.4]}><Walker modelUrl={modelUrl} /></group><ambientLight intensity={0.75} /><pointLight position={[0, 4, 3]} color="#4db8ff" intensity={18} /><pointLight position={[-7, 2, -4]} color={violet} intensity={8} /></>
}

export default function InteractiveAIWorld({ modelUrl = defaultModelUrl }: Props) {
  return <section style={{ height: '100vh', minHeight: 620, position: 'relative', overflow: 'hidden', background: '#020711', touchAction: 'pan-y' }}><Canvas camera={{ position: [0, 3.8, 14], fov: 50 }} dpr={[1, 1.75]}><Suspense fallback={<Html center><span style={{ color: '#d9f3ff', fontFamily: 'monospace' }}>INITIALISING CIRCUIT</span></Html>}><Scene modelUrl={modelUrl} /></Suspense><OrbitControls enablePan={false} enableZoom={false} minDistance={8} maxDistance={22} /></Canvas><div style={{ position: 'absolute', top: 24, left: 24, color: 'rgba(217,243,255,.7)', fontFamily: 'monospace', fontSize: 11, letterSpacing: '.14em', pointerEvents: 'none' }}>AI INTERACTIVE WORLD / 0101</div></section>
}
