export interface ConfigState {
  hasLog: null | string | undefined
  noColor: boolean
  setLog: (hasLog: null | string | undefined) => void
  setNoColor: (noColor: boolean) => void
}
