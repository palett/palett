import { HEX }                 from '@palett/enum-color-space'
import { decoCrostab, logger } from '@spare/logger'
import { palettCrostab }       from '../src/palettCrostab'

const test = () => {
  const crostab = palettCrostab({
    space: HEX,
    average: true,
  })
  crostab |> decoCrostab |> logger
}

test()