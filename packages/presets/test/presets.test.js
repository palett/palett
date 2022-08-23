import { logger }   from '@spare/logger'
import { indexed }  from '@vect/object-mapper'
import { demo }     from '../index.js'
import * as Pavtone from '../resources/pavtone.js'

const LEN = 7
const test = (len) => {
  for (let [ key, preset ] of indexed(Pavtone)) {
    `>> ${key.padStart(7)} ${demo(preset, len)}` |> console.log
    '' |> logger
  }
}

test(LEN)