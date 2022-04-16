import { CarPlants } from '@foba/object-string'
import { Cards }     from '@palett/cards'
import { logger }    from '@spare/logger'
import { Hatsu }     from '../index'

const ConsoleColors = {
  black: '30',
  red: '31',
  green: '32',
  yellow: '33',
  blue: '34',
  magenta: '35',
  cyan: '36',
  white: '37',
  grey: '90',
}

const hatsu = Hatsu.rgb([44, 181, 233])
// hatsu.Yellow.italic.inverse |> console.log
hatsu |> logger
hatsu('BMW Z5') |> console.log
hatsu.bold('BMW M3') |> console.log
hatsu.yellow.italic.inverse(CarPlants.SantAgata) |> console.log
hatsu.red.ext.bold(CarPlants.Angelholm) |> logger
hatsu.black.inverse.bold(CarPlants.Gaydon) |> logger
hatsu.red.ext(CarPlants.Stuttgart) |> logger
hatsu.hex(Cards.indigo.accent_2, CarPlants.Maranello) |> logger

