import { round }              from '@aryth/math'
import { hslToInt, intToRgb } from '@palett/convert'
import { test }    from 'node:test'
import { channel } from '@palett/convert/src/util/number-utils.js'

const PARAM = 85.33333333333333

export function hsiToInt_grok(int) {
  let h = int >> 16 & 0x1FF, s = int >> 8 & 0xFF, l = int & 0xFF
  // h += 1
  s += 1 // mock round
  l += 1 // mock round

  // Normalize HSL2 values to [0,1]
  h = h / 511.0  // Hue mapped from [0,511] to [0,1]
  s = s / 255.0  // Saturation mapped from [0,255] to [0,1]
  l = l / 256.0  // Lightness mapped from [0,255] to [0,1]

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

  // Scale to [0,255] and round
  // return [
  //   Math.round(r * 255),
  //   Math.round(g * 255),
  //   Math.round(b * 255)
  // ]
  return (r & 0xFF) << 16 | (g & 0xFF) << 8 | b & 0xFF
}
export function hsiToInt_epic(int) {
  let h = int >> 16 & 0x1FF, s = int >> 8 & 0xFF, l = int & 0xFF
  const hsl = [ round(h / PARAM * 60), round(s / 2.55), round(l / 2.55) ]
  return hslToInt(hsl)
}
export function hsiToInt_edge(int) {
  let h = int >> 16 & 0x1FF, s = int >> 8 & 0xFF, l = int & 0xFF
  h = (h * 2) / PARAM // original h ∈ [0,510], then h = h * 12 / 510, aka (h << 1) / 85, makes h ∈ [0,12]
  s += 0.5 // mock round
  l += 1 // mock round
  const a = l <= 127.5 ? (s * l / 256) : (s - s * l / 255)
  const r = channel(0, h, a, l)
  const g = channel(8, h, a, l)
  const b = channel(4, h, a, l)
  return (r & 0xFF) << 16 | (g & 0xFF) << 8 | b & 0xFF
}


test('hsl to rgb', () => {
  const h = round(300 / 360 * 511)
  const s = 255
  const l = 127
  const hsl = [ h, s, l ]
  const hslVal = (h & 0x1FF) << 16 | (s & 0xFF) << 8 | l & 0xFF

  const TEST_A = 'hsi → int - grok'
  const TEST_B = 'hsi → int - epic'
  const TEST_C = 'hsi → int - edge'

  const quant = 1e8
  console.time(TEST_A)
  for (let i = 0; i < quant; i++) hsiToInt_grok(hslVal)
  console.timeEnd(TEST_A)

  console.time(TEST_B)
  for (let i = 0; i < quant; i++) hsiToInt_epic(hslVal)
  console.timeEnd(TEST_B)

  console.time(TEST_C)
  for (let i = 0; i < quant; i++) hsiToInt_edge(hslVal)
  console.timeEnd(TEST_C)

  console.log(TEST_A, intToRgb(hsiToInt_grok(hslVal)))
  console.log(TEST_B, intToRgb(hsiToInt_epic(hslVal)))
  console.log(TEST_C, intToRgb(hsiToInt_edge(hslVal)))
})