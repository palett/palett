import { hsiToRgi, modHsi, rgiToRgb } from '@palett/convert'
import { rgbToStr }                   from '@palett/stringify'
import { init }                       from '@vect/vector-init'

export function demo(pres, count) {
  return `${sequence.call(pres, count).map(int => rgbToStr(rgiToRgb(int))).join(' ')} | ${(rgbToStr(rgiToRgb(pres.nan)))}`
}

export function sequence(count = 2) {
  if (count < 2) count = 2
  const delta = count - 1
  const pres = this
  const [ hb, sb, lb, hp, sp, lp ] = pres
  const lever = [ (hp - hb) / delta, (sp - sb) / delta, (lp - lb) / delta ]
  return init(count, i => hsiToRgi(modHsi(pres.min, i * lever[0], i * lever[1], i * lever[2])))
}