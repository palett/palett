import { intToStr } from '@palett/stringify'

export function demo(preset, count) {
  return `${preset.range(count).map(intToStr).join(' ')} | ${preset.nan|> intToStr}`
}
