import { lim0up, limBy, rec0up } from '@aryth/math'
import { randBetw }              from '@aryth/rand'
import { hexToInt, intToRgb }    from '@palett/convert'
import { init }                  from '@vect/vector-init'
import { hexOntoHsl, hslToInt }  from './algebra.js'

export const scale = (vdf, lev, tlo) => vdf <= 0 ? tlo : tlo + vdf * lev

export const limFF = (vdf, lev, tlo) => {
  if (vdf <= 0) return tlo
  const t = tlo + vdf * lev
  return t < 0 ? 0 : t > 0xFF ? 0xFF : t
}

const GREY = '#CCCCCC'

export class Preset {
  nan = 0
  constructor(min, max, nan) {
    hexOntoHsl(min, this, 0)
    hexOntoHsl(max, this, 3)
    if (nan) this.nan = hexToInt(nan)
  }

  static build(min, max, nan = GREY) { return new Preset(min, max, nan) }
  static from(preset, attr) {
    const { min, max, nan } = preset
    preset = new Preset(min, max, nan)
    if (attr) preset.attr = attr
    return preset
  }
  static rand(hex, name) { return randPreset(hex, name) }

  get min() { return hslToInt(this[0], this[1], this[2]) }
  get max() { return hslToInt(this[3], this[4], this[5]) }

  * [Symbol.iterator]() {
    yield this[0]
    yield this[1]
    yield this[2]
    yield this[3]
    yield this[4]
    yield this[5]
  }
  toInt() { return { min: this.min, max: this.max, nan: this.nan } }
  toRgb() { return { min: this.min |> intToRgb, max: this.max |> intToRgb, nan: this.nan |> intToRgb } }
  reverse() { return Preset.build(this.max, this.min, this.nan) }
  range(count = 2) {
    if (count < 2) count = 2
    const gaps = count - 1
    const lev = [ (this[3] - this[0]) / gaps, (this[4] - this[1]) / gaps, (this[5] - this[2]) / gaps ]
    return init(count, i => this.proj(lev, i))
  }
  proj(lev, val) {
    const vdf = val - (lev.lo ?? 0)
    return hslToInt(scale(vdf, lev[0], this[0]), limFF(vdf, lev[1], this[1]), limFF(vdf, lev[2], this[2]))
  }
}

/**
 *
 * @param {string} hex
 * @param {string} [name]
 * @returns {{min:string, max:string, na:string, [name]:string}}
 */
export const randPreset = (hex, name) => {
  const pre = new Preset()
  hexOntoHsl(hex, pre, 0)
  pre[3] = rec0up(pre[0] + randBetw(-12, 12), 360)
  pre[4] = lim0up(pre[1] + randBetw(-5, 10), 100)
  pre[5] = lim0up(pre[2] + randBetw(6, 18), 100)
  pre.nan = hslToInt(
    rec0up(pre[0] + 180, 360),
    limBy(pre[1] - 32, 5, 90),
    limBy(pre[2] + 24, 40, 96)
  )
  if (name?.length) pre.name = name
  return pre
}


