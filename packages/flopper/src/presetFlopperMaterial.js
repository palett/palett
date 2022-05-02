import { flop, rand }                          from '@aryth/rand'
import { NUM_DESC }                            from '@aryth/comparer'
import { Grey }                                from '@palett/cards'
import { HEX }                                 from '@palett/enum-color-space'
import { randPreset }                          from '@palett/presets'
import { ColorGroups, Degrees, palettCrostab } from '@palett/table'
import { swap }                                from '@vect/swap'
import { degreeToIndice }                      from '../utils/degreeToIndice'
import { sortBy }                              from '../utils/sortDegrees'

export function* presetFlopperMaterial({
                                 degrees = Degrees.entire,
                                 colors = ColorGroups.rainbow,
                                 space = HEX,
                                 defaultColor = Grey.lighten_1,
                                 exhausted = true
                               } = {}) {
  const crostab = palettCrostab({space,  degrees, colors, dyed: false })
  degrees = sortBy.call(degrees.slice(), degreeToIndice, NUM_DESC)
  let h = degrees.length, w = colors.length
  for (let i = 0; i < h; i++) {
    for (let j = w - 1, side = degrees[i], head = crostab.head.slice(); j >= 0; j--) {
      const banner = swap.call(head, rand(j), j)
      const hex = crostab.cell(side, banner)
      yield randPreset(hex)
    }
  }
  defaultColor = defaultColor ?? (crostab.cell(degrees[0], crostab.head|> flop))
  const defaultPreset = randPreset(defaultColor)
  while (!exhausted) yield defaultPreset
  return defaultPreset
}


