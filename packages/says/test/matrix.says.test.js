import { SimpleMatrixCollection }       from '@foba/foo'
import { decoMatrix, delogger, logger } from '@spare/logger'
import { xr }                           from '@spare/xr'
import { ros, says }                    from '../index'

for (const [key, matrix] of Object.entries(SimpleMatrixCollection))
  matrix |> decoMatrix |> says[key]

const stb = function (y) {
  xr()
    ['y % 4'](y % 4)['y % 100'](y % 4)['y % 400'](y % 400)
    ['result'](!(y % 4) && (y % 100) || !(y % 400))
    |>  says[y].br('calculation')
  return !(y % 4) && (y % 100) || !(y % 400)
}

stb(1024) |> says[1024].p('pure result:')
says.roster(1024) |> delogger
ros('shake') |> delogger
ros('shack') |> delogger

for (const key of Object.keys(SimpleMatrixCollection))
  ros(key) |> logger
