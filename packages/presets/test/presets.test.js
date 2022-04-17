import { hslToHex }         from '@palett/convert'
import { hexToStr }         from '@palett/stringify'
import { logger }           from '@spare/logger'
import Pavtone              from '../resources/pavtone/index'
import { presetToSequence } from './presetToSequence'

const LEN = 7
const test = (len) => {
  for (let [ key, preset ] of Object.entries(Pavtone)) {
    const sequence = presetToSequence(preset, len);

    `>> ${key.padStart(7)} [${sequence.map(hslToHex).map(x => x.toUpperCase()).map(hexToStr).join(' ')}] | [${preset.na|> hexToStr}]` |> logger
    '' |> logger
  }
}

test(LEN)