import {flags} from '@oclif/command'

export function getEnvValueForFlag(flag: flags.IOptionFlag<string>): string {
  const name = flag.env!
  const value = process.env[name]
  if (!value) throw new Error(`Environment variable '${name}' not set. Use an .env file. See .env.template.`)
  return value
}
