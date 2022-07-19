import { NUM, STR } from '@typen/enum-data-types'
import { Bound }    from '@aryth/bound'
import { value }    from '@texting/string-value'

export class Arcs extends Array {
  str = new Bound(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY)
  num = new Bound(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY)
  wd = 0
  ts = 0
  constructor(hi) { super(hi) }
  static from(vec) { return (new Arcs(vec.length)).overwrite(vec) }
  etch(x, i) {
    if (x === undefined || x === null) return this.etchNum(NaN, i)
    if (typeof x === NUM) return this.etchNum(x, i)
    if (typeof x !== STR) x = x.toString()
    {
      if (x.length === 0) return this.etchNum(NaN, i)
      const n = parseFloat(x = x.trim())
      return isNaN(x - n) ? this.etchStr(x, i) : this.etchNum(n, i)
    }
  }
  etchNum(x, i) {
    this.hasNum = true // this.ts |= 1 << 1
    return this[i] = this.num.update(x)
  }
  etchStr(x, i) {
    this.hasStr = true // this.ts |= 1 << 0
    if (x.length > this.wd) this.wd = x.length
    return this[i] = x
  }
  get hasNum() { return (this.ts >> 1) & 1}
  get hasStr() { return (this.ts >> 0) & 1}
  set hasNum(value) { this.ts |= value << 1 }
  set hasStr(value) { this.ts |= value << 0 }
  ratio() {
    const size = this.length
    if (this.ts === 0b01) {
      for (let i = 0; i < size; i++)
        this.str.update(this[i] = value(this[i], this.wd))
      for (let i = 0, { lo, dif } = this.str; i < size; i++)
        this[i] = ~~(((this[i] - lo) * 0xFF) / dif)
      return this
    }
    if (this.ts === 0b10) {
      for (let i = 0, { lo, dif } = this.num, n; i < size; i++)
        if (!isNaN(n = this[i])) { this[i] = ~~(((n - lo) * 0xFF) / dif)}
      return this
    }
    if (this.ts === 0b11) {
      for (let i = 0, { lo, dif } = this.num, x; i < size; i++) {
        x = this[i]
        if (typeof x === NUM && !isNaN(x)) this[i] = ~(((x - lo) * 0xFF) / dif)
        if (typeof x === STR) this.str.update(this[i] = value(x, this.wd))
      }
      for (let i = 0, { lo, dif } = this.str, n; i < size; i++) {
        if (isNaN(n = this[i])) continue
        this[i] = n < 0 ? ~n << 8 : ~~(((n - lo) * 0xFF) / dif)
      }
      return this
    }
    return this
  }
  overwrite(vec) {
    for (let i = 0, hi = vec.length; i < hi; i++) { this.etch(vec[i], i) }
    return this.ratio()
  }
  boundInfo() {
    return `[num] [${this.num.lo}, ${this.num.hi}] [str] [${this.str.lo}, ${this.str.hi}]`
  }
}