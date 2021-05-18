import {Command, flags} from '@oclif/command'
import * as fs from 'fs-extra'
import {baseFlags, outDir} from '../flags/base-flags'
import {personFlags} from '../flags/person-flags'
import {RecoveryCertificateCreateDto} from '../api'
import {CertificateCreationClient} from '../api/api'
import * as path from 'path'

export default class CreateRecovery extends Command {
  static description = 'describe the command here'

  static flags = {
    ...baseFlags,
    ...personFlags,
    dateOfFirstPositiveTestResult: flags.string({
      description: 'date when the sample for the test was collected. Format: ISO 8601 date without time. Range: can be between 1900-01-01 and 2099-12-31',
      required: true,
    }),
    countryOfTest: flags.string({
      description: 'the country in which the covid certificate owner has been tested. Format: string (2 chars according to ISO 3166 Country Codes).',
      required: true,
    }),
  }

  static args = []

  async run() {
    const {flags} = this.parse(CreateRecovery)

    const createDto: RecoveryCertificateCreateDto = {
      otp: flags.otp,
      name: {
        familyName: flags.familyName,
        givenName: flags.givenName,
      },
      dateOfBirth: flags.dateOfBirth,
      recoveryInfo: [{
        dateOfFirstPositiveTestResult: flags.dateOfFirstPositiveTestResult,
        countryOfTest: flags.countryOfTest,
      }],
      language: flags.language,
    }

    const client = CertificateCreationClient.fromConfig(flags)
    const response = await client.createRecoveryCertificate(createDto)
    this.log(`Certificate created. uvci: ${response.uvci ?? '<EMPTY>'}`)
    if (!response.pdf || !response.qrCode) {
      this.error('API send empty pdf or qrCode.')
      this.exit(1)
      return
    }

    await fs.ensureDir(flags.outDir)
    await this.saveFile(response.pdf, response.uvci ?? 'empty-uvci', flags.outDir, '.pdf')
    await this.saveFile(response.qrCode, response.uvci ?? 'empty-uvci', flags.outDir, '.png')
  }

  async saveFile(base64: string, uvci: string, outDir: string, extension: string) {
    const file = path.join(outDir, `${uvci}${extension}`)
    const data = Buffer.from(base64, 'base64')
    await fs.writeFile(file, data)
    this.log(`Output: ${file}`)
  }
}
