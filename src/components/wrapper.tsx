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

const WrapperWithQuit = withExit(Wrapper)

export {WrapperWithQuit as Wrapper}
