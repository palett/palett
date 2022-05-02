import { almostEqual }        from '@aryth/math'
import { hexToHsl, hslToHex } from '@palett/convert'
import { HSL }                from '@palett/munsell'
import { toUpper }            from '@texting/phrasing'
import { init, Trizipper }    from '@vect/vector'
import { hexToStr }           from './hexToStr'

const trizipper = Trizipper(HSL.build)
/** @typedef {{max:string,min:string,na:string}} Preset */

/**
 *
 * @param {HSL} min
 * @param {HSL} max
 * @param {number} [len]
 * @returns {Array<HSL>}
 */
export const hslSeq = (min, max, len = 6) => {
  function numSeq(min, max, len) {
    let delta = (max - min) / (len - 1)
    if (almostEqual(delta, 0, 0.0008)) delta = 0
    return init(len, i => min + i * delta)
  }
  return trizipper(numSeq(min.h, max.h, len), numSeq(min.s, max.s, len), numSeq(min.l, max.l, len),)
}

/**
 *
 * @param {Preset|Object} preset
 * @param {number} [len]
 * @returns {string}
 */
export const decoPreset = (preset, len = 6) => {
  const min = preset.min|> hexToHsl|> HSL.from
  const max = preset.max|> hexToHsl|> HSL.from
  return `[${hslSeq(min, max, len).map(x => x|> hslToHex|> toUpper|> hexToStr).join(' ')}] | [${preset.na|> hexToStr}]`
}