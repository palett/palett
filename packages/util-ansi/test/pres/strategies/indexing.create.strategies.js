import { decoCrostab, says } from '@spare/logger'
import { makeEmbedded }      from '@foba/util'
import { strategies }        from '@valjoux/strategies'


const { lapse, result } = strategies({
  repeat: 1E+6,
  candidates: {
    foo: 'foo',
    bar: 'bar',
    zen: 'zen'
  } |> makeEmbedded,
  methods: {
    bench: x => x,
    epi: ch => {
      const vec = [ 0, null ]
      vec[1] = ch
      return vec
    },
    cla: ch => {
      const vec = [ 0, 0, 0 ]
      vec[3] = ch
      return vec
    },
    dev: ch => {
      const vec = [ 0, 0, 0 ]
      vec.ch = ch
      return vec
    },
    edg: ch => {
      const vec = { st: 0, fg: 0, bg: 0 }
      vec.ch = ch
      return vec
    },
    rea: ch => {
      const vec = [ null, 0, 0, 0 ]
      vec[0] = ch
      return vec
    },
    // arc: x => x,
    // fut: x => x,
  }
})
lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']