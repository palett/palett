import { makeEmbedded }   from '@foba/util'
import { says }           from '@palett/says'
import { deco, delogger } from '@spare/deco'
import { strategies }     from '@valjoux/strategies'
import { fluoVec }        from '../../src/fluoVec'
import { fluoVector }     from '../../src/fluoVector'
import { candidates }     from './candidates'
import { fluoVecDev }     from './fluoVecDev'
import { fluoVecEdge }    from './fluoVecEdge'
import { fluoVecFut }     from './fluoVecFut'

candidates |> delogger
const { lapse, result } = strategies({
  repeat: 2E+4,
  candidates: candidates |> makeEmbedded,
  methods: {
    bench: x => x,
    arc: fluoVec,
    cla: fluoVector,
    dev: fluoVecDev, //.bind({ mutate: false, colorant: false }),
    fut: fluoVecFut,
    edge: fluoVecEdge,
  }
})
lapse |> deco |> says['lapse']
result |> deco |> says['result']
