import * as crypto from 'crypto'
import * as fs from 'fs-extra'

export class CanonicalSha256WithRsaSigner {
  constructor(private privateKeyObject: crypto.KeyObject) {}

  sign(message: string): string {
    // the canonicalization regex is defined by the API
    const regex = /[\n\t ]/
    const canonicalMessage =  message.replace(regex, '')

    const bytes = Buffer.from(canonicalMessage, 'utf8')
    const sign = crypto.createSign('RSA-SHA256')
    sign.update(bytes)
    const signature = sign.sign(this.privateKeyObject)
    const base64encodedSignature = signature.toString('base64')
    return base64encodedSignature
  }

  static fromKeyFile(keyFile: string): CanonicalSha256WithRsaSigner {
    const pemEncodedKey = fs.readFileSync(keyFile)
    const privateKeyObject = crypto.createPrivateKey(pemEncodedKey)
    return new CanonicalSha256WithRsaSigner(privateKeyObject)
  }
}
