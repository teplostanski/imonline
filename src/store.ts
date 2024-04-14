// store.ts
import {create} from 'zustand'

// types.ts
export interface StoreState {
  hasLog: null | string | undefined
  noColor: boolean
  setLog: (hasLog: null | string | undefined) => void
  setNoColor: (noColor: boolean) => void
}

export const useStore = create<StoreState>((set) => ({
  hasLog: null,
  noColor: false,
  setLog: (hasLog: null | string | undefined) => set({hasLog}),
  setNoColor: (noColor: boolean) => set({noColor}),
}))
