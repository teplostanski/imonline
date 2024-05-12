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
