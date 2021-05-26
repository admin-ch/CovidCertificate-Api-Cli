import {flags} from '@oclif/command'
import {baseFlags} from '../flags/base-flags'
import {personFlags} from '../flags/person-flags'
import {VaccinationCertificateCreateDto} from '../api'
import {CertificateCreationClient} from '../api/api'
import {CreateCertificateBaseCommand} from '../create-certificate-base-command'

export default class CreateVaccination extends CreateCertificateBaseCommand {
  static description = 'create a vaccination certificate'

  static flags = {
    ...baseFlags,
    ...personFlags,
    medicinalProductCode: flags.string(({
      description: 'name of the medicinal product as registered in the country.',
      required: true,
    })),
    numberOfDoses: flags.integer(({
      description: 'number in a series of doses',
      required: true,
    })),
    totalNumberOfDoses: flags.integer(({
      description: 'number in a series of doses',
      required: true,
    })),
    vaccinationDate: flags.string({
      description: 'date when the sample for the test was collected. Format: ISO 8601 date without time. Range: can be between 1900-01-01 and 2099-12-31',
      required: true,
    }),
    countryOfVaccination: flags.string({
      description: 'the country in which the covid certificate owner has been tested. Format: string (2 chars according to ISO 3166 Country Codes).',
      required: true,
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
