/*
 * Copyright (C) 2024 Igor Teplostanski <teplostanski@yandex.ru>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import {spawn} from 'node:child_process'

import {CheckIperfInstalled, RunIperfResult} from './speed-test-info.types.js'

export const checkIperfInstalled = (): Promise<CheckIperfInstalled> =>
  new Promise((resolve) => {
    const checkIperf = spawn('iperf3', ['--version'])

    checkIperf.on('error', () => {
      resolve({
        installed: false,
        message: 'iperf3 не установлен. Пожалуйста, установите iperf3 и перезапустите приложение.',
      })
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
    const process = spawn('iperf3', ['-c', 'speedtest.uztelecom.uz', '-p', '5200-5209', '-R', '-J'])
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
        log += `JSON parsing error: ${parseError}\n`
        output += message
        process.kill()
      }
    })

    process.on('exit', (code) => {
      if (code === 0 && !error) {
        resolve({log, output, success: true})
      } else {
        if (!error) error = 'Error executing command.'
        log += `Process exited with code ${code} and error ${error}\n`
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
