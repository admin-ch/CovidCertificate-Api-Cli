import {getEnvValueForFlag} from '../config'
import {baseFlags} from '../../lib/flags/base-flags'
import {expect} from '@oclif/test'
import {CanonicalSha256WithRsaSigner} from '../../src/signing/signer'
import * as fs from 'fs'
import * as path from 'path'

require('snackables').config({paths: '.env', debug: true})

describe('signer', () => {
  context('official test certificate "ZH-spital-A-t.bit.admin.ch"', () => {
    const keyFile = getEnvValueForFlag(baseFlags.keyFile)
    expect(keyFile).to.include('ZH-spital-A-t.bit.admin.ch', 'must use that certificate to be able to validate')
    const signer = CanonicalSha256WithRsaSigner.fromKeyFile(keyFile, undefined)

    it('should sign an empty json', () => {
      const json = '{}'
      const expectedSignature = 'SCek5a6iTQlNb9F3xXEK9zqHoYcSkUsNSVNct2+Irefkzcfilp/rZ3Q2NajDJWfN8k2Kwz73ioHQqNXUpE48N1GkTiv+AGbpa+qAWzRZ6go0aC0y1nVToSc6tSDcT4HHGV0MZXSDwntsCZt3HsY7+AKQvvytxnC8hqDSWQbvUoxXYhGIXnOWCmRLT8EsibacaX93o0Bm7K1kxLq5JxNg1MIFDNTA4xn6vF9+2Z5iHWBT6kPPtRnX3QQ0ilNlPFHAkU10Gpd6ZUTbi8SwY8jgoCwq4dX2suIgy/M/m4GeviCYeG3aJwiQDghcw6alz+P0UTnMMAELkKFStMR5jCuGXA=='
      const actual = signer.sign(json)
      expect(actual).to.equal(expectedSignature)
    })

    it('should sign like sample from Postman collection', () => {
      const json = fs.readFileSync(path.join(__dirname, 'test.json'), 'utf8')

      const actual = signer.sign(json)

      const expectedSignature = 'hJ1QMUC/nyw2NktbD9ZVGtIg6ChXmYknKva3wx/K4uQirKwYAOI5DD8iRZjhm/3XjQCMc7qFn/xELBreXyxbZCX1IGygqYvYYQCQqa3raAhw+xmO8Fu8RNvCzVkhvlU1FEg8tYTZYCU+pHD6OxN52fGfAG366/bGQkTuhHBey0kuXpjVbYRgSePiqcwpG6RHGTvnXxbTrZJJovYWHsIMdrHk0D6NR8BBD+mIwc98d6SHid31f94gQQWhgKOIxnqL1g7pxYrxIzTz9BmwBQVP5v+PprwmH2e8K+r+r5N6kIqG2wbGViP/+9P3X5e1qZRgg4/5x/Uvr04PYXiHQdIy9Q=='
      expect(actual).to.equal(expectedSignature)
    })
  })
})
