import { constraint, restrictAboveZero } from '@aryth/math'
import { randBetw }                      from '@aryth/rand'
import { hexToHsl, hslToHex }            from '@palett/convert'
import { toner }                         from '@palett/toner-hsl'

/**
 *
 * @param {string} hex
 * @param {string} [name]
 * @returns {{min:string, max:string, na:string, [name]:string}}
 */
export const randPreset = (hex, name) => {
  const min = hex
  const hsl = min |> hexToHsl
  const max = toner(hsl.slice(), randBetw(-12, 12), randBetw(-5, 10), randBetw(6, 18)) |> hslToHex
  const na = [
    restrictAboveZero(hsl[0] + 180, 360),
    constraint(hsl[1] - 32, 5, 90),
    constraint(hsl[2] + 24, 40, 96)
  ] |> hslToHex
  const preset = { min, max, na }
  if (name?.length) preset.name = name
  return preset
}
