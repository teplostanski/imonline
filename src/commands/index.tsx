import {Flags} from '@oclif/core'
import {render} from 'ink'
import React from 'react'

import {App} from '../components/app/app.js'
import {Copyright} from '../components/copyright.js'
import {Init} from '../init.js'

export default class Main extends Init {
  static flags = {
    copyright: Flags.boolean({
      char: 'c',
      summary: 'Show copyright',
    }),
    log: Flags.string({
      hidden: true,
      options: ['flags', 'speed-test:log', 'speed-test:errors', 'speed-test:output', 'test:logs', 'all'],
    }),
    nocolor: Flags.boolean({
      summary: 'Disable colored output',
    }),
    version: Flags.boolean({
      char: 'v',
      summary: 'Print version',
    }),
  }

  async run() {
    try {
      const {flags} = await this.parse(Main)

      if (flags.log === 'flags') this.log('Flags received:', flags)

      if (flags.version) {
        this.log(this.version)
        return
      }

      if (flags.copyright) {
        render(<Copyright isNoColor={flags.nocolor} />)
        return
      }

      render(<App isNoColor={flags.nocolor} log={flags.log} />)
    } catch (error) {
      console.error('Error during command execution:', error)
    }
  }
}
