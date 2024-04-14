import {Command} from '@oclif/core'
import {readFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

function loadPackageJson() {
  const pathToPackageJson = join(dirname(fileURLToPath(import.meta.url)), '..', 'package.json')
  return JSON.parse(readFileSync(pathToPackageJson, 'utf8'))
}

const pkg = loadPackageJson()

export abstract class Init extends Command {
  static summary = `${pkg.description}`

  public version: string = `${pkg.version}`

  async init(): Promise<void> {
    await super.init()
  }
}
