import { logger } from '@spare/logger'
import { Dye }    from '../index'

const rgb = [44, 181, 233]
const dye = Dye(rgb, 'bold', 'italic')
// dyer.Yellow.italic.inverse |> console.log
dye |> logger
'foo' |> dye |> logger
