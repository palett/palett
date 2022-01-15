import { hexToRgb }           from '@palett/convert'
import { Fluo }               from '@palett/fluo'
import { hexToStr, rgbToStr } from '@palett/stringify'
import { DecoObject, says }   from '@spare/logger'
import { RGB }                from '../src/types/RGB'

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

RGB_COLLECTION |> DecoObject({ read: rgbToStr }) |> says['XTERM']
const rgb = RGB.from(RGB_COLLECTION.cyan_brillant)

{
  const [ hex, name ] = rgb.comparative();
  `${Fluo.hex(name, hex)} ${hexToStr(hex)} ${rgbToStr(hex|> hexToRgb)}` |> says['comparative'].br(name)
}
{
  const [ hex, name ] = rgb.nearest();
  `${Fluo.hex(name, hex)} ${hexToStr(hex)} ${rgbToStr(hex|> hexToRgb)}` |> says['nearest'].br(name)
}
{
  const list = rgb.approximates({ h: 54, s: 5, l: 12 })
  for (let [ hex, name ] of list) {
    `${Fluo.hex(name, hex)} ${hexToStr(hex)} ${rgbToStr(hex|> hexToRgb)}` |> says['approximates'].br(name)
  }
}
{
  const list = rgb.approximatesByTop(5)
  for (let [ hex, name ] of list) {
    `${Fluo.hex(name, hex)} ${hexToStr(hex)} ${rgbToStr(hex|> hexToRgb)}` |> says['approximatesByTop'].br(name)
  }
}

