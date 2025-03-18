import { rgbToHsl }           from '@palett/convert'
import { indexed }            from '@vect/object-mapper'
import { hslToStr, rgbToStr } from '../index.js'
import { XTERM }              from './presets/xterm.js'

for (const [ key, rgb ] of indexed(XTERM)) {
  const hsl = rgbToHsl(rgb);
  `[key] (${key}) [rgb] (${rgbToStr(rgb)}) [hsl] (${hslToStr(hsl)})` |> console.log
}