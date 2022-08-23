import { Projec, SignedProj } from '@palett/projector'
import { ArcFab, Cate }       from '@spare/arc'
import { value }              from '@texting/string-value'
import { valid }              from '@typen/nullish'
import { unwind }             from '@vect/entries'
import { wind }               from '@vect/entries-init'
import { transpose }          from '@vect/matrix-algebra'
import { height, width }      from '@vect/matrix-index'
import { reshape }            from '@vect/matrix-init'
import { column }             from './utils/column.js'

const RENDER = 'render'

export class Fluo {
  strTo = value
  mode = RENDER
  mutate = false
  constructor(pres, mutate, mode) {
    if (valid(mutate)) this.mutate = mutate
    if (valid(mode)) this.mode = mode
    if (pres?.num) this.num = new Projec(pres.num)
    if (pres?.pos && pres?.neg) this.num = new SignedProj(pres.pos, pres.neg)
    if (pres?.str) this.str = new Projec(pres.str)
  }

  get signed() { return this.num.pos && this.num.neg }
  static entries(entries, pres, mode) {
    const [ keys, vals ] = unwind(entries)
    keys.width = entries.width, vals.width = entries.width
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

  project(vec, conf) { return this.render(ArcFab.to(vec, conf)) }
  render(arc) {
    const { strs, nums, cats, size, width: w } = arc
    const { strTo, mode } = this
    const sgrs = this.mutate ? strs : Array(size)
    const numPr = this.signed ? this.num?.load(nums.pos, nums.neg) : this.num?.load(nums.lo, nums.hi),
          strPr = this.str?.load(strTo(strs.lo ?? '', w), strTo(strs.hi ?? '', w))
    for (let i = 0, c, s, n; i < size; i++) {
      c = cats[i], s = strs[i], n = nums[i]
      sgrs[i] =
        c === Cate.Num ? numPr[mode](nums[i], s) :
          c === Cate.Str ? strPr[mode](strTo(s, w), s) :
            s
    }
    return sgrs
  }
}