import { hexToHsl, rgbToHsl } from '@palett/convert'
import { HexDye }             from '@palett/dye'
import { hexToStr, hslToStr } from '@palett/stringify'
import { decoObject, says }   from '@spare/logger'
import { mapper }             from '@vect/object'
import { test }               from 'node:test'
import { HSL }                from '../archive/extends/HSL.js'

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

const HSL_COLLECTION = mapper(XTERM, rgbToHsl)

test('HSL', () => {
  says['XTERM'](decoObject(mapper(HSL_COLLECTION, hslToStr)))
  const hsl = HSL.from(HSL_COLLECTION.jaune_brillant)
  const dye = new HexDye()
  {
    const [ hex, name ] = hsl.comparative()
    // Transform `${dye.render(hex, name)} ${hexToStr(hex)} ${hslToStr(hex|> hexToHsl)}` |> says['comparative']
    says['comparative'](`[${name}] ${dye.render(hex, name)} ${hexToStr(hex)} ${hslToStr(hexToHsl(hex))}`)
  }
  {
    const [ hex, name ] = hsl.nearest()
    // Transform `${dye.render(hex, name)} ${hexToStr(hex)} ${hslToStr(hex|> hexToHsl)}` |> says['nearest']
    says['nearest'](`[${name}] ${dye.render(hex, name)} ${hexToStr(hex)} ${hslToStr(hexToHsl(hex))}`)
  }
  {
    const list = hsl.approximates({ h: 54, s: 5, l: 12 })
    for (let [ hex, name ] of list) {
      // Transform `${dye.render(hex, name)} ${hexToStr(hex)} ${hslToStr(hex|> hexToHsl)}` |> says['approximates']
      says['approximates'](`[${name}] ${dye.render(hex, name)} ${hexToStr(hex)} ${hslToStr(hexToHsl(hex))}`)
    }
  }
  {
    const list = hsl.approximatesByTop(5)
    for (let [ hex, name ] of list) {
      // Transform `${dye.render(hex, name)} ${hexToStr(hex)} ${hslToStr(hex|> hexToHsl)}` |> says['approximatesByTop']
      says['approximatesByTop'](`[${name}] ${dye.render(hex, name)} ${hexToStr(hex)} ${hslToStr(hexToHsl(hex))}`)
    }
  }
  {
    const list = hsl.analogous(60, 5)
    for (let [ hex, name ] of list) {
      // Transform `${dye.render(hex, name)} ${hexToStr(hex)} ${hslToStr(hex|> hexToHsl)}` |> says['analogous']
      says['analogous'](`[${name}] ${dye.render(hex, name)} ${hexToStr(hex)} ${hslToStr(hexToHsl(hex))}`)
    }
  }
})

