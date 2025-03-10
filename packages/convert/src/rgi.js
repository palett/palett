import { channel, round }    from './util/number-utils.js'
import { ff, hexAt, prolif } from './util/string-utils.js'

/**
 * @param {string} hex
 * @returns {number}
 */
export function hexToRgi(hex) {
  let lo = 0, hi = hex?.length
  if (hi === 7) lo++, hi--
  if (hi === 6) { return ff(hex, 1) << 16 | ff(hex, 3) << 8 | ff(hex, 5) }
  if (hi === 4) lo++, hi--
  if (hi === 3) { return (prolif(hexAt(hex, lo++)) << 16) | (prolif(hexAt(hex, lo++)) << 8) | (prolif(hexAt(hex, lo++))) }
  return 0
}

/**
 * @param {string} hex
 * @returns {number}
 */
export function hexToShort(hex) {
  let lo = 0, hi = hex?.length
  if (hi === 7) lo++, hi--
  if (hi === 6) return hexAt(hex, lo) << 8 | hexAt(hex, lo += 2) << 4 | hexAt(hex, lo + 2)
  if (hi === 4) lo++, hi--
  if (hi === 3) return hexAt(hex, lo++) << 8 | hexAt(hex, lo++) << 4 | hexAt(hex, lo++)
  return 0
}

/**
 * @param {HSL} hsl
 * @returns {number}
 */
export function hslToRgi(hsl) {
  const h = hsl[0] / 30, s = hsl[1] / 100, l = hsl[2] / 100
  const
    a = s * (l < 0.5 ? l : (1 - l)),
    r = channel(0, h, a, l),
    g = channel(8, h, a, l),
    b = channel(4, h, a, l)
  return (round(r * 0xFF) & 0xFF) << 16 | (round(g * 0xFF) & 0xFF) << 8 | round(b * 0xFF) & 0xFF
}

export function hsaToRgi(h, s, l) {
  h = h / 30
  s += 0.5
  l += 0.5
  const amp = s * (l <= 100 ? l : 200 - l) / 200 // When lightness is low, increase it proportionally to saturation, 亮度系数, coefficient or chroma
  function channel(off, hf, amp, lt) {
    let pha = (off + hf) % 12 // Calculate modular position in color wheel. 相位偏移
    pha = 3 + (pha < 6 ? pha - 6 : 6 - pha) // Create triangular wave pattern, 对称波形生成
    pha = pha > 1 ? 1 : pha < -1 ? -1 : pha // Clamp to [-1, 1] range. 钳制到 [-1, 1]
    return ((lt - amp * pha) * 2.55) >> 1 // Apply chroma to get final component value. 合并乘法和舍入
  }
  const r = channel(0, h, amp, l)
  const g = channel(8, h, amp, l)
  const b = channel(4, h, amp, l)
  return (r & 0xFF) << 16 | (g & 0xFF) << 8 | b & 0xFF
}

export function rgbToRgi(rgb) { return (rgb[0] & 0xFF) << 16 | (rgb[1] & 0xFF) << 8 | rgb[2] & 0xFF }

export function hsiToRgi(int) {
  let h = int >> 16 & 0x1FF, s = int >> 8 & 0xFF, l = int & 0xFF
  return hsaToRgi(h, s, l)
}


