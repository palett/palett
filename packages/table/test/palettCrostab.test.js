import { RGB }                 from '@palett/enum-color-space'
import { decoCrostab, logger } from '@spare/logger'
import { palettCrostab }       from '../src/degreesByColors'

const test = () => {
  const crostab = palettCrostab({
    space: RGB,
    average: true,
  })
  crostab |> decoCrostab |> logger
}

test()