import { hexToHsl } from '@palett/convert'
import { isString } from '@typen/literal'

const parseHsl = some => isString(some) ? (some |> hexToHsl) : some
/**
 *
 * @param {Object} [preset]
 * @param {string} preset.max
 * @param {string} preset.min
 * @return {?{dif: number[], min: number[]}}
 */
export const presetToLeap = (preset) => {
  if (!preset) return null
  const { max, min } = preset
  return colorBound(parseHsl(max), parseHsl(min))
}

/**
 *
 * @param max
 * @param min
 * @returns {{dif: [number,number,number], min: [number,number,number]}}
 */
const colorBound = ([maxH, maxS, maxL], [minH, minS, minL]) => ({
  min: [minH, minS, minL],
  dif: [maxH - minH, maxS - minS, maxL - minL]
})

