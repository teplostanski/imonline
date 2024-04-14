import axios from 'axios'
import {Newline, Text} from 'ink'
import Spinner from 'ink-spinner'
import React, {useEffect, useState} from 'react'

import {useStore} from '../store/config.js'
import {colorText} from '../utils/color-text.js'
import {color} from '../utils/get-color.js'

export const FetchIP = () => {
  const {noColor} = useStore()
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
        setError(
          `${colorText(color.Error, `Ошибка: Не удалось получить внешний IP-адрес\n${(error as Error).message}`, noColor)}`,
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchIP()
  }, [])

  if (error) {
    return (
      <>
        <Text>{error}</Text>
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
        <Text>IP: {colorText(color.Cyan, externalIP, noColor)}</Text>
      )}
    </>
  )
}
