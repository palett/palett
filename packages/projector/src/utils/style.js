import {
  BLI_OFF, BLI_ON, BOL_OFF, BOL_ON, CRO_OFF, CRO_ON, DIM_OFF, DIM_ON,
  HID_OFF, HID_ON, INV_OFF, INV_ON, ITA_OFF, ITA_ON, UND_OFF, UND_ON
}             from '@palett/enum-ansi-codes'
import { SC } from '@palett/util-ansi'

/**
 * @this {{head,tail}}
 * @param {string[]} style
 * @returns {{head,tail}}
 */
export function style(style) {
  if (!style?.length) return this
  for (let t of style) {
    t === 'bold' ? (this.head += BOL_ON + SC, this.tail += BOL_OFF + SC) // BOLD
      : t === 'dim' ? (this.head += DIM_ON + SC, this.tail += DIM_OFF + SC) // DIM
        : t === 'italic' ? (this.head += ITA_ON + SC, this.tail += ITA_OFF + SC) // ITALIC
          : t === 'underline' ? (this.head += UND_ON + SC, this.tail += UND_OFF + SC) // UNDERLINE
            : t === 'blink' ? (this.head += BLI_ON + SC, this.tail += BLI_OFF + SC) // BLINK
              : t === 'inverse' ? (this.head += INV_ON + SC, this.tail += INV_OFF + SC) // INVERSE
                : t === 'hide' ? (this.head += HID_ON + SC, this.tail += HID_OFF + SC) // HIDE
                  : t === 'strike' ? (this.head += CRO_ON + SC, this.tail += CRO_OFF + SC) // STRIKE
                    : void 0
  }
  return this
}