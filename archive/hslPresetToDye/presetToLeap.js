import { hexToHsl } from '@palett/convert'

/**
 *
 * @param {Object} [preset]
 * @param {string} preset.max
 * @param {string} preset.min
 * @return {?{dif: number[], min: number[]}}
 */
export const presetToLeap = (preset) =>
  preset
    ? colorBound(hexToHsl(preset.max), hexToHsl(preset.min))
    : null

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

