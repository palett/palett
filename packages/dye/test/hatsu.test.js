import { Dye } from '../index'
import { logger } from '@spare/logger'

const rgb = [44, 181, 233]
const dye = Dye(rgb, 'bold', 'italic')
// blaze.yellow.italic.inverse |> console.log
dye |> logger
'foo' |> dye |> logger
