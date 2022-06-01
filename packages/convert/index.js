import { oneself }                                   from "@ject/oneself";
import { hslToHex, intToHex, rgbToHex, }             from "./src/hex";
import { hexToHsl, intToHsl, rgbToHsl }              from "./src/hsl";
import { hexToInt, hexToShort, hslToInt, rgbToInt, } from "./src/int"
import { hexToRgb, hslToRgb, intToRgb }              from './src/rgb'

export { hexAt, prolif, dil2, dil3, dil6 } from './utils/hex'
export { hf }                              from './utils/hsl'
export { bd, hue }                         from './utils/rgb'

export { hslToHex, intToHex, rgbToHex, }             from "./src/hex";
export { hexToHsl, intToHsl, rgbToHsl }              from "./src/hsl";
export { hexToInt, hexToShort, hslToInt, rgbToInt, } from "./src/int"
export { hexToRgb, hslToRgb, intToRgb }              from './src/rgb'

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