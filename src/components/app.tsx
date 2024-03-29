import React, {useState} from 'react'

import {FetchExternalIP} from '../features/fetch-ip.js'
import {PingInfo} from '../features/ping-info/ping-info.js'
import {SpeedTest} from '../features/speed-test-info/speed-test-info.js'
import { Wrapper } from './wrapper.js'

export const App = () => {
  const [error, setError] = useState('')
  return (
    <Wrapper>
      <FetchExternalIP />
      <PingInfo onError={setError} />
      {!error && <SpeedTest />}
    </Wrapper>
  )
}
