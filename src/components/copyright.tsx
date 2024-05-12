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
// import Link from 'ink-link'
import React, {useEffect} from 'react'

import {useStore} from '../store/config.js'
import {colorText} from '../utils/color-text.js'
import {color} from '../utils/get-color.js'
import {loadPackageJson} from '../utils/load-package-json.js'
import {yearComparison} from '../utils/year-comparison.js'

export const Copyright = ({isNoColor}: {isNoColor?: boolean | undefined}) => {
  const {noColor, setNoColor} = useStore()
  const pkg = loadPackageJson()

  useEffect(() => {
    setNoColor(isNoColor)
  }, [isNoColor, setNoColor])

  return (
    <Box>
      <Box
        borderColor={noColor ? 'transparent' : 'yellow'}
        borderStyle="round"
        flexDirection="column"
        padding={1}
        paddingLeft={2}
        paddingRight={2}
      >
        <Text>
          {yearComparison(2024)}; Copyright(c) {colorText(color.Cyan, pkg.author.name, noColor)}
          <Newline />
          License: {colorText(color.Cyan, pkg.license, noColor)}
          <Newline />
          Email: {colorText(color.Cyan, pkg.author.email, noColor)}
          <Newline />
          Homepage: {/* <Link fallback={false} url={pkg.homepage}> */}
          {colorText(color.Magenta, pkg.homepage, noColor)}
          {/* </Link> */}
          <Newline />
          Personal website: {/* <Link fallback={false} url={pkg.author.url}> */}
          {colorText(color.Magenta, pkg.author.url, noColor)}
          {/* </Link> */}
          <Newline />
          Donate: {/* <Link fallback={false} url={pkg.funding.url}> */}
          {colorText(color.Magenta, pkg.funding.url, noColor)}
          {/* </Link> */}
        </Text>
      </Box>
    </Box>
  )
}
