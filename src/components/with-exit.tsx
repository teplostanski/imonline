import {Box, Text, useInput} from 'ink'
import React, {ComponentType, FC} from 'react'

const withExit =
  <P extends object>(WrappedComponent: ComponentType<P>, onExit: () => void): FC<P> =>
  (props: P) => {
    useInput((input) => {
      if (input === 'q' || input === 'й') {
        onExit()
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
