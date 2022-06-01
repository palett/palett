import { Dye } from './index'


const fn = Dye.hsl([345, 60, 55])

fn('what') |> console.log