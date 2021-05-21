import { oneself }  from '@ject/oneself'
import { hexToHsl } from './hexToHsl'
import { hexToInt } from './hexToInt'
import { hexToRgb } from './hexToRgb'
import { hslToHex } from './hslToHex'
import { hslToInt } from './hslToInt'
import { hslToRgb } from './hslToRgb'
import { intToHex } from './intToHex'
import { intToHsl } from './intToHsl'
import { intToRgb } from './intToRgb'
import { rgbToHex } from './rgbToHex'
import { rgbToHsl } from './rgbToHsl'
import { rgbToInt } from './rgbToInt'

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