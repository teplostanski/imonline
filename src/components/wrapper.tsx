// src/components/wrapper.tsx
import {Box} from 'ink'
import React, {FC} from 'react'

import withExit from './with-exit.js'

interface WrapperProps {
  children: React.ReactNode
}

const Wrapper: FC<WrapperProps> = ({children}) => (
  <Box margin={1}>
    <Box flexDirection="column" padding={1}>
      {children}
    </Box>
  </Box>
)

const WrapperWithQuit = withExit(Wrapper)

export {WrapperWithQuit as Wrapper}
