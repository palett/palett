import { mapKeys }    from '@vect/object'
import { NameMapper } from './NAME_MAPPING.js'

export const PRIMARY = {
  background: '#2E3440',
  foreground: '#D8DEE9',
}

export const CURSOR = {
  text: '#2E3440',
  cursor: '#D8DEE9',
}

export const NORMAL = {
  black: '#3B4252',
  red: '#BF616A',
  green: '#A3BE8C',
  yellow: '#EBCB8B',
  blue: '#81A1C1',
  magenta: '#B48EAD',
  cyan: '#88C0D0',
  white: '#E5E9F0',
}

export const BRIGHT = {
  black: '#4C566A',
  red: '#BF616A',
  green: '#A3BE8C',
  yellow: '#EBCB8B',
  blue: '#81A1C1',
  magenta: '#B48EAD',
  cyan: '#8FBCBB',
  white: '#ECEFF4',
}

export const EXTREME = {
  'pure-black': '#000000',
  'pure-white': '#FFFFFF',
  'pure-red': '#FF0000',
  'pure-yellow': '#FFFF00',
  'pure-green': '#00FF00',
  'pure-cyan': '#00FFFF',
  'pure-blue': '#0000FF',
  'pure-magenta': '#FF00FF',
}

export const NORD = {
  ...mapKeys(PRIMARY, NameMapper('primary', 14)),
  ...mapKeys(CURSOR, NameMapper('cursor', 14)),
  ...mapKeys(NORMAL, NameMapper('normal', 14)),
  ...mapKeys(BRIGHT, NameMapper('bright', 14)),
  ...mapKeys(EXTREME, NameMapper('extreme', 14)),
}
