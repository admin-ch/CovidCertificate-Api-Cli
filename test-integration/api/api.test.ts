import {expect} from '@oclif/test'
import {baseFlags} from '../../src/flags/base-flags'
import {ApiConfig, CertificateCreationClient, Logger} from '../../src/api/api'
import {RecoveryCertificateCreateDto} from '../../src/api'
import {getEnvValueForFlag} from '../config'

describe('create-recovery', async () => {
  it('creates a certificate', async () => {
    // const local = Boolean(process.env[baseFlags.local.env])
    const local = true
    const apiConfig: ApiConfig = {
      baseUrl: getEnvValueForFlag(baseFlags.baseUrl),
      certificateFile: getEnvValueForFlag(baseFlags.certificateFile),
      keyFile: getEnvValueForFlag(baseFlags.keyFile),
      keyPassphrase: undefined,
      local: local,
    }

    const otp = getEnvValueForFlag(baseFlags.otp)
    /* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function */
    const logger: Logger = {
      log(message?: string, ...args: any[]): void {},
      warn(input: string | Error): void {},
    }
    /* eslint-enable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function */
    // const logger = sinon.stub({}) as Logger
    const api = CertificateCreationClient.fromConfig(apiConfig)

    const createDto: RecoveryCertificateCreateDto = {
      otp: otp,
      name: {
        familyName: 'familyName',
        givenName: 'givenName',
      },
      dateOfBirth: '2000-12-31',
      recoveryInfo: [{
        dateOfFirstPositiveTestResult: '2020-04-01',
        countryOfTest: 'CH',
      }],
      language: 'de',
    }

    const response = await api.createRecoveryCertificate(createDto, logger)

    expect(response.uvci).to.not.be.null
    expect(response.pdf).to.not.be.null
    expect(response.qrCode).to.not.be.null
  })
})
