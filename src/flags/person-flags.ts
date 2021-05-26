import {flags} from '@oclif/command'

const familyName = flags.string({
  description: 'family name of the covid certificate owner',
  required: true,
  helpValue: 'Federer',
})

const givenName = flags.string({
  description: 'given name of the covid certificate owner',
  required: true,
  helpValue: 'Roger',
})

const dateOfBirth = flags.string({
  description: 'birthdate of the covid certificate owner. Format: ISO 8601 date without time. Range: can be between 1900-01-01 and 2099-12-31',
  required: true,
  helpValue: '1981-08-08',
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
