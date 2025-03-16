import { oneself }                      from '@ject/oneself'
import { hslToHex, rgbToHex, rgiToHex } from '../src/hex.js'
import { hexToHsl, intToHsl, rgbToHsl } from '../src/hsl.js'
import { hexToRgb, hslToRgb, rgiToRgb } from '../src/rgb.js'
import { hexToRgi, hslToRgi, rgbToRgi } from '../src/rgi.js'

export class Conv {
  static rgb = class Rgb {
    static rgb = oneself
    static hex = rgbToHex
    static hsl = rgbToHsl
    static int = rgbToRgi
  }
  static hex = class Rgb {
    static rgb = hexToRgb
    static hex = oneself
    static hsl = hexToHsl
    static int = hexToRgi
  }
  static hsl = class Rgb {
    static rgb = hslToRgb
    static hex = hslToHex
    static hsl = oneself
    static int = hslToRgi
  }
  static int = class Rgb {
    static rgb = rgiToRgb
    static hex = rgiToHex
    static hsl = intToHsl
    static int = oneself
  }
}