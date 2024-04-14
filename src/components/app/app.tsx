import React, {useEffect, useState} from 'react'

import {FetchIP} from '../../features/fetch-ip.js'
import {PingInfo} from '../../features/ping-info/ping-info.js'
import {SpeedTest} from '../../features/speed-test-info/speed-test-info.js'
import {useLogger} from '../../hooks/use-logger.js'
import {useStore} from '../../store/config.js'
import {Wrapper} from '../wrapper.js'
import {AppProps} from './app.types.js'

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
