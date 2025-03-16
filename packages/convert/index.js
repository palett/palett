export { hslToHex, rgiToHex, rgbToHex, hsiToHex }                                     from './src/hex.js'
export { hexToHsl, rgiToHsl, rgbToHsl, hsiToHsl }                                     from './src/hsl.js'
export { hexToHsi, rgaToHsi, hsaToHsi, hslToHsi, modHsi, modHsiTo, deltaHsi, modRgi } from './src/hsi.js'
export { hexToRgi, hslToRgi, hsaToRgi, rgaToRgi, rgbToRgi, hsiToRgi, hexToShort }     from './src/rgi.js'
export { hexToRgb, hsiToRgb, hslToRgb, rgiToRgb }                                     from './src/rgb.js'
export { hexAt, ff, prolif, dil2, dil6 }                                              from './src/util/string-utils.js'
export { hue, channel, centFF }                                                       from './src/util/number-utils.js'

export { rgiToHex as intToHex } from './src/hex.js'
export { rgiToHsl as intToHsl } from './src/hsl.js'
export { modRgi as modInt }     from './src/hsi.js'
export {
  hexToRgi as hexToInt, hslToRgi as hslToInt, hsaToRgi as hsaToInt, rgbToRgi as rgbToInt, hsiToRgi as hsiToInt,
}                               from './src/rgi.js'
export { rgiToRgb as intToRgb } from './src/rgb.js'
