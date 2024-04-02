import {Command} from '@oclif/core'
import {render} from 'ink'
import React from 'react'

import {App} from '../components/app.js'

export default class Main extends Command {
  static description = "Network Checker is a user-friendly CLI (TUI) application that offers real-time IP discovery, ping statistics, and speed testing to optimize your network performance."
  async run() {
    render(<App />)
  }
}
