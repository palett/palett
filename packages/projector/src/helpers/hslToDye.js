import { hslToRgb }     from '@palett/convert'
import { Dye, PrepDye } from '@palett/dye'

/**
 * Create a dye from a hsl array
 * @param {[number,number,number]} hsl
 * @returns {function}
 */
export function hslToDye (hsl) {
  const effects = this
  return effects
    ? (hsl |> hslToRgb |> PrepDye.apply(null, effects))
    : (hsl |> hslToRgb |> Dye)
}

