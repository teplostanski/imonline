/*
 * Copyright (C) 2024 Igor Teplostanski <teplostanski@yandex.ru>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
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
