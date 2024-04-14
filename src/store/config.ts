import {create} from 'zustand'

import {ConfigState} from './config.types.js'

export const useStore = create<ConfigState>((set) => ({
  hasLog: null,
  noColor: false,
  setLog: (hasLog: null | string | undefined) => set({hasLog}),
  setNoColor: (noColor: boolean) => set({noColor}),
}))
