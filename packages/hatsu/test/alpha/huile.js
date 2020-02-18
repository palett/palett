import { dye } from '../../src/blaze'

export function huile (hex) {
  return dyeHex.bind({ color: hex })
}
