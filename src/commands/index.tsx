import {render} from 'ink'
import React from 'react'

import {App} from '../components/app.js'
import {Init} from '../init.js'

export default class Main extends Init {
  async run() {
    render(<App />)
  }
}
