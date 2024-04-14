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
            process.kill()
            
            // │ unable to receive control      │
            // │ message - port may not be      │
            // │ available, the other side may  │
            // │ have stopped running, etc.:    │
            // │ Connection reset by peer  
          } else {
            error = json.error
          }
        } else {
          output += message
          process.kill();
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
        if (!error) error = 'Error executing command.';
        console.log(`Process exited with code ${code} and error ${error}`);
        process.kill(); // Убедимся, что процесс завершен
        resolve({error, success: false});
      }
    })

    process.on('error', (err) => {
      console.log(`Process error: ${err.message}`);
      process.kill(); // Убиваем процесс при любой ошибке
      resolve({error: err.message, success: false});
    });
  })
