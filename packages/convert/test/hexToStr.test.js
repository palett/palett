import { Purple, Teal } from '@palett/cards'
import { INVERSE }      from '@palett/enum-font-effects'
import { logger }       from '@spare/logger'
import { DyeFab }       from 'archive/dye-factory'
import { hexToStr }     from '../../stringify/src/hexToStr'

hexToStr.call(DyeFab.prep(INVERSE), Purple.base) |> logger
hexToStr(Teal.base) |> logger