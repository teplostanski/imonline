export type TimeFormat = 'ms' | 's'

export interface IperfResult {
  end: {
    sum_received: {
      bits_per_second: number
    }
    sum_sent: {
      bits_per_second: number
    }
  }
}

export interface CheckIperfInstalled {
  installed: boolean
  message: string
}

export interface RunIperfResult {
  error?: string
  log?: string
  output?: string
  success: boolean
}
