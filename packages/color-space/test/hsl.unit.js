import { rgbToHsl }         from '@palett/convert'
import { HexDye }           from '@palett/dye'
import { hslToStr }         from '@palett/stringify'
import { DecoObject, says } from '@spare/logger'
import { mapper }           from '@vect/object'
import { HSL }              from '../src/HSL.js'

export const XTERM = {
  noir: [ 0, 0, 0 ],
  rouge: [ 205, 0, 0 ],
  vert: [ 0, 205, 0 ],
  jaune: [ 205, 205, 0 ],
  bleu: [ 0, 0, 238 ],
  magenta: [ 205, 0, 205 ],
  cyan: [ 0, 205, 205 ],
  blanc: [ 229, 229, 229 ],
  noir_brillant: [ 127, 127, 127 ],
  rouge_brillant: [ 255, 0, 0 ],
  vert_brillant: [ 0, 255, 0 ],
  jaune_brillant: [ 255, 255, 0 ],
  bleu_brillant: [ 92, 92, 255 ],
  magenta_brillant: [ 255, 0, 255 ],
  cyan_brillant: [ 0, 255, 255 ],
  blanc_brillant: [ 255, 255, 255 ],
}

const HSL_COLLECTION = mapper(XTERM, rgb => rgbToHsl(rgb))

says['XTERM'](DecoObject({ read: hsl => hslToStr(hsl) })(HSL_COLLECTION))
const hsl = HSL.from(HSL_COLLECTION.cyan_brillant)
const dye = new HexDye

for (let [ key, rgb ] of XTERM) {
  const hsl = HSL.fromRgb(rgb)
}
