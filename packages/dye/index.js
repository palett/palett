import { hexToInt, hslToInt, hsiToRgi, hslToRgi, hexToRgi } from '@palett/convert';
import { CSI, FORE_INI, FORE_DEF, SGR } from '@palett/enum-ansi-codes';
import { SC } from '@palett/util-ansi';
import { NUM, OBJ, STR } from '@typen/enum-data-types';

function draw(text) { return this.head + text + this.tail }

// 1	Bold or increased
// 2	Faint, decreased intensity, or dim - not widely supported
// 3	Italic - not widely supported
// 4	Underline
// 5	Slow blink
// 6	Rapid blink - not widely supported
// 7	Reverse video or invert
// 8	Conceal or hide - not widely supported
// 9	Crossed-out, or strike - not widely supported

function initialize(attr) {
  let h = '', t = '';
  if (attr > 0) {
    let i = 1;
    do if (attr & 0x1) { h += i + ';', t += '2' + i + ';'; } while (i++ && (attr >>= 1))
  }
  this.head = CSI + h + FORE_INI + SC;
  this.tail = CSI + FORE_DEF + t + SGR;
}

class HexDye {
  head
  tail
  constructor(attr) {
    initialize.call(this, attr);
  }
  static init(ctx) {
    const dye = new HexDye();
    dye.head = ctx.head;
    dye.tail = ctx.tail;
    return dye
  }

  into(hex) {
    const n = hexToInt(hex);
    const r = n >> 16 & 0xFF, g = n >> 8 & 0xFF, b = n & 0xFF;
    return { head: this.head + r + SC + g + SC + b + SGR, tail: this.tail }
  }
  make(hex) {
    return draw.bind(this.into(hex))
  }
  render(hex, text) {
    const n = hexToInt(hex);
    const r = n >> 16 & 0xFF, g = n >> 8 & 0xFF, b = n & 0xFF;
    return this.head + r + SC + g + SC + b + SGR + text + this.tail
  }
}

class HslDye {
  head
  tail
  constructor(attr) {
    initialize.call(this, attr);
  }
  into(hsl) {
    const n = hslToInt(hsl);
    const r = n >> 16 & 0xFF, g = n >> 8 & 0xFF, b = n & 0xFF;
    return { head: this.head + r + SC + g + SC + b + SGR, tail: this.tail }
  }
  make(hsl) {
    return draw.bind(this.into(hsl))
  }
  render(hsl, text) {
    const n = hslToInt(hsl);
    const r = n >> 16 & 0xFF, g = n >> 8 & 0xFF, b = n & 0xFF;
    return this.head + r + SC + g + SC + b + SGR + text + this.tail
  }
}

class IntDye {
  head
  tail
  constructor(attr) {
    initialize.call(this, attr);
  }
  into(n) {
    const r = n >> 16 & 0xFF, g = n >> 8 & 0xFF, b = n & 0xFF;
    return { head: this.head + r + SC + g + SC + b + SGR, tail: this.tail }
  }
  make(n) {
    return draw.bind(this.into(n))
  }
  render(n, text) {
    const r = n >> 16 & 0xFF, g = n >> 8 & 0xFF, b = n & 0xFF;
    return this.head + r + SC + g + SC + b + SGR + text + this.tail
  }
}

class RgbDye {
  head
  tail
  constructor(attr) {
    initialize.call(this, attr);
  }
  into([ r, g, b ]) {
    return { head: this.head + r + SC + g + SC + b + SGR, tail: this.tail }
  }
  make(rgb) {
    return draw.bind(this.into(rgb))
  }
  render([ r, g, b ], text) {
    return this.head + r + SC + g + SC + b + SGR + text + this.tail
  }
}

const HEAD$1 = CSI + FORE_INI + SC;
const TAIL$1 = CSI + FORE_DEF + SGR;
function render(int, text) {
  const r = int >> 16, g = int >> 8, b = int >> 0;
  return (this?.head ?? HEAD$1) + (r & 0xFF) + SC + (g & 0xFF) + SC + (b & 0xFF) + SGR + text + (this?.tail ?? TAIL$1)
}

class DyeFab {
  static build(space, attr) { return DyeFab[space ?? 'rgb'](attr) }
  static prep(space, attr) { return DyeFab[space ?? 'rgb'](attr) }
  static hex(attr) { return new HexDye(attr) }
  static hsl(attr) { return new HslDye(attr) }
  static int(attr) { return new IntDye(attr) }
  static rgb(attr) { return new RgbDye(attr) }
}

class Dye {
  static hex(color, attr) { return (new HexDye(attr)).make(color) }
  static hsl(color, attr) { return (new HslDye(attr)).make(color) }
  static int(color, attr) { return (new IntDye(attr)).make(color) }
  static rgb(color, attr) { return (new RgbDye(attr)).make(color) }
}

const HEAD = CSI + FORE_INI + SC;
const TAIL = CSI + FORE_DEF + SGR;

function drgi(text) {
  const rgi = this;
  if (typeof rgi !== NUM) return text
  const r = rgi >> 16 & 0xFF, g = rgi >> 8 & 0xFF, b = rgi & 0xFF;
  return HEAD + r + SC + g + SC + b + SGR + text + TAIL
}

function drgb(text) {
  const rgb = this;
  if (typeof rgb !== OBJ) return text
  const [ r, g, b ] = rgb;
  return HEAD + r + SC + g + SC + b + SGR + text + TAIL
}

function dhsi(text) {
  const hsi = this;
  if (typeof hsi !== NUM) return text
  return drgi.call(hsiToRgi(hsi), text)
}

function dhsl(text) {
  const hsl = this;
  if (typeof hsl !== OBJ) return text
  return drgi.call(hslToRgi(hsl), text)
}

function dhex(text) {
  const hex = this;
  if (!hex || typeof hex !== STR) return text
  return drgi.call(hexToRgi(hex), text)
}

export { Dye, DyeFab, DyeFab as DyeFactory, HexDye, HslDye, IntDye, RgbDye, dhex, dhsi, dhsl, draw, drgb, drgi, initialize, render };
