import * as colors      from '@pres/util-colors'
import { FUN, NUM }     from '@typen/enum-data-types'
import { CSI, SC, SGR } from './constants'
import { convColor }    from './convColor'
import { Morisot }      from './morisot'
import { parseStyle }   from './toStyle'

class TputDes {
  static colors = 0
}

export class Vonnoh {
  static _reduceColor(color) { return colors.reduce(color, TputDes.colors) }
  static presetToCode({ style, fore, back }) {
    return ((parseStyle(style) << 18) | (convColor(fore) << 9) | (convColor(back)))
  }
  static sattr(style, fore, back) {
    let { bold, underline, blink, inverse, invisible } = style || {}
    if (fore == null && back == null) { (fore = style.fg), (back = style.bg) }
    if (typeof bold === FUN) bold = bold(this)
    if (typeof underline === FUN) underline = underline(this)
    if (typeof blink === FUN) blink = blink(this)
    if (typeof inverse === FUN) inverse = inverse(this)
    if (typeof invisible === FUN) invisible = invisible(this)
    if (typeof fore === FUN) fore = fore(this)
    if (typeof back === FUN) back = back(this)
    style = (invisible ? 16 : 0) | (inverse ? 8 : 0) | (blink ? 4 : 0) | (underline ? 2 : 0) | (bold ? 1 : 0)
    return [ style, fore, back ]
  }
  /**
   *
   * @param {string} target
   * @param {number[]} source
   * @param {number[]} normal
   * @returns {number[]}
   */
  static sgrcToCode(target, source, normal) {
    if (typeof source === NUM) source = Morisot.codeToElements(source)
    if (typeof normal === NUM) normal = Morisot.codeToElements(normal)
    let [ effect, fore, back ] = source
    const vec = target.slice(2, -1).split(';')
    if (!vec[0]) vec[0] = '0'
    for (let i = 0, len = vec.length, c; i < len; i++) {
      c = +vec[i] || 0
      if (c === 0) { [ effect, fore, back ] = normal } // normal / reset
      else if (c === 1) { effect |= 1 } // bold
      else if (c === 4) { effect |= 2 } // underline
      else if (c === 5) { effect |= 4 } // blink
      else if (c === 7) { effect |= 8 } // inverse
      else if (c === 8) { effect |= 16 } // invisible / conceal / hide
      else if (c === 22) { effect = normal[0] } // normal intensity
      else if (c === 24) { effect = normal[0] } // not underlined
      else if (c === 25) { effect = normal[0] } // not blink
      else if (c === 27) { effect = normal[0] } // not inverse / reversed
      else if (c === 28) { effect = normal[0] } // not conceal / reveal
      else if (c >= 30 && c <= 37) { fore = c - 30 } // color
      else if (c === 38) {
        if (+vec[i + 1] === 5) { i += 2, fore = +vec[i] }
        else if (+vec[i + 1] === 2) {
          ++i , fore = vec[++i] + SC + vec[++i] + SC + vec[++i]
        }
      }
      else if (c === 39) { fore = normal[1] } // default fg
      else if (c >= 40 && c <= 47) { back = c - 40 }
      else if (c === 48) {
        if (+vec[i + 1] === 5) { i += 2, back = +vec[i] }
        else if (+vec[i + 1] === 2) {
          ++i , back = vec[++i] + SC + vec[++i] + SC + vec[++i]
        }
      }
      else if (c === 49) { back = normal[2] } // default bg
      else if (c === 100) { fore = normal[1], back = normal[2] } // default fg/bg
      else if (c >= 90 && c <= 97) { fore = c - 90, fore += 8 }
      else if (c >= 100 && c <= 107) { back = c - 100, back += 8 }
    }
    return [ effect, fore, back ]
  }
  /**
   *
   * @param {number[]} code
   * @returns {string}
   */
  static codeToSgrc(code) {
    let [ effect, fore, back ] = code,
        out                    = ''
    if (effect & 1) { out += '1;' } // bold
    if (effect & 2) { out += '4;' } // underline
    if (effect & 4) { out += '5;' } // blink
    if (effect & 8) { out += '7;' } // inverse
    if (effect & 16) { out += '8;' } // invisible
    if (back !== 0x1ff) {
      back = Vonnoh._reduceColor(back)
      if (back < 16) {
        if (back < 8) { back += 40 }
        else if (back < 16) { back -= 8, back += 100 }
        out += back + ';'
      }
      else { out += '48;5;' + back + ';' }
    }
    if (fore !== 0x1ff) {
      fore = Vonnoh._reduceColor(fore)
      if (fore < 16) {
        if (fore < 8) { fore += 30 }
        else if (fore < 16) { fore -= 8, fore += 90 }
        out += fore + ';'
      }
      else { out += '38;5;' + fore + ';' }
    }
    if (out[out.length - 1] === ';') out = out.slice(0, -1)
    return CSI + out + SGR
  }
}