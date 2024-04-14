// store.ts
import {create} from 'zustand'

// types.ts
export interface StoreState {
  noColor: boolean
  setNoColor: (noColor: boolean) => void
}

export const useStore = create<StoreState>((set) => ({
  noColor: false,
  setNoColor: (noColor: boolean) => set({noColor}),
}))
