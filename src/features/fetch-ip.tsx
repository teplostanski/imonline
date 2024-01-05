import axios from 'axios'
import chalk from 'chalk'
import {Newline, Text} from 'ink'
import React, {useEffect, useState} from 'react'

export const FetchExternalIP = () => {
  const [externalIP, setExternalIP] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json')
        setExternalIP(response.data.ip)
        setError('')
      } catch (error) {
        setError(`Ошибка: Не удалось получить внешний IP-адрес\n${chalk.red((error as Error).message)}`)
      }
    }

    fetchIP()
  }, [])

  if (error) {
    return (
      <>
        <Text>{chalk.red(error)}</Text>
        <Newline />
      </>
    )
  }

  return <Text>IP: {chalk.cyan(externalIP)}</Text>
}
