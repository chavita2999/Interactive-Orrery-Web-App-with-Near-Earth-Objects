import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { SolarSystem } from './components/SolarSystem'
import { InfoPanel } from './components/InfoPanel'
import { Sun, Globe } from 'lucide-react'

function App() {
  return (
    <div className="w-full h-screen bg-black text-white">
      <Canvas camera={{ position: [0, 20, 25], fov: 60 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.1} />
          <pointLight position={[0, 0, 0]} intensity={1} />
          <SolarSystem />
          <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} />
          <OrbitControls />
        </Suspense>
      </Canvas>
      <InfoPanel />
      <div className="absolute top-4 left-4 flex items-center space-x-2">
        <Sun className="w-6 h-6" />
        <h1 className="text-2xl font-bold">Orrery Web App</h1>
      </div>
      <div className="absolute bottom-4 right-4 flex items-center space-x-2">
        <Globe className="w-5 h-5" />
        <span className="text-sm">Explore Near-Earth Objects</span>
      </div>
    </div>
  )
}

export default App