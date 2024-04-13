// src/ui/ink/index.tsx

import {Box} from 'ink'
import React, {FC} from 'react'

import withExit from './with-exit.js'

interface WrapperProps {
  children: React.ReactNode
}

const Wrapper: FC<WrapperProps> = ({children}) => (
  <Box margin={1}>
    <Box borderColor="green" borderStyle="round" flexDirection="column" padding={1}>
      {children}
    </Box>
  </Box>
)

const onExit = () => {
  // eslint-disable-next-line n/no-process-exit, unicorn/no-process-exit
  process.exit(0)
}

const WrapperWithQuit = withExit(Wrapper, onExit)

export {WrapperWithQuit as Wrapper}
