import { SimpleMatrices } from '@foba/foo'
import { decoMatrix, delogger } from '@spare/logger'
import { says } from '../index'
import { xr } from '@spare/xr'

for (const [key, matrix] of Object.entries(SimpleMatrices))
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
says.roster('shake') |> delogger
says.roster('shack') |> delogger
