import { makeEmbedded }   from '@foba/util'
import { deco, delogger } from '@spare/deco'
import { says }           from '@spare/logger'
import { strategies }     from '@valjoux/strategies'
import { fluoVector }     from '../../src/fluoVector'
import { candidates }     from './candidates'
import { fluoVecEdge }    from './fluoVecEdge'
import { fluoVecFut }     from './fluoVecFut'

candidates |> delogger
const { lapse, result } = strategies({
  repeat: 2E+4,
  candidates: candidates |> makeEmbedded,
  methods: {
    bench: x => x,
    arc: fluoVector,
    cla: fluoVector,
    fut: fluoVecFut,
    edge: fluoVecEdge,
  },
})
lapse |> deco |> says['lapse']
result |> deco |> says['result']
