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
/* eslint-disable @typescript-eslint/no-explicit-any */
import chalk from 'chalk'
import {useEffect, useState} from 'react'

import {useStore} from '../store/config.js'

export const useLogger = (category: string, value: any) => {
  const [loggedMessages, setLoggedMessages] = useState<any>({})
  const {hasLog: logOption} = useStore()

  useEffect(() => {
    const message = JSON.stringify(value, null, 2).replace('\\n', '\n')
    if ((logOption === 'all' || logOption?.includes(category)) && !loggedMessages[message]) {
      console.log(`${chalk.magenta(category)}:`, message)
      setLoggedMessages((prev: any) => ({...prev, [message]: true}))
    }
  }, [category, value, logOption, loggedMessages])
}
