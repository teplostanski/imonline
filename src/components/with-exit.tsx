import {Box, Text, useApp, useInput} from 'ink'
import React, {ComponentType, FC} from 'react'

import {useStore} from '../store/config.js'
import {colorText} from '../utils/color-text.js'
import {color} from '../utils/get-color.js'

const withExit =
  <P extends object>(WrappedComponent: ComponentType<P>): FC<P> =>
  (props: P) => {
    const app = useApp()
    const {noColor} = useStore()

    useInput((input) => {
      if (input === 'q' || input === 'й') {
        app.exit()
      }
    })

    return (
      <>
        <WrappedComponent {...props} />
        <Box marginLeft={2}>
          <Text>{colorText(color.Gray, 'q - выход', noColor)}</Text>
        </Box>
      </>
    )
  }

export default withExit
