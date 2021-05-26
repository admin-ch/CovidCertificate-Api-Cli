import {resourceFilePath} from '../utils'
import {CanonicalSha256WithRsaSigner} from '../../src/signing/signer'
import {expect} from '@oclif/test'

describe('CanonicalSha256WithRsaSigner', () => {
  context('a valid keyFile', () => {
    it('instance can be created and used', () => {
      const keyFilePath = resourceFilePath('dev.local.key')
      const signer = CanonicalSha256WithRsaSigner.fromKeyFile(keyFilePath, undefined)
      signer.sign('abc')
    })
  })
  describe('canonicalization', () => {
    it('removes newlines', () => {
      const message = '{\n\n\n}'
      const expected = '{}'
      expect(CanonicalSha256WithRsaSigner.canonicalize(message)).to.equal(expected)
    })
    it('removes tabs', () => {
      const message = '{\t\t\t}'
      const expected = '{}'
      expect(CanonicalSha256WithRsaSigner.canonicalize(message)).to.equal(expected)
    })
    it('removes newlines and tabs', () => {
      const message = '\n{\n\t\n\t\t\n}\t\n'
      const expected = '{}'
      expect(CanonicalSha256WithRsaSigner.canonicalize(message)).to.equal(expected)
    })
    it('removes windows crlf newlines', () => {
      const message = '{\r\n}'
      const expected = '{}'
      expect(CanonicalSha256WithRsaSigner.canonicalize(message)).to.equal(expected)
    })
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
