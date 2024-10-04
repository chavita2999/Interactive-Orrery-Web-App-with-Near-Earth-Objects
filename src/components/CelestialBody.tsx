import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'
import { useStore } from '../store'

interface CelestialBodyProps {
  name: string
  color: string
  size: number
  orbit: number
  type: 'planet' | 'neo'
}

export const CelestialBody: React.FC<CelestialBodyProps> = ({ name, color, size, orbit, type }) => {
  const ref = useRef<THREE.Mesh>(null)
  const setSelectedObject = useStore((state) => state.setSelectedObject)

  const [spring, api] = useSpring(() => ({
    scale: [1, 1, 1],
    config: { mass: 1, tension: 280, friction: 60 },
  }))

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime() * 0.2
      ref.current.position.x = Math.sin(t) * orbit
      ref.current.position.z = Math.cos(t) * orbit
      ref.current.rotation.y += 0.01
    }
  })

  const handleClick = () => {
    setSelectedObject({ name, type })
    api.start({ scale: [1.2, 1.2, 1.2] })
    setTimeout(() => api.start({ scale: [1, 1, 1] }), 300)
  }

  return (
    <animated.mesh ref={ref} scale={spring.scale} onClick={handleClick}>
      <sphereGeometry args={[size * 0.5, 32, 32]} />
      <meshStandardMaterial color={color} />
    </animated.mesh>
  )
}