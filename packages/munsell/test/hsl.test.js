import { hexToHsl }           from '@palett/convert'
import { Fluo }               from '@palett/fluo'
import { hexToStr, hslToStr } from '@palett/stringify'
import { DecoObject, says }   from '@spare/logger'
import { mapper }             from '@vect/object'
import { rgbToHsl }           from '../src/conversion'
import { HSL }                from '../src/types/HSL'

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

HSL_COLLECTION |> DecoObject({ read: hsl => hslToStr(hsl) }) |> says['XTERM']
const hsl = HSL.from(HSL_COLLECTION.cyan_brillant)

{
  const [ hex, name ] = hsl.comparative();
  `${Fluo.hex(name, hex)} ${hexToStr(hex)} ${hslToStr(hex|> hexToHsl)}` |> says['comparative'].br(name)
}
{
  const [ hex, name ] = hsl.nearest();
  `${Fluo.hex(name, hex)} ${hexToStr(hex)} ${hslToStr(hex|> hexToHsl)}` |> says['nearest'].br(name)
}
{
  const list = hsl.approximates({ h: 54, s: 5, l: 12 })
  for (let [ hex, name ] of list) {
    `${Fluo.hex(name, hex)} ${hexToStr(hex)} ${hslToStr(hex|> hexToHsl)}` |> says['approximates'].br(name)
  }
}
{
  const list = hsl.approximatesByTop(5)
  for (let [ hex, name ] of list) {
    `${Fluo.hex(name, hex)} ${hexToStr(hex)} ${hslToStr(hex|> hexToHsl)}` |> says['approximatesByTop'].br(name)
  }
}
{
  const list = hsl.analogous(60, 5)
  for (let [ hex, name ] of list) {
    `${Fluo.hex(name, hex)} ${hexToStr(hex)} ${hslToStr(hex|> hexToHsl)}` |> says['analogous'].br(name)
  }
}

