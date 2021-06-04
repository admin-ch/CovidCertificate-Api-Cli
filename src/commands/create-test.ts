import {flags} from '@oclif/command'
import {baseFlags} from '../flags/base-flags'
import {personFlags} from '../flags/person-flags'
import {TestCertificateCreateDto} from '../api'
import {CertificateCreationClient} from '../api/api'
import {CreateCertificateBaseCommand} from '../create-certificate-base-command'

export default class CreateTest extends CreateCertificateBaseCommand {
  static description = 'create a test certificate'

  static examples = [
    `
    export CC_CLI_OTP="a.b.c"
    export CC_CLI_KEY_PASSPHRASE="secret"
    export CC_CLI_BASE_URL="https://ws.covidcertificate-a.bag.admin.ch/"
    export CC_CLI_CERTIFICATE_FILE="ZH-spital-A-t.bit.admin.ch.cer"
    export CC_CLI_KEY_FILE="ZH-spital-A-t.bit.admin.ch.encrypted.key"
    export CC_CLI_OUT_DIR="out"
    cc-cli create-test \\
      --language="de" \\
      --familyName="Rochat" \\
      --givenName="Céline" \\
      --dateOfBirth="1964-03-14" \\
      --typeCode="LP6464-4" \\
      --sampleDateTime="2020-01-01T17:29:41.063Z" \\
      --testingCentreOrFacility="Walk-in-Lyss AG" \\
      --memberStateOfTest="CH"
    `,
  ]

  static flags = {
    ...baseFlags,
    ...personFlags,
    typeCode: flags.string(({
      description: 'type of test. This field is only mandatory when it is a PCR test.',
      required: false,
      helpValue: 'LP217198-3',
    })),
    manufacturerCode: flags.string(({
      description: 'test manufacturer code. This should only be sent when it is not a PCR test',
      required: false,
      helpValue: '1304',
    })),
    sampleDateTime: flags.string({
      description: 'date and time of the test sample collection. Format: ISO 8601 date incl. time.',
      required: true,
      helpValue: '2021-05-22T11:12:85Z',
    }),
    testingCentreOrFacility: flags.string(({
      description: 'name of centre or facility.',
      required: true,
      helpValue: 'Walk-in-Lyss AG',
    })),
    memberStateOfTest: flags.string({
      description: 'the country in which the covid certificate owner has been tested. Format: string (2 chars according to ISO 3166 Country Codes).',
      required: true,
      helpValue: 'CH',
    }),
  }

  static args = []

  async run() {
    const {flags} = this.parse(CreateTest)

    this.configureDebug(flags)

    const createDto: TestCertificateCreateDto = {
      otp: flags.otp,
      name: {
        familyName: flags.familyName,
        givenName: flags.givenName,
      },
      dateOfBirth: flags.dateOfBirth,
      testInfo: [
        {
          typeCode: flags.typeCode,
          manufacturerCode: flags.manufacturerCode,
          sampleDateTime: flags.sampleDateTime,
          testingCentreOrFacility: flags.testingCentreOrFacility,
          memberStateOfTest: flags.memberStateOfTest,
        },
      ],
      language: flags.language,
    }

    const logger = {log: this.log, warn: this.warn}
    const client = CertificateCreationClient.fromConfig(flags)
    const iterations = flags.testIterations ?? 1
    const outDir = flags.outDir
    const createFn = () => client.createTestCertificate(createDto, logger)
    await this.createCertificate(createFn, outDir, iterations)
  }
}
