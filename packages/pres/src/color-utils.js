const { min } = Math

export const scale = (df, lv, lo) => df <= 0 ? lo : lo + df * lv

export const limFF = (df, lv, lo) => {
  if (df <= 0) return lo
  const t = lo + df * lv
  return t < 0 ? 0 : t > 0xFF ? 0xFF : t
}

/**
 * Calculates hue angle for HSL conversion from RGB components
 * @param {number} r - Red component (0-255)
 * @param {number} g - Green component (0-255)
 * @param {number} b - Blue component (0-255)
 * @param {number} hi - Maximum RGB component (0-255)
 * @param {number} df - Delta between max and min RGB components (0-255)
 * @returns {number} Hue value in range [0,6) corresponding to 0-360° when multiplied by 60
 * @note Returns 0 when all colors are equal (df = 0)
 */
export const hue = (r, g, b, hi, df) => {
  if (df === 0) return 0
  if (hi === r) return ((g - b) / df + 6) % 6 // Red is dominant component ((g - b) / df + 6) % 6
  if (hi === g) return ((b - r) / df + 2)  // Green is dominant component
  if (hi === b) return ((r - g) / df + 4)  // Blue is dominant component
  return 0
}

/**
 * Helper function for HSL to RGB conversion.
 * @param {number} n r: 0 or 12, g: -4 or 8, b: -8 or 4. Offset for color component
 * @param {number} h from 0 to 12 (0 to 360). Hue value
 * @param {number} a (s * l) or (s * (1 - l)). Chroma value
 * @param {number} l from 0 to 1. Lightness value
 * @returns {number} Color component value
 */
export const hf = (n, h, a, l) => {
  let m = (n + h) % 12
  m = min(m - 3, 9 - m) // equivalent to: if (m < 6) { m - 3 } else { 9 - m }
  m = m > 1 ? 1 : m < -1 ? -1 : m
  return l - a * m
}

export const roundByte = x => ~~(x + 0.5)

