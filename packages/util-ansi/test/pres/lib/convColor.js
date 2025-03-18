import { hexToInt, rgbToInt } from '@palett/convert'
import { NUM, STR }           from '@typen/enum-data-types'
import { NAC }                from './constants.js'

export const convColor = color => {
  const t = typeof color
  color = t === NUM ? color
    : t === STR ? hexToInt(color)
      : Array.isArray(color) ? rgbToInt(color)
        : NAC
  return color
}