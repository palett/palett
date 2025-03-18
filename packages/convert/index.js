import { minus } from '@aryth/polar';

/**
 * compute hue angle from r, g, b, max(r, g, b), max - min
 * @param {number} r - r component
 * @param {number} g - g component
 * @param {number} b - b component
 * @param {number} hi - max(r, g, b), should align order of magnitude with r/g/b
 * @param {number} df - max - min, should align order of magnitude with r/g/b
 * @returns {number} hue, [0, 12] ⇠ [0, 360]
 */
function hue(r, g, b, hi, df) {
  if (df === 0) return 0
  if (hi === r) return ((g - b) / df + 6) % 6 // R be dominant
  if (hi === g) return ((b - r) / df + 2)     // G be dominant
  if (hi === b) return ((r - g) / df + 4)     // B be dominant
  return 0
}

/**
 * channel hsl component into r/g/b value
 * @param {number} off offset for color component, r: 12 ± 12, g: 8 ± 12, b: 4 ± 12.
 * @param {number} hv hue value, [0, 12] ⇠ [0, 360]
 * @param {number} amp chroma value, same order of magnitude as lt
 * @param {number} lt lightness value
 * @returns {number} same order of magnitude as lt
 */
function channel(off, hv, amp, lt) {
  let ph = (off + hv) % 12;  // Calculate modular position in color wheel. 相位偏移
  ph = 3 + (ph < 6 ? ph - 6 : 6 - ph); // Create triangular wave pattern, 对称波形生成, equivalent to: min(phase - 3, 9 - phase), or if (m < 6) { m - 3 } else { 9 - m }
  if (ph > 1) { ph = 1; } else if (ph < -1) { ph = -1; } // Clamp to [-1, 1] range. 钳制到 [-1, 1]
  return lt - amp * ph // Apply chroma to get final component value. 合并乘法
}

/**
 * channel hsl component into r/g/b value
 * @param {number} off offset for color component, r: 12 ± 12, g: 8 ± 12, b: 4 ± 12.
 * @param {number} hv hue value, [0, 12] ⇠ [0, 360]
 * @param {number} amp chroma value, (s * l) or (s * (1 - l)), 0[0, 100]
 * @param {number} lt lightness value, [0, 100]
 * @returns {number} [0,255]
 */
function centFF(off, hv, amp, lt) {
  let ph = (off + hv) % 12;
  ph = 3 + (ph < 6 ? ph - 6 : 6 - ph);
  if (ph > 1) { ph = 1; } else if (ph < -1) { ph = -1; }
  ph = lt - amp * ph;
  ph *= 2.55;
  return ~~(ph + 0.5)
}

const round = x => ~~(x + 0.5);

// For digits 0-9 (ASCII 48-57), subtract 48 to get the value
// For letters a-f (ASCII 97-102) or A-F (ASCII 65-70), add 9 to get number from 10 to 15
function hexAt(tx, i) {
  const n = tx.charCodeAt(i);
  return (n >> 5) <= 1 ? n & 0xf : (n & 0x7) + 9
}

function ff(tx, i) {
  let a = tx.charCodeAt(i), b = tx.charCodeAt(++i);
  a = (a >> 5) <= 1 ? a & 0xF : (a & 0x7) + 9;
  b = (b >> 5) <= 1 ? b & 0xF : (b & 0x7) + 9;
  return a << 4 | b // a * 16 + b
}

const prolif = n => n << 4 | n;

function dil2(hex) {
  const hi = hex?.length;
  if (hi >= 2) return hex
  if (hi === 1) return '0' + hex
  if (hi <= 0) return '00'
}

function dil6(hex) {
  const hi = hex?.length;
  if (hi >= 6) return hex
  if (hi === 5) return '0' + hex
  if (hi === 4) return '00' + hex
  if (hi === 3) return '000' + hex
  if (hi === 2) return '0000' + hex
  if (hi === 1) return '00000' + hex
  if (hi <= 0) return '000000'
}

/**
 * @param {string} hex
 * @returns {number}
 */
function hexToRgi(hex) {
  let lo = 0, hi = hex?.length;
  if (hi === 7) lo++, hi--;
  if (hi === 6) { return ff(hex, 1) << 16 | ff(hex, 3) << 8 | ff(hex, 5) }
  if (hi === 4) lo++, hi--;
  if (hi === 3) { return prolif(hexAt(hex, lo++)) << 16 | prolif(hexAt(hex, lo++)) << 8 | prolif(hexAt(hex, lo++)) }
  return 0
}

/**
 * @param {string} hex
 * @returns {number}
 */
