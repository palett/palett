import { rgbToHex } from '@palett/convert'
import { indexed }  from '@vect/object-mapper'
import { hexToStr } from '../index.js'
import { XTERM }    from './presets/xterm.js'

for (const [ key, rgb ] of indexed(XTERM)) {
  const hex = rgbToHex(rgb);
  `[${key}] (${hexToStr(hex)})` |> console.log
}