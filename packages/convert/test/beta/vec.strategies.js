
import { lim, lim0up, round } from '@aryth/math'
import { strategies }         from '@valjoux/strategies'


const { lapse, result } = strategies({
  repeat: 2E+6,
  candidates: {
    tinsel: [ 195, 150, 77 ],
    citron: [ 223, 222, 155 ],
    cement: [ 192, 185, 164 ],
    strange: [ 256, 0.5, 12 ],
    // maroon: [ 131, 70, 85 ],
  },
  methods: {
    dev: (r, g, b) => {
      const vec = new Uint8ClampedArray(3)
      vec[0] = r
      vec[1] = g
      vec[2] = b
      return vec
    },
    rea: (r, g, b) => { return [ lim0up(round(r), 255), lim0up(round(g), 255), lim0up(round(b), 255) ] },
  },
  showPretty: false,
})
lapse |> console.log
result.cell('strange', 'dev') |> console.log