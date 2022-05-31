import { almostEqual }        from '@aryth/math'
import { hexToHsl, hslToHex } from '@palett/convert'
import { HSL }                from '@palett/color-space'
import { hexToStr }           from '@palett/stringify'
import { init, Trizipper }    from '@vect/vector'

const trizipper = Trizipper((a, b, c) => new HSL(a, b, c))

/**
 *
 * @param {Preset} preset
 * @param {number} len
 * @returns {Array<HSL>}
 */
export const presetToSequence = (preset, len) => {
  function numericSequence(min, max, len) {
    let delta = (max - min) / (len - 1)
    if (almostEqual(delta, 0, 0.0008)) delta = 0
    return init(len, i => min + i * delta)
  }
  const [ min, max ] = [ HSL.from(preset.min |> hexToHsl), HSL.from(preset.max |> hexToHsl) ]
  return trizipper(
    numericSequence(min.h, max.h, len),
    numericSequence(min.s, max.s, len),
    numericSequence(min.l, max.l, len),
  )
}

const decoPreset = (preset, len) => {
  return `[${presetToSequence(preset, len).map(hslToHex).map(x => x.toUpperCase()).map(hexToStr).join(' ')}] | [${preset.na|> hexToStr}]`
}