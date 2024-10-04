import React from 'react'
import { useFrame } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'
import { CelestialBody } from './CelestialBody'
import { useStore } from '../store'

const planets = [
  { name: 'Mercury', color: '#8C7853', size: 0.38, orbit: 5 },
  { name: 'Venus', color: '#FFA500', size: 0.95, orbit: 7 },
  { name: 'Earth', color: '#4169E1', size: 1, orbit: 10 },
  { name: 'Mars', color: '#FF4500', size: 0.53, orbit: 13 },
]

const nearEarthObjects = [
  { name: 'Asteroid 1', color: '#808080', size: 0.1, orbit: 11 },
  { name: 'Comet 1', color: '#00FFFF', size: 0.15, orbit: 12 },
  { name: 'PHA 1', color: '#FF0000', size: 0.2, orbit: 9 },
]

export const SolarSystem: React.FC = () => {
  const setSelectedObject = useStore((state) => state.setSelectedObject)

  const [sunProps, setSunProps] = useSpring(() => ({
    scale: [1, 1, 1],
    config: { mass: 1, tension: 280, friction: 60 },
  }))

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    setSunProps({ scale: [1 + Math.sin(time) * 0.04, 1 + Math.sin(time) * 0.04, 1 + Math.sin(time) * 0.04] })
  })

  return (
    <group>
      <animated.mesh scale={sunProps.scale} onClick={() => setSelectedObject({ name: 'Sun', type: 'star' })}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#FDB813" />
      </animated.mesh>
      
      {planets.map((planet) => (
        <CelestialBody key={planet.name} {...planet} type="planet" />
      ))}
      
      {nearEarthObjects.map((object) => (
        <CelestialBody key={object.name} {...object} type="neo" />
      ))}
    </group>
  )
}