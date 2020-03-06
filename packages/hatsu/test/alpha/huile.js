import { dye } from '../../src/dyer'

export function huile (hex) {
  return dyeHex.bind({ color: hex })
}
