import { NUM_DESC }                              from '@aryth/comparer'
import { HEX }                                   from '@palett/enum-color-space'
import { ColorGroups, Degrees, degreesByColors } from '@palett/table'
import { degreeToIndice }                        from '../utils/degreeToIndice'
import { sortBy }                                from '../utils/sortDegrees'

export class Flopper {
  constructor(degrees, colors, space) {
    this.palett = degreesByColors({ degrees, colors, space })
    this.degrees = sortBy.call(degrees, degreeToIndice, NUM_DESC)
    this.x = 0
    this.y = 0
  }

  build({
          degrees = Degrees.readable,
          colors = ColorGroups.rainbow,
          space = HEX
        } = {}) { return new Flopper(degrees, colors, space) }

  get colors() { return this.palett.head.slice() }

  flop() {
    // let h = degrees.length, w = colors.length
    // for (let i = 0; i < h; i++) {
    //   for (let j = w - 1, side = degrees[i], head = palett.head.slice(), banner; j >= 0; j--) {
    //     banner = swap.call(head, rand(j), j)
    //     yield { hue: banner, degree: side, color: palett.cell(side, banner) }
    //   }
    // }
    // defaultColor = defaultColor ?? (palett.cell(degrees[0], palett.head|> flop))
    // while (true) yield defaultColor
  }
}
