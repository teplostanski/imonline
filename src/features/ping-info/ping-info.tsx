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
import {Box, Text} from 'ink'
import Spinner from 'ink-spinner'
import {spawn} from 'node:child_process'
import React, {FC, useEffect, useState} from 'react'

import Info from '../../components/info.js'
import {useStore} from '../../store/config.js'
import {getColor} from './ping-info.utils.js'

export const PingInfo: FC = () => {
  const [pingInfo, setPingInfo] = useState({icmpSeq: '', maxTime: '', minTime: '', time: ''})
  const [error, setError] = useState('')
  const {noColor} = useStore()

  useEffect(() => {
    const pingProcess = spawn('ping', ['ya.ru'])

    pingProcess.stdout.on('data', (data) => {
      const output = data.toString()
      const icmpSeqMatch = output.match(/icmp_seq=(\d+)/)
      const timeMatch = output.match(/time=(\d+\.?\d*)\s*ms/)

      if (icmpSeqMatch && timeMatch) {
        const newTime = timeMatch[1]
        const newIcmpSeq = icmpSeqMatch[1]

        setPingInfo((prev) => ({
          ...prev,
          icmpSeq: newIcmpSeq,
          time: newTime,
        }))
      }
    })

    pingProcess.on('error', (err) => {
      const errorMessage = `Ошибка выполнения ping: ${err.message}`
      setError(errorMessage)
    })

    pingProcess.on('close', (code) => {
      if (code !== 0) {
        const errorMessage = `Ping завершился с ошибкой\nПроверьте подключение к интернету\nИли смените хост в настройках`
        setError(errorMessage)
      }
    })

    return () => {
      pingProcess.kill()
    }
  }, [])

  useEffect(() => {
    const current = Number.parseFloat(pingInfo.time)
    const max = Number.parseFloat(pingInfo.maxTime)
    const min = Number.parseFloat(pingInfo.minTime)
    if (!pingInfo.time) return

    setPingInfo((prev) => ({
      ...prev,
      maxTime: !prev.maxTime || current > max ? pingInfo.time : prev.maxTime,
      minTime: !prev.minTime || current < min ? pingInfo.time : prev.minTime,
    }))
  }, [pingInfo.time])

  return (
    <Info error={error}>
      <Box flexDirection="column">
        <Box>
          {pingInfo.icmpSeq ? (
            <Text>ICMP Seq: {pingInfo.icmpSeq}, </Text>
          ) : (
            <Text>
              ICMP Seq: <Spinner />,{' '}
            </Text>
          )}
          {pingInfo.time ? (
            <Text>Пинг: {getColor(pingInfo.time, noColor)}</Text>
          ) : (
            <Text>
              Пинг: <Spinner />
            </Text>
          )}
        </Box>
        {pingInfo.time && (
          <Box>
            <Text>Мин.: {getColor(pingInfo.minTime, noColor)}, </Text>
            <Text>Макс.: {getColor(pingInfo.maxTime, noColor)}</Text>
          </Box>
        )}
      </Box>
    </Info>
  )
}
