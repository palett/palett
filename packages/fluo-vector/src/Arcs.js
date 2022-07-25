import { Bound }    from '@aryth/bound'
import { value }    from '@texting/string-value'
import { NUM, STR } from '@typen/enum-data-types'

export class Arcs extends Array {
  pos = new Bound(0, 0)
  neg = new Bound(0, 0)
  str = new Bound(0, 0)
  wd = 0
  ts = 0
  constructor(hi) { super(hi) }
  static from(vec) { return (new Arcs(vec.length)).overwrite(vec) }
  etchNum(x, i) {
    this.hasNum = true // this.ts |= 1 << 1
    return this[i] = x >= 0 ? this.pos.update(x) : this.neg.update(x)
  }
  etchStr(x, i) {
    if (!x?.length) return this.etchNum(NaN, i)
    const n = parseFloat(x = x.trim())
    if (isNaN(x - n)) {
      this.hasStr = true // this.ts |= 1 << 0
      if (x.length > this.wd) this.wd = x.length
      return this[i] = x
    }
    else {
      return this.etchNum(n, i)
    }
  }

  set hasNum(value) { this.ts |= value << 1 }
  set hasStr(value) { this.ts |= value << 0 }

  get hasNum() { return (this.ts >> 1) & 1}
  get hasStr() { return (this.ts >> 0) & 1}
  get hasPos() { return this.pos.hi > 0 }
  get hasNeg() { return this.neg.lo < 0 }

  type(ind) { return (this[ind] >> 24) & 7 }
  overwrite(vec) {
    const size = vec.length, { pos, neg, str } = this
    for (let i = 0, x; i < size; i++) {
      x = vec[i]
      if (x === undefined || x === null) { this.etchNum(NaN, i) }
      else if (typeof x === NUM) { this.etchNum(x, i) }
      else if (typeof x === STR) { this.etchStr(x, i) }
    }
    for (let i = 0, x; i < size; i++) {
      x = this[i]
      if (typeof x === NUM && !isNaN(x))
        this[i] = x > 0
          ? ~((0 << 24) & ((~~(((x - pos.lo) * 0xFF) / pos.dif)) << 0))
          : ~((1 << 24) & ((~~(((x - neg.lo) * 0xFF) / neg.dif)) << 8))
      else if (typeof x === STR)
        this[i] = str.update(value(this[i], this.wd))
    }
    for (let i = 0, n; i < size; i++) {
      n = this[i]
      this[i] = n > 0
        ? (2 << 24) & ((~~(((n - str.lo) * 0xFF) / str.dif)) << 16)
        : ~n
    }
    return this
  }
  boundInfo() {
    return `[str] [${this.str.lo}, ${this.str.hi}] [neg] [${this.neg.lo}, ${this.neg.hi}] [pos] [${this.pos.lo}, ${this.pos.hi}]`
  }
}