import {flags} from '@oclif/command'

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
