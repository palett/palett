const { min } = Math

/**
 * compute hue angle from r, g, b, max(r, g, b), max - min
 * @param {number} r - r component
 * @param {number} g - g component
 * @param {number} b - b component
 * @param {number} hi - max(r, g, b), should align order of magnitude with r/g/b
 * @param {number} df - max - min, should align order of magnitude with r/g/b
 * @returns {number} hue, [0, 12] ⇠ [0, 360]
 */
export function hue(r, g, b, hi, df) {
  if (df === 0) return 0
  if (hi === r) return ((g - b) / df + 6) % 6 // R be dominant
  if (hi === g) return ((b - r) / df + 2)     // G be dominant
  if (hi === b) return ((r - g) / df + 4)     // B be dominant
  return 0
}

/**
 * channel hsl component into r/g/b value
 * @param {number} off offset for color component, r: 12 ± 12, g: 8 ± 12, b: 4 ± 12.
 * @param {number} hv hue value, [0, 12] ⇠ [0, 360]
 * @param {number} amp chroma value, same order of magnitude as lt
 * @param {number} lt lightness value
 * @returns {number} same order of magnitude as lt
 */
export function channel(off, hv, amp, lt) {
  let ph = (off + hv) % 12  // Calculate modular position in color wheel. 相位偏移
  ph = 3 + (ph < 6 ? ph - 6 : 6 - ph) // Create triangular wave pattern, 对称波形生成, equivalent to: min(phase - 3, 9 - phase), or if (m < 6) { m - 3 } else { 9 - m }
  if (ph > 1) { ph = 1 } else if (ph < -1) { ph = -1 } // Clamp to [-1, 1] range. 钳制到 [-1, 1]
  return lt - amp * ph // Apply chroma to get final component value. 合并乘法
}

/**
 * channel hsl component into r/g/b value
 * @param {number} off offset for color component, r: 12 ± 12, g: 8 ± 12, b: 4 ± 12.
 * @param {number} hv hue value, [0, 12] ⇠ [0, 360]
 * @param {number} amp chroma value, (s * l) or (s * (1 - l)), 0[0, 100]
 * @param {number} lt lightness value, [0, 100]
 * @returns {number} [0,255]
 */
export function centFF(off, hv, amp, lt) {
  let ph = (off + hv) % 12
  ph = 3 + (ph < 6 ? ph - 6 : 6 - ph)
  if (ph > 1) { ph = 1 } else if (ph < -1) { ph = -1 }
  ph = lt - amp * ph
  ph *= 2.55
  return ~~(ph + 0.5)
}

export const round = x => ~~(x + 0.5)

