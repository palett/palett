import { OCEAN }      from '@palett/presets'
import { delogger }   from '@spare/deco'
import { says }       from '@spare/xr'
import { seq }        from '@vect/vector'
import { FluoNumber } from './fluo-number'

const fluo = FluoNumber({ min: 0, dif: 10 }, OCEAN, false)

const values = seq(18, x => x * 5 - 10, 0)

values |> delogger

for (let value of values)
  fluo(value) |> says[value]
