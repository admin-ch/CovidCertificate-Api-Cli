import {Command, flags} from '@oclif/command'
import * as fs from 'fs-extra'
import * as postman from 'postman-collection'
import {keyFile, otp} from '../flags/base-flags'
import {CanonicalSha256WithRsaSigner} from '../signing/signer'

export default class PmUpdate extends Command {
  static description = 'updates otp values and signatures in a Postman collection'

  static flags = {
    help: flags.help({char: 'h'}),
    keyFile: keyFile,
    otp: otp,
  }

  static args = [
    {
      name: 'file',
      required: true,
      description: 'path to Postman collection',
    },
  ]

  async run() {
    const {args, flags} = this.parse(PmUpdate)
    const signer = CanonicalSha256WithRsaSigner.fromKeyFile(flags.keyFile)

    const otp = flags.otp

    const collectionFile = await fs.readFile(args.file, 'utf8')
    const collectionJSON = JSON.parse(collectionFile)
    const collection = new postman.Collection(collectionJSON)

    let updated = 0
    let requests = 0
    collection.forEachItem(item => {
      requests += 1
      const header = item.request.headers.one('X-Signature')
      if (header && item.request.body?.raw) {
        const body = JSON.parse(item.request.body.raw)
        if (body.otp) body.otp = otp
        item.request.body.raw = JSON.stringify(body, null, 2)
        header.value = signer.sign(item.request.body.raw)
        updated += 1
      }
    })

    await fs.writeFile(args.file, JSON.stringify(collection.toJSON(), null, 2))
    this.log(`Updated ${updated} signatures in ${requests} requests.`)
  }
}
