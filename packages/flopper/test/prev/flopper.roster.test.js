import { VectorCollection }  from '@foba/vector-string'
import { hexToRgb }          from '@palett/convert'
import { PrepDye }           from '@palett/dye'
import { BOLD }              from '@palett/enum-font-effects'
import { logger }            from '@spare/logger'
import { palettFlopperLite } from '../archive/palettFlopperLite.js'

const vec = VectorCollection.flopShuffle({ size: 10 })
const flopper = palettFlopperLite()
const prepDye = PrepDye(BOLD)

for (let word of vec) {
  const dye = prepDye(flopper.next().value|> hexToRgb)
  '[' + dye(word) + ']'|> logger
}

for (let word of vec) {
  const dye = prepDye(flopper.next().value|> hexToRgb)
  dye('[') + word + dye(']')  |> logger
}
