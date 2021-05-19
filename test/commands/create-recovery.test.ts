import {expect, test} from '@oclif/test'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as os from 'os'
import {baseFlagValues, okCreateResponse, personFlagValues, recoveryFlagValues, values} from '../utils'

describe('create-recovery', () => {
  test
  .nock(values.baseUrl, api =>
    api.post('/api/v1/covidcertificate/recovery')
    .reply(200, okCreateResponse))
  .stdout()
  .stub(os, 'platform', () => 'foobar')
  .command(['create-recovery', ...baseFlagValues, ...personFlagValues, ...recoveryFlagValues])
  .it('creates output files', ctx => {
    expect(ctx.stdout).to.contain(`${okCreateResponse.uvci}.pdf`)
    expect(ctx.stdout).to.contain(`${okCreateResponse.uvci}.png`)
    expect(fs.existsSync(path.join(values.outDir, `${okCreateResponse.uvci}.pdf`)))
  })
})
