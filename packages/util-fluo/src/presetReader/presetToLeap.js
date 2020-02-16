import { parseHsl } from './parseHsl'

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

export const presetToLeap = ({ max, min }) => colorBound(max |> parseHsl, min |> parseHsl)


