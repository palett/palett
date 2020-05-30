import { CLR_FORE, rgbToAnsi, SC } from '@palett/util-ansi'
import { codedDyer }               from '../helpers/codedDyer'
import { parseEffects }            from '../helpers/parseEffects'

export const PrepDye = function (...effects) {
  const config = parseEffects(effects)
  return RgbDyerCreator.bind(config)
}

const RgbDyerCreator = function (rgb) {
  let { h, t } = this
  h += SC + rgbToAnsi(rgb), t += SC + CLR_FORE
  return codedDyer.bind({ h, t })
}

