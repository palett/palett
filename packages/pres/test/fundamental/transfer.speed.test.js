import { hexToInt, hexToRgb, hslToRgb, rgbToHsl } from '@palett/convert'
import { test }               from 'node:test'
import { hsaToRgi, hexToHsi } from '../../src/color-bitwise.js'
import { hue }                from '../../src/color-utils.js'

function int_hsv(int) {
  let r = int >> 16 & 0xFF, g = int >> 8 & 0xFF, b = int & 0xFF
  let hi, lo
  g > r ? (hi = g, lo = r) : (hi = r, lo = g)
  b > hi ? hi = b : b < lo ? lo = b : void 0
  const tt = hi + lo, df = hi - lo,
    h = hue(r, g, b, hi, df) * 85, // original h ∈ [0,6), let h = h * 60 * 510 / 360, makes h ∈ [0,510)
    s = !df ? 0 : (df * 255) / (tt > 255 ? (510 - tt) : tt), // s ∈ [0,255)
    l = tt >> 1 // l ∈ [0,255)
  return ((h & 0x1FF) << 16) | ((s & 0xFF) << 8) | (l & 0xFF) // 8 bit + 8 bit + 8 bit = 24 bit
}

function hsv_int(hsv) {
  let h = hsv >> 16 & 0x1FF, s = hsv >> 8 & 0xFF, l = hsv & 0xFF
  h++, s++, l++
  return hsaToRgi(h, s, l)
}

function hsl_rgb(hsl) {
  let h = hsl[0], s = hsl[1], l = hsl[2]
  h++, s++, l++
  const tar = [ h, s, l ]
  return hslToRgb(tar)
}

function int_hsl_int(int) {
  let hsl = int_hsv(int)
  let h = hsl >> 16 & 0x1FF, s = hsl >> 8 & 0xFF, l = hsl & 0xFF
  h++, s++, l++
  return hsaToRgi(h, s, l)
}


test('value storage', () => {
  const hex = '#22F0CC'
  const rgb = hexToRgb(hex)
  const int = hexToInt(hex)
  const hsl = rgbToHsl(rgb)
  const hslVal = hexToHsi(hex)

  const quant = 1e8
  console.time('INT HSV')
  for (let i = 0; i < quant; i++) {
    int_hsv(int)
  }
  console.timeEnd('INT HSV')

  console.time('HSV INT')
  for (let i = 0; i < quant; i++) {
    hsv_int(hslVal)
  }
  console.timeEnd('HSV INT')

  console.time('HSL RGB')
  for (let i = 0; i < quant; i++) {
    hsl_rgb(hsl)
  }
  console.timeEnd('HSL RGB')

  console.time('INT HSL INT')
  for (let i = 0; i < quant; i++) {
    int_hsl_int(int)
  }
  console.timeEnd('INT HSL INT')
})