'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Environment, Sphere, MeshDistortMaterial, Torus, Box, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useScroll } from 'framer-motion'

// Sphère morphing avec shader personnalisé
function MorphingSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  
  const uniforms = useMemo(() => ({
    time: { value: 0 },
    color1: { value: new THREE.Color('#00F5FF') },
    color2: { value: new THREE.Color('#9B51E0') },
    color3: { value: new THREE.Color('#FF00A8') },
    distortion: { value: 0.4 },
    speed: { value: 0.5 },
  }), [])

  const vertexShader = `
    uniform float time;
    uniform float distortion;
    uniform float speed;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    vec3 mod289(vec3 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }
    
    vec4 mod289(vec4 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }
    
    vec4 permute(vec4 x) {
      return mod289(((x*34.0)+1.0)*x);
    }
    
    vec4 taylorInvSqrt(vec4 r) {
      return 1.79284291400159 - 0.85373472095314 * r;
    }
    
    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      
      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      
      i = mod289(i);
      vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }
    
    void main() {
      vUv = uv;
      vNormal = normal;
      vPosition = position;
      
      vec3 pos = position;
      float noise = snoise(vec3(position.x * 2.0, position.y * 2.0, time * speed));
      pos += normal * noise * distortion;
      
      vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;
      
      gl_Position = projectedPosition;
    }
  `

  const fragmentShader = `
    uniform float time;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform vec3 color3;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      float mixStrength = (sin(time * 0.5) + 1.0) * 0.5;
      vec3 color = mix(color1, color2, vUv.y);
      color = mix(color, color3, mixStrength);
      
      float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
      color += fresnel * 0.5;
      
      gl_FragColor = vec4(color, 0.9);
    }
  `
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={2.5}>
        <icosahedronGeometry args={[1, 8]} />
        <shaderMaterial
          ref={materialRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          wireframe={false}
        />
      </mesh>
    </Float>
  )
}

// Torus tourbillonnant
function SpinningTorus() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 2
      meshRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.5) * 2
    }
  })

  return (
    <mesh ref={meshRef} position={[3, 0, -2]}>
      <torusGeometry args={[1, 0.3, 16, 100]} />
      <meshStandardMaterial
        color="#9B51E0"
        emissive="#9B51E0"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}

// Particules interactives améliorées
function InteractiveParticles() {
  const count = 2000
  const meshRef = useRef<THREE.Points>(null)
  const mouse = useRef({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    
    const colorChoices = [
      new THREE.Color('#00F5FF'),
      new THREE.Color('#9B51E0'),
      new THREE.Color('#FF00A8'),
    ]

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos((Math.random() * 2) - 1)
      const radius = 5 + Math.random() * 5
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
      
      const color = colorChoices[Math.floor(Math.random() * colorChoices.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
      
      sizes[i] = Math.random() * 0.05 + 0.01
    }

    return { positions, colors, sizes }
  }, [count])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.02
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.03
      
      // Interaction avec la souris
      meshRef.current.rotation.x += mouse.current.y * 0.1
      meshRef.current.rotation.y += mouse.current.x * 0.1
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
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Grille de vagues améliorée
function WaveGrid() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  const shaderMaterial = useMemo(
    () => new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color('#00F5FF') },
        color2: { value: new THREE.Color('#FF00A8') },
        color3: { value: new THREE.Color('#9B51E0') },
      },
      vertexShader: `
        uniform float time;
        varying vec2 vUv;
        varying float vZ;
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          
          float wave1 = sin(pos.x * 3.0 + time * 1.5) * 0.15;
          float wave2 = sin(pos.y * 2.0 + time * 1.0) * 0.1;
          float wave3 = sin((pos.x + pos.y) * 1.5 + time * 2.0) * 0.12;
          
          pos.z += wave1 + wave2 + wave3;
          vZ = pos.z;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        uniform float time;
        varying vec2 vUv;
        varying float vZ;
        
        void main() {
          float mixValue = (sin(time * 0.5) + 1.0) * 0.5;
          vec3 color = mix(color1, color2, vUv.x);
          color = mix(color, color3, vUv.y * mixValue);
          color += vZ * 0.5;
          
          gl_FragColor = vec4(color, 0.15);
        }
      `,
      transparent: true,
      wireframe: true,
      side: THREE.DoubleSide,
    }),
    []
  )
  
  useFrame((state) => {
    if (meshRef.current && meshRef.current.material) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      if (material.uniforms?.time) {
        material.uniforms.time.value = state.clock.elapsedTime
      }
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={[0, -3, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      material={shaderMaterial}
    >
      <planeGeometry args={[15, 15, 60, 60]} />
    </mesh>
  )
}

// Cubes flottants
function FloatingCubes() {
  const cubesRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (cubesRef.current) {
      cubesRef.current.rotation.y = state.clock.elapsedTime * 0.05
      cubesRef.current.children.forEach((child, i) => {
        child.rotation.x = state.clock.elapsedTime * (0.1 + i * 0.02)
        child.rotation.y = state.clock.elapsedTime * (0.15 + i * 0.03)
      })
    }
  })

  return (
    <group ref={cubesRef}>
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 4
        return (
          <Box
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(i * 0.5) * 2,
              Math.sin(angle) * radius
            ]}
            args={[0.5, 0.5, 0.5]}
          >
            <meshStandardMaterial
              color={i % 2 === 0 ? '#00F5FF' : '#FF00A8'}
              emissive={i % 2 === 0 ? '#00F5FF' : '#FF00A8'}
              emissiveIntensity={0.3}
              metalness={0.9}
              roughness={0.1}
            />
          </Box>
        )
      })}
    </group>
  )
}

// Composant de caméra réactive au scroll
function ScrollCamera() {
  const { camera } = useThree()
  
  useFrame((state) => {
    // Animation douce de la caméra
    camera.position.z = 5 + Math.sin(state.clock.elapsedTime * 0.3) * 0.5
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.3
    camera.position.y = Math.cos(state.clock.elapsedTime * 0.15) * 0.2
  })
  
  return null
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
      >
        <fog attach="fog" args={['#0A0A0A', 5, 20]} />
        
        {/* Éclairage amélioré */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00F5FF" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#FF00A8" />
        <pointLight position={[0, 10, 0]} intensity={0.8} color="#9B51E0" />
        <spotLight
          position={[5, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          color="#00F5FF"
          castShadow
        />
        
        {/* Objets 3D */}
        <MorphingSphere />
        <SpinningTorus />
        <InteractiveParticles />
        <WaveGrid />
        <FloatingCubes />
        
        {/* Caméra réactive */}
        <ScrollCamera />
        
        {/* Environnement */}
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
