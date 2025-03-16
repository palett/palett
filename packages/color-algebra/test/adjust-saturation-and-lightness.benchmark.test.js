import { centFF, hexToRgb, hslToRgb, hue, rgbToHsl, rgiToRgb } from '@palett/convert'
import { hslToStr, rgbToStr }                                  from '@palett/stringify'
import { test }                                                from 'node:test'
import { dslRga }                                              from '../src/dslRgi.js'

// xaylam
export function adjust_snap([ r, g, b ], ds, dl) {
  let hi, lo
  g > r ? (hi = g, lo = r) : (hi = r, lo = g)
  b > hi ? hi = b : b < lo ? lo = b : void 0
  let tt = hi + lo, df = hi - lo
  let h = hue(r, g, b, hi, df) * 2 // original h ∈ [0,6), then h = h * 2, makes h ∈ [0,12)
  let s = !df ? 0 : (df * 100) / (tt > 255 ? (510 - tt) : tt) // s ∈ [0,100]
  let l = (tt * 100) / 510 // s ∈ [0,100]
  s += ds
  l += dl
  s = s < 0 ? 0 : s > 100 ? 100 : s
  l = l < 0 ? 0 : l > 100 ? 100 : l
  const amp = s * (l <= 50 ? l : 100 - l) / 100 // When lightness is low, increase it proportionally to saturation, 亮度系数, coefficient or chroma
  const rt = centFF(0, h, amp, l)
  const gt = centFF(8, h, amp, l)
  const bt = centFF(4, h, amp, l)
  return [ rt, gt, bt ]
}

// xaylam
function adjust_epic(rgb, deltaS, deltaL) {
  let hsl = rgbToHsl(rgb)
  hsl[1] += deltaS, hsl[2] += deltaL
  return hslToRgb(hsl)
}

// DSV3
function adjust_prim(rgb, deltaS, deltaL) {
  // Normalize RGB values to [0, 1]
  let [ r, g, b ] = rgb.map(x => x / 255)

  // Calculate max and min values
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  // Calculate average (lightness)
  const avg = (max + min) / 2

  // Adjust saturation
  if (deltaS !== 0) {
    const deltaSNormalized = deltaS / 255 // Normalize deltaS to [0, 1]
    r = avg + (r - avg) * (1 + deltaSNormalized)
    g = avg + (g - avg) * (1 + deltaSNormalized)
    b = avg + (b - avg) * (1 + deltaSNormalized)
  }

  // Adjust lightness
  if (deltaL !== 0) {
    const deltaLNormalized = deltaL / 255 // Normalize deltaL to [0, 1]
    r = r + deltaLNormalized
    g = g + deltaLNormalized
    b = b + deltaLNormalized
  }

  // Clamp values to [0, 1]
  r = Math.max(0, Math.min(1, r))
  g = Math.max(0, Math.min(1, g))
  b = Math.max(0, Math.min(1, b))

  // Denormalize RGB values to [0, 255]
  return [ r, g, b ].map(x => Math.round(x * 255))
}

/**
 * Claude
 * Adjusts saturation and lightness of RGB values without full HSL conversion
 * @param {number[]} rgb - Array of RGB values [r, g, b] (0-255)
 * @param {number} saturationAdjust - Value between -255 and 255 for saturation adjustment
 * @param {number} lightnessAdjust - Value between -255 and 255 for lightness adjustment
 * @returns {number[]} - Adjusted RGB values [r, g, b] (0-255)
 */
