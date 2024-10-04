import React from 'react'
import { useStore } from '../store'
import { Info } from 'lucide-react'

export const InfoPanel: React.FC = () => {
  const selectedObject = useStore((state) => state.selectedObject)

  if (!selectedObject) return null

  const getInfo = () => {
    switch (selectedObject.type) {
      case 'star':
        return "The Sun is the star at the center of the Solar System. It's a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core."
      case 'planet':
        return `${selectedObject.name} is a planet in our Solar System. Planets are celestial bodies that orbit stars and have cleared their neighboring region of planetesimals.`
      case 'neo':
        return `${selectedObject.name} is a Near-Earth Object (NEO). NEOs are asteroids, comets, and large meteoroids whose orbit brings them close to Earth's orbit.`
      default:
        return 'No information available.'
    }
  }

  return (
    <div className="absolute bottom-4 left-4 bg-gray-800 bg-opacity-80 p-4 rounded-lg max-w-md">
      <div className="flex items-center space-x-2 mb-2">
        <Info className="w-5 h-5" />
        <h2 className="text-xl font-bold">{selectedObject.name}</h2>
      </div>
      <p>{getInfo()}</p>
    </div>
  )
}