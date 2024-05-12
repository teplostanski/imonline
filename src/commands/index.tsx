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
      options: ['flags', 'speed-test:log', 'speed-test:errors', 'speed-test:output', 'test:logs', 'all', 'pid'],
    }),
    nocolor: Flags.boolean({
      char: 'N',
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
