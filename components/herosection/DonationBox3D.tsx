'use client'

import { useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'
import HeroSectionImage from "@/public/images/aboutus-bg.png"

function Box(props: ThreeElements['mesh']) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const texture = useTexture(HeroSectionImage.src)

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.2
    meshRef.current.rotation.y += delta * 0.2
  })

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.1 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[2.5, 2.5, 0.2]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

export default function DonationBox3D() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Box position={[0, 0, 0]} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

