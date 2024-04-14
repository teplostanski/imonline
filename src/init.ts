import {Command} from '@oclif/core'

import {loadPackageJson} from './utils/load-package-json.js'

const pkg = loadPackageJson()

export abstract class Init extends Command {
  static summary = `${pkg.description}`

  public version: string = `${pkg.version}`

  async init(): Promise<void> {
    await super.init()
  }
}
