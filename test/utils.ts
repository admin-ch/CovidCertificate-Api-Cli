import * as path from 'path'
import {CovidCertificateCreateResponseDto} from '../src/api'

export function resourceFilePath(fileName: string): string {
  return path.join(__dirname, 'resources', fileName)
}

export const values = {
  OTP: 'otp_secret',
  familyName: 'Federer',
  givenName: 'Roger',
  dateOfBirth: '1950-06-04',
  dateOfFirstPositiveTestResult: '2021-10-03',
  countryOfTest: 'countryOfTest',
  outDir: 'out',
  baseUrl: 'https://ws.covidcertificate-a.bag.admin.ch',
}

export const baseFlagValues = [
  `--baseUrl=${values.baseUrl}`,
  `--certificateFile=${resourceFilePath('dev.local.cer')}`,
  `--keyFile=${resourceFilePath('dev.local.key')}`,
  `--otp=${values.OTP}`,
  `--outDir=${values.outDir}`,
]

export const personFlagValues = [
  `--familyName=${values.familyName}`,
  `--givenName=${values.givenName}`,
  `--dateOfBirth=${values.dateOfBirth}`,
]

export const recoveryFlagValues = [
  `--dateOfFirstPositiveTestResult=${values.dateOfFirstPositiveTestResult}`,
  `--countryOfTest=${values.countryOfTest}`,
]

export const okCreateResponse: CovidCertificateCreateResponseDto = {
  uvci: String(Date.now()),
  pdf: Buffer.from([1, 2, 3]).toString('base64'),
  qrCode: Buffer.from([4, 5, 6]).toString('base64'),
}
