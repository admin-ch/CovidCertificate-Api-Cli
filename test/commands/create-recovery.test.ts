import {expect, test} from '@oclif/test'
import * as fs from 'fs-extra'
import {baseFlagValues, okCreateResponse, personFlagValues, recoveryFlagValues, values} from '../utils'
import * as path from 'path'

describe('create-recovery', () => {
  test
  .nock(values.baseUrl, api =>
    api.post('/api/v1/covidcertificate/recovery')
    .reply(200, okCreateResponse))
  .stdout()
  .command(['create-recovery', ...baseFlagValues, ...personFlagValues, ...recoveryFlagValues])
  .it('creates output files', ctx => {
    expect(ctx.stdout).to.contain(`${okCreateResponse.uvci}.pdf`)
    expect(ctx.stdout).to.contain(`${okCreateResponse.uvci}.png`)
    expect(fs.existsSync(path.join(values.outDir, `${okCreateResponse.uvci}.pdf`)))
  })
})
