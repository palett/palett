import { METRO } from '@palett/presets'
import { Proj }  from '../src/Proj.beta.js'

const proj = Proj.from({ lo: 0, hi: 100, }, METRO)

proj.render(NaN, 'nan') |> console.log
proj.render(0, 'zero') |> console.log
proj.render(20, 'twenty') |> console.log
proj.render(40, 'forty') |> console.log
proj.render(60, 'sixty') |> console.log
proj.render(80, 'eighty') |> console.log
proj.render(100, 'hundred') |> console.log