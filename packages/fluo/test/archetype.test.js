// import { parseNum } from '@texting/charset-halfwidth'
import { value }    from '@texting/string-value'
import { NUM, STR } from '@typen/enum-data-types'

export class Arcs extends Array {
  tHi
  tLo
  nHi
  nLo
  wd = 0
  constructor(hi) { super(hi) }
  record(x, i) {
    let n = x
    if (typeof x === NUM || !isNaN(x - (n = parseFloat(x)))) {
      if (n > this.nHi) { this.nHi = n } else if (n < this.nLo) { this.nLo = n }
    } else {
      if ((n = value(x, this.wd)) > this.tHi) { this.tHi = n } else if (n < this.tLo) { this.tLo = n }
    }
    this[i] = n
  }
  overwrite(vec) {
    const size = vec.length
    const types = Array(size)
    for (let i = 0; i < size; i++) {
      let x = vec[i], n = x
      if (typeof x === NUM || !isNaN(x - (n = parseFloat(x)))) {
        types[i] = NUM
        this[i] = n
      } else {
        types[i] = STR
        if (x.length > this.wd) this.wd = x.length
        this[i] = x
      }
    }
    // need wd
    for (let i = 0; i < size; i++) {
      let n = vec[i]
      if (types[i] === NUM) {
        if (n > this.nHi) { this.nHi = n } else if (n < this.nLo) { this.nLo = n }
      } else {
        if ((n = value(n, this.wd)) > this.tHi) { this.tHi = n } else if (n < this.tLo) { this.tLo = n }
        this[i] = n
      }
    }
    // need hi and lo
    for (let i = 0; i < size; i++) {
      let n = this[i]
      if (types[i] === NUM) {
        this[i] = (n - this.nLo) / (this.nHi - this.nLo) * 255
      } else {
        this[i] = (n - this.tLo) / (this.tHi - this.tLo) * 255
      }
    }
    return this
  }
}