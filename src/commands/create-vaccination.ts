import {flags} from '@oclif/command'
import {baseFlags} from '../flags/base-flags'
import {personFlags} from '../flags/person-flags'
import {VaccinationCertificateCreateDto} from '../api'
import {CertificateCreationClient} from '../api/api'
import {CreateCertificateBaseCommand} from '../create-certificate-base-command'

export default class CreateVaccination extends CreateCertificateBaseCommand {
  static description = 'create a vaccination certificate'

  static examples = [
    `
    export CC_CLI_OTP="a.b.c"
    export CC_CLI_KEY_PASSPHRASE="secret"
    export CC_CLI_BASE_URL="https://ws.covidcertificate-a.bag.admin.ch/"
    export CC_CLI_CERTIFICATE_FILE="ZH-spital-A-t.bit.admin.ch.cer"
    export CC_CLI_KEY_FILE="ZH-spital-A-t.bit.admin.ch.encrypted.key"
    export CC_CLI_OUT_DIR="out"
    cc-cli create-vaccination \\
      --language="fr" \\
      --familyName="Céline" \\
      --givenName="Rochat" \\
      --dateOfBirth="1964-03-14" \\
      --medicinalProductCode="EU/1/20/1507" \\
      --numberOfDoses="2" \\
      --totalNumberOfDoses="2" \\
      --vaccinationDate="2020-01-01" \\
      --countryOfVaccination="CH"
    `,
  ]

  static flags = {
    ...baseFlags,
    ...personFlags,
    medicinalProductCode: flags.string(({
      description: 'name of the medicinal product as registered in the country.',
      required: true,
      helpValue: 'EU/1/20/1507',
    })),
    numberOfDoses: flags.integer(({
      description: 'number in a series of doses',
      required: true,
      helpValue: '2',
    })),
    totalNumberOfDoses: flags.integer(({
      description: 'number in a series of doses',
      required: true,
      helpValue: '2',
    })),
    vaccinationDate: flags.string({
      description: 'date of vaccination. Format: ISO 8601 date without time. Range: can be between 1900-01-01 and 2099-12-31',
      required: true,
      helpValue: '2020-01-01',
    }),
    countryOfVaccination: flags.string({
      description: 'the country in which the covid certificate owner has been vaccinated. Format: string (2 chars according to ISO 3166 Country Codes).',
      required: true,
      helpValue: 'CH',
    }),
  }

  static args = []

  async run() {
    const {flags} = this.parse(CreateVaccination)
    this.configureDebug(flags)

    const createDto: VaccinationCertificateCreateDto = {
      otp: flags.otp,
      name: {
        familyName: flags.familyName,
        givenName: flags.givenName,
      },
      dateOfBirth: flags.dateOfBirth,
      vaccinationInfo: [
        {
          medicinalProductCode: flags.medicinalProductCode,
          numberOfDoses: flags.numberOfDoses,
          totalNumberOfDoses: flags.totalNumberOfDoses,
          vaccinationDate: flags.vaccinationDate,
          countryOfVaccination: flags.countryOfVaccination,
        },
      ],
      language: flags.language,
    }

    const logger = {log: this.log, warn: this.warn}
    const client = CertificateCreationClient.fromConfig(flags)
    const iterations = flags.testIterations ?? 1
    const outDir = flags.outDir
    const createFn = () => client.createVaccinationCertificate(createDto, logger)
    await this.createCertificate(createFn, outDir, iterations)
  }
}
