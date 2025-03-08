import { CSI, FORE_DEF, FORE_INI, SGR } from '@palett/enum-ansi-codes'
import { SC }                           from '@palett/util-ansi'

const HEAD = CSI + FORE_INI + SC
const TAIL = CSI + FORE_DEF + SGR
export function render(int, text) {
  const r = int >> 16, g = int >> 8, b = int >> 0
  return (this.head ?? HEAD) + (r & 0xFF) + SC + (g & 0xFF) + SC + (b & 0xFF) + SGR + text + (this.tail ?? TAIL)
}