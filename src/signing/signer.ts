import * as crypto from 'crypto'
import * as fs from 'fs-extra'

export class CanonicalSha256WithRsaSigner {
  constructor(private privateKeyObject: crypto.KeyObject) {}

  sign(payload: string): string {
    const canonicalMessage = CanonicalSha256WithRsaSigner.canonicalize(payload)

    const bytes = Buffer.from(canonicalMessage, 'utf8')
    const sign = crypto.createSign('RSA-SHA256')
    sign.update(bytes)
    const signature = sign.sign(this.privateKeyObject)
    const base64encodedSignature = signature.toString('base64')
    return base64encodedSignature
  }

  static canonicalize(payload: string): string {
    // the canonicalization regex is defined by the API
    const regex = /[\n\r\t ]/gm
    const canonicalPayload = payload.replace(regex, '')
    return canonicalPayload
  }

  static fromKeyFile(keyFile: string, keyPassphrase: string | undefined): CanonicalSha256WithRsaSigner {
    const pemEncodedKey = fs.readFileSync(keyFile)
    return this.fromPemEncodedKey(pemEncodedKey, keyPassphrase)
  }

  static fromPemEncodedKey(pemEncodedKey: Buffer, keyPassphrase: string | undefined) {
    const privateKeyObject = crypto.createPrivateKey({key: pemEncodedKey, passphrase: keyPassphrase})
    return new CanonicalSha256WithRsaSigner(privateKeyObject)
  }
}
