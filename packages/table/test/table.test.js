import { HEX }                 from '@palett/enum-color-space'
import { decoCrostab, logger } from '@spare/logger'
import { ColorGroups }         from '../resources/ColorGroups'
import { Degrees }             from '../resources/Degrees'
import { palettCrostab }       from '../src/palettCrostab'

// PalettTable.meta() |> deco |> console.log

palettCrostab({
  space: HEX,
  degrees: Degrees.entire,
  colors: [ ...ColorGroups.grey, ...ColorGroups.rainbow ],
  average: false,
  cellColor: true,
  dyed: true,
}) |> decoCrostab|> logger
