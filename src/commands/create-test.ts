import {flags} from '@oclif/command'
import {baseFlags} from '../flags/base-flags'
import {personFlags} from '../flags/person-flags'
import {TestCertificateCreateDto} from '../api'
import {CertificateCreationClient} from '../api/api'
import {CreateCertificateBaseCommand} from '../create-certificate-base-command'

export default class CreateTest extends CreateCertificateBaseCommand {
  static description = 'create a test certificate'

  static flags = {
    ...baseFlags,
    ...personFlags,
    typeCode: flags.string(({
      description: 'type of test. This field is only mandatory when it is a PCR test.',
      required: false,
    })),
    manufacturerCode: flags.string(({
      description: 'test manufacturer code. This should only be sent when it is not a PCR test',
      required: false,
    })),
    sampleDateTime: flags.string({
      description: 'date and time of the test sample collection. Format: ISO 8601 date incl. time.',
      required: true,
    }),
    resultDateTime: flags.string({
      description: 'ate and time of the test result production (optional for rapid antigen test). Format: ISO 8601 date incl. time.',
      required: false,
    }),
    testingCentreOrFacility: flags.string(({
      description: 'name of centre or facility.',
      required: true,
    })),
    memberStateOfTest: flags.string({
      description: 'the country in which the covid certificate owner has been tested. Format: string (2 chars according to ISO 3166 Country Codes).',
      required: true,
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
          resultDateTime: flags.resultDateTime,
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
