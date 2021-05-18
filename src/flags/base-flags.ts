import {flags} from '@oclif/command'
import * as os from 'os'

export const certificateFile = flags.string({
  description: 'path to PEM encoded certificate',
  env: 'CC_CLI_CERTIFICATE_FILE',
  required: true,
})

export const keyFile = flags.string({
  description: 'path to PEM encoded private key',
  env: 'CC_CLI_KEY_FILE',
  required: true,
})

export const baseUrl = flags.string({
  description: 'the url of the REST API',
  env: 'CC_CLI_BASE_URL',
  required: true,
})

export const otp = flags.string({
  description: 'the otp secret',
  env: 'CC_CLI_OTP',
  required: true,
})

export const outDir = flags.string({
  description: 'output directory',
  env: 'CC_CLI_OUT_DIR',
  required: true,
  default: os.tmpdir(),
})

export const baseFlags = {
  baseUrl: baseUrl,
  certificateFile: certificateFile,
  keyFile: keyFile,
  otp: otp,
  outDir: outDir,
}
