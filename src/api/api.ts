import got, {Got} from 'got'
import * as fs from 'fs-extra'
import {VaccinationCertificateCreateDto} from './models/VaccinationCertificateCreateDto'
import {RecoveryCertificateCreateDto} from './models/RecoveryCertificateCreateDto'
import {TestCertificateCreateDto} from './models/TestCertificateCreateDto'
import {CovidCertificateCreateResponseDto} from './models/CovidCertificateCreateResponseDto'
import {CanonicalSha256WithRsaSigner} from '../signing/signer'
import {localGot} from './local'

export interface ApiConfig {
  baseUrl: string;
  certificateFile: string;
  keyFile: string;
  local?: boolean;
}
export interface Logger {
  warn(input: string | Error): void;
  log(message?: string, ...args: any[]): void;
}

export class CertificateCreationClient {
  constructor(private client: Got, private signer: CanonicalSha256WithRsaSigner) {}

  createVaccinationCertificate(request: VaccinationCertificateCreateDto, logger: Logger): Promise<CovidCertificateCreateResponseDto> {
    return this.createCertificate(request, 'api/v1/covidcertificate/vaccination', logger)
  }

  createTestCertificate(request: TestCertificateCreateDto, logger: Logger): Promise<CovidCertificateCreateResponseDto> {
    return this.createCertificate(request, 'api/v1/covidcertificate/test', logger)
  }

  createRecoveryCertificate(request: RecoveryCertificateCreateDto, logger: Logger): Promise<CovidCertificateCreateResponseDto> {
    return this.createCertificate(request, 'api/v1/covidcertificate/recovery', logger)
  }

  private async createCertificate(request: VaccinationCertificateCreateDto | TestCertificateCreateDto | RecoveryCertificateCreateDto, url: string, logger: Logger): Promise<CovidCertificateCreateResponseDto> {
    // const body = JSON.stringify(request, null, 2)
    const body = JSON.stringify(request)
    const signature = this.signer.sign(body)

    try {
      const response = await this.client.post(url, {
        headers: {
          'X-Signature': signature,
          'content-type': 'application/json',
        },
        body: body,
      }).json<CovidCertificateCreateResponseDto>()
      return response
    } catch (e) {
      if (e instanceof got.HTTPError) {
        // const json = JSON.parse() e.response
        const vcapRequestIdHeader = 'x-vcap-request-id'
        const vcapRequestId = e.response.headers[vcapRequestIdHeader]
        if (vcapRequestId) {
          logger.warn(`${vcapRequestIdHeader}: ${vcapRequestId}`)
        }
        const restErrorText = e.response.body as string
        if (restErrorText) {
          logger.warn(restErrorText)
        }
      } else if (e instanceof got.TimeoutError) {

      } else if (e instanceof got.RequestError) {

      }
      throw e
    }
  }

  static fromConfig(config: ApiConfig): CertificateCreationClient {
    const pemEncodedKey = fs.readFileSync(config.keyFile)
    const pemEncodedCertificate = fs.readFileSync(config.certificateFile)
    const signer = CanonicalSha256WithRsaSigner.fromPemEncodedKey(pemEncodedKey)
    const client = got.extend({
      prefixUrl: config.baseUrl,
      https: {
        key: pemEncodedKey,
        certificate: pemEncodedCertificate,
      },
    })
    let combined = client
    if (config?.local) {
      combined = got.extend(localGot, client)
    }
    return new CertificateCreationClient(combined, signer)
  }
}
