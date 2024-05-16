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
import React, {useEffect, useState} from 'react'

import {FetchIP} from '../../features/fetch-ip.js'
import {PingInfo} from '../../features/ping-info/ping-info.js'
import {SpeedTest} from '../../features/speed-test-info/speed-test-info.js'
import {useLogger} from '../../hooks/use-logger.js'
import {useStore} from '../../store/config.js'
import {UpdateNotifier} from '../update-notifier.js'
import {Wrapper} from '../wrapper.js'
import {AppProps} from './app.types.js'

export const App = ({isNoColor, log}: AppProps) => {
  const {setLog, setNoColor} = useStore()
  const [renderContent, setRenderContent] = useState(false)

  useLogger('flags', {noColor: isNoColor})

  useEffect(() => {
    setNoColor(isNoColor)
    setLog(log)

    if (isNoColor) {
      const timer = setTimeout(() => {
        setRenderContent(true)
      }, 50)
      return () => clearTimeout(timer)
    }

    setRenderContent(true)
  }, [isNoColor, log, setNoColor, setLog])

  if (!renderContent) {
    return null
  }

  return (
    <>
      <UpdateNotifier />
      <Wrapper>
        <FetchIP />
        <PingInfo />
        <SpeedTest />
      </Wrapper>
    </>
  )
}
