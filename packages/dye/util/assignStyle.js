import {
  BLI_OFF, BLI_ON, BOL_OFF, BOL_ON, CRO_OFF, CRO_ON, DIM_OFF, DIM_ON, HID_OFF, HID_ON, INV_OFF, INV_ON, ITA_OFF, ITA_ON,
  UND_OFF, UND_ON
}                 from '@palett/enum-ansi-codes'
import { excite } from './excite'

/** @param {string[]} style */
export function assignStyle(style) {
  if (!style?.length) return this
  excite.call(this)
  for (let t of style)
    t[0] === 'b' ? (this.head += BOL_ON, this.tail += BOL_OFF) // BOLD
      : t[0] === 'd' ? (this.head += DIM_ON, this.tail += DIM_OFF) // DIM
      : t[0] === 'i' && t[1] === 't' ? (this.head += ITA_ON, this.tail += ITA_OFF) // ITALIC
        : t[0] === 'u' ? (this.head += UND_ON, this.tail += UND_OFF) // UNDERLINE
          : t[0] === 'b' ? (this.head += BLI_ON, this.tail += BLI_OFF) // BLINK
            : t[0] === 'i' ? (this.head += INV_ON, this.tail += INV_OFF) // INVERSE
              : t[0] === 'h' ? (this.head += HID_ON, this.tail += HID_OFF) // HIDE
                : t[0] === 's' ? (this.head += CRO_ON, this.tail += CRO_OFF) // STRIKE
                  : void 0
  return this
}