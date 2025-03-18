import { indexed }  from '@vect/object-mapper'
import { rgbToStr } from '../index.js'
import { XTERM }    from './presets/xterm.js'

for (const [ key, rgb ] of indexed(XTERM)) {
  `[key] (${key}) [rgb] (${rgbToStr(rgb)})` |> console.log
}