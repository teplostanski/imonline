import {spawn} from 'node:child_process'

import {CheckIperfInstalled, TimeFormat} from './speed-test-info.types.js'

export const checkIperfInstalled = (): Promise<CheckIperfInstalled> =>
  new Promise((resolve) => {
    const checkIperf = spawn('iperf3', ['--version'])

    checkIperf.on('error', () => {
      resolve({installed: false, message: 'iperf3 не установлен. Пожалуйста, установите iperf3 для продолжения теста.'})
    })

    checkIperf.on('exit', (code) => {
      if (code === 0) {
        resolve({installed: true, message: ''})
      } else {
        resolve({installed: false, message: 'iperf3 не найден.'})
      }
    })
  })

export const formatDuration = (duration: number, format: TimeFormat): string => {
  switch (format) {
    case 's': {
      return `${(duration / 1000).toFixed(2)} с`
    }

    case 'ms': {
      return `${duration} мс`
    }

    default: {
      return `${(duration / 1000).toFixed(2)} с`
    }
  }
}
