import { almostEqual }     from '@aryth/math'
import { hexToHsl }        from '@palett/convert'
import { HSL }             from '@palett/munsell'
import { init, Trizipper } from '@vect/vector'

const trizipper = Trizipper((a, b, c) => new HSL(a, b, c))

/**
 *
 * @param {Preset} theme
 * @param {number} len
 * @returns {Array<HSL>}
 */
export const presetToSequence = (theme, len) => {
  function numericSequence(min, max, len) {
    let delta = (max - min) / (len - 1)
    if (almostEqual(delta, 0, 0.0008)) delta = 0
    return init(len, i => min + i * delta)
  }
  const [ min, max ] = [ HSL.from(theme.min |> hexToHsl), HSL.from(theme.max |> hexToHsl) ]
  return trizipper(
    numericSequence(min.h, max.h, len),
    numericSequence(min.s, max.s, len),
    numericSequence(min.l, max.l, len),
  )
}