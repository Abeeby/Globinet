'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.5}>
        <MeshDistortMaterial
          color="#9B51E0"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

function ParticleField() {
  const count = 1000
  const meshRef = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    const colorChoices = [
      new THREE.Color('#00F5FF'),
      new THREE.Color('#9B51E0'),
      new THREE.Color('#FF00A8'),
    ]

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
      
      const color = colorChoices[Math.floor(Math.random() * colorChoices.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return { positions, colors }
  }, [count])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.05
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.075
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

function WaveGrid() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current && meshRef.current.material) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      if (material.uniforms?.time) {
        material.uniforms.time.value = state.clock.elapsedTime
      }
    }
  })

  const shaderMaterial = useMemo(
    () => new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color('#00F5FF') },
        color2: { value: new THREE.Color('#FF00A8') },
      },
      vertexShader: `
        uniform float time;
        varying vec2 vUv;
        varying float vZ;
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          float wave = sin(pos.x * 2.0 + time) * 0.1;
          wave += sin(pos.y * 2.0 + time * 0.5) * 0.1;
          pos.z += wave;
          vZ = pos.z;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec2 vUv;
        varying float vZ;
        
        void main() {
          vec3 color = mix(color1, color2, vZ + 0.5);
          gl_FragColor = vec4(color, 0.3);
        }
      `,
      transparent: true,
      wireframe: true,
    }),
    []
  )

  return (
    <mesh
      ref={meshRef}
      position={[0, -2, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      material={shaderMaterial}
    >
      <planeGeometry args={[10, 10, 50, 50]} />
    </mesh>
  )
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={['#0A0A0A', 5, 15]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00F5FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FF00A8" />
        
        <AnimatedSphere />
        <ParticleField />
        <WaveGrid />
        
        <Environment preset="night" />
      </Canvas>
    </div>
  )
}
