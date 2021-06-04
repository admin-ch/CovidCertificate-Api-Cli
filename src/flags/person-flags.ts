import {flags} from '@oclif/command'

const familyName = flags.string({
  description: 'family name of the covid certificate owner',
  required: true,
  helpValue: 'Rochat',
})

const givenName = flags.string({
  description: 'given name of the covid certificate owner',
  required: true,
  helpValue: 'Céline',
})

const dateOfBirth = flags.string({
  description: 'birthdate of the covid certificate owner. Format: ISO 8601 date without time.',
  required: true,
  helpValue: '1964-03-14',
})

const language = flags.string({
  description: 'Accepted languages are: de, it, fr, rm',
  required: false,
  default: 'de',
  helpValue: 'fr',
})

export const personFlags = {
  familyName: familyName,
  givenName: givenName,
  dateOfBirth: dateOfBirth,
  language: language,
}