function adjust_nexo(rgb, saturationAdjust, lightnessAdjust) {
  // Ensure RGB values are in the correct range
  const r = Math.min(255, Math.max(0, rgb[0]))
  const g = Math.min(255, Math.max(0, rgb[1]))
  const b = Math.min(255, Math.max(0, rgb[2]))

  // Calculate luminance (perceived brightness)
  // Using the standard formula: 0.299*R + 0.587*G + 0.114*B
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b

  // Find max and min RGB values for saturation calculation
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  // For saturation adjustment
  // Convert absolute saturation adjustment (-255 to 255) to fractional (-1 to 1)
  const saturationFactor = saturationAdjust / 255

  // Calculate current saturation level (0 to 1)
  let saturation = max === 0 ? 0 : (max - min) / max

  // Apply saturation adjustment
  if (saturationFactor > 0) {
    // Increase saturation
    saturation = saturation * (1 - saturationFactor) + saturationFactor
  } else if (saturationFactor < 0) {
    // Decrease saturation
    saturation = saturation * (1 + saturationFactor)
  }

  // Apply adjusted saturation directly to RGB values
  let adjustedR = r
  let adjustedG = g
  let adjustedB = b

  if (max > 0) {
    // Adjust each channel based on its distance from luminance
    const adjustRatio = saturation * (max / 255)
    adjustedR = luminance + (r - luminance) * adjustRatio
    adjustedG = luminance + (g - luminance) * adjustRatio
    adjustedB = luminance + (b - luminance) * adjustRatio
  }

  // Convert absolute lightness adjustment (-255 to 255) to fractional (-1 to 1)
  const lightnessFactor = lightnessAdjust / 255

  // Apply lightness adjustment
  if (lightnessFactor > 0) {
    // Increase lightness: scale towards white (255)
    adjustedR += (255 - adjustedR) * lightnessFactor
    adjustedG += (255 - adjustedG) * lightnessFactor
    adjustedB += (255 - adjustedB) * lightnessFactor
  } else if (lightnessFactor < 0) {
    // Decrease lightness: scale towards black (0)
    adjustedR *= (1 + lightnessFactor)
    adjustedG *= (1 + lightnessFactor)
    adjustedB *= (1 + lightnessFactor)
  }

  // Return adjusted RGB values, rounded to integers
  return [
    Math.round(Math.min(255, Math.max(0, adjustedR))),
    Math.round(Math.min(255, Math.max(0, adjustedG))),
    Math.round(Math.min(255, Math.max(0, adjustedB))),
  ]
}


test('flopper benchmark', () => {
  const hex = '#31B49E' // 'Spearmint'
  const rgb = hexToRgb(hex)
  const [ r, g, b ] = hexToRgb(hex)
  const adS = -6
  const adL = 18

  const EPIC = 'rgb → saturation, lightness - epic'
  const PRIM = 'rgb → saturation, lightness - prim'
  const SNAP = 'rgb → saturation, lightness - snap'
  const NEXO = 'rgb → saturation, lightness - nexo'
  const PORT = 'rgb → saturation, lightness - port'

  const quant = 1e6
  console.log('RGB', rgbToStr(rgb), 'HSL', hslToStr(rgbToHsl(rgb)))

  const epic = adjust_epic(rgb, adS, adL)
  const prim = adjust_prim(rgb, adS, adL)
  const snap = adjust_snap(rgb, adS, adL)
  const nexo = adjust_nexo(rgb, adS, adL)
  const port = rgiToRgb(dslRga(r, g, b, adS, adL))

  console.log(EPIC, rgbToStr(epic), hslToStr(rgbToHsl(epic)))
  console.log(PRIM, rgbToStr(prim), hslToStr(rgbToHsl(prim)))
  console.log(SNAP, rgbToStr(snap), hslToStr(rgbToHsl(snap)))
  console.log(NEXO, rgbToStr(nexo), hslToStr(rgbToHsl(nexo)))
  console.log(PORT, rgbToStr(port), hslToStr(rgbToHsl(port)))

  console.time(EPIC)
  for (let i = 0; i < quant; i++) adjust_epic(rgb, adS, adL)
  console.timeEnd(EPIC)

  console.time(PRIM)
  for (let i = 0; i < quant; i++) adjust_prim(rgb, adS, adL)
  console.timeEnd(PRIM)

  console.time(SNAP)
  for (let i = 0; i < quant; i++) adjust_snap(rgb, adS, adL)
  console.timeEnd(SNAP)

  console.time(NEXO)
  for (let i = 0; i < quant; i++) adjust_nexo(rgb, adS, adL)
  console.timeEnd(NEXO)

  console.time(PORT)
  for (let i = 0; i < quant; i++) dslRga(r, g, b, adS, adL)
  console.timeEnd(PORT)

})