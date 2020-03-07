import { HEX, HSL } from '@palett/enum-color-space'
import { decoCrostab, logger } from '@spare/logger'
import { degreesByColors } from '../src/degreesByColors'
import { Degrees } from '../resources/Degrees'
import { ColorGroups } from '../resources/ColorGroups'

// PalettTable.meta() |> deco |> console.log

degreesByColors({
  space: HEX,
  degrees: Degrees.entire,
  colors: [...ColorGroups.grey, ...ColorGroups.rainbow],
  average: false,
  cellColor: true
}) |> decoCrostab|> logger
