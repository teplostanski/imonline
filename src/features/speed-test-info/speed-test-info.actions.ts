import {spawn} from 'node:child_process'

import {CheckIperfInstalled, RunIperfResult} from './speed-test-info.types.js'

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

export const runIperf = (): Promise<RunIperfResult> =>
  new Promise((resolve) => {
    const process = spawn('iperf3', ['-c', 'speedtest.uztelecom.uz', '-p', '5200-5209', '-J'])
    let output = ''
    let error = ''

    process.stdout.on('data', (data) => {
      const message = data.toString()

      try {
        const json = JSON.parse(message)
        if (json.error) {
          if (json.error.includes('the server is busy running a test. try again later')) {
            error = 'iperf уже обрабатывает подобный запрос, попробуйте позже'
          } else {
            error = json.error
          }
        } else {
          output += message
        }
      } catch (parseError) {
        console.log('Received non-JSON output or JSON parsing error:', parseError)
        output += message
      }
    })

    process.on('exit', (code) => {
      if (code === 0 && !error) {
        resolve({output, success: true})
      } else {
        resolve({error: error || 'Error executing command.', success: false})
      }
    })

    process.on('error', (err) => {
      console.log(`Process error: ${err.message}`)
      resolve({error: err.message, success: false})
    })
  })
