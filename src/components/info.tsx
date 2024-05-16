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
            {postError && (
              <>
                <Newline />
                {postError}
              </>
            )}
          </Text>
        ) : (
          <>{children}</>
        )}
      </Box>
    </Box>
  )
}

export default Info
