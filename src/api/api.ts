import got, {Got} from 'got'
import * as fs from 'fs-extra'
import createDebug from 'debug'
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
  keyPassphrase: string | undefined;
  local?: boolean;
}
export interface Logger {
  warn(input: string | Error): void;
  log(message?: string, ...args: any[]): void;
}

const debug = createDebug('cc-cli:api')

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
    debug('createCertificate %s', url)
    const body = JSON.stringify(request, null, 2)
    // const body = JSON.stringify(request)
    debug('body %s', body)
    const signature = this.signer.sign(body)
    debug('signature %s', signature)
    try {
      const response = await this.client.post(url, {
        headers: {
          'X-Signature': signature,
          'content-type': 'application/json',
        },
        body: body,
      }).json<CovidCertificateCreateResponseDto>()
      return response
    } catch (error) {
      if (error instanceof got.HTTPError) {
        // const json = JSON.parse() e.response
        const vcapRequestIdHeader = 'x-vcap-request-id'
        const vcapRequestId = error.response.headers[vcapRequestIdHeader]
        if (vcapRequestId) {
          logger.warn(`${vcapRequestIdHeader}: ${vcapRequestId}`)
        }
        const restErrorText = error.response.body as string
        if (restErrorText) {
          logger.warn(restErrorText)
        }
      } else if (error instanceof got.TimeoutError) {

      } else if (error instanceof got.RequestError) {

      }
      throw error
    }
  }

  static fromConfig(config: ApiConfig): CertificateCreationClient {
    const pemEncodedKey = fs.readFileSync(config.keyFile)
    const pemEncodedCertificate = fs.readFileSync(config.certificateFile)
    const signer = CanonicalSha256WithRsaSigner.fromPemEncodedKey(pemEncodedKey, config.keyPassphrase)
    const client = got.extend({
      prefixUrl: config.baseUrl,
      https: {
        key: pemEncodedKey,
        passphrase: config.keyPassphrase,
        certificate: pemEncodedCertificate,
      },
      followRedirect: false,
      hooks: {
        beforeRequest: [options => {
          debug('send request')
          debug('%s - %s', options.method, options.url)
          debug('headers: %O', options.headers)
        }],
        beforeRetry: [
          (options, error, retryCount) => {
            debug('retry: statusCode %s, retryCount %s', error?.response?.statusCode, retryCount)
          },
        ],
        afterResponse: [
          (response, _retryWithMergedOptions) => {
            debug('response - %s', response.statusCode)
            debug('headers: %O', response.headers)
            debug('timings: %o', response.timings.phases)
            return response
          },
        ]},
    })
    let combined = client
    if (config?.local) {
      combined = got.extend(localGot, client)
    }
    return new CertificateCreationClient(combined, signer)
  }
}
