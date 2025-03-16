import { hexToInt, hslToInt } from '@palett/convert'
import {
  BLI_OFF, BLI_ON, BOL_OFF, BOL_ON, CRO_OFF, CRO_ON, CSI, DIM_OFF, DIM_ON, FORE_DEF, FORE_INI, HID_OFF, HID_ON, INV_OFF,
  INV_ON, ITA_OFF, ITA_ON, SGR, UND_OFF, UND_ON,
}                             from '@palett/enum-ansi-codes'
import { SC }                 from '@palett/util-ansi'

export class Dye {
  head
  tail
  constructor(head, tail) {
    this.head = head ?? ''
    this.tail = tail ?? ''
  }
  static of(head, tail) { return new Dye(head, tail) }
  static from(dye) { return new Dye(dye?.head, dye?.tail) }
  static prep(...style) { return new Dye().style(style) }

  static hex(color) { return HexDye.init(this).make(color) }
  static hsl(color) { return HslDye.init(this).make(color) }
  static int(color) { return IntDye.init(this).make(color) }
  static rgb(color) { return RgbDye.init(this).make(color) }

  load(r, g, b) {
    if (this.head.length) this.head += ';'
    if (this.tail.length) this.tail += ';'
    this.head += FORE_INI + SC + r + SC + g + SC + b
    this.tail += FORE_DEF
    return this
  }
  repl(r, g, b) {
    const ctx = { head: this?.head ?? '', tail: this?.tail ?? '' }
    return load.call(ctx, r, g, b)
  }
  into([ r, g, b ]) { return this.repl(r, g, b) }
  draw(text) { return CSI + this.head + SGR + text + CSI + this.tail + SGR }
  make(color) { return draw.bind(this.into(color)) }
  render(color, text) { return draw.call(this.into(color), text) }

  clear() { return this.head = '', this.tail = '', this }
  slice() { return new Dye(this.head, this.tail) }
  /** @param {string[]} style */
  style(style) {
    if (!style?.length) return this
    if (this.head.length) this.head += ';'
    if (this.tail.length) this.tail += ';'
    for (let t of style) {
      const [ c ] = t
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

export const { load, repl, draw } = Dye.prototype

export class HexDye extends Dye {
  constructor(h, t) { super(h, t) }
  static init(ctx) { return new HexDye(ctx?.head, ctx?.tail) }
  into(hex) { return hex = hexToInt(hex), repl.call(this, hex >> 16 & 0xFF, hex >> 8 & 0xFF, hex & 0xFF) }
  make(hex) { return draw.bind(HexDye.prototype.into.call(this, hex))}
  render(hex, tx) { return draw.call(HexDye.prototype.into.call(this, hex), tx) }
}

export class HslDye extends Dye {
  constructor(h, t) { super(h, t) }
  static init(ctx) { return new HslDye(ctx?.head, ctx?.tail) }
  into(c) { return c = hslToInt(c), repl.call(this, c >> 16 & 0xFF, c >> 8 & 0xFF, c & 0xFF) }
  make(c) { return draw.bind(HslDye.prototype.into.call(this, c))}
  render(c, tx) { return draw.call(HslDye.prototype.into.call(this, c), tx) }
}

export class IntDye extends Dye {
  constructor(h, t) { super(h, t) }
  static init(ctx) { return new IntDye(ctx?.head, ctx?.tail) }
  into(c) { return repl.call(this, c >> 16 & 0xFF, c >> 8 & 0xFF, c & 0xFF) }
  make(c) { return draw.bind(IntDye.prototype.into.call(this, c))}
  render(c, tx) { return draw.call(IntDye.prototype.into.call(this, c), tx) }
}

export class RgbDye extends Dye {
  constructor(h, t) { super(h, t) }
  static init(ctx) { return new RgbDye(ctx?.head, ctx?.tail) }
  into([ r, g, b ]) { return repl.call(this, r, g, b) }
  make(c) { return draw.bind(RgbDye.prototype.into.call(this, c))}
  render(c, tx) { return draw.call(RgbDye.prototype.into.call(this, c), tx) }
}

