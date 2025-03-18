import { Amber }      from './colors/Amber.js'
import { Blue }       from './colors/Blue.js'
import { Cyan }       from './colors/Cyan.js'
import { DeepOrange } from './colors/DeepOrange.js'
import { DeepPurple } from './colors/DeepPurple.js'
import { Green }      from './colors/Green.js'
import { Indigo }     from './colors/Indigo.js'
import { LightBlue }  from './colors/LightBlue.js'
import { LightGreen } from './colors/LightGreen.js'
import { Lime }       from './colors/Lime.js'
import { Orange }     from './colors/Orange.js'
import { Pink }       from './colors/Pink.js'
import { Purple }     from './colors/Purple.js'
import { Red }        from './colors/Red.js'
import { Teal }       from './colors/Teal.js'
import { Yellow }     from './colors/Yellow.js'
import { BlueGrey }   from './greys/blueGrey.js'
import { Brown }      from './greys/brown.js'
import { Grey }       from './greys/grey.js'

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
  grey: Grey,
}

Reflect.defineProperty(Cards, 'colors', {
  get() { return Object.keys(Cards) },
  enumerable: false,
})
Reflect.defineProperty(Cards, 'degrees', {
  get() { for (let color in Cards) return Object.keys(Cards[color]) },
  enumerable: false,
})

