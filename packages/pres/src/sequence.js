import { init }         from '@vect/vector-init'
import { hsaToRgi }     from './color-bitwise.js'
import { limFF, scale } from './color-utils.js'

export function sequence(count = 2) {
  if (count < 2) count = 2
  const delta = count - 1
  const [ hb, sb, lb, hp, sp, lp ] = this
  const lever = [ (hp - hb) / delta, (sp - sb) / delta, (lp - lb) / delta ]
  return init(count, i => proj.call(this, lever, i))
}

export function proj(lever, value) {
  const incre = value - (lever.lo ?? 0)
  const [ ha, sa, la ] = lever
  const hb = this.min >> 16 & 0x1FF, sb = this.min >> 8 & 0xFF, lb = this.min & 0xFF
  return hsaToRgi(scale(incre, ha, hb), limFF(incre, sa, sb), limFF(incre, la, lb))
}