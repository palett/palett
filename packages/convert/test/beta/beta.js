import { rec0up, round, roundD1, roundD2 } from '@aryth/math'

const { max, min } = Math


export const hue = (r, g, b, hi, df) => {
  if (df === 0) return 0
  if (hi === r) return r6((g - b) / df)
  if (hi === g) return ((b - r) / df + 2)
  if (hi === b) return ((r - g) / df + 4)
  return 0
}

export const r6 = (v) => {
  if (v < 0) v += 6
  return v
}

/**
 *
 * @param {number} n r: 0 or 12, g: -4 or 8, b: -8 or 4
 * @param {number} h from 0 to 12 (0 to 360)
 * @param {number} a (s * l) or (s * (1 - l))
 * @param {number} l from 0 to 1
 * @returns {number}
 */
export const hf = (n, h, a, l) => {
  const k = (n + h) % 12
  return l - a * max(min(k - 3, 9 - k, 1), -1)
}

export class Beta {
  static rgbToHsl(r, g, b) {
    let hi, lo
    {
      g > r ? (hi = g, lo = r) : (hi = r, lo = g)
      b > hi ? hi = b : b < lo ? lo = b : void 0
    }
    const t = hi + lo, d = hi - lo
    const h = hue(r, g, b, hi, d),
          s = !d ? 0 : t > 255 ? d / (511 - t) : d / t,
          l = t / 2
    // ;`<< [hi] (${hi}) [lo] (${lo}) [t] (${t}) [d] (${d}) [s] (${roundD2(s * 255)}) [l] (${l})` |> console.log
    return [ (h * 40) & 0xFF, s, roundD2(l) ]
  }

  static hslToRgb(h, s, l) {
    h /= 20
    const a = l <= 127 ? (s * l) : (s * 255 - s * l),
          r = hf(0, h, a, l),
          g = hf(8, h, a, l),
          b = hf(4, h, a, l)
    // `hsl -> rgb [a] (${a}) [r] (${r}) [g] (${g}) [b] (${b})` |> console.log
    return [ r, g, b ]
  }
}



