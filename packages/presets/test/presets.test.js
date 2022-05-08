import { logger } from '@spare/logger'
import Pavtone    from '../resources/pavtone/index'

const LEN = 7
const test = (len) => {
  for (let [ key, preset ] of Object.entries(Pavtone)) {
    `>> ${key.padStart(7)} ${preset.demo(7)}` |> logger
    '' |> logger
  }
}

test(LEN)