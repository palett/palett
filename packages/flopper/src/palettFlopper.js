import { ColorGroups, Degrees, degreesByColors } from '@palett/table'
import { Grey } from '@palett/cards'
import { HEX } from '@palett/enum-color-space'
import { flop, rand } from '@aryth/rand'
import { NUM_DESC } from '@aryth/rank'
import { swap } from '@vect/swap'
import { sortBy } from '../utils/sortDegrees'
import { degreeToIndice } from '../utils/degreeToIndice'

export function * palettFlopper ({
  degrees = Degrees.readable,
  colors = ColorGroups.rainbow,
  space = HEX,
  defaultColor = Grey.lighten_1,
  exhausted = true
} = {}) {
  const palett = degreesByColors({ degrees, colors, space })
  degrees = sortBy.call(degrees, degreeToIndice, NUM_DESC)
  let h = degrees.length, w = colors.length
  for (let i = 0; i < h; i++) {
    for (let j = w - 1, side = degrees[i], head = palett.head.slice(), banner; j >= 0; j--) {
      banner = swap.call(head, rand(j), j)
      yield { hue: banner, degree: side, color: palett.cell(side, banner) }
    }
  }
  defaultColor = defaultColor ?? (palett.cell(degrees[0], palett.head|> flop))
  while (!exhausted) yield { color: defaultColor }
  return { color: defaultColor }
}

