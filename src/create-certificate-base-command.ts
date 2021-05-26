import * as fs from 'fs-extra'
import * as os from 'os'
import * as path from 'path'
import Command from '@oclif/command'
import {CovidCertificateCreateResponseDto} from './api'
import createDebug from 'debug'

export abstract class CreateCertificateBaseCommand extends Command {
  protected async createCertificate(createFn: () => Promise<CovidCertificateCreateResponseDto>, outDir: string, iterations: number) {
    await fs.ensureDir(outDir)
    for (let i = 0; i < iterations; i++) {
      const response = await createFn()
      this.log(`Certificate created. uvci: ${response.uvci ?? '<EMPTY>'}`)
      if (!response.pdf || !response.qrCode) {
        this.error('API send empty pdf or qrCode.')
        this.exit(1)
        return
      }

      let uvci = response.uvci ?? 'empty-uvci'
      uvci = os.platform() === 'win32' ? uvci.replace(/:/g, '_') : uvci
      await this.saveFile(response.pdf, uvci, outDir, '.pdf')
      await this.saveFile(response.qrCode, uvci, outDir, '.png')
    }
  }

  async saveFile(base64: string, uvci: string, outDir: string, extension: string) {
    const file = path.join(outDir, `${uvci}${extension}`)
    const data = Buffer.from(base64, 'base64')
    await fs.writeFile(file, data)
    this.log(`Output: ${file}`)
  }

  protected configureDebug(flags: { debug: boolean }) {
    if (flags.debug) {
      createDebug.enable('cc-cli:api')
    }
  }
}
