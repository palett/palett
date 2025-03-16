import { rgbToStr, xyzToStr } from '@palett/stringify'
import { indexed }            from '@vect/object-mapper'
import { rgbToHsl }           from '../../src/hsl.js'
import { hslToRgb }           from '../../src/rgb.js'
import { Beta }               from './beta.js'

const COLORS = {
  noir: [ 0, 0, 0 ],
  rouge: [ 255, 0, 0 ],
  vert: [ 0, 255, 0 ],
  bleu: [ 0, 0, 255 ],
  rouge_dark: [ 192, 32, 96 ],
  vert_dark: [ 64, 192, 64 ],
  bleu_dark: [ 64, 63, 192 ],
  jaune: [ 255, 255, 0 ],
  cyan: [ 0, 255, 255 ],
  magenta: [ 255, 0, 255 ],
  tinsel: [ 195, 150, 77 ],
  maroon: [ 131, 70, 85 ],
  cloud: [ 254, 254, 255 ],
  blanc: [ 255, 255, 255 ],
}

for (let [ name, [ or, og, ob ] ] of indexed(COLORS)) {
  name |> console.log
  const [ oh, os, ol ] = rgbToHsl([ or, og, ob ])
  const [ pr, pg, pb ] = hslToRgb([ oh, os, ol ])
  const [ h, s, l ] = Beta.rgbToHsl(or, og, ob)
  const [ r, g, b ] = Beta.hslToRgb(h, s, l);
  `[raw] (${rgbToStr([ or, og, ob ])}) [hsl.a] (${xyzToStr(oh, os, ol)}) [hsl.b] (${xyzToStr(h, s, l)}) [rgb.a] (${rgbToStr([ pr, pg, pb ])}) [rgb.b] (${rgbToStr([ r, g, b ])})` |> console.log
}
