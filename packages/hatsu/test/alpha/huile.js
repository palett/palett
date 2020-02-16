import { dye } from '../../src/impart'

export function huile (hex) {
  return dyeHex.bind({ color: hex })
}
