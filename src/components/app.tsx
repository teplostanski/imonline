import React, {useEffect, useState} from 'react'

import {FetchIP} from '../features/fetch-ip.js'
import {PingInfo} from '../features/ping-info/ping-info.js'
import {SpeedTest} from '../features/speed-test-info/speed-test-info.js'
import {useStore} from '../store.js'
import {Wrapper} from './wrapper.js'


interface AppProps {
  isNoColor?: boolean
}

export const App = ({isNoColor = false}: AppProps) => {
  const {noColor, setNoColor} = useStore()
  const [error, setError] = useState('')

  useEffect(() => {
    setNoColor(isNoColor)
  }, [isNoColor, setNoColor])

  console.log(noColor)

  return (
    <Wrapper>
      <FetchIP />
      <PingInfo onError={setError} />
      {!error && <SpeedTest />}
    </Wrapper>
  )
}
