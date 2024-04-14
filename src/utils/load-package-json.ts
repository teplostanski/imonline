import {readFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

export function loadPackageJson() {
  const pathToPackageJson = join(dirname(fileURLToPath(import.meta.url)), '..', 'package.json')
  return JSON.parse(readFileSync(pathToPackageJson, 'utf8'))
}