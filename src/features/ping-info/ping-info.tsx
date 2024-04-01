import {Box, Text} from 'ink'
import Spinner from 'ink-spinner'
import {spawn} from 'node:child_process'
import React, {FC, useEffect, useState} from 'react'

import {PingInfoProps} from './ping-info.types.js'
import {getColor} from './ping-info.utils.js'

export const PingInfo: FC<PingInfoProps> = ({onError}) => {
  const [pingInfo, setPingInfo] = useState({icmpSeq: '', maxTime: '', minTime: '', time: ''})
  const [error, setError] = useState('')

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
      onError(errorMessage)
    })

    pingProcess.on('close', (code) => {
      if (code !== 0) {
        const errorMessage = `Ping завершился с ошибкой\nПроверьте подключение к интернету\nИли смените хост в настройках`
        setError(errorMessage)
        onError(errorMessage)
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

  if (error) {
    return <Text color="red">{error}</Text>
  }

  return (
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
          <Text>Пинг: {getColor(pingInfo.time)}</Text>
        ) : (
          <Text>
            Пинг: <Spinner />
          </Text>
        )}
      </Box>
      {pingInfo.time && (
        <Box>
          <Text>Мин.: {getColor(pingInfo.minTime)}, </Text>
          <Text>Макс.: {getColor(pingInfo.maxTime)}</Text>
        </Box>
      )}
    </Box>
  )
}
