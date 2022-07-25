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
  project(matrix, width, mode, mutate) {
    this.reset(width)
    mode = mode ?? this.mode
    const ht = matrix.length
    for (let i = 0, x, n, { pos, neg, str } = this; i < ht; i++) {
      const row = matrix[i], wd = row.length
      const numeralRow = this.numerals[i] = Array(wd)
      const literalRow = this.literals[i] = Array(wd)
      for (let j = 0, row = matrix[i], wd = row.length; j < wd; j++) {
        x = row[i], n = this.parseNum(x)
        if (this.isNumeric(n)) {
          numeralRow[j] = n >= 0 ? pos.note(n) : neg.note(n)
          continue
        }
        if (this.isLiteral(x)) {
          literalRow[j] = str.note(n = value(x, this.wd))
          continue
        }
        { literalRow[j] = NaN }
      }
    }
    const pos = this.pos.ready(), neg = this.neg.ready(), str = this.str.ready()
    const tar = mutate ? matrix : Array(ht)
    for (let i = 0; i < ht; i++) {
      const row = matrix[i], wd = row.length
      const tarRow = tar[i] ?? (tar[i] = Array(wd))
      for (let j = 0, n; i < wd; i++)
        tarRow[j] =
          typeof (n = this.numerals[i][j]) === NUM ? (!(n < 0) ? pos[mode](n, row[j]) : neg[mode](n, row[j])) :
            typeof (n = this.literals[i][j]) === NUM ? str[mode](n, row[j]) :
              ''
    }
    return tar
  }
}