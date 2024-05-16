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
import {Box, Text} from 'ink'
import React, {useEffect, useState} from 'react'
import updateNotifier from 'update-notifier'

import {useStore} from '../store/config.js'
import {colorText} from '../utils/color-text.js'
import {color} from '../utils/get-color.js'
import {packageJson} from '../utils/load-package-json.js'

export const UpdateNotifier = () => {
  const {noColor} = useStore()
  const [version, setVersion] = useState({current: '', latest: ''})

  useEffect(() => {
    const notifier = updateNotifier({
      pkg: packageJson,
      updateCheckInterval: 0,
    })
    if (notifier.update) {
      setVersion({current: notifier.update.current, latest: notifier.update.latest})
    }
  }, [])

  return (
    <>
      {version.current && version.latest && (
        <Box flexDirection="column">
          <Text>
            Update available {colorText(color.Gray, version.current, noColor)} →{' '}
            {colorText(color.Green, version.latest, noColor)}
          </Text>
          <Text>Run {colorText(color.Cyan, `npm i -g ${packageJson.name}@${version.latest}`, noColor)} to update</Text>
        </Box>
      )}
    </>
  )
}
