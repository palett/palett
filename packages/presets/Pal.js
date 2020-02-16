import { marks } from '../visual/assets/visual.config'
import { Ob } from 'veho'
import { Palett } from 'palett'

export class Pal {
  static bases = Object.entries(Palett).map(([name, { base }]) => [name, base]) |> Ob.fromEntries
  static marks = marks
}
