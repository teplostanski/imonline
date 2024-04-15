/* eslint-disable padding-line-between-statements */
/* eslint-disable unicorn/no-process-exit */
/* eslint-disable n/no-process-exit */
// src/components/wrapper.tsx
import {Box} from 'ink'
import {kill, lookup} from 'ps-node'
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
  if (typeof global.iperfPid === 'number') {
    lookup({pid: global.iperfPid}, (err, resultList) => {
      if (err) {
        console.error('Ошибка при проверке процесса:', err.message)
        process.exit(1)
      }

      if (resultList && resultList.length > 0) {
        kill(global.iperfPid as number, (err) => {
          if (err) {
            console.error('Ошибка при попытке убить процесс:', err.message)
          }
          process.exit(0)
        })
      } else {
        process.exit(0)
      }
    })
  } else {
    console.log('PID не задан или невалиден, операция прервана.')
    process.exit(0)
  }
}

const WrapperWithQuit = withExit(Wrapper, onExit)

export {WrapperWithQuit as Wrapper}
