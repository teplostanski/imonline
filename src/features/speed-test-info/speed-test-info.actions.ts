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
    let log = ''

    process.stdout.on('data', (data) => {
      const message = data.toString()
      try {
        const json = JSON.parse(message)
        if (json.error) {
          log += `${json.error}\n`
          if (json.error.includes('the server is busy running a test. try again later')) {
            error = 'iperf уже обрабатывает подобный запрос, попробуйте позже'
            process.kill()

            // │ unable to receive control      │
            // │ message - port may not be      │
            // │ available, the other side may  │
            // │ have stopped running, etc.:    │
            // │ Connection reset by peer
          } else {
            error = json.error
            process.kill()
          }
        } else {
          output += message
          process.kill()
        }
      } catch (parseError) {
        log += `JSON parsing error: ${parseError}\n`;
        output += message
        process.kill()
      }
    })

    process.on('exit', (code) => {
      if (code === 0 && !error) {
        resolve({log, output, success: true})
      } else {
        if (!error) error = 'Error executing command.'
        log += `Process exited with code ${code} and error "${error}"\n`
        process.kill()
        resolve({error, log, success: false})
      }
    })

    process.on('error', (err) => {
      log += `Process error: ${err.message}\n`
      process.kill()
      resolve({error: err.message, log, success: false})
    })
  })
