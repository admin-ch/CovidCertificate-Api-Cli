import * as path from 'path'

export function resourceFilePath(fileName: string): string {
  return path.join(__dirname, 'resources', fileName)
}
