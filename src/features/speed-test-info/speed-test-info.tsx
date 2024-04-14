import {Box, Newline, Text, useInput} from 'ink'
import Spinner from 'ink-spinner'
import React, {useEffect, useState} from 'react'

import {checkIperfInstalled, runIperf} from './speed-test-info.actions.js'
import {CheckIperfInstalled, IperfResult, RunIperfResult} from './speed-test-info.types.js'
import {formatDuration} from './speed-test-info.utils.js'

export const SpeedTest = () => {
  const [iperfInstalled, setIperfInstalled] = useState(false)
  const [speedTestResult, setSpeedTestResult] = useState<IperfResult | null>(null)
  const [isTesting, setIsTesting] = useState(false)
  const [error, setError] = useState('')
  const [displayUnits, setDisplayUnits] = useState<'MBps' | 'Mbps'>('Mbps')
  const [timeFormat, setTimeFormat] = useState<'ms' | 's'>('s')
  const [testDuration, setTestDuration] = useState('')
  const [rawDuration, setRawDuration] = useState<number>(0)
  const [showHints, setShowHints] = useState(false)

  useEffect(() => {
    setTestDuration(formatDuration(rawDuration, timeFormat))
  }, [rawDuration, timeFormat])

  useInput((input) => {
    if (input === '?') {
      setShowHints(!showHints)
    }

    if (input === 'u' || input === 'г') {
      setDisplayUnits((prevUnits) => (prevUnits === 'Mbps' ? 'MBps' : 'Mbps'))
    }

    if (
      (input === 'r' || input === 'к') && //
      !isTesting
    ) {
      runTest()
    }

    if (input === 't') {
      setTimeFormat((currentFormat) => {
        const newFormat = currentFormat === 's' ? 'ms' : 's'
        setTestDuration(formatDuration(rawDuration, newFormat))
        return newFormat
      })
    }
  })

  useEffect(() => {
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
  }, [])

  async function runTest() {
    setError('')
    setIsTesting(true)
    const startTime = Date.now()

    const result: RunIperfResult = await runIperf()
    const endTime = Date.now()
    const elapsedTime = endTime - startTime
    setRawDuration(elapsedTime)

    setIsTesting(false)

    if (result.success && result.output) {
      try {
        const data: IperfResult = JSON.parse(result.output)
        setSpeedTestResult(data)
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

  if (error) {
    return (
      <Text>
        <Text color="red">{error}</Text>
        <Newline />
        <Text color={'gray'}>r - перезапустить тест</Text>
      </Text>
    )
  }

  return (
    <Box flexDirection="column">
      {iperfInstalled ? (
        isTesting || !speedTestResult ? (
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
            {showHints ? (
              <>
                <Text color={'gray'}>u - отобразить скорость в {toggleDisplaySpeedUnit()}</Text>
                <Text color={'gray'}>t - отобразить время в {toggleDisplayDrationUnit()}</Text>
                <Text color={'gray'}>r - перезапустить тест</Text>
                <Text color={'gray'}>? - скрыть подсказки</Text>
              </>
            ) : (
              <Text color={'gray'}>? - показать подсказки</Text>
            )}
          </>
        )
      ) : (
        <Text>iperf3 не установлен. Пожалуйста, установите iperf3 для продолжения теста.</Text>
      )}
    </Box>
  )
}
