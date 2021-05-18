import {resourceFilePath} from '../utils'
import {CanonicalSha256WithRsaSigner} from '../../src/signing/signer'

describe('CanonicalSha256WithRsaSigner', () => {
  context('a valid keyFile', () => {
    it('instance can be created and used', () => {
      const keyFilePath = resourceFilePath('dev.local.key')
      const signer = CanonicalSha256WithRsaSigner.fromKeyFile(keyFilePath)
      signer.sign('abc')
    })
  })
})
