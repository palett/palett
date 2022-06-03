import { strategies }        from '@valjoux/strategies'
import { decoCrostab, says } from '@spare/logger'

function add(a, b) { return a + b }

const { lapse, result } = strategies({
  repeat: 1E+7,
  candidates: {
    foo: [1, 2, 3],
    bar: [2, 3, 4],
  },
  methods: {
    bench: (x, y, z) => ({ x, y, z }),
    cla: (x, y, z) => {
      function f(a, b) { return a + b }
      return f(f(x, y), z)
    },
    rea: (x, y, z) => {
      const a = add(x, y)
      return add(a, z)
    },
    fut: (x, y, z) => { return x + y + z }
  }
})
lapse |> decoCrostab |> says['lapse']
result |> decoCrostab |> says['result']