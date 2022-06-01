import {
  BLI_OFF, BLI_ON, BOL_OFF, BOL_ON, CRO_OFF, CRO_ON, DIM_OFF, DIM_ON, FORE_DEF, FORE_INI,
  HID_OFF, HID_ON, INV_OFF, INV_ON, ITA_OFF, ITA_ON, UND_OFF, UND_ON, CSI, SGR,
}             from '@palett/enum-ansi-codes'
import { SC } from '@palett/util-ansi'

export class Dye {
  head
  tail
  constructor(head, tail) {
    this.head = head ?? ''
    this.tail = tail ?? ''
  }
  static of(head, tail) { return new Dye(head, tail) }
  static from(dye) { return new Dye(dye.head, dye.tail) }
  static prep(...style) { return new Dye().style(style) }

  open() {
    if (this.head.length) this.head += ';'
    if (this.tail.length) this.tail += ';'
    return this
  }

  into(r, g, b) {
    let { head = '', tail = '' } = this
    if (head.length) head += ';'
    if (tail.length) tail += ';'
    head += FORE_INI + SC + r + SC + g + SC + b
    tail += FORE_DEF
    return { head, tail }
  }
  draw(text) { return CSI + this.head + SGR + text + CSI + this.tail + SGR }
  make(color) { return this.draw.bind(this.into(color)) }
  render(color, text) { return this.draw.call(this.into(color), text) }


  clear() { return this.head = '', this.tail = '', this }
  slice() { return new Dye(this.head, this.tail) }
  /** @param {string[]} style */
  style(style) {
    if (!style?.length) return this
    this.open()
    for (let t of style) {
      const [c] = t
      c === 'b' ? (this.head += BOL_ON, this.tail += BOL_OFF) // BOLD
        : c === 'd' ? (this.head += DIM_ON, this.tail += DIM_OFF) // DIM
          : c === 'i' && t[1] === 't' ? (this.head += ITA_ON, this.tail += ITA_OFF) // ITALIC
            : c === 'u' ? (this.head += UND_ON, this.tail += UND_OFF) // UNDERLINE
              : c === 'b' ? (this.head += BLI_ON, this.tail += BLI_OFF) // BLINK
                : c === 'i' ? (this.head += INV_ON, this.tail += INV_OFF) // INVERSE
                  : c === 'h' ? (this.head += HID_ON, this.tail += HID_OFF) // HIDE
                    : c === 's' ? (this.head += CRO_ON, this.tail += CRO_OFF) // STRIKE
                      : void 0
    }
    return this
  }
}