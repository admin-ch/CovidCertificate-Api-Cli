import {resourceFilePath} from '../utils'
import {CanonicalSha256WithRsaSigner} from '../../src/signing/signer'
import {expect} from '@oclif/test'

describe('CanonicalSha256WithRsaSigner', () => {
  context('a valid keyFile', () => {
    it('instance can be created and used', () => {
      const keyFilePath = resourceFilePath('dev.local.key')
      const signer = CanonicalSha256WithRsaSigner.fromKeyFile(keyFilePath)
      signer.sign('abc')
    })
  })
  describe('normalization', () => {
    it('works like the backend', () => {
      const message = '{\n' +
        '\t"name":{\n' +
        '\t\t"familyName":"Muster",\n' +
        '\t\t"givenName":"Hans"\n' +
        '\t}\n' +
        '}'
      const expected = '{"name":{"familyName":"Muster","givenName":"Hans"}}'

      const actual = CanonicalSha256WithRsaSigner.canonicalize(message)

      expect(actual).to.equal(expected)
    })
  })
})
