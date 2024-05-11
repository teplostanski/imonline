import {Box, Text} from 'ink'
import React, {FC} from 'react'

import {useStore} from '../store/config.js'
import {colorText} from '../utils/color-text.js'
import {color} from '../utils/get-color.js'

interface ErrorProps {
  children: React.ReactNode
  margin?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
  marginTop?: number
}

const Error: FC<ErrorProps> = ({
  children,
  margin = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
  marginTop = 0,
}) => {
  const {noColor} = useStore()

  return (
    <Box margin={1}>
      <Box
        borderColor={noColor ? 'transparent' : color.inkError}
        borderStyle="round"
        flexDirection="column"
        margin={margin}
        marginBottom={marginBottom}
        marginLeft={marginLeft}
        marginRight={marginRight}
        marginTop={marginTop}
      >
        <Text>{colorText(color.Error, `ОШИБКА: ${children}`, noColor)}</Text>
      </Box>
    </Box>
  )
}

export default Error
