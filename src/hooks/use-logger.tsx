/* eslint-disable @typescript-eslint/no-explicit-any */
import chalk from 'chalk'
import {useEffect, useState} from 'react'

import {useStore} from '../store.js'

export const useLogger = (category: string, value: any) => {
  const [loggedMessages, setLoggedMessages] = useState<any>({})
  const {hasLog: logOption} = useStore()

  useEffect(() => {
    const message = JSON.stringify(value, null, 2).replaceAll('\\n', '\n')
    if ((logOption === 'all' || logOption?.includes(category)) && !loggedMessages[message]) {
      console.log(`${chalk.magenta(category)}:`, message)
      setLoggedMessages((prev: any) => ({...prev, [message]: true}))
    }
  }, [category, value, logOption, loggedMessages])
}
