import { draw, HexDye, HslDye, IntDye, RgbDye } from '@palett/dye'
import { ProjBeta }                             from '@palett/projector'
import { value }                                from '@texting/string-value'
import { NUM }                                  from '@typen/enum-data-types'
import { isLiteral }                            from '@typen/literal'
import { valid }                                from '@typen/nullish'
import { isNumeric, parseNum }                  from '@typen/num-strict'
import { wind }                                 from '@vect/entries-init'
import { unwind }                               from '@vect/entries'
import { transpose }                            from '@vect/matrix-algebra'
import { size }                                 from '@vect/matrix-index'
import { reshape }                              from '@vect/matrix-init'
import { column }                               from './utils/column.js'

// export class Fluo {
//   static hex(text, hex) { return draw.call(HexDye.prototype.into.call(this, hex), text) }
//   static hsl(text, hsl) { return draw.call(HslDye.prototype.into.call(this, hsl), text) }
//   static int(text, int) { return draw.call(IntDye.prototype.into.call(this, int), text) }
//   static rgb(text, rgb) { return draw.call(RgbDye.prototype.into.call(this, rgb), text) }
// }

export function fluo(text, rgb) { return draw.call(RgbDye.prototype.into.call(this, rgb), text) }

const RENDER = 'render'

export class Fluo {
  isLiteral = isLiteral
  isNumeric = isNumeric
  parseNum = parseNum
  pos
  neg
  str
  numerals = Array()
  literals = Array()
  wd = 14
  mode = RENDER
  mutate = false
  constructor(pres, mutate, mode) {
    if (valid(mutate)) this.mutate = mutate
    if (valid(mode)) this.mode = mode
    this.pos = new ProjBeta(pres.pos)
    this.neg = new ProjBeta(pres.neg)
    this.str = new ProjBeta(pres.str)
  }
  static hex(text, hex) { return draw.call(HexDye.prototype.into.call(this, hex), text) }
  static hsl(text, hsl) { return draw.call(HslDye.prototype.into.call(this, hsl), text) }
  static int(text, int) { return draw.call(IntDye.prototype.into.call(this, int), text) }
  static rgb(text, rgb) { return draw.call(RgbDye.prototype.into.call(this, rgb), text) }

  static entries(entries, pres, keyWd, valWd, mode) {
    const [ keys, vals ] = unwind(entries)
    const fluo = new Fluo(pres, true, mode)
    return wind(fluo.project(keys, keyWd), fluo.project(vals, valWd))
  }
  static vector(vector, pres, width, mutate, mode) {
    return (new Fluo(pres, mutate, mode)).project(vector, width)
  }
  static matrix(matrix, pres, width, mutate, mode) {
    const vec = (new Fluo(pres, mutate, mode)).project(matrix.flat(1), width)
    const [ h, w ] = size(matrix)
    return reshape(vec, h, w)
  }
  static columns(matrix, pres, mutate, mode) {
    const fluo = new Fluo(pres, true, mode), [ h, w ] = size(matrix), columns = Array(w)
    for (let j = 0, col; j < w; j++) columns[j] = fluo.project((col = column.call(matrix, j, h)), col.wd)
    return transpose(columns)
  }
  static rows(matrix, pres, mutate, mode) {
    const fluo = new Fluo(pres, true, mode), h = matrix.length, rows = Array(h)
    for (let i = 0; i < h; i++) rows[i] = fluo.project(matrix[i])
    return transpose(rows)
  }

  reset(wd) {
    this.wd = wd ?? 14
    this.numerals.length = 0
    this.literals.length = 0
    this.pos.reset()
    this.neg.reset()
    this.str.reset()
  }
  project(vector, width) {
    this.reset(width)
    const len = vector.length, mode = this.mode, arr = this.mutate ? vector : Array(len)
    for (let i = 0, x, n, { pos, neg, str } = this; i < len; i++) {
      x = vector[i], n = this.parseNum(x)
      if (this.isNumeric(n)) {
        this.numerals[i] = n >= 0 ? pos.note(n) : neg.note(n)
        continue
      }
      if (this.isLiteral(x)) {
        this.literals[i] = str.note(n = value(x, this.wd))
        continue
      }
      { this.literals[i] = NaN }
    }
    const pos = this.pos.ready(), neg = this.neg.ready(), str = this.str.ready()
    for (let i = 0, n; i < len; i++) {
      if (typeof (n = this.numerals[i]) === NUM) {
        arr[i] = (!(n < 0) ? pos[mode](n, vector[i]) : neg[mode](n, vector[i]))
        continue
      }
      if (typeof (n = this.literals[i]) === NUM) {
        arr[i] = str[mode](n, vector[i])
        continue
      }
      { arr[i] = vector[i] }
    }
    return arr
  }
}