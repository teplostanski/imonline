import {Box, Text, useApp, useInput} from 'ink'
import React, {ComponentType, FC} from 'react'

const withExit =
  <P extends object>(WrappedComponent: ComponentType<P>): FC<P> =>
  (props: P) => {
    const app = useApp()

    useInput((input) => {
      if (input === 'q' || input === 'й') {
        app.exit()
      }
    })

    return (
      <>
        <WrappedComponent {...props} />
        <Box marginLeft={2}>
          <Text color="grey">q - выход</Text>
        </Box>
      </>
    )
  }

export default withExit
