import {expect, test} from '@oclif/test'
import {resourceFilePath} from '../utils'
import * as os from 'os'

describe('sign', () => {
  test
  .stdout()
  .command(['sign', `--keyFile=${resourceFilePath('dev.local.key')}`, resourceFilePath('test.json')])
  .it('signs test.json and outputs a base64 string', ctx => {
    const lines = ctx.stdout.trim().split(os.EOL)
    expect(lines).to.have.lengthOf(1)
    const buffer = Buffer.from(lines[0], 'base64')
    expect(buffer).to.have.lengthOf(256)
  })
})
