import {flags} from '@oclif/command'
import {baseFlags} from '../flags/base-flags'
import {personFlags} from '../flags/person-flags'
import {RecoveryCertificateCreateDto} from '../api'
import {CertificateCreationClient} from '../api/api'
import {CreateCertificateBaseCommand} from '../create-certificate-base-command'

export default class CreateRecovery extends CreateCertificateBaseCommand {
  static description = 'create a recovery certificate'

  static examples = [
    `
    export CC_CLI_OTP="a.b.c"
    export CC_CLI_KEY_PASSPHRASE="secret"
    export CC_CLI_BASE_URL="https://ws.covidcertificate-a.bag.admin.ch/"
    export CC_CLI_CERTIFICATE_FILE="ZH-spital-A-t.bit.admin.ch.cer"
    export CC_CLI_KEY_FILE="ZH-spital-A-t.bit.admin.ch.encrypted.key"
    export CC_CLI_OUT_DIR="out"
    cc-cli create-recovery \\
      --language="it" \\
      --familyName="Rossi" \\
      --givenName="Giulia" \\
      --dateOfBirth="1964-03-14" \\
      --dateOfFirstPositiveTestResult="2020-01-01" \\
      --countryOfTest="CH"
    `,
  ]

  static flags = {
    ...baseFlags,
    ...personFlags,
    dateOfFirstPositiveTestResult: flags.string({
      description: 'date when the sample for the test was collected. Format: ISO 8601 date without time.',
      required: true,
      helpValue: '2020-01-01',
    }),
    countryOfTest: flags.string({
      description: 'the country in which the covid certificate owner has been tested. Format: string (2 chars according to ISO 3166 Country Codes).',
      required: true,
      helpValue: 'CH',
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
