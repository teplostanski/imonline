/* eslint-disable @typescript-eslint/no-explicit-any */

import chalk from 'chalk'
import React, {useEffect, useState} from 'react'

import {FetchIP} from '../features/fetch-ip.js'
import {PingInfo} from '../features/ping-info/ping-info.js'
import {SpeedTest} from '../features/speed-test-info/speed-test-info.js'
import {useStore} from '../store.js'
import {Wrapper} from './wrapper.js'

interface AppProps {
  isNoColor?: boolean
  log?: null | string | undefined
}

export const useLogger = (category: string, value: any) => {
  const [loggedMessages, setLoggedMessages] = useState<any>({})
  const {hasLog: logOption} = useStore()

  useEffect(() => {
    const message = JSON.stringify(value, null, 2).replaceAll('\\n', '\n');
    if ((logOption === 'all' || logOption?.includes(category)) && !loggedMessages[message]) {
      console.log(`${chalk.magenta(category)}:`, message)
      setLoggedMessages((prev: any) => ({...prev, [message]: true}))
    }
  }, [category, value, logOption, loggedMessages])
}

export const App = ({isNoColor = false, log}: AppProps) => {
  const {setLog, setNoColor} = useStore()
  const [error, setError] = useState('')

  useLogger('flags', {noColor: isNoColor})

  useEffect(() => {
    setNoColor(isNoColor)
     setLog(log)
  }, [isNoColor, setNoColor])

  return (
    <Wrapper>
      <FetchIP />
      <PingInfo onError={setError} />
      {!error && <SpeedTest />}
    </Wrapper>
  )
}
