import { DyeFab } from '../index'

const dye = DyeFab.hsl()

const fn = dye.make([345, 60, 55])
fn('what') |> console.log