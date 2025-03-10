import { round }              from '@aryth/math'
import { hslToInt, intToRgb } from '@palett/convert'
import { test }    from 'node:test'
import { channel } from '@palett/convert/src/util/number-utils.js'

const PARAM = 85.33333333333333

export function hsiToInt_grok(int) {
  let h = int >> 18 & 0x1FF, s = int >> 9 & 0x1FF, l = int & 0x1FF
  // h += 1
  // s += 1 // mock round
  // l += 1 // mock round

  // Normalize HSL2 values to [0,1]
  h = h / 360  // Hue mapped from [0,511] to [0,1]
  s = s / 511.0  // Saturation mapped from [0,255] to [0,1]
  l = l / 511.0  // Lightness mapped from [0,255] to [0,1]

  let r, g, b

  // If saturation is 0, it's grayscale
  if (s === 0) {
    r = g = b = l
  } else {
    // Helper function to compute RGB components
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    // Compute intermediate values
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    // Compute RGB in [0,1]
    r = hue2rgb(p, q, h + 1 / 3) * 255
    g = hue2rgb(p, q, h) * 255
    b = hue2rgb(p, q, h - 1 / 3) * 255
  }
  return (r & 0xFF) << 16 | (g & 0xFF) << 8 | b & 0xFF
}
export function hsiToInt_edge(int) {
  let h = int >> 18 & 0x1FF, s = int >> 9 & 0x1FF, l = int & 0x1FF
  h = h / 30 // original h ∈ [0,360), then h = h * 12 / 30, makes h ∈ [0,12)
  const a = l <= 255.5 ? (s * l / 511) : (s - s * l / 511)
  const r = (channel(0, h, a, l) + 1) >> 1 // ( 2x + 1 ) >> 1 -> mock round(x)
  const g = (channel(8, h, a, l) + 1) >> 1
  const b = (channel(4, h, a, l) + 1) >> 1
  return (r & 0xFF) << 16 | (g & 0xFF) << 8 | b & 0xFF
}
export function hsiToInt_next(int) {
  let h = int >> 18 & 0x1FF, s = int >> 9 & 0x1FF, l = int & 0x1FF
  h = h / 30
  function hf(off, hv, co, l) {
    let ph = (off + hv) % 12
    ph = Math.min(ph - 3, 9 - ph) // equivalent to: if (m < 6) { m - 3 } else { 9 - m }
    ph = ph > 1 ? 1 : ph < -1 ? -1 : ph
    return ((l - co * ph) + 1) >> 1
  }
  const a = s * (l <= 255 ? l : 511 - l) / 511
  const r = hf(0, h, a, l)
  const g = hf(8, h, a, l)
  const b = hf(4, h, a, l)
  return (r & 0xFF) << 16 | (g & 0xFF) << 8 | b & 0xFF
}
export function hsiToInt_epic(int) {
  let h = int >> 18 & 0x1FF, s = int >> 9 & 0x1FF, l = int & 0x1FF
  const hsl = [ round(h), round(s / 5.11), round(l / 5.11) ]
  return hslToInt(hsl)
}

test('hsl to rgb', () => {
  const h = 300
  const s = 511
  const l = 255
  const hsl = [ h, s, l ]
  const hslVal = (h & 0x1FF) << 18 | (s & 0x1FF) << 9 | l & 0x1FF

  const TEST_GROK = 'hsi → int - grok'
  const TEST_EPIC = 'hsi → int - epic'
  const TEST_EDGE = 'hsi → int - edge'
  const TEST_NEXT = 'hsi → int - next'

  const quant = 1e8
  console.log(TEST_GROK, intToRgb(hsiToInt_grok(hslVal)))
  console.log(TEST_EPIC, intToRgb(hsiToInt_epic(hslVal)))
  console.log(TEST_EDGE, intToRgb(hsiToInt_edge(hslVal)))
  console.log(TEST_NEXT, intToRgb(hsiToInt_next(hslVal)))

  console.time(TEST_GROK)
  for (let i = 0; i < quant; i++) hsiToInt_grok(hslVal)
  console.timeEnd(TEST_GROK)

  console.time(TEST_EPIC)
  for (let i = 0; i < quant; i++) hsiToInt_epic(hslVal)
  console.timeEnd(TEST_EPIC)

  console.time(TEST_EDGE)
  for (let i = 0; i < quant; i++) hsiToInt_edge(hslVal)
  console.timeEnd(TEST_EDGE)

  console.time(TEST_NEXT)
  for (let i = 0; i < quant; i++) hsiToInt_next(hslVal)
  console.timeEnd(TEST_NEXT)

})