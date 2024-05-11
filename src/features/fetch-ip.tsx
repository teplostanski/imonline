import axios from 'axios'
import {Text} from 'ink'
import Spinner from 'ink-spinner'
import React, {useEffect, useState} from 'react'

import Info from '../components/info.js'
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
        setError(`Не удалось получить внешний IP-адрес\n${(error as Error).message}`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchIP()
  }, [])

  return (
    <Info error={error}>
      {isLoading ? (
        <Text>
          IP: <Spinner />
        </Text>
      ) : (
        <Text>IP: {colorText(color.Cyan, externalIP, noColor)}</Text>
      )}
    </Info>
  )
}
