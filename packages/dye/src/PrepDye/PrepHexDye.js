import { CLR_FORE, hexToAnsi, SC } from '@palett/util-ansi'
import { codedDyer } from '../dyer/codedDyer'
import { parseEffects } from '../parseEffects/parseEffects'

export const PrepHexDye = function (...effects) {
  const config = parseEffects(effects)
  return HexDyerCreator.bind(config)
}

const HexDyerCreator = function (hex) {
  let { h, t } = this
  h += SC + hexToAnsi(hex), t += SC + CLR_FORE
  return codedDyer.bind({ h, t })
}