function hexToShort(hex) {
  let lo = 0, hi = hex?.length;
  if (hi === 7) lo++, hi--;
  if (hi === 6) return hexAt(hex, lo) << 8 | hexAt(hex, lo += 2) << 4 | hexAt(hex, lo + 2)
  if (hi === 4) lo++, hi--;
  if (hi === 3) return hexAt(hex, lo++) << 8 | hexAt(hex, lo++) << 4 | hexAt(hex, lo++)
  return 0
}

/**
 * @param {HSL} hsl
 * @returns {number}
 */
function hslToRgi(hsl) {
  const h = hsl[0] / 30, s = hsl[1], l = hsl[2];
  let a = s * (l < 50 ? l : 100 - l) / 100,
    r = centFF(0, h, a, l),
    g = centFF(8, h, a, l),
    b = centFF(4, h, a, l);
  return (r & 0xFF) << 16 | (g & 0xFF) << 8 | b & 0xFF
}

// export function centFF(off, hv, amp, lt) {
//   let ph = (off + hv) % 12  // Calculate modular position in color wheel. 相位偏移
//   ph = 3 + (ph < 6 ? ph - 6 : 6 - ph) // Create triangular wave pattern, 对称波形生成, equivalent to: min(phase - 3, 9 - phase), or if (m < 6) { m - 3 } else { 9 - m }
//   ph = ph > 1 ? 1 : ph < -1 ? -1 : ph // Clamp to [-1, 1] range. 钳制到 [-1, 1]
//   return lt - amp * ph // Apply chroma to get final component value. 合并乘法
// }

function hsaToRgi(h, s, l) {
  h /= 30;
  l /= 2;
  let amp = s * (l <= 50 ? l : 100 - l) / 200, // When lightness is low, increase it proportionally to saturation, 亮度系数, coefficient or chroma
    r = centFF(0, h, amp, l),
    g = centFF(8, h, amp, l),
    b = centFF(4, h, amp, l);
  return (r & 0xFF) << 16 | (g & 0xFF) << 8 | b & 0xFF
}

function rgaToRgi(r, g, b) { return (r & 0xFF) << 16 | (g & 0xFF) << 8 | b & 0xFF }

function rgbToRgi(rgb) { return (rgb[0] & 0xFF) << 16 | (rgb[1] & 0xFF) << 8 | rgb[2] & 0xFF }

function hsiToRgi(int) {
  let h = int >> 16 & 0x1FF, s = int >> 8 & 0xFF, l = int & 0xFF;
  return hsaToRgi(h, s, l)
}

const hslToHex = (hsl) => rgiToHex(hslToRgi(hsl));

const hsiToHex = (hsi) => rgiToHex(hsiToRgi(hsi));

const rgiToHex = (int) => '#' + dil6(int.toString(16));

/**
 * @param {[number,number,number]|RGB} rgb
 * @returns {string}
 */
const rgbToHex = (rgb) => '#' + dil6(rgbToRgi(rgb).toString(16));

/** @typedef {[number,number,number]} HSL [Hue([0,360]), Saturation([0,100]), Lightness([0,100])] */

/** @returns {HSL} */
function hexToHsl(hex) {
  return rgiToHsl.call(this, hexToRgi(hex))
}

/** @returns {HSL} */
function rgiToHsl(int) {
  const of = this?.of ?? Array.of;
  const r = int >> 16 & 0xFF, g = int >> 8 & 0xFF, b = int & 0xFF;
  let hi, lo;
  g > r ? (hi = g, lo = r) : (hi = r, lo = g);
  b > hi ? hi = b : b < lo ? lo = b : void 0;
  const tt = hi + lo, df = hi - lo,
    h = hue(r, g, b, hi, df) * 600, // h ∈ [0,6), then h = h * 600, makes h ∈ [0,3600)
    s = !df ? 0 : df * 1000 / (tt > 255 ? (510 - tt) : tt), // s ∈ [0, 1000]
    l = tt * 1.9607843137254903; // original l = ( hi + lo ) / 2 ∈ [0,255], then l = (tt / 2 * 1000 / 255), makes l ∈ [0,1000)
  return of(round(h) / 10, round(s) / 10, round(l) / 10)
}

/** @returns {HSL} */
function rgbToHsl(rgb) {
  return rgiToHsl.call(this, rgbToRgi(rgb))
}

function hsiToHsl(int) {
  const h = int >> 16 & 0x1FF, s = int >> 8 & 0xFF, l = int & 0xFF;
  return [ round(h), round(s / 2), round(l / 2) ]
}

function hexToHsi(hex) {
  const r = ff(hex, 1), g = ff(hex, 3), b = ff(hex, 5);
  return rgaToHsi(r, g, b)
}

function hslToHsi(hsl) {
  const h = round(hsl[0]), s = round(hsl[1] * 2), l = round(hsl[2] * 2);
  return (h & 0x1FF) << 16 | (s & 0xFF) << 8 | l & 0xFF
}

