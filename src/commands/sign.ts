import {Command, flags} from '@oclif/command'
import * as fs from 'fs-extra'
import {keyFile, keyPassphrase} from '../flags/base-flags'
import {CanonicalSha256WithRsaSigner} from '../signing/signer'

export default class Sign extends Command {
  static description = 'reads a utf8 encoded text file, signs the text and writes the base64 encoded signature to stdout'

  static flags = {
    help: flags.help({char: 'h'}),
    keyFile: keyFile,
    keyPassphrase: keyPassphrase,
  }

  static args = [
    {
      name: 'file',
      required: true,
      description: 'input file, should be JSON',
    },
  ]

  async run() {
    const {args, flags} = this.parse(Sign)
    const message = await fs.readFile(args.file, 'utf8')
    const signer = CanonicalSha256WithRsaSigner.fromKeyFile(flags.keyFile, flags.keyPassphrase)
    const signature = signer.sign(message)
    this.log(signature)
  }
}
