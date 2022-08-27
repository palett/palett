import { rgbToInt }  from '@palett/convert'
import { indexed }   from '@vect/object-mapper'
import { intToSpec } from '../src/intToStr.js'
import { XTERM }     from './presets/xterm'

for (const [ key, rgb ] of indexed(XTERM)) {
  const int = rgbToInt(rgb);
  `[${key}] (${intToSpec(int)})` |> console.log
}