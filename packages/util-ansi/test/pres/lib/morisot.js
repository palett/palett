import * as colors    from '@pres/util-colors'
import { FUN }        from '@typen/enum-data-types'
import { CSI, SGR }   from './constants'
import { parseStyle } from './toStyle'


class TputDes {
  static colors = 0
}

export class Morisot {
  static _reduceColor(color) { return colors.reduce(color, TputDes.colors) }
  static presetToCode({ style, fore, back }) {
    return ((parseStyle(style) << 18) | (colors.convert(fore) << 9) | (colors.convert(back)))
  }
  static codeToElements(code) {
    const effect = (code >> 18) & 0x1ff,
      fore = (code >> 9) & 0x1ff,
      back = (code) & 0x1ff
    return [ effect, fore, back ]
  }
  static sattr(style, fg, bg) {
    let { bold, underline, blink, inverse, invisible } = style || {}
    if (fg == null && bg == null) { (fg = style.fg), (bg = style.bg) }
    if (typeof bold === FUN) bold = bold(this)
    if (typeof underline === FUN) underline = underline(this)
    if (typeof blink === FUN) blink = blink(this)
    if (typeof inverse === FUN) inverse = inverse(this)
    if (typeof invisible === FUN) invisible = invisible(this)
    if (typeof fg === FUN) fg = fg(this)
    if (typeof bg === FUN) bg = bg(this)
    // console.log('>> [element.sattr]', this.codename, fg ?? AEU, 'to', colors.convert(fg), bg ?? AEU, 'to', colors.convert(bg))
    return (
      ((invisible ? 16 : 0) << 18) |
      ((inverse ? 8 : 0) << 18) |
      ((blink ? 4 : 0) << 18) |
      ((underline ? 2 : 0) << 18) |
      ((bold ? 1 : 0) << 18) |
      (colors.convert(fg) << 9) |
      (colors.convert(bg))
    ) // return (this.uid << 24) | ((this.dockBorders ? 32 : 0) << 18)
  }


  // Convert an SGR string to our own attribute format.
  static attrCode(code, cur, def) {
    let effect = (cur >> 18) & 0x1ff,
      fore = (cur >> 9) & 0x1ff,
      back = (cur) & 0x1ff
    code = code.slice(2, -1).split(';')
    if (!code[0]) code[0] = '0'
    for (let i = 0, c; i < code.length; i++) {
      c = +code[i] || 0
      switch (c) {
        case 0: // normal
          back = def & 0x1ff
          fore = (def >> 9) & 0x1ff
          effect = (def >> 18) & 0x1ff
          break
        case 1: // bold
          effect |= 1
          break
        case 22:
          effect = (def >> 18) & 0x1ff
          break
        case 4: // underline
          effect |= 2
          break
        case 24:
          effect = (def >> 18) & 0x1ff
          break
        case 5: // blink
          effect |= 4
          break
        case 25:
          effect = (def >> 18) & 0x1ff
          break
        case 7: // inverse
          effect |= 8
          break
        case 27:
          effect = (def >> 18) & 0x1ff
          break
        case 8: // invisible
          effect |= 16
          break
        case 28:
          effect = (def >> 18) & 0x1ff
          break
        case 39: // default fg
          fore = (def >> 9) & 0x1ff
          break
        case 49: // default bg
          back = def & 0x1ff
          break
        case 100: // default fg/bg
          fore = (def >> 9) & 0x1ff
          back = def & 0x1ff
          break
        default: // color
          if (c === 48 && +code[i + 1] === 5) {
            i += 2
            back = +code[i]
            break
          } else if (c === 48 && +code[i + 1] === 2) {
            i += 2
            back = colors.match(+code[i], +code[i + 1], +code[i + 2])
            if (back === -1) back = def & 0x1ff
            i += 2
            break
          } else if (c === 38 && +code[i + 1] === 5) {
            i += 2
            fore = +code[i]
            break
          } else if (c === 38 && +code[i + 1] === 2) {
            i += 2
            fore = colors.match(+code[i], +code[i + 1], +code[i + 2])
            if (fore === -1) fore = (def >> 9) & 0x1ff
            i += 2
            break
          }
          if (c >= 40 && c <= 47) {
            back = c - 40
          } else if (c >= 100 && c <= 107) {
            back = c - 100
            back += 8
          } else if (c === 49) {
            back = def & 0x1ff
          } else if (c >= 30 && c <= 37) {
            fore = c - 30
          } else if (c >= 90 && c <= 97) {
            fore = c - 90
            fore += 8
          } else if (c === 39) {
            fore = (def >> 9) & 0x1ff
          } else if (c === 100) {
            fore = (def >> 9) & 0x1ff
            back = def & 0x1ff
          }
          break
      }
    }
    return (effect << 18) | (fore << 9) | back
  }
  // Convert our own attribute format to an SGR string.
  static codeAttr(code) {
    const flags = (code >> 18) & 0x1ff
    let fg = (code >> 9) & 0x1ff,
      bg = code & 0x1ff,
      out = ''
    if (flags & 1) { out += '1;' } // bold
    if (flags & 2) { out += '4;' } // underline
    if (flags & 4) { out += '5;' } // blink
    if (flags & 8) { out += '7;' } // inverse
    if (flags & 16) { out += '8;' } // invisible
    if (bg !== 0x1ff) {
      bg = Morisot._reduceColor(bg)
      if (bg < 16) {
        if (bg < 8) { bg += 40 } else if (bg < 16) {
          bg -= 8
          bg += 100
        }
        out += bg + ';'
      } else { out += '48;5;' + bg + ';' }
    }
    if (fg !== 0x1ff) {
      fg = Morisot._reduceColor(fg)
      if (fg < 16) {
        if (fg < 8) { fg += 30 } else if (fg < 16) {
          fg -= 8
          fg += 90
        }
        out += fg + ';'
      } else { out += '38;5;' + fg + ';' }
    }
    if (out[out.length - 1] === ';') out = out.slice(0, -1)
    return CSI + out + SGR
  }
}