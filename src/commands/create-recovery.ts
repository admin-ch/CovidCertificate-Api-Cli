import {flags} from '@oclif/command'
import {baseFlags} from '../flags/base-flags'
import {personFlags} from '../flags/person-flags'
import {RecoveryCertificateCreateDto} from '../api'
import {CertificateCreationClient} from '../api/api'
import {CreateCertificateBaseCommand} from '../create-certificate-base-command'

export default class CreateRecovery extends CreateCertificateBaseCommand {
  static description = 'create a recovery certificate'

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

    this.configureDebug(flags)

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

    const logger = {log: this.log, warn: this.warn}
    const client = CertificateCreationClient.fromConfig(flags)
    const iterations = flags.testIterations ?? 1
    const outDir = flags.outDir
    const createFn = () => client.createRecoveryCertificate(createDto, logger)
    await this.createCertificate(createFn, outDir, iterations)
  }
}
