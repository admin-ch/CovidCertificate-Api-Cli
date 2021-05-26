import {flags} from '@oclif/command'
import * as os from 'os'

export const certificateFile = flags.string({
  description: 'path to PEM encoded certificate',
  env: 'CC_CLI_CERTIFICATE_FILE',
  required: true,
  helpValue: '~/a0000-cc-cli-TEST.cer',
})

export const keyFile = flags.string({
  description: 'path to PEM encoded private key',
  env: 'CC_CLI_KEY_FILE',
  required: true,
  helpValue: '~/a0000-cc-cli-TEST.encrypted.key',
})

export const keyPassphrase = flags.string({
  description: 'passphrase to decrypt the private key',
  env: 'CC_CLI_KEY_PASSPHRASE',
  helpValue: 'abcdefghijklmnopqrstuvwxyz',
  required: false,
})

export const baseUrl = flags.string({
  description: 'the url of the REST API',
  env: 'CC_CLI_BASE_URL',
  required: true,
  helpValue: 'https://ws.covidcertificate-a.bag.admin.ch/',
})

export const local = flags.boolean({
  description: 'adds additional headers required to mock the WSG',
  env: 'CC_CLI_LOCAL',
  default: false,
})

export const otp = flags.string({
  description: 'the otp secret',
  env: 'CC_CLI_OTP',
  required: true,
  helpValue: 'a.b.c',
})

export const outDir = flags.string({
  description: 'output directory',
  env: 'CC_CLI_OUT_DIR',
  required: true,
  default: os.tmpdir(),
  helpValue: 'out',
})

export const debug = flags.boolean({
  description: 'enable debug output.',
  default: false,
  char: 'd',
})

export const testIterations = flags.integer({
  description: 'TESTING: create n certificates with the same data',
  env: 'CC_CLI_TESTING_ITERATIONS',
  required: false,
  hidden: true,
})

export const baseFlags = {
  baseUrl: baseUrl,
  certificateFile: certificateFile,
  keyFile: keyFile,
  keyPassphrase: keyPassphrase,
  otp: otp,
  outDir: outDir,
  local: local,
  testIterations: testIterations,
  debug: debug,
}