function hsaToHsi(h, s, l) {
  h = round(h), s = round(s * 2), l = round(l * 2);
  return (h & 0x1FF) << 16 | (s & 0xFF) << 8 | l & 0xFF
}

function rgaToHsi(r, g, b) {
  let hi, lo;
  g > r ? (hi = g, lo = r) : (hi = r, lo = g);
  b > hi ? hi = b : b < lo ? lo = b : void 0;
  let tt = hi + lo, df = hi - lo,
    h = hue(r, g, b, hi, df) * 60, // original h ∈ [0,6), then h = h * 60, makes h ∈ [0,360)
    s = !df ? 0 : (df * 200) / (tt > 255 ? (510 - tt) : tt), // s ∈ [0,512)
    l = (tt * 200) / 510;
  h = ~~(h + 0.5), s = ~~(s + 0.5), l = ~~(l + 0.5);
  return (h & 0x1FF) << 16 | (s & 0xFF) << 8 | l & 0xFF // h ∈ [0, 360), s ∈ [0, 512), l ∈ [0, 512)
}

function modHsi(int, dh, ds, dl) {
  let h = int >> 16 & 0x1FF, s = int >> 8 & 0xFF, l = int & 0xFF;
  h += dh, s += ds, l += dl;
  if ((h %= 360) < 0) h += 360;
  if (s < 0) { s = 0; } else if (s > 200) { s = 200; }
  if (l < 0) { l = 0; } else if (l > 200) { l = 200; }
  return (h & 0x1FF) << 16 | (s & 0xFF) << 8 | l & 0xFF // 9 bit + 9 bit + 9 bit = 25 bit
}

function modHsiTo(int, dh, ds, dl) {
  let h = int >> 16 & 0x1FF, s = int >> 8 & 0xFF, l = int & 0xFF;
  h += dh, s += ds, l += dl;
  if ((h %= 360) < 0) h += 360;
  if (s < 0) { s = 0; } else if (s > 200) { s = 200; }
  if (l < 0) { l = 0; } else if (l > 200) { l = 200; }
  return hsaToRgi(h, s, l)
}

function deltaHsi(min, max) {
  return [ minus(max >> 16 & 0x1FF, min >> 16 & 0x1FF), (max >> 8 & 0xFF) - (min >> 8 & 0xFF), (max & 0xFF) - (min & 0xFF) ]
}

function modRgi(int, dh, ds, dl) {
  let r = int >> 16 & 0xFF, g = int >> 8 & 0xFF, b = int & 0xFF;
  r += dh, g += ds, b += dl;
  r = r < 0 ? 0 : r > 0xFF ? 0xFF : r;
  g = g < 0 ? 0 : g > 0xFF ? 0xFF : g;
  b = b < 0 ? 0 : b > 0xFF ? 0xFF : b;
  return (r & 0xFF) << 16 | (g & 0xFF) << 8 | b & 0xFF // 9 bit + 9 bit + 9 bit = 25 bit
}

/** @returns {RGB} */
function hexToRgb(hex) {
  const of = this?.of ?? Array.of;
  const int = hexToRgi(hex);
  return of(int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
}

/** @returns {RGB} */
function rgiToRgb(int) {
  const of = this?.of ?? Array.of;
  return of(int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
}

function hsiToRgb(hsi) {
  return rgiToRgb(hsiToRgi(hsi))
}

/** @returns {RGB} */
function hslToRgb(hsl) {
  const of = this?.of ?? Array.of;
  const h = hsl[0] / 30, s = hsl[1], l = hsl[2];
  const a = s * (l <= 50 ? l : (100 - l)) / 100,
    r = centFF(0, h, a, l),
    g = centFF(8, h, a, l),
    b = centFF(4, h, a, l);
  return of(r, g, b)
}

export { centFF, channel, deltaHsi, dil2, dil6, ff, hexAt, hexToHsi, hexToHsl, hexToRgi as hexToInt, hexToRgb, hexToRgi, hexToShort, hsaToHsi, hsaToRgi as hsaToInt, hsaToRgi, hsiToHex, hsiToHsl, hsiToRgi as hsiToInt, hsiToRgb, hsiToRgi, hslToHex, hslToHsi, hslToRgi as hslToInt, hslToRgb, hslToRgi, hue, rgiToHex as intToHex, rgiToHsl as intToHsl, rgiToRgb as intToRgb, modHsi, modHsiTo, modRgi as modInt, modRgi, prolif, rgaToHsi, rgaToRgi, rgbToHex, rgbToHsl, rgbToRgi as rgbToInt, rgbToRgi, rgiToHex, rgiToHsl, rgiToRgb };
