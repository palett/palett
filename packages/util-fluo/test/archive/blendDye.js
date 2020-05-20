import { hslToDye } from '../../src/prepDye/utils/hslToDye'
import { leverage } from '../../src/prepDye/utils/leverage'

export const amp = (x, min, lever, base) => (x - min) * lever + base

export const blendDye = (x, m, [rH, rS, rL], [mH, mS, mL]) =>
  [amp(x, m, rH, mH), amp(x, m, rS, mS), amp(x, m, rL, mL)]|> hslToDye
