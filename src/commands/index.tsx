import { Flags } from '@oclif/core'
import {render} from 'ink'
import React from 'react'

import {App} from '../components/app.js'
import {Init} from '../init.js'

export default class Main extends Init {
  static flags = {
    version: Flags.boolean({
      char: 'v',
      summary: 'Print version',
    }),
  }
  
  async run() {
    const {flags} = await this.parse(Main)
    if (flags.version) this.log(this.version)
    if (!flags) render(<App />)
  }
}
