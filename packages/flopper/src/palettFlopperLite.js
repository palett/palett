import { flop, rand }                          from '@aryth/rand'
import { NUM_DESC }                            from '@aryth/comparer'
import { Grey }                                from '@palett/cards'
import { HEX }                                 from '@palett/enum-color-space'
import { ColorGroups, Degrees, palettCrostab } from '@palett/table'
import { swap }                                from '@vect/swap'
import { degreeToIndice }                      from '../utils/degreeToIndice.js'
import { sortBy }                              from '../utils/sortDegrees.js'

export function* palettFlopperLite({
                                     degrees = Degrees.entire,
                                     colors = ColorGroups.rainbow,
                                     space = HEX,
                                     defaultColor = Grey.lighten_1,
                                     exhausted = true
                                   } = {}) {
  const crostab = palettCrostab({ space, degrees, colors, dyed: false })
  degrees = sortBy.call(degrees.slice(), degreeToIndice, NUM_DESC)
  let h = degrees.length, w = colors.length
  for (let i = 0; i < h; i++) {
    for (let j = w - 1, side = degrees[i], head = crostab.head.slice(); j >= 0; j--) {
      const banner = swap.call(head, rand(j), j)
      yield crostab.cell(side, banner)
    }
  }
  defaultColor = defaultColor ?? (crostab.cell(degrees[0], flop(crostab.head)))
  while (!exhausted) yield defaultColor
  return defaultColor
}