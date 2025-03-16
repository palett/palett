import { makeEmbedded }      from '@foba/util'
import { decoCrostab, says } from '@spare/logger'
import { strategies }        from '@valjoux/strategies'


const { lapse, result } = strategies({
  repeat: 1E+6,
  candidates: {
    foo: 'foo',
    bar: 'bar',
    zen: 'zen',
  } |> makeEmbedded,
  methods: {
    bench: x => x,
    epi: ch => {
      const vec = [ 0, null ]
      vec[1] = ch
      return vec[1]
    },
    cla: ch => {
      const vec = [ 0, 0, 0 ]
      vec[3] = ch
      return vec[3]
    },
    dev: ch => {
      const vec = [ 0, 0, 0 ]
      vec.ch = ch
      return vec.ch
    },
    rea: ch => {
      const vec = [ null, 0, 0, 0 ]
      vec[0] = ch
      return vec[0]
    },
    // arc: x => x,
    // fut: x => x,
  },
})
lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']