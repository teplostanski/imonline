import {Box, Text} from 'ink'
import React from 'react'

import {useStore} from '../store.js'
import {colorText} from '../utils/color-text.js'
import {color} from '../utils/get-color.js'
import {loadPackageJson} from '../utils/load-package-json.js'

function yearComparison(initYear: number) {
  const currentYear = new Date().getFullYear()
  if (initYear === currentYear) {
    return currentYear.toString()
  }

  return `${initYear}-${currentYear}`
}

export const Copyright = () => {
  const {noColor} = useStore()
  const pkg = loadPackageJson()

  return (
    <Box>
      <Box borderColor={noColor ? 'transparent' : 'yellow'} borderStyle="round" flexDirection="column" padding={1}>
        <Text>
          {yearComparison(2023)}; Copyright(c) {colorText(color.Cyan, pkg.author, noColor)}
        </Text>
      </Box>
    </Box>
  )
}
