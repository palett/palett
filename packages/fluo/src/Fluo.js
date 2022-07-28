import { ProjBeta }            from '@palett/projector'
import { value }               from '@texting/string-value'
import { NUM }                 from '@typen/enum-data-types'
import { isLiteral }           from '@typen/literal'
import { valid }               from '@typen/nullish'
import { isNumeric, parseNum } from '@typen/num-strict'
import { unwind }              from '@vect/entries'
import { wind }                from '@vect/entries-init'
import { transpose }           from '@vect/matrix-algebra'
import { height, width }       from '@vect/matrix-index'
import { reshape }             from '@vect/matrix-init'
import { column }              from './utils/column.js'

const RENDER = 'render'

export class Fluo {
  isLiteral = isLiteral
  isNumeric = isNumeric
  parseNum = parseNum
  strValue = value
  pos = null
  neg = null
  str = null
  numerals = Array()
  literals = Array()
  mode = RENDER
  mutate = false
  constructor(pres, mutate, mode) {
    if (valid(mutate)) this.mutate = mutate
    if (valid(mode)) this.mode = mode
    if (pres?.pos) this.pos = new ProjBeta(pres.pos)
    if (pres?.neg) this.neg = new ProjBeta(pres.neg)
    if (pres?.str) this.str = new ProjBeta(pres.str)
  }

  static entries(entries, pres, mode) {
    const [ keys, vals ] = unwind(entries)
    keys.width = entries.width, vals.width = entries.valueWidth
    return Fluo.wind(keys, vals, pres, mode)
  }
  static wind(keys, vals, pres, mode) {
    const fluo = new Fluo(pres, false, mode)
    return wind(fluo.project(keys), fluo.project(vals))
  }
  static vector(vector, pres, mutate, mode) {
    return (new Fluo(pres, mutate, mode)).project(vector)
  }
  static matrix(matrix, pres, mutate, mode) {
    const vec = (new Fluo(pres, mutate, mode)).project(matrix.flat(1))
    return reshape(vec, height(matrix), width(matrix))
  }
  static columns(matrix, pres, mode) {
    const fluo = new Fluo(pres, true, mode), h = height(matrix), w = width(matrix), columns = Array(w)
    for (let j = 0; j < w; j++) columns[j] = fluo.project(column.call(matrix, j, h))
    return transpose(columns)
  }
  static rows(matrix, pres, mutate, mode) {
    const fluo = new Fluo(pres, mutate, mode), h = matrix.length, rows = mutate ? matrix : Array(h)
    for (let i = 0; i < h; i++) rows[i] = fluo.project(matrix[i])
    return rows
  }

  reset() {
    this.numerals.length = 0
    this.literals.length = 0
    this.pos?.reset()
    this.neg?.reset()
    this.str?.reset()
  }
  project(vector) {
    this.reset()
    const { width, length } = vector
    const mode = this.mode, arr = this.mutate ? vector : Array(length)
    for (let i = 0, x, n, { pos, neg, str } = this; i < length; i++) {
      x = vector[i], n = this.parseNum(x)
      if (pos && this.isNumeric(n)) {
        if (neg) { this.numerals[i] = n >= 0 ? pos.note(n) : neg.note(n) }
        else { this.numerals[i] = pos.note(n) }
        continue
      }
      if (str && this.isLiteral(x)) {
        this.literals[i] = str.note(n = this.strValue(x, width))
        continue
      }
      { this.literals[i] = NaN }
    }
    const pos = this.pos?.ready(), neg = this.neg?.ready(), str = this.str?.ready()
    for (let i = 0, n; i < length; i++) {
      if (pos && typeof (n = this.numerals[i]) === NUM) {
        if (neg) { arr[i] = (!(n < 0) ? pos[mode](n, vector[i]) : neg[mode](n, vector[i])) }
        else { arr[i] = pos[mode](n, vector[i]) }
        continue
      }
      if (str && typeof (n = this.literals[i]) === NUM) {
        arr[i] = str[mode](n, vector[i])
        continue
      }
      { arr[i] = vector[i] }
    }
    return arr
  }
}