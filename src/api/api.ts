import got, {Got} from 'got'
import {VaccinationCertificateCreateDto} from './models/VaccinationCertificateCreateDto'
import {RecoveryCertificateCreateDto} from './models/RecoveryCertificateCreateDto'
import {TestCertificateCreateDto} from './models/TestCertificateCreateDto'
import {CovidCertificateCreateResponseDto} from './models/CovidCertificateCreateResponseDto'
import {CanonicalSha256WithRsaSigner} from '../signing/signer'

export interface ApiConfig {
  baseUrl: string;
  certificateFile: string;
  keyFile: string;
}

export class CertificateCreationClient {
  constructor(private client: Got, private signer: CanonicalSha256WithRsaSigner) {}

  createVaccinationCertificate(request: VaccinationCertificateCreateDto): Promise<CovidCertificateCreateResponseDto> {
    return this.createCertificate(request, 'api/v1/covidcertificate/vaccination')
  }

  createTestCertificate(request: TestCertificateCreateDto): Promise<CovidCertificateCreateResponseDto> {
    return this.createCertificate(request, 'api/v1/covidcertificate/test')
  }

  createRecoveryCertificate(request: RecoveryCertificateCreateDto): Promise<CovidCertificateCreateResponseDto> {
    return this.createCertificate(request, 'api/v1/covidcertificate/recovery')
  }

  private async createCertificate(request: VaccinationCertificateCreateDto | TestCertificateCreateDto | RecoveryCertificateCreateDto, url: string): Promise<CovidCertificateCreateResponseDto> {
    const body = JSON.stringify(request, null, 2)
    const signature = this.signer.sign(body)
    try {
      const response = await this.client.post(url, {
        headers: {
          'X-Signature': signature,
        },
        body: body,
      }).json<CovidCertificateCreateResponseDto>()
      return response
    } catch (error) {
      throw error
    }
  }

  static fromConfig(config: ApiConfig): CertificateCreationClient {
    const signer = CanonicalSha256WithRsaSigner.fromKeyFile(config.keyFile)
    const client = got.extend({
      prefixUrl: config.baseUrl,
      https: {
        key: config.keyFile,
        certificate: config.certificateFile,
      },
    })
    return new CertificateCreationClient(client, signer)
  }
}
