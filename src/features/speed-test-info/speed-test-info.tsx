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
import {Box, Text, useInput} from 'ink'
import Spinner from 'ink-spinner'
import React, {useEffect, useState} from 'react'

import Info from '../../components/info.js'
import {useLogger} from '../../hooks/use-logger.js'
import {useStore} from '../../store/config.js'
import {colorText} from '../../utils/color-text.js'
import {color} from '../../utils/get-color.js'
import {checkIperfInstalled, runIperf} from './speed-test-info.actions.js'
import {CheckIperfInstalled, IperfResult, RunIperfResult} from './speed-test-info.types.js'
import {formatDuration} from './speed-test-info.utils.js'

export const SpeedTest = () => {
  const [iperfInstalled, setIperfInstalled] = useState(false)
  const [speedTestResult, setSpeedTestResult] = useState<IperfResult | null>(null)
  const [speedTestJson, setSpeedTestJson] = useState<null | string>(null)
  const [isTesting, setIsTesting] = useState(false)
  const [error, setError] = useState('')
  const [displayUnits, setDisplayUnits] = useState<'MBps' | 'Mbps'>('Mbps')
  const [timeFormat, setTimeFormat] = useState<'ms' | 's'>('s')
  const [testDuration, setTestDuration] = useState('')
  const [rawDuration, setRawDuration] = useState<number>(0)
  const [showHints, setShowHints] = useState(false)
  const [hasStart, setHasStart] = useState(false)
  const [log, setLog] = useState('')
  const [timer, setTimer] = useState<null | number>(null)
  const {noColor} = useStore()

  useLogger('speed-test:log', log)
  useLogger('speed-test:errors', error)
  useLogger('speed-test:output', speedTestJson)

  useEffect(() => {
    setTestDuration(formatDuration(rawDuration, timeFormat))
  }, [rawDuration, timeFormat])

  useInput((input) => {
    if (input === 's' || input === 'ы') {
      setHasStart(true)
    }

    if (input === '?') {
      setShowHints(!showHints)
    }

    if (input === 'u' || input === 'г') {
      setDisplayUnits((prevUnits) => (prevUnits === 'Mbps' ? 'MBps' : 'Mbps'))
    }

    if (input === 'r' || (input === 'к' && !isTesting && timer === null)) {
      setTimer(10)
    }

    if (input === 't' || input === 'е') {
      setTimeFormat((currentFormat) => {
        const newFormat = currentFormat === 's' ? 'ms' : 's'
        setTestDuration(formatDuration(rawDuration, newFormat))
        return newFormat
      })
    }
  })

  useEffect(() => {
    if (timer !== null) {
      if (timer > 0) {
        setTimeout(() => setTimer(timer - 1), 1000)
      } else {
        runTest()
        setTimer(null)
      }
    }
  }, [timer])

  useEffect(() => {
    if (hasStart) {
      const init = async () => {
        const result: CheckIperfInstalled = await checkIperfInstalled()
        setIperfInstalled(result.installed)
        if (result.installed) {
          runTest()
        } else {
          setError(result.message)
        }
      }

      init()
    }
  }, [hasStart])

  async function runTest() {
    setError('')
    setIsTesting(true)
    const startTime = Date.now()
    const result: RunIperfResult = await runIperf()
    const endTime = Date.now()
    const elapsedTime = endTime - startTime
    setRawDuration(elapsedTime)

    setLog(result.log || '')

    setIsTesting(false)

    if (result.success && result.output) {
      try {
        const data: IperfResult = JSON.parse(result.output)
        setSpeedTestResult(data)
        setSpeedTestJson(JSON.parse(result.output))
      } catch {
        setError('Ошибка при разборе результатов теста.')
      }
    } else {
      setError(result.error || 'Ошибка: Никогда такого небыло и вот опять.')
    }
  }

  const convertUnits = (bitsPerSecond: number) => {
    if (displayUnits === 'Mbps') {
      const mbps = bitsPerSecond / 1e6
      if (mbps < 1) {
        return `${(bitsPerSecond / 1e3).toFixed(2)} Кбит/с`
      }

      return `${mbps.toFixed(2)} Мбит/с`
    }

    const mbps = bitsPerSecond / 8e6
    if (mbps < 1) {
      return `${(bitsPerSecond / 8e3).toFixed(2)} КБайт/с`
    }

    return `${mbps.toFixed(2)} МБайт/с`
  }

  const toggleDisplaySpeedUnit = () => (displayUnits === 'Mbps' ? 'байтах' : 'битах')

  const toggleDisplayDrationUnit = () => (timeFormat === 's' ? 'миллисекундах' : 'секундах')

  const restartTest = (timer: number) => (
    <Text>{colorText(color.Green, `Перезапуск через: ${timer.toString()} секунд`, noColor)}</Text>
  )

  const printHint = (text: string) => <Text>{colorText(color.Gray, text, noColor)}</Text>

  const postError = () => {
    if (timer !== null) {
      return restartTest(timer)
    }

    return printHint('r - перезапустить тест')
  }

  return (
    <Info error={error} postError={postError()}>
      {hasStart ? (
        <Box flexDirection="column">
          {iperfInstalled &&
            (isTesting || !speedTestResult ? (
              <>
                <Text>
                  Скорость загрузки: <Spinner />
                </Text>
                <Text>
                  Скорость отдачи: <Spinner />
                </Text>
              </>
            ) : (
              <>
                <Text>Скорость загрузки: {convertUnits(speedTestResult.end.sum_received.bits_per_second)}</Text>
                <Text>Скорость отдачи: {convertUnits(speedTestResult.end.sum_sent.bits_per_second)}</Text>
                <Text>Пройден за: {testDuration}</Text>
                {timer !== null && restartTest(timer)}
                {showHints ? (
                  <>
                    <Text>{printHint('r - перезапустить тест')}</Text>
                    <Text>{printHint(`u - отобразить скорость в ${toggleDisplaySpeedUnit()}`)}</Text>
                    <Text>{printHint(`t - отобразить время в ${toggleDisplayDrationUnit()}`)}</Text>
                    <Text>{printHint('? - скрыть подсказки')}</Text>
                  </>
                ) : (
                  <Text>{printHint('? - показать подсказки')}</Text>
                )}
              </>
            ))}
        </Box>
      ) : (
        <Text>{printHint('s - тест скорости')}</Text>
      )}
    </Info>
  )
}
