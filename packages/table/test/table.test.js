import { HEX }                 from '@palett/enum-color-space'
import { decoCrostab, logger } from '@spare/logger'
import { ColorGroups }         from '../resources/ColorGroups'
import { Degrees }             from '../resources/Degrees'
import { degreesByColors }     from '../src/degreesByColors'

// PalettTable.meta() |> deco |> console.log

degreesByColors({
  space: HEX,
  degrees: Degrees.entire,
  colors: [...ColorGroups.grey, ...ColorGroups.rainbow],
  average: false,
  cellColor: true
}) |> decoCrostab|> logger
