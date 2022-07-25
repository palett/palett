import { value }               from '@texting/string-value'
import { NUM }                 from '@typen/enum-data-types'
import { isLiteral }           from '@typen/literal'
import { isNumeric, parseNum } from '@typen/num-strict'
import { ProjBeta }            from '@palett/projector'

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
  mode = 'render'
  constructor(pres) {
    this.pos = new ProjBeta(pres.pos)
    this.neg = new ProjBeta(pres.neg)
    this.str = new ProjBeta(pres.str)
  }
  reset(wd) {
    this.wd = wd ?? 14
    this.numerals.length = 0
    this.literals.length = 0
    this.pos.reset()
    this.neg.reset()
    this.str.reset()
  }
  project(vector, width, mode, mutate) {
    this.reset(width)
    mode = mode ?? this.mode
    const len = vector.length
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
    const tar = mutate ? vector : Array(len)
    for (let i = 0, n; i < len; i++)
      tar[i] =
        typeof (n = this.numerals[i]) === NUM ? (!(n < 0) ? pos[mode](n, vector[i]) : neg[mode](n, vector[i])) :
          typeof (n = this.literals[i]) === NUM ? str[mode](n, vector[i]) :
            ''
    return tar
  }
}