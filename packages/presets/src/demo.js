import { intToRgb } from '@palett/convert'
import { rgbToStr } from '@palett/stringify'

export function demo(preset, count) {
  return `${preset.range(count).map(int => int|>intToRgb|> rgbToStr).join(' ')} | ${preset.nan|> intToRgb |> rgbToStr}`
}
