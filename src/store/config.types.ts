export interface ConfigState {
  hasLog: null | string | undefined
  noColor: boolean | undefined
  setLog: (hasLog: null | string | undefined) => void
  setNoColor: (noColor: boolean | undefined) => void
}
