import { DyeFactory } from '@palett/dye-factory'
import { RGB }        from '@palett/enum-color-space'
import { INVERSE }    from '@palett/enum-font-effects'
import { logger, xr } from '@spare/logger'
import { intToRgb }   from '../src/intToRgb'
import { rgbToInt }   from '../src/rgbToInt'

export const XTERM = {
  noir: [ 0, 0, 0 ],
  rouge: [ 205, 0, 0 ],
  vert: [ 0, 205, 0 ],
  jaune: [ 205, 205, 0 ],
  bleu: [ 0, 0, 238 ],
  magenta: [ 205, 0, 205 ],
  cyan: [ 0, 205, 205 ],
  blanc: [ 229, 229, 229 ],
  noir_brillant: [ 127, 127, 127 ],
  rouge_brillant: [ 255, 0, 0 ],
  vert_brillant: [ 0, 255, 0 ],
  jaune_brillant: [ 255, 255, 0 ],
  bleu_brillant: [ 92, 92, 255 ],
  magenta_brillant: [ 255, 0, 255 ],
  cyan_brillant: [ 0, 255, 255 ],
  blanc_brillant: [ 255, 255, 255 ],
}

const dyeFab = DyeFactory.build(RGB, [ INVERSE ])

for (let [ key, rgb, int ] of Object.entries(XTERM)) {
  xr()
    .p(key.padStart(16))
    .rgb(dyeFab.make(rgb)(rgb.map(x => String(x).padStart(3))))
    .int(String(int = rgbToInt(rgb)).padStart(8))
    .rgb(dyeFab.make(rgb = intToRgb(int))(rgb.map(x => String(x).padStart(3)))) |> logger
}


















