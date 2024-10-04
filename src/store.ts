import { create } from 'zustand'

interface SelectedObject {
  name: string
  type: 'star' | 'planet' | 'neo'
}

interface StoreState {
  selectedObject: SelectedObject | null
  setSelectedObject: (object: SelectedObject | null) => void
}

export const useStore = create<StoreState>((set) => ({
  selectedObject: null,
  setSelectedObject: (object) => set({ selectedObject: object }),
}))