import chalk from 'chalk'
import {Box} from 'ink'
import Spinner from 'ink-spinner'
import {spawn} from 'node:child_process'
import React, {useEffect, useState} from 'react'

import {getColor} from './get-ping-info.utils.js'

export const GetPingInfo = () => {
  const [pingInfo, setPingInfo] = useState({icmpSeq: '', time: ''})
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

  if (error) {
    return <Text>{chalk.red(error)}</Text>
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
    </Box>
  )
}
