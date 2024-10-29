import { oneself }                                  from '@ject/oneself'
import { hslToHex, intToHex, rgbToHex }             from './src/hex.js'
import { hexToHsl, intToHsl, rgbToHsl }             from './src/hsl.js'
import { hexToInt, hexToShort, hslToInt, rgbToInt } from './src/int.js'
import { hexToRgb, hslToRgb, intToRgb }             from './src/rgb.js'

export { hexAt, prolif, dil2, dil3, dil6 } from './utils/hex.js'
export { hf }                              from './utils/hsl.js'
export { bd, hue }                         from './utils/rgb.js'

export { hslToHex, intToHex, rgbToHex }             from './src/hex.js'
export { hexToHsl, intToHsl, rgbToHsl, fracToHsl }  from './src/hsl.js'
export { hexToInt, hexToShort, hslToInt, rgbToInt } from './src/int.js'
export { hexToRgb, hslToRgb, intToRgb }             from './src/rgb.js'

export class Conv {
  static rgb = class Rgb {
    static rgb = oneself
    static hex = rgbToHex
    static hsl = rgbToHsl
    static int = rgbToInt
  }
  static hex = class Rgb {
    static rgb = hexToRgb
    static hex = oneself
    static hsl = hexToHsl
    static int = hexToInt
  }
  static hsl = class Rgb {
    static rgb = hslToRgb
    static hex = hslToHex
    static hsl = oneself
    static int = hslToInt
  }
  static int = class Rgb {
    static rgb = intToRgb
    static hex = intToHex
    static hsl = intToHsl
    static int = oneself
  }
}