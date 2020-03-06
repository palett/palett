import { Red } from './colors/Red'
import { Pink } from './colors/Pink'
import { Purple } from './colors/Purple'
import { DeepPurple } from './colors/DeepPurple'
import { Indigo } from './colors/Indigo'
import { Blue } from './colors/Blue'
import { LightBlue } from './colors/LightBlue'
import { Cyan } from './colors/Cyan'
import { Teal } from './colors/Teal'
import { Green } from './colors/Green'
import { LightGreen } from './colors/LightGreen'
import { Lime } from './colors/Lime'
import { Yellow } from './colors/Yellow'
import { Amber } from './colors/Amber'
import { Orange } from './colors/Orange'
import { DeepOrange } from './colors/DeepOrange'
import { Brown } from './greys/brown'
import { BlueGrey } from './greys/blueGrey'
import { Grey } from './greys/grey'

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

