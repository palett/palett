import { minus }                        from '@aryth/polar'
import { hsiToHsl, hsiToRgb, rgiToRgb } from '@palett/convert'
import { hslToStr, rgbToStr }           from '@palett/stringify'
import { init }                         from '@vect/vector-init'

export function demoTapeRGB(count) {
  return `${sequence.call(this, count).map(hsi => rgbToStr(hsiToRgb(hsi))).join(' ')} | ${(rgbToStr(rgiToRgb(this.nan)))}`
}

export function demoTapeHSL(count) {
  return `${sequence.call(this, count).map(hsi => hslToStr(hsiToHsl(hsi))).join(' ')} | ${(rgbToStr(rgiToRgb(this.nan)))}`
}

export function sequence(count = 2) {
  if (count < 2) count = 2
  const delta = count - 1
  const pres = this
  const [ hb, sb, lb, hp, sp, lp ] = pres
  const lever = [ minus(hp, hb) / delta, (sp - sb) / delta, (lp - lb) / delta ]
  return init(count, i => pres.proj(lever, 0, i))
}