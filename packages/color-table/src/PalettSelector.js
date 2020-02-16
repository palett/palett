import { Roulett } from 'roulett'
import { Degrees } from './Degrees'
import { ColorGroups } from './ColorGroups'
import { PalettTable } from './PalettTable'

const xPalett = PalettTable.crosTab({
  degrees: Degrees.readable,
  colors: ColorGroups.rainbow
})

export class PalettSelector {
  static pool = xPalett.ht * xPalett.wd

  static random () {
    const color = Roulett.element(xPalett.banner)
    const degree = Roulett.element(xPalett.side)
    const hex = xPalett.queryCell(degree, color)
    return { color, degree, hex }
  }
}
