import { BOLD, ITALIC } from '@palett/enum-font-effects'
import { decoFunc }     from '@spare/deco-func'
import { logger }       from '@spare/logger'
import { Buff }         from '../index'

const buff = Buff(BOLD, ITALIC)
// dyer.Yellow.italic.inverse |> console.log
buff |> decoFunc |> logger

'theCyberPunk2077CDPR' |> buff |> logger

