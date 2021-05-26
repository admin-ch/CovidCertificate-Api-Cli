import {getEnvValueForFlag} from '../config'
import {baseFlags} from '../../lib/flags/base-flags'
import {expect} from '@oclif/test'
import * as postman from 'postman-collection'
import {CanonicalSha256WithRsaSigner} from '../../src/signing/signer'
import * as fs from 'fs'
import * as path from 'path'

require('snackables').config({paths: '.env', debug: true})

const SIGNATURE_HEADER = 'X-Signature'

describe('signer', () => {
  context('official test certificate "ZH-spital-A-t.bit.admin.ch"', () => {
    const keyFile = getEnvValueForFlag(baseFlags.keyFile)
    expect(keyFile).to.include('ZH-spital-A-t.bit.admin.ch', 'must use that certificate to be able to validate')
    const signer = CanonicalSha256WithRsaSigner.fromKeyFile(keyFile, undefined)

    it('', () => {
      const json = fs.readFileSync(path.join(__dirname, 'ApiGateway.postman_collection.json'), 'utf8')
      const myCollection = new postman.Collection(JSON.parse(json))
      myCollection.forEachItem(item => {
        const header = item.request.headers.one(SIGNATURE_HEADER)
        if (header && item.request.body?.raw) {
          header.value = signer.sign(item.request.body.raw)
        }
      })
    })
  })
})
