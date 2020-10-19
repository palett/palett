import { Amber }      from './colors/Amber'
import { Blue }       from './colors/Blue'
import { Cyan }       from './colors/Cyan'
import { DeepOrange } from './colors/DeepOrange'
import { DeepPurple } from './colors/DeepPurple'
import { Green }      from './colors/Green'
import { Indigo }     from './colors/Indigo'
import { LightBlue }  from './colors/LightBlue'
import { LightGreen } from './colors/LightGreen'
import { Lime }       from './colors/Lime'
import { Orange }     from './colors/Orange'
import { Pink }       from './colors/Pink'
import { Purple }     from './colors/Purple'
import { Red }        from './colors/Red'
import { Teal }       from './colors/Teal'
import { Yellow }     from './colors/Yellow'
import { BlueGrey }   from './greys/blueGrey'
import { Brown }      from './greys/brown'
import { Grey }       from './greys/grey'

/**
 * @type {Object.<string,Object<string,Object>>}
 * @property {string[]} colors
 * @property {string[]} degrees
 */
export const Cards = {
  red: Red,
  pink: Pink,
  purple: Purple,
  deepPurple: DeepPurple,
  indigo: Indigo,
  blue: Blue,
  lightBlue: LightBlue,
  cyan: Cyan,
  teal: Teal,
  green: Green,
  lightGreen: LightGreen,
  lime: Lime,
  yellow: Yellow,
  amber: Amber,
  orange: Orange,
  deepOrange: DeepOrange,
  brown: Brown,
  blueGrey: BlueGrey,
  grey: Grey
}

Reflect.defineProperty(Cards, 'colors', {
  get () { return Object.keys(Cards) },
  enumerable: false
})
Reflect.defineProperty(Cards, 'degrees', {
  get () { for (let color in Cards) return Object.keys(Cards[color]) },
  enumerable: false
})

