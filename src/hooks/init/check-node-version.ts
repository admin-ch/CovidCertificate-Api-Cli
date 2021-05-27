import {Hook} from '@oclif/config'
import * as error from '@oclif/errors'
import * as path from 'path'
import * as semver from 'semver'
import createDebug from 'debug'

const debug = createDebug('cc-cli:node-version')
const hook: Hook<'init'> = async function (_) {
  const currentVersion = process.versions.node
  debug(`Node version: ${currentVersion}`)
  const root = path.join(__dirname, '..', '..', '..')
  const pjson = require(path.join(root, 'package.json'))
  if (!semver.satisfies(currentVersion, pjson.engines.node)) {
    throw new error.CLIError(
      `Node version must be ${pjson.engines.node} to use this CLI\nCurrent node version: ${currentVersion}`, {
        exit: 1,
      })
  }
}

export default hook
