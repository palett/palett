import { PalettTable } from '../index'
import { CrosTabX } from 'xbrief'
import { Degrees } from '../src/Degrees'
import { ColorGroups } from '../src/ColorGroups'
import { HSL } from '@palett/enum-color-space'
import { decoCrostab, logger } from '@spare/logger'

export class PalettTableTest {
  static showCrosTab ({ space, degrees, colors, average, cellColor } = {}) {
    PalettTable.crosTab({ space, degrees, colors, average, cellColor })|> decoCrostab |> logger
  }
}

// PalettTable.meta() |> deco |> console.log

PalettTableTest.showCrosTab({
  space: HSL,
  degrees: Degrees.entire,
  colors: [...ColorGroups.grey, ...ColorGroups.rainbow],
  average: true,
  cellColor: true
})
