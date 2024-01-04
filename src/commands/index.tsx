import {Command} from '@oclif/core'
import {render} from 'ink'
import React from 'react'

import {App} from '../components/app.js'

export default class Main extends Command {
  async run() {
    render(<App />)
  }
}
