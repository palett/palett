import { CSI, FORE_DEF, FORE_INI, SGR } from '@palett/enum-ansi-codes'
import { SC }                           from '@palett/util-ansi'

// 1	Bold or increased
// 2	Faint, decreased intensity, or dim - not widely supported
// 3	Italic - not widely supported
// 4	Underline
// 5	Slow blink
// 6	Rapid blink - not widely supported
// 7	Reverse video or invert
// 8	Conceal or hide - not widely supported
// 9	Crossed-out, or strike - not widely supported

export function initialize(attr) {
  let h = '', t = ''
  if (attr > 0) {
    let i = 1
    do if (attr & 0x1) { h += i + ';', t += '2' + i + ';' } while (i++ && (attr >>= 1))
  }
  this.head = CSI + h + FORE_INI + SC
  this.tail = CSI + FORE_DEF + t + SGR
}

