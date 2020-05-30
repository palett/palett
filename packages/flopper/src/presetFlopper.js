import { flop, rand }                            from '@aryth/rand'
import { NUM_DESC }                              from '@aryth/rank'
import { Grey }                                  from '@palett/cards'
import { HEX }                                   from '@palett/enum-color-space'
import { randPreset }                            from '@palett/presets'
import { ColorGroups, Degrees, degreesByColors } from '@palett/table'
import { swap }                                  from '@vect/swap'
import { degreeToIndice }                        from '../utils/degreeToIndice'
import { sortBy }                                from '../utils/sortDegrees'

export function * presetFlopper ({
  degrees = Degrees.entire,
  colors = ColorGroups.rainbow,
  space = HEX,
  defaultColor = Grey.lighten_1,
  exhausted = true
} = {}) {
  const palett = degreesByColors({ degrees, colors, space })
  degrees = sortBy.call(degrees.slice(), degreeToIndice, NUM_DESC)
  let h = degrees.length, w = colors.length
  for (let i = 0; i < h; i++) {
    for (let j = w - 1, side = degrees[i], head = palett.head.slice(); j >= 0; j--) {
      const banner = swap.call(head, rand(j), j)
      const hex = palett.cell(side, banner)
      yield randPreset(hex)
    }
  }
  defaultColor = defaultColor ?? (palett.cell(degrees[0], palett.head|> flop))
  const defaultPreset = randPreset(defaultColor)
  while (!exhausted) yield defaultPreset
  return defaultPreset
}


