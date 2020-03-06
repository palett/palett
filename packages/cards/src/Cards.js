import { red } from './colors/red'
import { pink } from './colors/pink'
import { purple } from './colors/purple'
import { deepPurple } from './colors/deepPurple'
import { indigo } from './colors/indigo'
import { blue } from './colors/blue'
import { lightBlue } from './colors/lightBlue'
import { cyan } from './colors/cyan'
import { teal } from './colors/teal'
import { green } from './colors/green'
import { lightGreen } from './colors/lightGreen'
import { lime } from './colors/lime'
import { yellow } from './colors/yellow'
import { amber } from './colors/amber'
import { orange } from './colors/orange'
import { deepOrange } from './colors/deepOrange'
import { brown } from './greys/brown'
import { blueGrey } from './greys/blueGrey'
import { grey } from './greys/grey'

/**
 * @type {Object.<string,Object<string,Object>>}
 * @property {string[]} colors
 * @property {string[]} degrees
 */
export const Cards = {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
  brown,
  blueGrey,
  grey
}

Reflect.defineProperty(Cards, 'colors', {
  get () { return Object.keys(Cards) },
  enumerable: false
})
Reflect.defineProperty(Cards, 'degrees', {
  get () { for (let color in Cards) return Object.keys(Cards[color]) },
  enumerable: false
})

