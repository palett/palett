import { Purple, Teal } from '@palett/cards'
import { DyeFab }       from 'archive/dye-factory'
import { INVERSE }      from '@palett/enum-font-effects'
import { logger }  from '@spare/logger'
import { hexToStr } from '../../stringify/src/hexToStr'

hexToStr.call(DyeFab.prep(INVERSE), Purple.base) |> logger
hexToStr(Teal.base) |> logger