import { RGB }          from '@palett/enum-color-space'
import { BOLD, ITALIC } from '@palett/enum-font-effects'
import { logger }       from '@spare/logger'
import { PrepDye }      from '..'

const color = [44, 181, 233]
const Dye = PrepDye(RGB, BOLD, ITALIC)
const dye = Dye(color)
// dyer.Yellow.italic.inverse |> console.log
dye |> logger
'foo' |> dye |> logger
