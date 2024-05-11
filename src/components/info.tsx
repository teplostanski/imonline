import {Box, Newline, Text} from 'ink'
import React, {FC} from 'react'

import {useStore} from '../store/config.js'
import {colorText} from '../utils/color-text.js'
import {color} from '../utils/get-color.js'

interface InfoProps {
  children: React.ReactNode
  error?: React.ReactNode | string
  margin?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
  marginTop?: number
  padding?: number
  paddingBottom?: number
  paddingLeft?: number
  paddingRight?: number
  paddingTop?: number
  postError?: React.ReactNode | string
}

const Info: FC<InfoProps> = ({
  children,
  error,
  margin = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
  marginTop = 0,
  padding = 0,
  paddingBottom = 0,
  paddingLeft = 1,
  paddingRight = 1,
  paddingTop = 0,
  postError,
}) => {
  const {noColor} = useStore()

  const handleBorderColor = () => {
    if (noColor) {
      return 'transparent'
    }

    if (error) {
      return color.inkError
    }

    return color.inkInfo
  }

  return (
    <Box>
      <Box
        borderColor={handleBorderColor()}
        borderStyle="round"
        flexDirection="column"
        margin={margin}
        marginBottom={marginBottom}
        marginLeft={marginLeft}
        marginRight={marginRight}
        marginTop={marginTop}
        padding={padding}
        paddingBottom={paddingBottom}
        paddingLeft={paddingLeft}
        paddingRight={paddingRight}
        paddingTop={paddingTop}
      >
        {error ? (
          <Text>
            <Text>{colorText(color.Error, `ОШИБКА: ${error}`, noColor)}</Text>
            <Newline />
            {postError}
          </Text>
        ) : (
          <>{children}</>
        )}
      </Box>
    </Box>
  )
}

export default Info
