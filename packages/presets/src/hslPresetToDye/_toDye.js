import { hslToRgb } from '@palett/convert'
import { Dye }      from '@palett/dye'

/**
 * Create a dye from a hsl array
 * @param {[number,number,number]} hsl
 * @returns {function}
 */
export const hslToDye = hsl => hsl |> hslToRgb |> Dye