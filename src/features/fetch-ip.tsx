import axios from 'axios'
import chalk from 'chalk'
import {Newline, Text} from 'ink'
import Spinner from 'ink-spinner'
import React, {useEffect, useState} from 'react'

export const FetchIP = () => {
  const [externalIP, setExternalIP] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchIP = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get('https://api.ipify.org?format=json')
        setExternalIP(response.data.ip)
        setError('')
      } catch (error) {
        setError(`Не удалось получить внешний IP-адрес\n${chalk.red((error as Error).message)}`)
      } finally {
        setIsLoading(false)
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

  return (
    <>
      {isLoading ? (
        <Text>
          IP: <Spinner />
        </Text>
      ) : (
        <Text>IP: {chalk.cyan(externalIP)}</Text>
      )}
    </>
  )
}
