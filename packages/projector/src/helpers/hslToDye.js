import { hslToRgb }     from '@palett/convert'
import { Dye, PrepDye } from '@palett/dye'
import { HSL }          from '@palett/enum-color-space'


/**
 * Create a dye from a hsl array
 * @param {[number,number,number]} hsl
 * @returns {function}
 */
export function hslToDye(hsl) {
  const effects = this
  return effects
    ? (hsl |> hslToRgb |> PrepDye(HSL, effects))
    : (hsl |> hslToRgb |> Dye)
}

