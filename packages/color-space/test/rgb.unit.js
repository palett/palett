import { hexToRgb }           from '@palett/convert'
import { Fluo }               from '@palett/fluo'
import { hexToStr, rgbToStr } from '@palett/stringify'
import { DecoObject, says }   from '@spare/logger'
import { RGB }                from '../src/RGB.js'

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

const RGB_COLLECTION = XTERM

says['XTERM'](DecoObject({ read: rgbToStr })(RGB_COLLECTION))
const rgb = RGB.from(RGB_COLLECTION.cyan_brillant)

{
  const [ hex, name ] = rgb.comparative()
  says['comparative'].br(name)(`${Fluo.hex(name, hex)} ${hexToStr(hex)} ${rgbToStr(hexToRgb(hex))}`)
}
{
  const [ hex, name ] = rgb.nearest()
  says['nearest'].br(name)(`${Fluo.hex(name, hex)} ${hexToStr(hex)} ${rgbToStr(hexToRgb(hex))}`)
}
{
  const list = rgb.approximates({ h: 54, s: 5, l: 12 })
  for (let [ hex, name ] of list) {
    says['approximates'].br(name)(`${Fluo.hex(name, hex)} ${hexToStr(hex)} ${rgbToStr(hexToRgb(hex))}`)
  }
}
{
  const list = rgb.approximatesByTop(5)
  for (let [ hex, name ] of list) {
    says['approximatesByTop'].br(name)(`${Fluo.hex(name, hex)} ${hexToStr(hex)} ${rgbToStr(hexToRgb(hex))}`)
  }
}

