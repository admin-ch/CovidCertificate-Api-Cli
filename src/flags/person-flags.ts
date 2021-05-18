import {flags} from '@oclif/command'

const familyName = flags.string({
  description: 'family name of the covid certificate owner',
  required: true,
})

const givenName = flags.string({
  description: 'given name of the covid certificate owner',
  required: true,
})

const dateOfBirth = flags.string({
  description: 'birthdate of the covid certificate owner. Format: ISO 8601 date without time. Range: can be between 1900-01-01 and 2099-12-31',
  required: true,
})

const language = flags.string({
  description: 'Accepted languages are: de, it, fr, rm',
  required: false,
  default: 'de',
})

export const personFlags = {
  familyName: familyName,
  givenName: givenName,
  dateOfBirth: dateOfBirth,
  language: language,
}
