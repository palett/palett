import { almostEqual }        from '@aryth/math'
import { hexToHsl, hslToHex } from '@palett/convert'
import { Dye }                from '@palett/dye'
import { HSL }                from '@palett/munsell'
import { hexToStr }           from '@palett/stringify'
import { logger }             from '@spare/logger'
import { init, Trizipper }    from '@vect/vector'
import { Presets }            from '../index'
import { sequenceLogger }     from './sequenceLogger'

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

const hexToNamesLogger = (hexToNames) => {
  for (let [ hex, name ] of Object.entries(hexToNames)) {
    const dye = Dye.hex(hex)
    '    ' + hexToStr(hex) + ': ' + dye(name) |> logger
  }

}

const LEN = 7
const test = (len) => {
  for (let [ key, preset ] of Object.entries(Presets)) {
    /** @type {Array<HSL>} */  let sequence = presetToSequence(preset, len)

    logger(`>> [${key}] (original)`)
    sequenceLogger(sequence.map(hslToHex), preset.na)

    const hexToNames = sequence.map(hsl => hsl.nearest())
    const object = Object.fromEntries(hexToNames)

    logger(`>> [${key}] (adjusted)`)
    sequenceLogger(hexToNames.map(([ hex ]) => hex), preset.na)
    object |> hexToNamesLogger
    '' |> logger
  }
}

test(LEN)