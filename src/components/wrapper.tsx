/* eslint-disable unicorn/no-process-exit */
/* eslint-disable n/no-process-exit */
// src/components/wrapper.tsx
import {Box} from 'ink'
import React, {FC} from 'react'

import {useStore} from '../store/config.js'
import withExit from './with-exit.js'

interface WrapperProps {
  children: React.ReactNode
}

const Wrapper: FC<WrapperProps> = ({children}) => {
  const {noColor} = useStore()

  return (
    <Box margin={1}>
      <Box borderColor={noColor ? 'transparent' : 'green'} borderStyle="round" flexDirection="column" padding={1}>
        {children}
      </Box>
    </Box>
  )
}

const onExit = () => {
  process.exit(0)
}

const WrapperWithQuit = withExit(Wrapper, onExit)

export {WrapperWithQuit as Wrapper}
